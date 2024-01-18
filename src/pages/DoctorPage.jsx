/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'; // Import styled-components
import Box from '@mui/material/Box';
import DoctorCard from '../components/DoctorCard'; // Assuming DoctorCard is in the same directory

const SearchInput = styled.input`
    width: 400px; /* Increase the width as needed */
    padding: 15px; /* Increase the padding as needed */
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
    outline: none;
`;

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
            <Box sx={{ mb: 4 }} />
            <div className="search-bar">
                <h1 className='h2-tag'>Our Doctors</h1>
                <SearchInput
                    style={{ width: '400px', padding: '15px' }}  // Adjust width and padding here
                    type="text"
                    placeholder="Search Doctor"
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
