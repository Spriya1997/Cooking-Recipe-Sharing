import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../App.css';
import { RiHeart3Fill } from "react-icons/ri";
import { useUser } from '../UserContext.js';
import StarRating from './StarRating.js';

function Home() {

    const navigate = useNavigate();
    var userId = useUser();
    const [recipes, setRecipes] = useState([]); // an array for storing recipes
    //const [ratings, setRatings] = useState('');
    const navigateToRecipeDetails = (recipeId) => navigate('/recipeDetails/' + recipeId);
    const baseUrl = 'http://localhost:8080/api/users/'

    useEffect(() => {
        console.log("user id fetching recipes is:" + userId);
        if (userId) {
            // Make a request to fetch all recipes
            axios.get(baseUrl + userId + '/recipes/listPublicRecipes')
                .then(response => {
                    console.log('Recipes data from the backend in home page:', response.data);
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
                    const recipeResponse = await axios.get(baseUrl + userId + '/recipes/'+ recipeId);
                    if (recipeResponse.status === 200)
                    {
                        const updatedRecipes = recipes.map(recipe => {
                            if (recipe.id === recipeId) {
                                return recipeResponse.data;
                            }
                            return recipe;
                        });
                        setRecipes(updatedRecipes);
                    }
                }
            }
            catch (error) {
                console.error('Error in updating favorite: ', error);
            }
        }
    }

    return (
        <div>
            <Header />
            <h5 style={{ backgroundColor: "#009999",fontSize : "22px", text: "bold", color:"white",paddingTop:"10px"}}> Save your favorite recipes
            <hr /></h5>
            <h5 className ='mb-5'style={{color: "#8d8787", fontSize: "19px", fontFamily: "sans-serif"}}>Unleash your culinary creativity, Explore new recipes</h5>
            <Row className = "mt-4"style={{position : "absolute"}}>
                {recipes.map(recipe => (
                    <Col key={recipe.id} sm={3} xs={6} className="mb-4"> {/* Use sm for small screens and xs for extra small screens */}
                        <div className="recipe-item">
                            <div onClick={() => navigateToRecipeDetails(recipe.id)}>
                                {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} style={{height:"280px", width:"600px"}} alt='' /> : ''}
                            </div>
                            <h3>{recipe.name}</h3>
                            <div className="d-flex align-items-center">
                                <div>
                                    <RiHeart3Fill
                                        className={recipe.favorite ? 'heartActive' : 'heart'}
                                        style={{ fontSize: "30px" }}
                                        onClick={() => handleHeartClick(recipe.id, !recipe.favorite)}
                                    />
                                    <p className="mb-0 ml-1 mr-3">{recipe.userActivity.favoritesCount} Likes</p>
                                </div>
                                <div className="ml-auto mb-4">
                                    <StarRating initialRating={recipe.userActivity.averageRating} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home;