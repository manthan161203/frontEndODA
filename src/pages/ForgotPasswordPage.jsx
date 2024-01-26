import Box from '@mui/material/Box';
import ForgotPassword from '../components/ForgotPassword';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
const ForgotPasswordPage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Forgot Password</h2>
            <ForgotPassword />
            <Footer />
        </div>
    );
};

export default ForgotPasswordPage;