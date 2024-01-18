import Box from '@mui/material/Box';
import Profile from '../components/Profile';

const ProfilePage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Your Details</h2>
            <Profile />
        </div>
    );
};

export default ProfilePage;
