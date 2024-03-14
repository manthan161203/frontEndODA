// DoctorDashboardPage.jsx

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
const PendingAppointments = () => {
    
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const doctorId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:8001/doctor/getAppointments/${doctorId}`);
                const filteredAppointments = response.data.filter(appointment => appointment.status === 'Pending');
                setAppointments(filteredAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);
    

    const handleSlotClick = (info) => {
        const appointment = info.event.extendedProps.data;
        console.log(appointment)
        setSelectedAppointment(appointment);
    };

    const handleAccept = async (appointment) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to accept this appointment',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(`http://localhost:8001/doctor/acceptAppointment/${appointment._id}`);
                    if (response.status === 200) {
                        Swal.fire('Accepted!', 'Appointment has been accepted.', 'success');
                        // You may want to perform additional actions here after accepting the appointment
                    }
                } catch (error) {
                    console.error('Error accepting appointment:', error);
                    Swal.fire('Error', 'An error occurred while accepting the appointment.', 'error');
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
            }
        });
    };
    const handleReject = (appointment) => {
        console.log('Rejecting appointment:', appointment);
    };
    const appointmentLabel = "Appointmnet Preview"
    return (
        
        <div className="dashboard-container">
            <NavBar />
            <Grid container spacing={3} className="content-container">
                <Grid item xs={12} md={6}>
                    {selectedAppointment && (
                        <div className="panel">
                        <div className="panel-content">
                            <Card sx={{ width: '99%', height: '100%', margin: 'auto', marginTop: 2, marginLeft: 1, padding: 0.5, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#1873CC' }}>
                                <Card sx={{ width: '100%', height: '100%', borderRadius: '6px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#E9F1FA' }}>
                                    <CardContent>
                                        <h2 style={{ textAlign: "center", marginTop: 2, backgroundColor: '#d0d9eb' }}>{appointmentLabel}</h2>
                    
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <div>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Appointment ID: {selectedAppointment.appointmentId}</h4>
                                                {/* <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Created At: {selectedAppointment.createdAt}</h4> */}
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Date: {selectedAppointment.date}</h4>
                                                {/* <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Doctor: {selectedAppointment.doctor}</h4> */}
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Notes: {selectedAppointment.notes}</h4>
                                            </div>
                                            <div>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Patient: {selectedAppointment.patient._id}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Allergies: {selectedAppointment.patient && selectedAppointment.patient.allergies && selectedAppointment.patient.allergies.join(', ')}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Emergency Contact: {selectedAppointment.patient && selectedAppointment.patient.emergencyContact && `${selectedAppointment.patient.emergencyContact.name}, Relationship: ${selectedAppointment.patient.emergencyContact.relationship}, Phone Number: ${selectedAppointment.patient.emergencyContact.phoneNumber}`}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Health Metrics: {selectedAppointment.patient && selectedAppointment.patient.healthMetrics && `Height: ${selectedAppointment.patient.healthMetrics.height}, Weight: ${selectedAppointment.patient.healthMetrics.weight}, Blood Group: ${selectedAppointment.patient.healthMetrics.bloodGroup}`}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Medical History: {selectedAppointment.patient && selectedAppointment.patient.medicalHistory && selectedAppointment.patient.medicalHistory.join(', ')}</h4>
                                            </div>
                                        </div>
                    
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <div>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>User ID: {selectedAppointment.patient && selectedAppointment.patient.user && selectedAppointment.patient.user.userId}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Prerequisite: {selectedAppointment.prerequisite}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Recommended Doctors: {selectedAppointment.recommendedDoctors && selectedAppointment.recommendedDoctors.join(', ')}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Slot : {selectedAppointment.slot && selectedAppointment.slot.startTime}</h4>
                                                <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1rem' }}>Status: {selectedAppointment.status}</h4>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                                <Button variant="contained" color="success" onClick={() => handleAccept(selectedAppointment)} style={{ marginBottom: '0.5rem' }}>
                                                    Accept
                                                </Button>
                                                <Button variant="contained" color="error" onClick={() => handleReject(selectedAppointment)} style={{ marginBottom: '0.5rem' }}>
                                                    Reject
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={() => console.log('View More clicked')}>
                                                    View More
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Card>
                        </div>
                    </div>
                    
                    

                    
                    
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="calendar-container">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={appointments.map(appointment => ({
                                title: appointment.slot.startTime + " - " + appointment.slot.endTime,
                                start: appointment.date,
                                end: appointment.date,
                                data: appointment,
                                backgroundColor: appointment.status === 'Rejected' ? '#c43c33' : '#9fc5fd'
                            }))}
                            eventClick={handleSlotClick}
                            height="100%"
                            headerToolbar={{
                                left: '',
                                center: 'title',
                                right: ''
                            }}
                            contentHeight="auto"
                            dayMaxEventRows={true}
                            dayMaxEvents={true}
                            eventDisplay="block"
                            eventBackgroundColor="#FFA500"
                        />
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
};

export default PendingAppointments;
