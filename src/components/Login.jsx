import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpOption, setOtpOption] = useState('sms');
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/user/getUserDetails/${username}`);
            const userDetails = response.data;
            if (otpOption === 'sms') {
                const phoneNumber = userDetails.phoneNumber;
                await axios.post(`http://localhost:8001/login/send-otp/${otpOption}/${username}`);
            } else {
                const email = userDetails.email;
                await axios.post(`http://localhost:8001/login/send-otp/${otpOption}/${username}`);
            }
        } catch (error) {
            setErrorMessage('Invalid username');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:8001/login/verify-otp/${username}`, {
                otp,
                password
            });

            if (response.status === 200) {
                console.log('Login successful', response.data);
                Swal.fire('Success', 'OTP and password verified successfully', 'success');
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 404) {
                    Swal.fire('Error', 'User not found', 'error');
                } else if (statusCode === 400) {
                    Swal.fire('Error', 'Invalid OTP or OTP expired', 'error');
                } else if (statusCode === 401) {
                    Swal.fire('Error', 'Invalid password', 'error');
                } else if (statusCode === 500) {
                    Swal.fire('Error', 'Server Error', 'error');
                }
            } else {
                console.error('Error during login:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Send OTP by:</label>
                <select value={otpOption} onChange={(e) => setOtpOption(e.target.value)}>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                </select>
            </div>
            <div>
                <button onClick={handleSendOtp}>Send OTP</button>
            </div>
            {otpOption && (
                <div>
                    <label>Enter OTP:</label>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
            )}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div>
                <button onClick={handleLogin}>Submit</button>
            </div>
        </div>
    );
};

export default Login;
