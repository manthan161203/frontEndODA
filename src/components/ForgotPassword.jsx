// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Container,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
} from '@mui/material';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [otpOption, setOtpOption] = useState('sms');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const validateFields = () => {
        const requiredFields = ['username', 'otpOption'];
        if (otpSent) {
            requiredFields.push('newPassword', 'otp');
        }

        let isValid = true;

        requiredFields.forEach(field => {
            if (!eval(field)) {
                Swal.fire('Error', 'Please fill in all required fields', 'error');
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
            await axios.post(`http://localhost:8001/login/forgot-password-send-otp/${otpOption}/${username}`);
            setOtpSent(true);
            Swal.fire('Success', `OTP sent successfully to ${otpOption === 'sms' ? 'your phone' : 'your email'}`, 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to send OTP. Please try again.', 'error');
        }
    };

    const handleUpdatePassword = async () => {
        setFormSubmitted(true);

        if (!validateFields()) {
            return;
        }

        try {
            await axios.put(`http://localhost:8001/user/updateUserDetails/${username}`, {
                password: newPassword,
            });
            Swal.fire('Success', 'Password updated successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update password. Please try again.', 'error');
        }
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
                        required
                        error={formSubmitted && !username}
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Send OTP by</InputLabel>
                        <Select
                            value={otpOption}
                            onChange={(e) => setOtpOption(e.target.value)}
                            label="Send OTP by"
                            required
                            error={formSubmitted && !otpOption}
                        >
                            <MenuItem value="sms">SMS</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                        </Select>
                    </FormControl>

                    {otpSent && (
                        <>
                            <TextField
                                fullWidth
                                label="New Password"
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                                error={formSubmitted && !newPassword}
                            />

                            <TextField
                                fullWidth
                                label="Enter OTP"
                                variant="outlined"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                                error={formSubmitted && !otp}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdatePassword}
                            >
                                Update Password
                            </Button>
                        </>
                    )}

                    {!otpSent && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendOtp}
                            sx={{ mb: 2 }}
                        >
                            Send OTP
                        </Button>
                    )}
                </form>
            </div>
        </Container>
    );
};

export default ForgotPassword;
