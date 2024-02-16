import React from 'react';
import Box from '@mui/system/Box';
import PatientForm from '../components/PatientRegistraion';
import DoctorForm from '../components/DoctorRegistation';
import ClinicalDoctorForm from '../components/ClinicalDoctorRegistration';
import TherapistForm from '../components/TherapiestRegistration';
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
            {role == 'Patient' && <PatientForm />}
            {role == 'Doctor' && <DoctorForm />}
            {role == 'Therapist' && <TherapistForm />}
            {role == 'Clinical Doctor' && <ClinicalDoctorForm />}
            <Footer />
        </div>
    );
};

export default RoleBasedDetailsPage;
