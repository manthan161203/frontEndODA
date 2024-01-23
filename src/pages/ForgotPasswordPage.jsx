import Box from '@mui/material/Box';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPasswordPage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Forgot Password</h2>
            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;