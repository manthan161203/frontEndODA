/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import AppointmentCard from '../components/AppointmentCard';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchInput = styled.input`
    width: 400px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
    outline: none;
`;

const DoctorPage = () => {
    const { userName } = useParams();
    const [appointmentData, setAppointmentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = 
                const response = await axios.get(`http://localhost:8001/patient/getAppointments/${userName}`);
                setAppointmentData(response.data);
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

    const filteredAppointments = appointmentData.filter(appointment =>
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.slot.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <div className="search-bar">
                <h1 className='h2-tag'>Your Appointments</h1>
                <SearchInput
                    style={{ width: '400px', padding: '15px' }}
                    type="text"
                    placeholder="Search Appointment"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="card-container">
                {filteredAppointments.map((appointment) => (
                    <AppointmentCard key={appointment._id} appointment={appointment} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default DoctorPage;
