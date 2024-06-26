import React, { useEffect } from 'react';
import Box from '@mui/system/Box';
import PatientForm from '../components/PatientRegistration';
import DoctorForm from '../components/DoctorRegistration';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminForm from '../components/AdminRegistration';

const RoleBasedDetailsPage = () => {
    const role = localStorage.getItem("role");
    // const isSubProfileSet = localStorage.getItem("isSubProfileSet");

    // useEffect(() => {
    //     if (isSubProfileSet !== "true") {
    //         window.location.href = "/role-based-details";
    //     }
    // }, []);

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            {role === 'PATIENT' && <PatientForm />}
            {role === 'DOCTOR' && <DoctorForm />}
            {role === 'CLINICAL DOCTOR' && <DoctorForm />}
            {role === 'THERAPIST' && <DoctorForm />}
            {role === 'ADMIN' && <AdminForm />}
            <Footer />
        </div>
    );
};

export default RoleBasedDetailsPage;
