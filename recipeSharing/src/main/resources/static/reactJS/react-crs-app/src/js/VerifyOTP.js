import React, { useState } from 'react';
import { Form, Label, Input } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Register.css';
import axios from 'axios';

function VerifyOtp(props) {

    const phoneNumber = props.phoneNumber;
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertforSuccess, setShowAlertForSuccess] = useState(false);

    const baseUrl = 'http://localhost:8080/api/users/phoneNumbers/'

    const validatePassword = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!><*:;@#$%^&-+=()])(?=\S+$).{8,14}$/;
        return regex.test(password);
    };

    const toggleVerifyOtp = () => {
        props.setModalVerifyOtp(false);
        props.setModalLogin(true); 
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(baseUrl + phoneNumber + '/' + otp + '/' + password, { withCredentials: true });
            if (response.status === 200) {
                setShowAlertForSuccess(true);
                toggleVerifyOtp();
            }
        }
        catch (error) {
            //Form Validation
            if (!validatePassword(password) || password !== confirmPassword) {
                setShowAlert(true);
            }

            console.error(error);
            setShowAlert(true);
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit} className="sign-form">
                <Label>Enter OTP</Label>
                <Input type="number" size="6" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                <Label>Password</Label>
                <Input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                {showAlert && !validatePassword(password) && <div style={{ color: 'red', fontSize: 13 }}>Password must contain atleast one uppercase, one lowercase, one special character, one digit and be 8-14 characters long.</div>}

                <Label>Confirm Password<span className="star-required">*</span></Label>
                <Input type="password" value={confirmPassword} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                {showAlert && password !== confirmPassword && <div style={{ color: 'red', fontSize: 13 }}>Password and Confirm Password should be same </div>}
                <br></br>

                <footer>
                    <input type="submit" value="Submit" />
                    {showAlert && <div style={{ color: 'red', fontSize: 13 }}>Invalid One time passcode or Password</div>}
                    {showAlertforSuccess && <div style={{ color: 'green', fontSize: 13 }}>Password updated..</div>}
                </footer>
            </Form>
        </>
    );
};

export default VerifyOtp;