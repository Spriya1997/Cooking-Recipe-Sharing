import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import { useParams } from 'react-router-dom';
import { FormGroup, Form, Label, Col, Button } from 'reactstrap';
import StarChooser from './StarChooser.js';
import Commender from './Commender.js';
import '../css/StarChooser.css';
import '../css/Register.css';


function AddReview(props) {

  var userId = useUser();
  const { recipeId } = useParams();
  const [ratings, setStar] = useState(0);
  const [comments, setComments] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const baseUrl = 'http://localhost:8080/api/users/'

  const toggleAddReview = () => {
    props.toggleAddReview();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("control is tranferred in addReview");
    console.log("user id handlesubmit is:" + baseUrl + userId + '/recipes/' + recipeId + '/setReviews');

    if (ratings === 0 || ratings === null) {
      console.log(ratings);
      setShowAlert(true);
      return;
    }

    if (userId && recipeId) {
      setShowAlert(false);
      try {
        const response = await axios.post(baseUrl + userId + '/recipes/' + recipeId + '/setReviews', { ratings, comments }, { withCredentials: true });

        if (response.status === 200) {
          console.log("successfully added reviews");
          console.log("ratings " + ratings + " comments : " + comments);
          toggleAddReview();
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
          <Label sm={3} className='mr-2'> <b>Ratings</b></Label>
        </FormGroup>
        <FormGroup>
          <div>
            <StarChooser stars={ratings} _onSubmit={setStar} />
            <Commender rate={ratings} />
          </div>
          {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Rating is required </div>}
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className='mr-2'> <b>Comments</b></Label>
        </FormGroup>
        <FormGroup>
          <textarea className = "ml-5" rows={4} cols={30} onChange={(e) => setComments(e.target.value)} placeholder="What did you like or dislike?" />
        </FormGroup>
        <footer>
          <FormGroup>
            <Col sm={{ size: 5, offset: 3 }}>
              <Button color="secondary" style={{ display: 'block', width: 90, height: 40, padding: 10 }} className="btn btn-secondary float-right">Submit</Button><br></br>
              {/* {showSuccessMessage && <div style={{ color: 'green', fontSize: 13 }}>Reviews added successfully </div>} */}
              {showFailureMessage && <div style={{ color: 'red', fontSize: 13 }}>Error in adding reviews </div>}
            </Col>
          </FormGroup>
        </footer>
      </Form>
    </>
  );
};


export default AddReview;
