import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Form, Input, Label, FormGroup, FormText, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext.js';
import axios from 'axios';
import '../App.css';
import Header from './Header.js';

function AddRecipe() {
    var userId = useUser();
    const [name, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstruction] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const [cuisines, setCuisines] = useState('');
    const [mealType, setMealType] = useState(' ');
    const [cookingTime, setCookingTime] = useState(' ');
    const [servingSize, setServingSize] = useState(' ');
    const [dietaryPreferences, setDietaryPreferences] = useState(' ');
    const [additionalNotes, setAdditionalNotes] = useState(' ');
    const [visibility, setVisibility] = useState(' ');
    const [imageBase64String, setImageBase64String] = useState(' ');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:8080/api/users/'

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("control is tranferred here");
        //console.log("user id handlesubmit is:" + userId);
        if (userId) {
            //console.log("if userId present userid:" + userId);
            // Post recipe
            try {
                const response = await axios.post(baseUrl + userId + '/recipes', { name, ingredients, instructions, servingSize, cookingTime, difficultyLevel, cuisines, dietaryPreferences, mealType, additionalNotes, visibility, imageBase64String }, { withCredentials: true });
                if (response.status === 200) {
                    console.log("successfully created recipe");
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error in creating recipe: ', error);
                setShowAlert(true);
            }
        }
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log("set debugger");
        if (imageFile) {
            // Read the selected file as a Blob
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            // Handle the Blob's data once it's loaded
            reader.onload = () => {
                // Set the image data in state
                var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
                setImageBase64String(base64);
            };
        }
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <Form onSubmit={handleSubmit}>
                <br></br><h4 className="form-title">Add Recipe</h4>
                <p className="form-caption">Post your favorite recipes and get likes</p><br></br>
                <FormGroup row>
                    <Label sm={2}> <b>Title </b></Label>
                    <Col sm={4}>
                        <Input type="text" placeholder="give your recipe a name" onChange={(e) => setRecipeName(e.target.value)} required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Add ingredients </b></Label>
                    <Col sm={5}>
                        <Input type="textarea" placeholder="mention the required ingredients" onChange={(e) => setIngredients(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} ><b> Instruction </b> </Label>
                    <Col sm={5}>
                        <Input type="textarea" placeholder="give a detailed description about your recipe" onChange={(e) => setInstruction(e.target.value)} required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Servings </b></Label>
                    <Col sm={4}>
                        <Input type="number" placeholder="enter the serving portions" onChange={(e) => setServingSize(e.target.value)} />
                        {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Please mention the serving size.</div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label sm={2}><b>DifficultyLevel</b></Label>
                    <Col sm={8}>
                    <div onChange={this.onChangeValue}>
                        <input type="radio" value="Male" name="gender" /> Male
                        <input type="radio" value="Female" name="gender" /> Female
                        <input type="radio" value="Other" name="gender" /> Other
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>DifficultyLevel</b></Label>
                    <Col sm={4}>
                        <Input type="select" onChange={(e) => setDifficultyLevel(e.target.value)}>
                            <option>Select</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Difficult</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Cooking time (mins)</b></Label>
                    <Col sm={4}>
                        <Input type="number" onChange={(e) => setCookingTime(e.target.value)} />
                    </Col>
                    {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Cooking time is empty.</div>}
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>Dietary Preferences</b></Label>
                    <Col sm={4}>
                        <Input type="select" onChange={(e) => setDietaryPreferences(e.target.value)}>
                            <option>Select</option>
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
                        <Input type="select" name="select" onChange={(e) => setCuisines(e.target.value)}>
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
                        <Input type="select" onChange={(e) => setMealType(e.target.value)}>
                            <option value="Appetizer">Appetizer</option>
                            <option>Appetizer</option>
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
                        <Input type="select" onChange={(e) => setVisibility(e.target.value)} required>
                            <option>Select</option>
                            <option>Public</option>
                            <option>Private</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}> <b>Additional Notes </b></Label>
                    <Col sm={5}>
                        <Input type="textarea" placeholder="tips, suggestions,.." onChange={(e) => setAdditionalNotes(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}><b>File</b></Label>
                    <Col sm={3}>
                        <Input type="file" name="file" accept="image/*" onChange={handleImageChange} />
                        <FormText color="muted">
                            Add recipe image
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={{ size: 5, offset: 3 }}>
                        <Button color="success">Add</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}
export default AddRecipe;
