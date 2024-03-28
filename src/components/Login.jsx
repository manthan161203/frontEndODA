/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AppContext } from '../App';
import {
    Button,
    Container,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    Box
} from '@mui/material';
import { LocalLaundryService, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const { setIsLoggedIn } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpOption, setOtpOption] = useState('sms');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

    const validateFields = () => {
        const requiredFields = ['username', 'password', 'otpOption'];
        let isValid = true;

        requiredFields.forEach(field => {
            if (!eval(field)) { // Use eval to dynamically access state variables
                Swal.fire('Error', 'Please fill in all required fields', 'error');
                setErrorMessage('Please fill in all required fields');
                isValid = false;
            }
        });

        return isValid;
    };

    const handleSendOtp = async () => {
        setFormSubmitted(true);

        if (!validateFields()) {
            return;
        }

        try {
            setLoading(true); // Set loading to true when sending OTP
    
            if (otpOption === 'sms' || otpOption === 'email') {
                await axios.post(`http://localhost:8001/login/send-otp/${otpOption}/${username}`, {
                    password,
                });
    
                Swal.fire('Success', `OTP sent successfully to ${otpOption === 'sms' ? 'your phone' : 'your email'}`, 'success');
            } else {
                setErrorMessage('Invalid OTP option');
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
    
                if (statusCode === 404) {
                    Swal.fire('Error', 'User not found', 'error');
                } else if (statusCode === 401) {
                    Swal.fire('Error', 'Invalid password', 'error');
                } else if (statusCode === 400) {
                    Swal.fire('Error', 'Invalid OTP or OTP expired', 'error');
                } else if (statusCode === 500) {
                    Swal.fire('Error', 'Server Error', 'error');
                } else {
                    Swal.fire('Error', 'Unexpected error occurred', 'error');
                }
            } else {
                console.error('Error during OTP sending:', error.message);
                Swal.fire('Error', 'Unexpected error occurred', 'error');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleLogin = async () => {
        setFormSubmitted(true);

        if (!validateFields()) {
            return;
        }

        try {
            setLoading(true); // Set loading to true during login process

            const response = await axios.post(`http://localhost:8001/login/verify-otp/${username}`, {
                otp,
            });
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('userName', username);
                localStorage.setItem('role', response.data.role.toUpperCase());
                setIsLoggedIn(true);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', response.data._id);
                Swal.fire('Success', 'OTP and password verified successfully', 'success');
                localStorage.setItem('isSubProfileSet',response.data.isSubProfileSet);
                
                if(localStorage.getItem('isSubProfileSet') === "false"){
                    window.location.href = `/profile-role/${response.data.userName}`;
                }
                else{
                    if(localStorage.getItem('role') === "PATIENT"){
                        window.location.href = '/hospitals';
                    }else 
                    {
                        window.location.href = '/doctor';
                    }
                }
                
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
                Swal.fire('Error', 'Unexpected error occurred', 'error');
            }
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        window.location.href = "/forgot-password";
    };

    return (
        <Container maxWidth="sm">
            <div>
                <form>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                        error={formSubmitted && !username}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        error={formSubmitted && !password}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        onClick={handleTogglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Send OTP by</InputLabel>
                        <Select
                            value={otpOption}
                            onChange={(e) => setOtpOption(e.target.value)}
                            label="Send OTP by"
                            error={formSubmitted && !otpOption}
                            required
                        >
                            <MenuItem value="sms">SMS</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendOtp}
                        sx={{ mb: 2 }}
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>

                    {otpOption && (
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            variant="outlined"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            sx={{ mb: 2 }}
                            error={formSubmitted && !otp}
                            required
                        />
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleForgotPassword}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Forgot Password ?'}
                        </Button>
                    </Box>
                </form>
            </div>
        </Container>
    );
};

export default Login;
