import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import DoctorCard from '../components/DoctorCard';

const HospitalDoctorsPage = () => {
    const { hospitalName } = useParams();
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/doctor/getDoctorsByHospital/${hospitalName}`);
                setDoctorData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchData();
    }, [hospitalName]);

    return (
        <div>
            <Box sx={{ mb : 4 }} />
            <h2>Doctors at {hospitalName}</h2>
            <div className="card-container">
                {doctorData.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default HospitalDoctorsPage;