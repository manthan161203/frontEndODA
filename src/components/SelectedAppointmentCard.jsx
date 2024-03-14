import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ActiveAppointment from './ActiveAppointmentCard'; // Import the ActiveAppointment component

const SelectedAppointmentCard = ({ appointment }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleDateClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    return (
        <div className="panel">
            <div className="panel-content">
                <Card sx={{ width: '99%', height: '100%', margin: 'auto', marginTop: 2, marginLeft: 1, padding: 0.5, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#1873CC' }}>
                    <Card sx={{ width: '100%', height: '100%', borderRadius: '6px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#E9F1FA' }}>
                        <CardContent>
                            <h2 style={{ textAlign: "center", marginTop: 2, backgroundColor: '#d0d9eb' }}>Active Appointment</h2>

                            <h2 style={{ marginBottom: '1rem', marginTop: 3, color: '#333', cursor: 'pointer' }} onClick={() => handleDateClick(appointment)}>Date: {appointment.date}</h2>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Appointment ID: {appointment.appointmentId}</h4>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Doctor: {appointment.doctor}</h4>
                            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Slot: {appointment.slot.startTime} - {appointment.slot.endTime}</h4>
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
            {selectedAppointment && <ActiveAppointment appointment={selectedAppointment} />}
        </div>
    );
};

export default SelectedAppointmentCard;