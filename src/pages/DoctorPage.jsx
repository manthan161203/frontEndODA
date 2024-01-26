/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import DoctorCard from '../components/DoctorCard';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';

const SearchInput = styled.input`
    width: 400px;
    padding: 15px;
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
                // console.log(response.data[0]);
                if(response.data[0] === undefined) {
                    window.location.href = '/empty';
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredDoctors = doctorData.filter(doctor =>
        doctor.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.doctorSpecialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <div className="search-bar">
                <h1 className='h2-tag'>Our Doctors</h1>
                <SearchInput
                    style={{ width: '400px', padding: '15px' }}
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
            <Footer />
        </div>
    );
};

export default DoctorPage;
