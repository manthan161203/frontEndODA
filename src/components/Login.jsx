import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Button,
    Container,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otpOption, setOtpOption] = useState('sms');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            if (otpOption === 'sms' || otpOption === 'email') {
                await axios.post(`http://localhost:8001/login/send-otp/${otpOption}/${username}`);
                Swal.fire('Success', `OTP sent successfully to ${otpOption === 'sms' ? 'your phone' : 'your email'}`, 'success');
            } else {
                setErrorMessage('Invalid OTP option');
            }
        } catch (error) {
            setErrorMessage('Invalid username');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:8001/login/verify-otp/${username}`, {
                otp,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful', response.data);
                Swal.fire('Success', 'OTP and password verified successfully', 'success');
                window.location.href = '/hospitals';
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

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        onClick={handleTogglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                    >
                        Send OTP
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
                        />
                    )}

                    {errorMessage && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>
                            {errorMessage}
                        </div>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
