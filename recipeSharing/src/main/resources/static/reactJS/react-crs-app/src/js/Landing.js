import React, { useState } from 'react';
import '../css/Register.css';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import Register from './Register.js';
import Login from './Login.js';
import ForgotPassword from './ForgotPassword.js';
import '../App.css';
import VerifyOtp from "./VerifyOTP.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import BackgroundImage from '../images/cooking.avif'

function Landing() {
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPwd, setModalForgotPwd] = useState(false);
  const [modalVerifyOtp, setModalVerifyOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

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
      <div style={{
        height: "100vh",
        width: '100vw',
        background: `url(${BackgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed", // To make it cover the entire viewport
        zIndex: "-1"
      }}>
        <div className = "mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: "white" }}>
          <div className="ml-2" style={{ left: 20, fontSize: "20px", fontWeight: "bold" }}>
            SavorShare
          </div>
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Existing User")}>
                <div className="ml-2 mr-4 float-right" style ={{position : "absolute",right:80}}onClick={toggleLogin}>LOG IN</div>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={renderTooltip("New User")}>
                <div className="mr-3 float-right" onClick={toggleSignUp}>SIGN UP</div>
              </OverlayTrigger>
        </div>
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
      </div>
    </>
  )
}
export default Landing;
