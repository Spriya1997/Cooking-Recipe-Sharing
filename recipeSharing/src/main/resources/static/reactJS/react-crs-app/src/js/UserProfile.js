import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext.js';
import Header from './Header.js';
import image from '../images/avatar.png';
import { MdDelete } from 'react-icons/md';
import { Label, Col, FormGroup, Input } from 'reactstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '../css/UserProfile.css';

function UserProfile() {
  var userId = useUser();
  console.log(userId);
  const [userProfile, setUserProfile] = useState({
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    bio: '',
    phoneNumber: ''
  });
  const baseUrl = 'http://localhost:8080/api/users/'
  const renderTooltip = (text) => (
    <Tooltip>
      {text}
    </Tooltip>
  );

  useEffect(() => {
    if (userId) {
      console.log("userid:" + userId);
      // Make a request to fetch user profile details
      axios.get(baseUrl + userId)
        .then(response => {
          setUserProfile(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [userId]);

  const handleDeleteRecipe = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");

    if (confirmDelete) {
      try {
        await axios.delete(baseUrl + userId);
        // alert("Recipe deleted successfully!");
      } catch (error) {
        console.error('Error deleting user account:', error);
        alert("Error deleting user account");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="user-profile-container">
        <div className="user-profile-heading">
          Personal Info
          <OverlayTrigger placement="bottom" overlay={renderTooltip("Delete Account")}>
            <MdDelete className="ml-3 float-right" style={{ left: 0, color: "red", fontSize: "30px" }} onClick={() => handleDeleteRecipe()} />
          </OverlayTrigger>

        </div>
        <img src={image} width="70" height="70" alt="" className='avatarProfile' />
        <div className="user-details">
          <FormGroup row>
            <Label sm={6}>Welcome, &nbsp;&nbsp;
              <b style={{color:"teal"}}>{userProfile.firstname} &nbsp; {userProfile.lastname}</b></Label>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}> <b>First Name </b></Label>
            <Col sm={4} style={{color:"black"}}>
              <Input type="text" disabled={true} defaultValue={userProfile.firstname} placeholder="add your details in edit profile page" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}> <b>Last Name </b></Label>
            <Col sm={4} style={{color:"black"}}>
              <Input type="text" disabled={true} defaultValue={userProfile.lastname} placeholder="add your details in edit profile page" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} style={{color:"black"}}> <b>Country </b></Label>
            <Col sm={4}>
              <Input type="text" disabled={true} defaultValue={userProfile.country} placeholder="add your details in edit profile page" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}> <b>City </b></Label>
            <Col sm={4} style={{color:"black"}}>
            <Input type="text" disabled={true} defaultValue={userProfile.city} placeholder="add your details in edit profile page" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}> <b>Bio </b></Label>
            <Col sm={4} style={{color:"black"}}>
              <Input type="textarea" disabled={true} defaultValue={userProfile.bio} placeholder="add your details in edit profile page" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}> <b>Phone Number  </b></Label>
            <Col sm={4} style={{color:"black"}}>
            <Input type="text" disabled={true} defaultValue={userProfile.phoneNumber} />
            </Col>
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default UserProfile;