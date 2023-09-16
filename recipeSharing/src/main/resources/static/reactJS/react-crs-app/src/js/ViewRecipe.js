import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {GrEdit} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import '../css/Viewrecipe.css';

function ViewRecipes() {
    var userId = useUser();
    const navigate = useNavigate();
    const navigateEditTo = (recipeId) => navigate('/editRecipe/' + recipeId);
    const baseUrl = 'http://localhost:8080/api/users/'

    const handleDeleteRecipe = async (recipeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    
        if (confirmDelete) {
            try {
                await axios.delete(baseUrl + userId + '/recipes/' + recipeId);
                // Update the recipes state after deletion
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
                alert("Recipe deleted successfully!");
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert("Error deleting recipe");
            }
        }
    };
    
    console.log("view recipe " + userId);
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
            <br></br>
            <div className="recipes-list">
                <h4>Your Recipes</h4><br></br>
                <div className="recipe-cards">
                    {recipes.map(recipe => (
                        <div className="recipe-card" key={recipe.id}>
                            <div className="recipe-card-navbar">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <div className='float-right' style={{fontSize : "26px"}}>
                                <GrEdit onClick={() => navigateEditTo(recipe.id)}Edit />
                                <MdDelete className="ml-3" onClick={() => handleDeleteRecipe(recipe.id)} />
                                </div>
                                {/* <div className="dropdown">
                                    <button className="dropbtn">...</button>
                                    <div className="dropdown-content">
                                        <button onClick={() => navigateEditTo(recipe.id)}>Edit</button>
                                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                                    </div>
                                </div> */}
                            </div>
                            {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} width="200" height="200" alt = ''/>: ''}{' '}
                            <p><b>Ingredients  </b>{recipe.ingredients}</p>
                            <p><b> Direction  </b>{recipe.instructions}</p>
                            <p><b> Servings  </b>{recipe.servingSize}</p>
                            <p><b> CookingTime  </b>{recipe.cookingTime}</p>
                            <p><b> DifficultyLevel  </b>{recipe.difficultyLevel}</p>
                            <p><b> Cuisines </b>{recipe.cuisines}</p>
                            <p><b> DietaryPreferences </b>{recipe.dietaryPreferences}</p>
                            <p><b> MealType  </b>{recipe.mealType}</p>
                            <p><b> AdditionalNotes  </b>{recipe.additionalNotes}</p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ViewRecipes;