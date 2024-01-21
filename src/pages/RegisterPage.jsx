import React from 'react';
import Box from '@mui/system/Box';
import RegisterForm from '../components/Register';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const RegisterPage = () => {
    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Register</h2>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
