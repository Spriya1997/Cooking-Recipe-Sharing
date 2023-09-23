import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Col, Container, Row } from 'reactstrap';
import AddReview from './AddReview';
import EditReview from './EditReview';
import Header from './Header';
import '../css/RecipeDetails.css';
import { RiHeart3Fill } from "react-icons/ri";
import { FaComment } from 'react-icons/fa';
import { MdOutlineRateReview, MdOutlineReviews } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import StarRating from './StarRating.js';

function RecipeDetails() {

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [reviews, setReviews] = useState([]);
    const baseUrl = 'http://localhost:8080/api/users/'
    const [modalAddReview, setModalAddReview] = useState(false);
    const [modalEditReview, setModalEditReview] = useState(false);

    const toggleAddReview = () => {
        setModalAddReview(!modalAddReview);
    }
    const toggleEditReview = () => {
        setModalEditReview(!modalEditReview);
    }
    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    useEffect(() => {
        if (recipeId) {
            // Fetch recipe details based on the 'id' 
            axios.get(baseUrl + 'recipes/' + recipeId)
                .then(response => {
                    console.log('Recipes data from the backend:', response.data);
                    setRecipe(response.data);
                    // console.log(recipe.userActivity);
                })
                .catch(error => {
                    console.error('Error fetching recipe details:', error);
                });
            console.log(recipe);
        }
    }, [recipeId]);

    useEffect(() => {
        if (recipeId) {
            // Fetch reviews details based on the 'recipe id' 
            axios.get(baseUrl + 'recipes/' + recipeId + '/reviews')
                .then(response => {
                    console.log('Reviews from the backend:', response.data);
                    setReviews(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reviews details:', error);
                });
        }
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
                    <Col xs={14}>
                        <div className="d-flex align-items-center mb-4">
                            <RiHeart3Fill className="favoriteIcon115" />
                            {recipe.userActivity && (<div className="ml-0 mr-4" >{recipe.userActivity.favoritesCount} <b>LIKES</b></div>)}
                            {recipe.userActivity && (<StarRating className="ml-2 mt-5" initialRating={recipe.userActivity.averageRating} />)}
                            {recipe.userActivity && (<div className="ml-2">{recipe.userActivity.averageRating.toFixed(1)} <b>RATINGS</b></div>)}
                            <FaComment className="ml-5" style={{ fontSize: "24px", color: "#ca166d" }} />
                            {recipe.userActivity && (<div className="ml-2" >{recipe.userActivity.commentsCount} <b>REVIEWS</b> </div>)}
                            <div style={{ display: "flex", fontSize: "35px", position: 'absolute', right: 170 }}>
                                <OverlayTrigger placement="bottom" overlay={renderTooltip("Add reviews")}>
                                    <div><MdOutlineReviews onClick={toggleAddReview} style={{ color: 'teal' }} /></div>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={renderTooltip("Edit reviews")}>
                                    <div><MdOutlineRateReview onClick={toggleEditReview} style={{ color: 'teal', marginLeft: "20px" }} /></div>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="recipeDetails-image113">
                            {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} alt={recipe.name} /> : ''}
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <div className="recipe-details114">
                            <p><b>Ingredients:</b> {recipe.ingredients}</p>
                            <p><b>Direction:</b> {recipe.instructions}</p>
                            <p><b>Servings:</b> {recipe.servingSize}</p>
                            <p><b>Cooking Time:</b> {recipe.cookingTime} minutes</p>
                            <p><b>Difficulty Level:</b> {recipe.difficultyLevel}</p>
                            <p><b>Cuisines:</b> {recipe.cuisines}</p>
                            <p><b>Dietary Preferences:</b> {recipe.dietaryPreferences}</p>
                            <p><b>Meal Type:</b> {recipe.mealType}</p>
                            <p><b>Additional Notes:</b> {recipe.additionalNotes}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='reviews-section-container' style={{ padding: "100px" }}>
                <b style={{ fontSize: "24px", color: "teal" }}>Reviews</b>
                <p style={{ fontSize: "12", color: '#8d8787' }}>Check out the community reviews about the recipe</p>
                {reviews.map(review => (
                    <div key={review.id} className="review-box">
                        <div className="review-username"><b>{review.userName}</b></div>
                        <div className="review-ratings">
                            <StarRating initialRating={review.ratings} />
                            <div className='ml-3'>{review.ratings} out of 5</div>
                        </div>
                        <div className="review-comment">{review.comment}</div>
                    </div>
                ))}
            </div >
            <Modal isOpen={modalAddReview}>
                <ModalHeader toggle={toggleAddReview}>Add a review</ModalHeader>
                <ModalBody>
                    <AddReview setModalAddReview={setModalAddReview} />
                </ModalBody>
            </Modal>
            <Modal isOpen={modalEditReview}>
                <ModalHeader toggle={toggleEditReview}>Edit your review</ModalHeader>
                <ModalBody>
                    <EditReview setModalAddReview={setModalEditReview} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default RecipeDetails;
