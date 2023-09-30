import React, { useState, useEffect } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useUser } from '../UserContext.js';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Header from './Header.js';
import '../css/Viewrecipe.css';


function UserFavRecipes() {

    var userId = useUser();
    const baseUrl = 'http://localhost:8080/api/users/';
    const [recipes, setFavoriteRecipes] = useState([]); // an array for storing favorite recipes
    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    useEffect(() => {
        if (userId) {
            console.log("view recipe useeffect userid:" + userId);
            // Make a request to fetch user favorite recipes
            axios.get(baseUrl + userId + '/userFavoriteRecipes')
                .then(response => {
                    setFavoriteRecipes(response.data);
                    console.log("Recipe details from backend : " + response.data);
                })
                .catch(error => {
                    console.error('Error fetching users favorite recipes:', error);
                });
        }
    }, [userId]);

    const removeFavoriteRecipe = async (recipeId) => {
        const confirmRemove = window.confirm("Are you sure you want to remove this recipe from favorites?");

        if (confirmRemove) {
            if (userId) {
                try {
                    const response = await axios.post(baseUrl + userId + '/recipes/' + recipeId + '/setFavorite/' + false, { withCredentials: true });
                    if (response.status === 200) {
                        console.log("successfully removed recipe from favorite");
                        setFavoriteRecipes(recipes.filter(r=>r.id !== recipeId));
                    }
                }
                catch (error) {
                    console.error('Error in updating favorite: ', error);
                }
            }
        }
    };

    return (
        <div className="view-recipes">
            <Header />
            <h5 className ="mb-2" style={{ backgroundColor: "#009999",fontSize : "22px", text: "bold", color:"white",paddingTop:"10px"}}>
                <div className='ml-2'>My favorite recipes</div>
            <hr /></h5>
            <div className="recipes-list">
                <div className="recipe-cards">
                    {recipes.map(recipe => (
                        <div className="recipe-card" key={recipe.id}>
                            <div className="recipe-card-navbar">
                                <h3 className="recipe-title">{recipe.name}</h3>
                                <div className='float-right' style={{ fontSize: "26px" }}>
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip("Remove from favorites")}>
                                        <div><BsFillHeartFill style={{ color: "#ca166d" }} onClick={() => removeFavoriteRecipe(recipe.id)} /></div>
                                    </OverlayTrigger>                                   
                                </div>
                            </div>
                            {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} width="200" height="200" alt='' /> : ''}{' '}
                            <p><b>Ingredients</b></p>
                            <ul style={{ textAlign: "justify", listStyleType: "disc", marginLeft: "20px", paddingLeft: "20px" }}>
                                {recipe.ingredients && recipe.ingredients.trim().split('.').filter(ingredient => ingredient.length > 0).map((ingredient, index) => (
                                    <li key={index}>{ingredient.trim()}{'.'}</li>
                                ))}
                            </ul>
                            <hr className='mb-1' />
                            <p><b>Direction</b></p>
                            <ul style={{ textAlign: "justify", listStyleType: "disc", marginLeft: "20px", paddingLeft: "20px" }}>
                                {recipe.instructions && recipe.instructions.trim().split('.').filter(instruction => instruction.length > 0).map((step, index) => (
                                    <li key={index}>{step.trim()}{step.trim() && '.'}</li>
                                ))}
                            </ul>
                            <hr className='mb-1' />
                            <p><b>Serving Size </b> &nbsp; {recipe.servingSize}</p>
                            <hr />
                            <p><b>Cooking Time </b> &nbsp; {recipe.cookingTime} minutes</p>
                            <hr className='mb-1' />
                            <p><b>Difficulty level of cooking </b> &nbsp; {recipe.difficultyLevel}</p>
                            <hr className='mb-1' />
                            <p><b>Cuisines</b> &nbsp; {recipe.cuisines}</p>
                            <hr />
                            <p><b>Dietary Preferences</b> &nbsp; {recipe.dietaryPreferences}</p>
                            <hr />
                            <p><b>Meal Type</b> &nbsp; {recipe.mealType}</p>
                            <hr />
                            {recipe.additionalNotes &&
                                <><p><b>Additional Notes:</b></p><ul style={{ textAlign: "justify", listStyleType: "disc", marginLeft: "20px", paddingLeft: "20px" }}>
                                    {recipe.additionalNotes && recipe.additionalNotes.trim().split('.').filter(step => step.length > 0).map((step, index) => (
                                        <li key={index}>{step.trim()}{step.trim() && '.'}</li>
                                    ))}
                                </ul><hr /></>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default UserFavRecipes;
