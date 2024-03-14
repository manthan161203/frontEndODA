import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../assets/styles/appointmentpanel.css'
import ActiveAppointmentCard from './ActiveAppointmentCard';

const AppointmentPanel = (appointment) => {
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [todayCount, setTodayCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
                console.log("JODDD")
                console.log(appointment);
    const [activeAppointment, setActiveAppointment] = useState({});

    useEffect(() => {
        // Fetch data for counts
        const fetchAppointmentCounts = async () => {
            try {
                const { upcomingCount, todayCount, activeCount } = [0,0,0];
                setUpcomingCount(upcomingCount);
                setTodayCount(todayCount);
                setActiveCount(activeCount);
            } catch (error) {
                console.error('Error fetching appointment counts:', error);
            }
        };
        if (appointment) {
            console.log("idhar")
            setActiveAppointment(appointment);
            
            console.log("last")
            console.log(appointment)
    
        }else{

        

        fetchAppointmentCounts();
    }
    }, []);

    useEffect(() => {
        console.log("ou")
        console.log(activeAppointment);
    }, [activeAppointment]);
    return (
        <div className="panel">
            <h2 style={{ textAlign: "center" }}>Appointments</h2>
            <div className="panel-content">
                <div className="card-group">
                    <div className="card inline">
                        <h3>Remaining Appointments</h3>
                        <p>Total: {activeCount}</p>
                    </div>
                    <div className="card inline">
                        <h3>Today's Appointments</h3>
                        <p>Total: {todayCount}</p>
                    </div>
                    <div className="card inline">
                        <h3>Upcoming Appointments</h3>
                        <p>Total: {upcomingCount}</p>
                    </div>
                </div>
                {activeAppointment &&         
                <div className="panel">
                    <div className="panel-content">
                        <Card sx={{ width: '99%', height: '100%', margin: 'auto', marginTop: 2, marginLeft: 1, padding: 0.5, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#1873CC' }}>
                            <Card sx={{ width: '100%', height: '100%', borderRadius: '6px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#E9F1FA' }}>
                                <CardContent>
                                    <h2 style={{ textAlign: "center", marginTop: 2, backgroundColor: '#d0d9eb' }}>Active Appointment</h2>

                                    <h2 style={{ marginBottom: '1rem', marginTop: 3, color: '#333' }}>Appointment ID: {activeAppointment.appointmentId}</h2>
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
                </div>}
            </div>
                
        </div>
    );
};

export default AppointmentPanel;
