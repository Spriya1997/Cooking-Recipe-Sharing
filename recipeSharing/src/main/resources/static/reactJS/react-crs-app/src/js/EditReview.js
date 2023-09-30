import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import { useParams } from 'react-router-dom';
import { FormGroup, Form, Label, Col, Button } from 'reactstrap';
import StarChooser from './StarChooser.js';
import Commender from './Commender.js';
import '../css/StarChooser.css';
import '../css/Register.css';

function EditReview(props) {

  var userId = useUser();
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState({
    ratings :0,
    comments : ''
  });

  function setStar(value) {
    setReviews({...reviews, ratings: value});
  }

  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const baseUrl = 'http://localhost:8080/api/users/'

  const toggleEditReview = () => {
    props.toggleEditReview();
  }
  useEffect(() => {
    if (recipeId) {
        // Make a request to fetch user recipe review details
        axios.get(baseUrl + userId + '/recipes/' + recipeId + '/getActivities')
            .then(response => {
                setReviews(response.data);
                console.log("reviews for edit : "+ response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews :', error);
            });
    }
}, [recipeId]);
console.log("ratings " + reviews.ratings + "comments : "+ reviews.comments);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("control is tranferred in editReview");
    console.log("ratings in edit " + reviews.ratings + "comments : "+ reviews.comments);
    if (userId && recipeId) {
      try {
        const response = await axios.post(baseUrl + userId + '/recipes/' + recipeId + '/setReviews', reviews, { withCredentials: true });

        if (response.status === 200) {
          console.log("successfully updated reviews");
          toggleEditReview();
          //setShowSuccessMessage('reviews updated successfully');
          //setTimeout(() => { setShowMessage('Comments added successfully'); }, 3000);
        }
      }
      catch (error) {
        console.error('Error in adding reviews: ', error);
        setTimeout(() => { setShowFailureMessage('Error in submitting the reviews'); }, 5000);
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="sign-form">
        <FormGroup row>
          <Label sm={5}> <b>Rating</b></Label>
          </FormGroup>
          <FormGroup row>
            <div className="container">
              <StarChooser value={reviews.ratings} stars={reviews.ratings} _onSubmit={setStar} />
              <Commender rate={reviews.ratings} />
            </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}> <b>Comments</b></Label>
          </FormGroup>
          <FormGroup row>
            <textarea className = "ml-5" rows={4} cols={15} value={reviews.comments} onChange={(e) => setReviews({...reviews, comments: e.target.value})} placeholder="What did you like or dislike?" />
        </FormGroup>
        <footer>
          <FormGroup>
            <Col sm={{ size: 5, offset: 3 }}>
              <Button color="secondary" style={{ display: 'block', width: 90, height: 40, padding: 10 }} className="btn btn-secondary float-right">Submit</Button><br></br>
             {/* {showSuccessMessage && <div style={{ color: 'green', fontSize: 13 }}>Reviews updated successfully </div>} */}
              {showFailureMessage && <div style={{ color: 'red', fontSize: 13 }}>Error in updating reviews </div>}
            </Col>
          </FormGroup>
        </footer>
      </Form>
    </>
  );
};


export default EditReview;
