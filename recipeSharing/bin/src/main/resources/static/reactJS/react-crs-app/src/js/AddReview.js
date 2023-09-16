import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useUser } from '../UserContext.js';
import { useParams } from 'react-router-dom';

function AddReview(props) {

  var userId = useUser();
  const { recipeId } = useParams();
  const [ratings, setRatings] = useState('');
  const [comments, setComments] = useState('');
  const baseUrl = 'http://localhost:8080/api/users/'

  const toggleAddReview = () => {
    props.setModalAddReview(false);
  }
  const handleRatingChange = (newRating) => {
    setRatings(newRating);
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("control is tranferred here");
    //console.log("user id handlesubmit is:" + userId);
    if (userId) {
        //console.log("if userId present userid:" + userId);
        // Post recipe /{userId}/recipes/{recipeId}/addReviews
        try {
            const response = await axios.post(baseUrl + userId + '/recipes/' + recipeId + '/addReviews', { ratings, comments}, { withCredentials: true });
            if (response.status === 200) {
                console.log("successfully added reviews");
                toggleAddReview();
                //navigate('/recipeDetails');
            }
        } catch (error) {
            console.error('Error in adding reviews: ', error);
        }
    }
};

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Ratings</Form.Label>
          <div className="ratings">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= ratings ? "star filled" : "star"}
                onClick={() => handleRatingChange(star)}
              ></span>
            ))}
          </div>
          <div className="ratings-description">
            {ratings === 1 && "Bad Experience"}
            {ratings === 2 && "Bad"}
            {ratings === 3 && "OK"}
            {ratings === 4 && "Good"}
            {ratings === 5 && "Excellent"}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comments}
            onChange={handleCommentChange}
          />
        </Form.Group>
      </Form>
      <br></br>
      <Button type="primary" className="btn float-right" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};


export default AddReview;
