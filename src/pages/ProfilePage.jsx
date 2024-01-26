import Box from '@mui/material/Box';
import Profile from '../components/Profile';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Your Details</h2>
            <Profile />
            <Footer />
        </div>
    );
};

export default ProfilePage;
