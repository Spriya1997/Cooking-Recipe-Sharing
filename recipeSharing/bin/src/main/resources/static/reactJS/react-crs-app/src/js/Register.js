import React, { useState } from 'react';
import { Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import '../css/Register.css';
import '../App.css';


function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  // const [modalLogin, setModalLogin] = useState(false);

  const toggleLogin = () => {
    props.setModalSignUp(false);
    props.setModalLogin(true);
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!><*:;@#$%^&-+=()])(?=\S+$).{8,14}$/;
    return regex.test(password);
  };

  const baseUrl = 'http://localhost:8080/api/users'

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("set breakpoint here");
      const response = await axios.post(baseUrl + '/signUp', { firstName, lastName, phoneNumber, password }, { withCredentials: true });
      if (response.status === 200) {
        toggleLogin()
      }
    } catch (error) {
      //Form Validation
      if (!validatePassword(password) || password !== confirmPassword) {
        setShowAlert(true);
      }
    }
  }

  return (
    <><Form onSubmit={handleSubmit} className="sign-form" id="sign-form">

      <Label>First Name</Label>
      <Input type="text" value={firstName} placeholder="first name" onChange={(e) => setFirstName(e.target.value)} required />

      <Label>Last Name</Label>
      <Input type="text" value={lastName} placeholder="last name" onChange={(e) => setLastName(e.target.value)} />

      <Label>Phone number<span className="star-required">*</span></Label>
      <Input type="text" value={phoneNumber} size="11" placeholder="9999999999" onChange={(e) => setPhoneNumber(e.target.value)} required />

      <Label>Password</Label>
      <Input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
      {showAlert && !validatePassword(password) && <div style={{ color: 'red', fontSize: 13 }}>Password must contain atleast one uppercase, one lowercase, one special character, one digit and be 8-14 characters long.</div>}

      <Label>Confirm Password<span className="star-required">*</span></Label>
      <Input type="password" value={confirmPassword} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}
        required />
      {showAlert && password !== confirmPassword && <div style={{ color: 'red', fontSize: 13 }}>Password and Confirm Password should be same </div>}
      <br></br>

      <input type="submit" value="Sign Up" id="submit" />

      <p className="have-account-line">Already have an Account? <Link to={"#"} onClick={toggleLogin}>Sign in</Link></p>
    </Form>
      {/* <Modal isOpen={modalLogin} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>Log In</ModalHeader>
        <ModalBody>
          <Login />
        </ModalBody>
      </Modal> */}
    </>
  );
}

export default Register;
