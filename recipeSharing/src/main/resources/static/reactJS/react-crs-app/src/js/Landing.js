import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Register from './Register.js';
import Login from './Login.js';
import ForgotPassword from './ForgotPassword.js';
import '../App.css';
import VerifyOtp from "./VerifyOTP.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Landing() {
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPwd, setModalForgotPwd] = useState(false);
  const [modalVerifyOtp, setModalVerifyOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);

  const renderTooltip = (text) => (
    <Tooltip>
      {text}
    </Tooltip>
  );


  const toggleSignUp = () => {
    setModalSignUp(!modalSignUp);
  }
  const toggleLogin = () => {
    setModalLogin(!modalLogin);
  }
  const toggleForgotPwd = () => {
    setModalForgotPwd(!modalForgotPwd);
  }
  const toggleVerifyOtp = () => {
    setModalVerifyOtp(!modalVerifyOtp);
  }
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">
          SavorShare
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div to="#" className="nav-link active" onClick={toggleLogin}>
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Existing User")}>
                  <div>Log In</div>
                </OverlayTrigger>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link active" onClick={toggleSignUp}>
                <OverlayTrigger placement="bottom" overlay={renderTooltip("New User")}>
                  <div>Sign Up</div>
                </OverlayTrigger>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <Modal isOpen={modalLogin}>
        <ModalHeader toggle={toggleLogin}>Log In</ModalHeader>
        <ModalBody>
          <Login setModalLogin={setModalLogin} setModalForgotPwd={setModalForgotPwd} setModalSignUp={setModalSignUp} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalSignUp}>
        <ModalHeader toggle={toggleSignUp}>Sign Up</ModalHeader>
        <ModalBody>
          <Register setModalSignUp={setModalSignUp} setModalLogin={setModalLogin} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalForgotPwd}>
        <ModalHeader toggle={toggleForgotPwd}>Forgot Password</ModalHeader>
        <ModalBody>
          <ForgotPassword setModalForgotPwd={setModalForgotPwd} setModalSignUp={setModalSignUp} setModalLogin={setModalLogin} setModalVerifyOtp={setModalVerifyOtp} setPhoneNumber={setPhoneNumber} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalVerifyOtp}>
        <ModalHeader toggle={toggleVerifyOtp}>Verify User</ModalHeader>
        <ModalBody>
          <VerifyOtp setModalVerifyOtp={setModalVerifyOtp} setModalLogin={setModalLogin} phoneNumber={phoneNumber} />
        </ModalBody>
      </Modal>

    </>
  )
}
export default Landing;
