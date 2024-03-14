import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
const ActiveAppointmentCard = ({ appointment }) => {
    console.log("hey")
    // const [appointment, setAppointment] = useState([]);
    // useEffect(() => {
    //     if (appointmentProps) {
    //         console.log("idhar")
    //         setAppointment(appointmentProps);
    //     } else {
    //         console.log("udhar")
    //         // Fetch data from API
    //         const fetchAppointments = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8001/doctor/getActiveAppointment/6584849b24c27b7724eaf791');
    //             console.log(response)
    //             setAppointment(response.data[0]);
    //         } catch (error) {
    //             console.error('Error fetching active appointment:', error);
    //         }
    //         }
    //     fetchAppointments();
    //     }
    // }, []);
    return (
        <div className="panel">
            <div className="panel-content">
                <Card sx={{ width: '99%', height: '100%', margin: 'auto', marginTop: 2, marginLeft: 1, padding: 0.5, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#1873CC' }}>
                    <Card sx={{ width: '100%', height: '100%', borderRadius: '6px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#E9F1FA' }}>
                        <CardContent>
                            <h2 style={{ textAlign: "center", marginTop: 2, backgroundColor: '#d0d9eb' }}>Active Appointment</h2>

                            <h2 style={{ marginBottom: '1rem', marginTop: 3, color: '#333' }}>Appointment ID: {appointment.appointmentId}</h2>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Doctor: {appointment.doctor}</h4>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Date: {appointment.date}</h4>
                            {/* <h4 style={{ marginBottom: '1rem', color: '#333' }}>Slot: {appointment.slot.startTime} - {appointment.slot.endTime}</h4> */}
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Status: {appointment.status}</h4>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Prerequisite: {appointment.prerequisite}</h4>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Notes: {appointment.notes}</h4>
                            <Button variant="contained" color="primary" onClick={() => console.log('View More clicked')}>
                                View More
                            </Button>
                        </CardContent>
                    </Card>
                </Card>
            </div>
        </div>
    );
};

export default ActiveAppointmentCard;
