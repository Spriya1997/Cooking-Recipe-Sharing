import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import { useUser } from '../UserContext.js';
import Header from './Header.js';
import image from '../images/avatar.png';

function UserProfile() {
  var userId = useUser();
  console.log(userId);
  const [userProfile, setUserProfile] = useState({
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    bio: ''
  });
  const baseUrl = 'http://localhost:8080/api/users'
  useEffect(() => {
    if (userId) {
      console.log("userid:" + userId);
      // Make a request to fetch user profile details
      axios.get(baseUrl + '/userProfile/' + userId)
        .then(response => {
          setUserProfile(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [userId]);
  return (
    <div style={{ fontFamily: "Verdana, sans-serif" }}>
      <div>
        <Header />
      </div>
      {' '}<br></br>
      <img src={image} width="100" height="100" alt="" className='avatarProfile' />{' '}<br></br><br></br>
      <div>
        <h4>Welcome, {userProfile.firstname}</h4><br></br>
        <p>First Name : {userProfile.firstname}</p>
        <p>Last Name : {userProfile.lastname}</p>
        <p>City : {userProfile.city}</p>
        <p>Country : {userProfile.country}</p>
        <p>Bio : {userProfile.bio}</p>
        {' '}
        <Button color="danger"> Delete Profile</Button>
      </div>
    </div>
  );
};

export default UserProfile;