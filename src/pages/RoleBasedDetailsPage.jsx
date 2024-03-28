import React from 'react';
import Box from '@mui/system/Box';
import PatientForm from '../components/PatientRegistration';
import DoctorForm from '../components/DoctorRegistration';
import ClinicalDoctorForm from '../components/ClinicalDoctorRegistration';
import TherapistForm from '../components/TherapistRegistration';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const centeredHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const RoleBasedDetailsPage = () => {
    const role = localStorage.getItem("role");
    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            {/* <h2 style={centeredHeadingStyle}>Register</h2> */}
            {role === 'PATIENT' && <PatientForm />}
            {role === 'DOCTOR' && <DoctorForm />}
            {role === 'THERAPIST' && <TherapistForm />}
            {role === 'CLINICAL DOCTOR' && <ClinicalDoctorForm />}
            <Footer />
        </div>
    );
};

export default RoleBasedDetailsPage;
