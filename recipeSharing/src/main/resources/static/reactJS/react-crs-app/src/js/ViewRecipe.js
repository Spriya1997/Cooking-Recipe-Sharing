import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { GrEdit } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '../css/Viewrecipe.css';

function ViewRecipes() {
    var userId = useUser();
    const navigate = useNavigate();
    const navigateEditTo = (recipeId) => navigate('/editRecipe/' + recipeId);
    const baseUrl = 'http://localhost:8080/api/users/'

    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    const handleDeleteRecipe = async (recipeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");

        if (confirmDelete) {
            try {
                await axios.delete(baseUrl + 'recipes/' + recipeId);
                // Update the recipes state after deletion
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
                alert("Recipe deleted successfully!");
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert("Error deleting recipe");
            }
        }
    };

    const [recipes, setRecipes] = useState([]); // an array for storing recipes
    useEffect(() => {
        if (userId) {
            console.log(" view recipe useeffect userid:" + userId);
            // Make a request to fetch user profile details
            axios.get(baseUrl + userId + '/recipes')
                .then(response => {
                    setRecipes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [userId]);
    return (
        <div className="view-recipes">
            <Header />
            <h5 style={{ backgroundColor: "#009999", fontSize: "22px", text: "bold", color: "white", paddingTop: "10px" }}><div className='ml-4'>My Recipes</div><hr /></h5>
            <div className="mt-3 recipes-list">
                <div className="mt-3 recipe-cards">
                    {recipes.map(recipe => (
                        <div className="recipe-card" key={recipe.id}>
                            <div className="recipe-card-navbar">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <div className='float-right' style={{ fontSize: "24px", display: "flex", alignItems: "center" }}>
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip("Edit")}>
                                        <div style={{ marginRight: "20px" }}>
                                            <GrEdit onClick={() => navigateEditTo(recipe.id)} />
                                        </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip("Delete")}>
                                        <div>
                                            <MdDelete onClick={() => handleDeleteRecipe(recipe.id)} />
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} width="350" height= "300" alt='' /> : ''}{' '}
                            <p className='mt-3'><b>Ingredients</b></p>
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
                                <><p><b>Additional Notes</b></p><ul style={{ textAlign: "justify", listStyleType: "disc", marginLeft: "20px", paddingLeft: "20px" }}>
                                    {recipe.additionalNotes && recipe.additionalNotes.trim().split('.').filter(step => step.length > 0).map((step, index) => (
                                        <li key={index}>{step.trim()}{step.trim() && '.'}</li>
                                    ))}
                                </ul></>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default ViewRecipes;