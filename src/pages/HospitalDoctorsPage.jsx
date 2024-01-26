import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import DoctorCard from '../components/DoctorCard';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const HospitalDoctorsPage = () => {
    const { hospitalName } = useParams();
    const [doctorData, setDoctorData] = useState([]);

    const centeredHeadingStyle = {
        textAlign: 'center',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/doctor/getDoctorsByHospital/${hospitalName}`);
                setDoctorData(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
    
        fetchData();
    }, [hospitalName]);
    

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <h2 style={centeredHeadingStyle}>Doctors at {hospitalName}</h2>
            <div className="card-container">
                {doctorData.map((doctor) => {
                    doctor.user = doctor.user[0];
                    return <DoctorCard key={doctor._id} doctor={doctor} />
                })}
            </div>
            <Footer />
        </div>
    );
};

export default HospitalDoctorsPage;
