/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import DoctorCard from '../components/DoctorCard'; // Assuming DoctorCard is in the same directory

const DoctorPage = () => {
    const { doctorType } = useParams();
    const [doctorData, setDoctorData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/doctor/getDoctorsByType/${doctorType}`);
                setDoctorData(response.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter doctors based on search term
    const filteredDoctors = doctorData.filter(doctor =>
        doctor.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.doctorSpecialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Box sx={{ mb : 4 }} />
            <h2>Our Doctors</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or specialization"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="card-container">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DoctorPage;
