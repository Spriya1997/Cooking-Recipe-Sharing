import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { Col } from 'reactstrap';
import '../App.css';
import StarRating from './StarRating.js';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
//import '../css/Home.css';

function Comments() {
    return (
        <>
            <div>
                <Header />
            </div>
            
        </>
    )
}

export default Comments;

{/* <h1>Recipes</h1><hr /><h2>Explore new recipes</h2><p>Save your favorite recipes.</p>
            <div className="row">
                <div className="column">
                    <div className="content">
                        {recipes.map(recipe => (
                            <div key={recipe.id}>
                                <div onClick={() => navigateToRecipeDetails(recipe.id)}>
                                    {recipe.image ? <img src={`data:image/png;base64,${recipe.image}`} width="100%"  alt='' /> : ''}
                                </div>                        <h3>{recipe.name}</h3>
                                <p><div>
                                    <Col sm={3} className="d-flex align-items-center">
                                        {isHeartClick ? (
                                            <BsHeartFill
                                                style={{ color: "#ca166d", cursor: "pointer" }}
                                                onClick={toggleHeart} />
                                        ) : (
                                            <BsHeart
                                                style={{ color: "#ca166d", cursor: "pointer" }}
                                                onClick={toggleHeart} />
                                        )}
                                        <div className="mr-2"></div>
                                        <StarRating className="mr-5" />
                                        <Comments className="ml-2" style={{ color: "#ca166d" }} />
                                         <span className="comment-icon ml-2">💬</span>  
                                        <span className="ml-1">Comments</span>
                                    </Col>
                                </div></p>
                            </div>

                        ))}
                    </div>
                </div>
            </div> */}