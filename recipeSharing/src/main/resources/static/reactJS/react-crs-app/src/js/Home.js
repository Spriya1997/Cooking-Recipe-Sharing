import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../App.css';
import '../css/StarChooser.css';
import { RiHeart3Fill } from "react-icons/ri";
import { FaComments } from "react-icons/fa";
import { useUser } from '../UserContext.js';
import StarRating from './StarRating.js';

function Home() {

    const navigate = useNavigate();
    var userId = useUser();
    const [recipes, setRecipes] = useState([]); // an array for storing recipes
    const [ratings, setRatings] = useState(3);
    const [comments, setComments] = useState('');
    const navigateToRecipeDetails = (recipeId) => navigate('/recipeDetails/' + recipeId);
    const baseUrl = 'http://localhost:8080/api/users/'

    useEffect(() => {
        //console.log("user id fetching recipes is:" + userId);
        if (userId) {
            // Make a request to fetch all recipes
            axios.get(baseUrl + userId + '/recipes/listPublicRecipes')
                .then(response => {
                    console.log('Recipes data from the backend:', response.data);
                    setRecipes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching all recipes :', error);
                });
        }
    }, [userId]);

    const handleHeartClick = async (recipeId, isFavorite) => {
        // console.log("control is tranferred in home");
        if (userId) {
            try {
                const response = await axios.post(baseUrl + userId + '/recipes/' + recipeId + '/setFavorite/' + isFavorite, { withCredentials: true });
                if (response.status === 200) {
                    console.log("successfully updated favorite");
                    const updatedRecipes = recipes.map(recipe => {
                        if (recipe.id === recipeId) {
                            return { ...recipe, isFavorite: isFavorite };
                        }
                        return recipe;
                    });
                    setRecipes(updatedRecipes);
                }
            }
            catch (error) {
                console.error('Error in updating favorite: ', error);
            }
        }
    }
    useEffect(() => {
        if (userId) {
            console.log(" getting reviews count:" + userId);
            // Make a request to fetch reviews count
            axios.get(baseUrl + userId + '/recipes')
                .then(response => {
                    setRecipes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reviews count:', error);
                });
        }
    }, [userId]);

    return (
        <div>
            <Header />
            <h1>Recipes</h1>
            <hr />
            <h2>Explore new recipes</h2>
            <p>Save your favorite recipes.</p>

            {/* Create a responsive grid using Row and Col */}
            <Row>
                {recipes.map(recipe => (
                    <Col key={recipe.id} sm={3} xs={6} className="mb-4"> {/* Use sm for small screens and xs for extra small screens */}
                        <div className="recipe-item">
                            <div onClick={() => navigateToRecipeDetails(recipe.id)}>
                                {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} alt='' /> : ''}
                            </div>
                            <h3>{recipe.name}</h3> 
                            <div className="d-flex align-items-center">
                                <RiHeart3Fill className={recipe.isFavorite ? 'heart active' : 'heart'} style={{fontSize : "30px"}}
                                    onClick={() => handleHeartClick(recipe.id, !recipe.isFavorite)} />
                                <StarRating initialRating = {3}/>
                                <FaComments className="ml-3" style={{ color: "#ca166d", fontSize : "34px" }} />
                                <span className="ml-2">Reviews</span>
                            </div>
                            {/* <p>Favorite - {recipe.isFavorite ? 'Yes' : 'No'}</p> */}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home;