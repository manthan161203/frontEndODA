import Box from '@mui/material/Box';
import RoleProfile from '../components/RoleProfile';

const RoleProfilePage = () => {
    
    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Your Details</h2>
            <RoleProfile />
        </div>
    );
};

export default RoleProfilePage;