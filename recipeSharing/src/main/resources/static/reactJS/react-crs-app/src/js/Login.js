import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import '../css/Register.css';
import { UserProvider } from '../UserContext.js';


function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/api/users'

  const toggleSignUp = () => {
    props.setModalLogin(false);
    props.setModalSignUp(true);
  }

  const toggleForgotPwd = () => {
    props.setModalLogin(false);
    props.setModalForgotPwd(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseUrl + '/login', { phoneNumber, password }, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.id);
        UserProvider(response.data.id);
        // Successful login, redirect to home
        navigate('/home');
      }
    } catch (error) {
      setShowAlert(true);
    }
  }

  return (
    <div>
        <Form onSubmit={handleSubmit} className="sign-form" id="sign-form">
          <Label>Phone number<span className="star-required">*</span></Label>
          <Input type="text" value={phoneNumber} placeholder="9999999999" onChange={(e) => setPhoneNumber(e.target.value)} required />

          <Label>Password<span className="star-required">*</span></Label>
          <Input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
          {showAlert && <div className='mt-2' style={{ color: 'red', fontSize: 13 }}>The username and/or password you specified are not correct.</div>}
          <br></br>
          <input className = "mt-2" type="submit" value="Log In" id="submit" />
          <br></br>
          <button style={{ marginLeft: "auto", fontSize: "13px", fontWeight: "bold" }} type="button" className="btn btn-transparent float-left" onClick={toggleForgotPwd}><p style={{ color: "4d4dff" }}>Forgot Password ?</p> </button>
          <button style={{ fontSize: "13px", fontWeight: "bold" }} type="button" className="btn btn-transparent float-right" onClick={toggleSignUp}> <p style={{ color: "4d4dff" }}> SignUp</p></button>
        </Form>
      </div>
      );
}

export default Login;
