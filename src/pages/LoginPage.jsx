import Box from '@mui/system/Box';
import LoginForm from '../components/Login';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const LoginPage = () => {
    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Login</h2>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
