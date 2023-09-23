import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext.js';
import axios from 'axios';
import { Form, Input as Input1, Label, FormGroup, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Input from 'react-phone-number-input/input'
import Header from './Header.js';
import '../css/EditProfile.css';

function EditProfile() {

  var userId = useUser();
  const navigate = useNavigate();
  const navigateCloseTo = () => navigate('/home');
  const [otp, setOtp] = useState('');
  const [editProfile, setEditProfile] = useState({
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    phoneNumber: '',
    bio: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [showOTPErrorAlert, setShowOTPErrorAlert] = useState(false);
  const [showOTPAlertforSuccess, setShowOTPAlertforSuccess] = useState(false);
  const [UpdatePhoneNumber, setUpdatePhoneNumber] = useState(false);

  const baseUrl = 'http://localhost:8080/api/users/'

  // getting profile by userId
  useEffect(() => {
    if (userId) {
      // Make a request to fetch user profile details
      axios.get(baseUrl + userId)
        .then(response => {
          setEditProfile(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile', error);
        });
    }
  }, [userId]);

  // update profile by userId
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log("update profile userid:" + userId);
    if (userId) {
      console.log("userId present in editProfile :" + userId + "phone number : " + editProfile.phoneNumber);

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
  // generate OTP
  const sendOTP = async (event) => {
    event.preventDefault();
    console.log("sendOTP url :", baseUrl + editProfile.phoneNumber + '/generateOTP');
    try {
      const response = await axios.post(baseUrl + 'phoneNumbers/' + editProfile.phoneNumber + '/generateOTP', { withCredentials: true });
      if (response.status === 200) {
        setShowOTP(true);
      }
    }
    catch (error) {
      console.error(error);
      console.log("Unable to generate OTP");
    }
  }

  // Validate OTP
  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(baseUrl + editProfile.phoneNumber + '/' + otp + '/' + editProfile.password, { withCredentials: true });
      if (response.status === 200) {
        setShowOTPAlertforSuccess(true);
        setUpdatePhoneNumber(true);
      }
    }
    catch (error) {
      console.error(error);
      setShowOTPErrorAlert(true);
    }
  }
  return (

    <><div>
      <Header />
    </div>
      <div className="container">
        <Form onSubmit={handleSubmit} className="edit-profile-form">
          <h4 className="mt-2 mb-5 form-title">Edit Profile</h4>
          <FormGroup row>
            <Label sm={2} style={{ color: 'teal' }}><b>First Name</b></Label>
            <Col sm={4}>
              <Input1 type="text" style={{ color: "#8d8787" }} value={editProfile.firstname} onChange={(e) => setEditProfile({ ...editProfile, firstname: e.target.value })} placeholder="first name" required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} style={{ color: 'teal' }}><b>Last Name</b></Label>
            <Col sm={4}>
              <Input1 type="text" style={{ color: "#8d8787" }} value={editProfile.lastname} defaultValue={editProfile.lastname} onChange={(e) => setEditProfile({ ...editProfile, lastname: e.target.value })} placeholder="last name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} style={{ color: 'teal' }}><b>City</b></Label>
            <Col sm={4}>
              <Input1 type="text" style={{ color: "#8d8787" }} value={editProfile.city} defaultValue={editProfile.city} onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })} placeholder="city" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} style={{ color: 'teal' }}><b>Country</b></Label>
            <Col sm={4}>
              <Input1 type="text" style={{ color: "#8d8787" }} value={editProfile.country} defaultValue={editProfile.country} onChange={(e) => setEditProfile({ ...editProfile, country: e.target.value })} placeholder="country" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} style={{ color: 'teal' }}><b>Bio</b></Label>
            <Col sm={4}>
              <Input type="textarea" style={{ color: "#8d8787" }} value={editProfile.bio} defaultValue={editProfile.bio} onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })} placeholder="Tell little bit about yourself(interest, experience,..) " />
            </Col>
          </FormGroup>
          {UpdatePhoneNumber === false &&
            <FormGroup row>
              <Label sm={2} style={{ color: 'teal' }}><b>Phone Number</b></Label>
              <Col sm={4} style={{ color: '#8d8787' }}>
                <>+1{editProfile.phoneNumber}</>
              </Col>
              <Col>
              <Button className="custom-button" color="second" onClick={sendOTP}>Update</Button>
              </Col>
            </FormGroup>}
          {UpdatePhoneNumber &&
            <FormGroup row>
              <Label sm={2} style={{ color: 'teal' }}><b>Phone Number</b></Label>
              <Col sm={4}>
                <Input country="US" international withCountryCallingCode
                  value={editProfile.phoneNumber}
                  placeholder="New Phone Number"
                  onChange={(phoneNumber) => {
                    setEditProfile({ ...editProfile, phoneNumber: phoneNumber });
                  }}
                  required />
              </Col>
            </FormGroup>}
          {showOTP &&
            <Form onSubmit={handleOTPSubmit}>
              <FormGroup row>
                <Label sm={2} style={{ color: 'teal' }}>Enter OTP</Label>
                <Col sm={4}>
                  <Input type="number" size="6" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </Col>
                <Col sm={3}>
                  <Button color="secondary"> Verify</Button>
                  {showOTPErrorAlert && <div style={{ color: 'red', fontSize: 13 }}>Invalid One time passcode or Password</div>}
                  {showOTPAlertforSuccess && <div style={{ color: 'green', fontSize: 13 }}>Verified Phone Number</div>}
                </Col>
              </FormGroup>
            </Form>}
          <FormGroup>
            <Col sm={8}>
              <Button color="success" className="custom-button">Save</Button>
              <Button className="ml-3 custom-button" color="danger" onClick={navigateCloseTo}>Close</Button>
            </Col>
          </FormGroup>
        </Form>
      </div></>
  );
};

export default EditProfile;