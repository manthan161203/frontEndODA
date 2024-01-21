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
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, DateRange, Phone, LocationOn } from '@mui/icons-material';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [otpOption, setOtpOption] = useState('sms');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            if (otpOption === 'sms') {
                await axios.post(`http://localhost:8001/register/submit-info`, {
                    userId,
                    firstName,
                    lastName,
                    email,
                    userName,
                    password,
                    dateOfBirth,
                    phoneNumber,
                    address,
                    gender,
                    role,
                });

                Swal.fire('Success', `User information submitted successfully. Check your phone for OTP.`, 'success');
            } else {
                setErrorMessage('Invalid OTP option');
            }
        } catch (error) {
            setErrorMessage('Error submitting user information');
        }
    };

    const handleRegister = async () => {
        try {
            await axios.post(`http://localhost:8001/register/verify-and-register`, {
                phoneNumber,
                otpCode: otp,
            });

            Swal.fire('Success', 'User registered successfully', 'success');
            window.location.href = '/login';
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 404) {
                    Swal.fire('Error', 'User not found with the provided phone number', 'error');
                } else if (statusCode === 401) {
                    Swal.fire('Error', 'Invalid OTP or OTP expired', 'error');
                } else if (statusCode === 500) {
                    Swal.fire('Error', 'Server Error', 'error');
                }
            } else {
                console.error('Error during registration:', error.message);
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
                        label="user ID"
                        variant="outlined"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
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
                                    <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                        tabIndex={-1}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label=""
                        variant="outlined"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <DateRange />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Phone />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <LocationOn />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Gender"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                        >
                            <MenuItem value="patient">Patient</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="clinical doctor">Clinical Doctor</MenuItem>
                            <MenuItem value="therapist">Therapist</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Send OTP by</InputLabel>
                        <Select
                            value={otpOption}
                            onChange={(e) => setOtpOption(e.target.value)}
                            label="Send OTP by"
                        >
                            <MenuItem value="sms">SMS</MenuItem>
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
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Register;
