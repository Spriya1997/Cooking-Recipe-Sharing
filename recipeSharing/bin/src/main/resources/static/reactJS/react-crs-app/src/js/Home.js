import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import '../App.css';
import StarRating from './StarRating.js';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

function Home() {

    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]); // an array for storing recipes
    const navigateToRecipeDetails = (recipeId) => navigate('/recipeDetails/' + recipeId);
    const [isHeartClick, setIsHeartClick] = useState(false);

    const toggleHeart = () => {
        setIsHeartClick(!isHeartClick);
    }

    const baseUrl = 'http://localhost:8080/api/users/'

    useEffect(() => {
        // Make a request to fetch all recipes
        axios.get(baseUrl + 'recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching all recipes :', error);
            });
    });

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
                                {isHeartClick ? (
                                    <BsHeartFill
                                        style={{ color: "#ca166d", cursor: "pointer" }}
                                        onClick={toggleHeart}
                                    />
                                ) : (
                                    <BsHeart
                                        style={{ color: "#ca166d", cursor: "pointer" }}
                                        onClick={toggleHeart}
                                    />
                                )}
                                <div className="mr-2"></div>
                                <StarRating className="mr-5" />
                                <FaComment className="ml-2" style={{ color: "#ca166d" }} />
                                <span className="ml-1">Comments</span>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home;