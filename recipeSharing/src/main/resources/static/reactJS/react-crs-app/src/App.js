import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from './js/Landing'
import UserLogin from './js/Login.js'
import UserRegister from './js/Register.js'
import HomePage from './js/Home.js'
import UserProfile from './js/UserProfile.js'
import EditProfile from './js/EditProfile.js'
import AddRecipe from './js/AddRecipe.js'
import Notify from './js/Notification.js'
import ForgotPassword from './js/ForgotPassword.js'
import ViewRecipes from './js/ViewRecipe';
import EditRecipe from './js/EditRecipe';
import VerifyOtpPwd from './js/VerifyOTP';
import RecipeDetails from './js/RecipeDetails';
import StarRating from './js/StarRating';
import Comments from './js/Comments';

const App = () => {
    return (
        <Router >
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/login" element={<UserLogin />}></Route>
                    <Route path="/register" element={<UserRegister />}></Route>
                    <Route path="/home" element={<HomePage />}></Route>
                    <Route path="/viewProfile" element={<UserProfile />}></Route>
                    <Route path="/editProfile" element={<EditProfile />}></Route>

                    <Route path="/addRecipe" element={<AddRecipe />}></Route>
                    <Route path="/viewRecipe" element={<ViewRecipes />}></Route>
                    <Route path="/editRecipe/:recipeId" element={<EditRecipe />}></Route>
                    <Route path="/recipeDetails/:recipeId" element={<RecipeDetails />}></Route>

                    <Route path="/starRating" element={<StarRating />}></Route>
                    <Route path="/comments" element={<Comments />}></Route>

                    <Route path="/notification" element={<Notify />}></Route>

                    <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
                    <Route path="/verifyOtpPwd/:phoneNumber" element={<VerifyOtpPwd />}></Route>
                    
                </Routes>
        </Router>
    )
}
export default App;
