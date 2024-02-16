import Box from '@mui/system/Box';
import LoginForm from '../components/Login';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const LoginPage = () => {
    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Login</h2>
            <LoginForm />
            <Footer />
        </div>
    );
};

export default LoginPage;
