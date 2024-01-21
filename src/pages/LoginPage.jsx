import Box from '@mui/material/Box';
import LoginForm from '../components/Login';

const LoginPage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Login</h2>
            <LoginForm />
        </div>
    );
};

export default LoginPage;