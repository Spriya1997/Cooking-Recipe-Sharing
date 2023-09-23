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
            <br></br>
            <div className="recipes-list">
                <h4>Favorite Recipes</h4><br></br>
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
                            <p><b> Ingredients  </b>{recipe.ingredients}</p>
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


export default UserFavRecipes;
