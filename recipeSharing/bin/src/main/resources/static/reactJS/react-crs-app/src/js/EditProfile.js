import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext.js';
import axios from 'axios';
import { Form, Input, Label, FormGroup, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from './Header.js';

function EditProfile() {

  var userId = useUser();
  const navigate = useNavigate();
  const navigateCloseTo = () => navigate('/home');
  const [editProfile, setEditProfile] = useState({
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    phoneNumber: '14253657777',
    bio: ''
  });
  const baseUrl = 'http://localhost:8080/api/users/'

  console.log('edit');
  // getting profile by userId
  useEffect(() => {
    if (userId) {
      //console.log("get profile userid:" + userId);
      // Make a request to fetch user profile details
      axios.get(baseUrl + 'userProfile/' + userId)
        .then(response => {
          setEditProfile(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile', error);
        });
    }
  }, [userId]);

  // updating profile by userId
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("update profile userid:" + userId);
    if (userId) {
      console.log("userId present in editProfile :" + userId);
      // Update profile
      try {
        const response = await axios.put(baseUrl + userId, editProfile, { withCredentials: true });
        if (response.status === 200) {
          console.log("successfully updated profile");
          navigate('/home');
        }
      } catch (error) {
        console.error('Error in updating profile: ', error);
      }
    }
  }
  return (
    <div>
      <div>
        <Header />
      </div>
      <Form onSubmit={handleSubmit}>
        <br></br><h4 className="form-title">Edit profile</h4><br></br>
        <FormGroup row>
          <Label sm={2}>First Name</Label>
          <Col sm={4}>
            < Input type="text" value ={editProfile.firstname} onChange={(e) => setEditProfile({...editProfile, firstname : e.target.value })} placeholder="first name" required />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Last Name</Label>
          <Col sm={4}>
            <Input type="text" value ={editProfile.lastname} defaultValue={editProfile.lastname} onChange={(e) => setEditProfile({...editProfile, lastname :e.target.value })} placeholder="last name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>City</Label>
          <Col sm={4}>
            <Input type="text" value ={editProfile.city}  defaultValue={editProfile.city} onChange={(e) => setEditProfile({...editProfile, city :e.target.value })} placeholder="city" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Country</Label>
          <Col sm={4}>
            <Input type="text" value ={editProfile.country} defaultValue={editProfile.country} onChange={(e) => setEditProfile({...editProfile, country :e.target.value })} placeholder="country" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Bio</Label>
          <Col sm={4}>
            <Input type="textarea" value ={editProfile.bio} defaultValue={editProfile.bio} onChange={(e) => setEditProfile({...editProfile, bio :e.target.value })} placeholder="Tell little bit about yourself(interest, experience,..) " />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={{ offset: 3 }}>
            <Button color="success">save</Button>{' '}
            <Button color="danger" onClick={navigateCloseTo}> close</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EditProfile;