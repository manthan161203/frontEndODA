import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AppointmentDialog from './AppointmentDialog';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8001/doctor/getAppointments/6584849b24c27b7724eaf790');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleSlotClick = (info) => {
        const appointment = info.event.extendedProps.data;
        setSelectedAppointment(appointment);
    };

    const events = appointments.map(appointment => ({
        title: appointment.slot.startTime +" - "+appointment.slot.endTime,
        start: appointment.date,
        end: appointment.date,
        data: appointment,
        backgroundColor: appointment.status === 'Rejected' ? '#c43c33' : '#9fc5fd'
    }));

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleSlotClick}
            />
            {selectedAppointment && (
                <AppointmentDialog appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
            )}
        </div>
    );
};

export default DoctorDashboard;
