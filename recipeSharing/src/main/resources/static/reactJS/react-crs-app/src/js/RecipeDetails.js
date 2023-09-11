import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useUser } from '../UserContext.js';
import { useParams } from 'react-router-dom';
//import { Form, Input, Label, FormGroup, FormText, Col, Button } from 'reactstrap';
import '../App.css';
import Header from './Header.js';

function RecipeDetails() {

    const { recipeId } = useParams();
    const [recipe, setRecipes] = useState({
        name: '',
        image: '',
        ingredients: '',
        instructions: '',
        servingSize: '',
        cookingTime: '',
        difficultyLevel: '',
        cuisines: '',
        dietaryPreferences: '',
        visibility: '',
        mealType: '',
        additionalNotes: ''

    });
    const baseUrl = 'http://localhost:8080/api/users/' 

    useEffect(() => {
        if (recipeId){
            // Fetch recipe details based on the 'id' 
            axios.get(baseUrl + 'recipes/' + recipeId)
                .then(response => {
                    setRecipes(response.data);
                })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
        }
    }, [recipeId]);

    return(
        <><div>
            <Header />
        </div> 
            <div>
                <h3> {recipe.name}</h3>{' '}<br></br>
                {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} width="250" height="250" alt='' /> : ''}{' '}
                <br></br>
                <br></br>
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
        </>
    )
}

export default RecipeDetails;
