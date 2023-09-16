import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import { useParams } from 'react-router-dom';
import { FormGroup, Modal, ModalHeader,ModalBody, Col, Button } from 'reactstrap';
import AddReview from './AddReview';
import Header from './Header';
import '../css/StarChooser.css';

function RecipeDetails() {

    var userId = useUser(); 
    const { recipeId } = useParams();
    const baseUrl = 'http://localhost:8080/api/users/'
    const [modalAddReview, setModalAddReview] = useState(false);

    const toggleAddReview = () => {
        setModalAddReview(!modalAddReview);
    }
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
    
    useEffect(() => {
        if (recipeId) {
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

    return (
        <><div>
            <Header />
        </div>
            <div>
                <br></br>
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
            <FormGroup>
                <Col sm={{ size: 3, offset: 1 }}>
                    <Button color="info" onClick={toggleAddReview} >Add Reviews</Button>{' '}
                </Col>
            </FormGroup>
            <Modal isOpen={modalAddReview}>
                <ModalHeader toggle={toggleAddReview}>Add a Review</ModalHeader>
                <ModalBody> 
                    <AddReview setModalAddReview={setModalAddReview} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default RecipeDetails;
