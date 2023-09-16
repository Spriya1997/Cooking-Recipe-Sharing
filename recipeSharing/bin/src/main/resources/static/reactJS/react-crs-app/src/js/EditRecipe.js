import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Label, FormGroup, FormText, Col, Button } from 'reactstrap';
import '../App.css';
import Header from './Header.js';

function EditRecipe() {

    var userId = useUser();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const navigateCloseTo = () => navigate('/home');
    const [showAlert, setShowAlert] = useState(false);
    const [updateRecipe, setUpdatedRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        servingSize: '',
        cookingTime: '',
        difficultyLevel: 'Easy',
        cuisines: '',
        dietaryPreferences: '',
        visibility: '',
        mealType: '',
        additionalNotes: ''

    });
    const baseUrl = 'http://localhost:8080/api/users/'
    // getting user recipe by recipeId
    useEffect(() => {
        if (recipeId) {
            // Make a request to fetch user profile details
            axios.get(baseUrl + 'recipes/' + recipeId)
                .then(response => {
                    setUpdatedRecipe(response.data);
                })
                .catch(error => {
                    console.error('Error fetching recipe :', error);
                });
        }
    }, [recipeId]);
    // update recipe 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userId && recipeId) {
            console.log("userId present in update recipe :" + userId);
            try {
                const response = await axios.put(baseUrl + userId + '/recipes/' + recipeId, updateRecipe, { withCredentials: true });
                if (response.status === 200) {
                    console.log("successfully updated recipe");
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error in updating recipe: ', error);
                setShowAlert(true);
            }
        }
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <Form onSubmit={handleSubmit}>
                <br></br><h4 className="form-title">Edit Recipe</h4>
                <FormGroup row>
                    <Label sm={2}> <b>Title </b></Label>
                    <Col sm={4}>
                        <Input type="text" defaultValue={updateRecipe.name} placeholder="give your recipe a name" onChange={(e) => setUpdatedRecipe({ ...updateRecipe, name: e.target.value })} required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Add ingredients </b></Label>
                    <Col sm={5}>
                        <Input type="textarea" defaultValue={updateRecipe.ingredients} placeholder="mention the required ingredients" onChange={(e) => setUpdatedRecipe({ ...updateRecipe, ingredients: e.target.value })} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} ><b> Instruction </b> </Label>
                    <Col sm={5}>
                        <Input type="textarea" defaultValue={updateRecipe.instructions} placeholder="give a detailed description about your recipe" onChange={(e) => setUpdatedRecipe({ ...updateRecipe, instructions: e.target.value })} required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Servings </b></Label>
                    <Col sm={4}>
                        <Input type="number" defaultValue={updateRecipe.servingSize} placeholder="enter the serving portions" onChange={(e) => setUpdatedRecipe({ ...updateRecipe, servingSize: e.target.value })} />
                        {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Please mention the serving size.</div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>DifficultyLevel</b></Label>
                    <Col sm={4}>
                        <Input type="select" defaultValue={updateRecipe.difficultyLevel} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, difficultyLevel: e.target.value })}  >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Difficult</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Cooking time (mins)</b></Label>
                    <Col sm={4}>
                        <Input type="number" defaultValue={updateRecipe.cookingTime} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, cookingTime: e.target.value })} />
                    </Col>
                    {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Cooking time is empty.</div>}
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Dietary Preferences</b></Label>
                    <Col sm={4}>
                        <Input type="select" defaultValue={updateRecipe.dietaryPreferences} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, dietaryPreferences: e.target.value })} >
                            <option disabled>Select</option>
                            <option>Dairy-Free</option>
                            <option>Gluten-Free</option>
                            <option>Keto</option>
                            <option>Low-Carb</option>
                            <option>Nut-Free</option>
                            <option>Paleo</option>
                            <option>Pescatarian</option>
                            <option>Raw Food</option>
                            <option>Vegan</option>
                            <option>Vegetarian</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Cuisines</b></Label>
                    <Col sm={4}>
                        <Input type="select" name="select" defaultValue={updateRecipe.cuisines} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, cuisines: e.target.value })} >
                            <option>Select</option>
                            <option>American</option>
                            <option>Brazilian</option>
                            <option>Caribbean</option>
                            <option>Chinese</option>
                            <option>French</option>
                            <option>Greek</option>
                            <option>Indian</option>
                            <option>Italian</option>
                            <option>Japanese</option>
                            <option>Korean</option>
                            <option>Mexican</option>
                            <option>Middle Eastern</option>
                            <option>Spanish</option>
                            <option>Thai</option>
                            <option>Vietnamese</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Meal Type</b></Label>
                    <Col sm={4}>
                        <Input type="select" defaultValue={updateRecipe.mealType} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, mealType: e.target.value })} >
                            <option>Select</option>
                            <option selected>Appetizer</option>
                            <option>Breakfast</option>
                            <option>Brunch</option>
                            <option>Dessert</option>
                            <option>Dinner</option>
                            <option>Lunch</option>
                            <option>Main Course</option>
                            <option>Pizza</option>
                            <option>Salad</option>
                            <option>Sandwich</option>
                            <option>Side Dish</option>
                            <option>Smoothie</option>
                            <option>Snack</option>
                            <option>Soup</option>
                        </Input>
                    </Col>
                </FormGroup> <FormGroup row>
                    <Label sm={2}><b>Visibility</b></Label>
                    <Col sm={4}>
                        <Input type="select" defaultValue={updateRecipe.visibility} onChange={(e) => setUpdatedRecipe({ ...updateRecipe, visibility: e.target.value })} required>
                            <option>Select</option>
                            <option>Public</option>
                            <option>Private</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Additional Notes </b></Label>
                    <Col sm={5}>
                        <Input type="textarea" defaultValue={updateRecipe.additionalNotes} placeholder="tips, suggestions,.." onChange={(e) => setUpdatedRecipe({ ...updateRecipe, additionalNotes: e.target.value })} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>File</b></Label>
                    <Col sm={3}>
                        <Input type="file" name="file" accept="image/*" /> {/* onChange={(e) => setRecipeImage(e.target.value)} */}
                        <FormText color="muted">
                            Add recipe image
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={{ size: 5, offset: 3 }}>
                        <Button color="success">Update</Button>{' '}
                        <Button color="danger" onClick={navigateCloseTo}> close </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}

export default EditRecipe;
