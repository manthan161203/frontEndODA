import React from 'react';
import Box from '@mui/system/Box';
import RegisterForm from '../components/Register';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const RegisterPage = () => {
    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Register</h2>
            <RegisterForm />
            <Footer />
        </div>
    );
};

export default RegisterPage;
