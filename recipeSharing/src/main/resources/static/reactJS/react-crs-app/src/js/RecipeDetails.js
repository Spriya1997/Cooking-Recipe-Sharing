import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Col, Container, Row } from 'reactstrap';
import AddReview from './AddReview';
import EditReview from './EditReview';
import Header from './Header';
import '../css/RecipeDetails.css';
import { useUser } from '../UserContext';
import { RiHeart3Fill } from "react-icons/ri";
import { FaComment } from 'react-icons/fa';
import { MdOutlineRateReview, MdOutlineReviews } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import StarRating from './StarRating.js';
import AnchorLink from 'react-anchor-link-smooth-scroll';

function RecipeDetails() {

    const userId = useUser();
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [reviews, setReviews] = useState([]);
    const baseUrl = 'http://localhost:8080/api/users/'
    const [modalAddReview, setModalAddReview] = useState(false);
    const [modalEditReview, setModalEditReview] = useState(false);
    const [shouldShowAddReview, setShouldShowAddReview] = useState(true);
    //const formattedTime = new Date(reviews.updatedTime).toLocaleString();

    const formatReviewTime = (timestamp) => {
        var date = new Date(timestamp);
        const formattedTime = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
        return formattedTime;
    }

    const toggleAddReview = () => {
        fetchActivities();
        setModalAddReview(!modalAddReview);
    }
    const toggleEditReview = () => {
        fetchActivities();
        setModalEditReview(!modalEditReview);
    }
    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    useEffect(() => {
        if (userId != null && recipeId != null) {
            console.log("Recipe details userId : " + userId + " recipe id " + recipeId);
            // Fetch recipe details based on the 'id' 
            axios.get(baseUrl + userId + '/recipes/' + recipeId)
                .then(response => {
                    console.log('Recipes data from the backend:', response.data);
                    setRecipe(response.data);
                })
                .catch(error => {
                    console.error('Error fetching recipe details:', error);
                });
            console.log(recipe);
        }
    }, [recipeId]);

    const fetchActivities = () => {
        if (recipeId) {
            axios.get(baseUrl + 'recipes/' + recipeId + '/reviews')
                .then(response => {
                    console.log('Reviews from the backend:', response.data);
                    setReviews(response.data);
                    setShouldShowAddReview(!response.data.some(review => review.userId === userId));
                    console.log("Status of review " + shouldShowAddReview);
                })
                .catch(error => {
                    console.error('Error fetching reviews details:', error);
                });
        }
    };

    // fetchActivites to update reviews when a new review is added or edited
    useEffect(() => {
        fetchActivities();
    }, [recipeId]);

    return (
        <>
            <Header />
            <Container className="recipe-details111-container">
                <Row>
                    <Col xs={12}>
                        <h3 className=" mt-4 recipe-name112">{recipe.name}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="recipe-details-elements">
                            <div>
                                <RiHeart3Fill className=" ml-1 favoriteIcon115" />
                                {recipe.userActivity && (<div className=" mr-4 mt-1" style={{ fontSize: "14px", color: "black" }}>{recipe.userActivity.favoritesCount} <b>Likes</b></div>)}
                            </div>
                            <AnchorLink className='recipelink' href='#reviews'>
                                
                                    {recipe.userActivity && (<StarRating className="ml-2 mt-4" initialRating={recipe.userActivity.averageRating} />)}
                                    {recipe.userActivity && (<div className="ml-2 mb-1" style={{ fontSize: "14px", color: "black" }}>{recipe.userActivity.averageRating.toFixed(1)} <b>Ratings</b></div>)}
                                
                            </AnchorLink>
                            <AnchorLink className='recipelink' href='#reviews'>
                                
                                    <FaComment className="ml-5 mb-1" style={{ fontSize: "24px", color: "#ca166d" }} />
                                    {recipe.userActivity && (<div className="ml-3 mt-1" style={{ fontSize: "14px", color: "black" }} >{recipe.userActivity.commentsCount} <b>Reviews</b> </div>)}
                                
                            </AnchorLink>
                            <div style={{ display: "flex", fontSize: "35px", position: 'absolute', left: 930 }}>
                                {shouldShowAddReview ?
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip("Add reviews")}>
                                        <div><MdOutlineReviews onClick={toggleAddReview} style={{ color: 'teal' }} /></div>
                                    </OverlayTrigger>
                                    :
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip("Edit reviews")}>
                                        <div><MdOutlineRateReview onClick={toggleEditReview} style={{ color: 'teal' }} /></div>
                                    </OverlayTrigger>
                                }

                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <div className=" mt-4 recipeDetails-image113">
                            {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} alt={recipe.name} style={{ width: "100%", height: "100% " }} /> : ''}
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div className="mt-4 recipe-details114" style={{ lineHeight: "1.5" }}>
                            <p><b>Ingredients</b></p>
                            <ul style={{ textAlign: "justify", listStyleType: "square", marginLeft: "20px", paddingLeft: "20px" }}>
                                {recipe.ingredients && recipe.ingredients.trim().split('.').filter(ingredient => ingredient.length > 0).map((ingredient, index) => (
                                    <li key={index}>{ingredient.trim()}{'.'}</li>
                                ))}
                            </ul>
                            <hr className='mb-1' />
                            <p><b>Direction</b></p>
                            <ul style={{ textAlign: "justify", listStyleType: "square", marginLeft: "20px", paddingLeft: "20px" }}>
                                {recipe.instructions && recipe.instructions.trim().split('.').filter(instruction => instruction.length > 0).map((step, index) => (
                                    <li key={index}>{step.trim()}{step.trim() && '.'}</li>
                                ))}
                            </ul>
                            <hr className='mb-1' />
                            {recipe.servingSize && <>
                                <p><b>Serving Size </b></p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.servingSize}</li>
                                </ul>
                                <hr /></>}
                            {recipe.cookingTime && <>
                                <p><b>Cooking Time </b> </p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.cookingTime} minutes</li>
                                </ul>
                                <hr className='mb-1' /></>}
                            {recipe.difficultyLevel && <>
                                <p><b>Difficulty level of cooking </b></p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.difficultyLevel}</li>
                                </ul>
                                <hr className='mb-1' /></>}
                            {recipe.cuisines && <>
                                <p><b>Cuisines</b></p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.cuisines}</li>
                                </ul>
                                <hr /></>
                            }
                            {recipe.dietaryPreferences && <>
                                <p><b>Dietary Preferences</b></p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.dietaryPreferences}</li>
                                </ul>
                                <hr /></>}
                            {recipe.mealType && <>
                                <p><b>Meal Type</b></p>
                                <ul style={{ listStyleType: "square" }}>
                                    <li>{recipe.mealType}</li>
                                </ul>
                                <hr /></>}
                            {recipe.additionalNotes &&
                                <><p><b>Additional Notes:</b></p><ul style={{ textAlign: "justify", listStyleType: "disc", marginLeft: "20px", paddingLeft: "20px" }}>
                                    {recipe.additionalNotes && recipe.additionalNotes.trim().split('.').filter(step => step.length > 0).map((step, index) => (
                                        <li key={index}>{step.trim()}{step.trim() && '.'}</li>
                                    ))}
                                </ul><hr /></>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            <section id='reviews'>
                <div className='reviews-section-container' style={{ padding: "100px" }}>
                    <b style={{ fontSize: "24px", color: "teal" }}>Reviews</b>
                    <p className="mt-3" style={{ fontSize: "12", color: '#8d8787' }}>Check out the community reviews about the recipe</p>
                    {reviews.map(activity => (
                        <div key={activity.id} className="review-box">
                            <div className="review-username"><b>{activity.userName}</b></div>
                            <div style={{ display: "flex", fontSize: "14px", color: "#999", position: "absolute", right: 120 }}>
                                {formatReviewTime(activity.updatedTime)}
                            </div>
                            <div className="review-ratings">
                                <StarRating initialRating={activity.ratings} />
                                <div className='ml-3'>{activity.ratings} out of 5</div>
                            </div>
                            <div className="review-comment">{activity.comment}</div>
                        </div>
                    ))}
                </div >
            </section>
            <Modal isOpen={modalAddReview}>
                <ModalHeader toggle={() => setModalAddReview(false)}>Add a review</ModalHeader>
                <ModalBody>
                    <AddReview toggleAddReview={toggleAddReview} />
                </ModalBody>
            </Modal>
            <Modal isOpen={modalEditReview}>
                <ModalHeader toggle={() => setModalEditReview(false)}>Edit your review</ModalHeader>
                <ModalBody>
                    <EditReview toggleEditReview={toggleEditReview} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default RecipeDetails;
