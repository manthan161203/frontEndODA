import React from 'react';
import Box from '@mui/system/Box';
import Footer from '../components/Footer';
import PatientRoleProfile from './PatientProfileUpdate';
import DoctorRoleProfile from './DoctorProfileUpdate';
import AdminRoleProfile from './AdminProfileUpdate';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const RoleProfile = () => {
    const role = localStorage.getItem("role");
    return (
        <div>
            <Box sx={{ mb: 4 }} />
            {/* <h2 style={centeredHeadingStyle}>Register</h2> */}
            {role === 'PATIENT' && <PatientRoleProfile />}
            {role === 'DOCTOR' && <DoctorRoleProfile />}
            {role === 'THERAPIST' && <DoctorRoleProfile />}
            {role === 'CLINICAL DOCTOR' && <DoctorRoleProfile />}
            {role === 'ADMIN' && <AdminRoleProfile />}
            <Footer />
        </div>
    );
};

export default RoleProfile;
