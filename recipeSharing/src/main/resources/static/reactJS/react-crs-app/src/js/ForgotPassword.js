import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Register.css';
import axios from 'axios';

function ForgotPassword(props) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    //const [showAlertforSuccess, setShowAlertForSuccess] = useState(false);

    //const navigate = useNavigate();
    //const navigateToVerify = (phoneNumber) => navigate('/verifyOtpPwd/' + phoneNumber);

    const baseUrl = 'http://localhost:8080/api/users/phoneNumbers/'

    const toggleSignUp = () => {
        props.setModalForgotPwd(false);
        props.setModalSignUp(true);
    }
    const toggleVerifyOtp = (phoneNo) => {
        props.setModalForgotPwd(false);
        props.setModalVerifyOtp(true);
        props.setPhoneNumber(phoneNo);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(baseUrl + phoneNumber + '/generateOTP', { withCredentials: true });
            if (response.status === 200) {
                toggleVerifyOtp(phoneNumber);
                // navigateToVerify(phoneNumber);
            }
        }
        catch (error) {
            console.error(error);
            setShowAlert(true);
        }
    }
    return (
        <>
            <div className="m-5-auto">
                <Form onSubmit={handleSubmit} className="sign-form">
                    {/* <h5>Reset your password</h5> */}
                    <p className="form-caption">Enter your phone number to send the OTP </p>
                    {/* <Label>Phone number<span className="star-required">*</span></Label> */}
                    <Input type="text" placeholder="9999999999" size="10" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Invalid Phone number..</div>}
                    <input className="mt-4" type="submit" value="Send OTP" id="submit" />
                    <br></br>
                    <button style={{ marginLeft: "auto", fontSize: "13px", fontWeight: "bold" }} type="button" className="btn btn-transparent float-left" onClick={toggleSignUp}><p style={{ color: "4d4dff" }}>First time? Create an account </p> </button>
                </Form>
            </div>
        </>
    );
};

export default ForgotPassword;