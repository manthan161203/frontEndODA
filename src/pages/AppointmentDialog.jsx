import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import styled from 'styled-components';

// Styled components for custom styling
const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        border-radius: 10px;
    }
`;

const StyledDialogContent = styled(DialogContent)`
    display: flex;
    flex-direction: column;
`;

const StyledDialogTitle = styled(DialogTitle)`
    background-color: #3f51b5;
    color: white;
`;

const StyledButton = styled(Button)`
    background-color: #3f51b5;
    color: white;
    &:hover {
        background-color: #303f9f;
    }
`;

const AppointmentDialog = ({ appointment, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <StyledDialog open={true} onClose={handleClose}>
            <StyledDialogTitle>Appointment Details</StyledDialogTitle>
            <StyledDialogContent>
            <p><strong>Appointment ID:</strong> {appointment.appointmentId}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Slot:</strong> {appointment.slot.startTime} - {appointment.slot.endTime}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
                <p><strong>Prerequisite:</strong> {appointment.prerequisite}</p>
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                <p><strong>Notes:</strong> {appointment.notes}</p>
                <p><strong>Patient Name:</strong> {appointment.patient.user.firstName} {appointment.patient.user.lastName}</p>
                <p><strong>Email:</strong> {appointment.patient.user.email}</p>
                <p><strong>Phone Number:</strong> {appointment.patient.user.phoneNumber}</p>
                <p><strong>Address:</strong> {appointment.patient.user.address}</p>
                <p><strong>Gender:</strong> {appointment.patient.user.gender}</p>
                <p><strong>Height:</strong> {appointment.patient.healthMetrics.height}</p>
                <p><strong>Weight:</strong> {appointment.patient.healthMetrics.weight}</p>
                <p><strong>Blood Group:</strong> {appointment.patient.healthMetrics.bloodGroup}</p>
                <p><strong>Emergency Contact Name:</strong> {appointment.patient.emergencyContact.name}</p>
                <p><strong>Relationship:</strong> {appointment.patient.emergencyContact.relationship}</p>
                <p><strong>Emergency Contact Phone Number:</strong> {appointment.patient.emergencyContact.phoneNumber}</p>
                <p><strong>Medical History:</strong> {appointment.patient.medicalHistory.join(', ')}</p>
                <p><strong>Allergies:</strong> {appointment.patient.allergies.join(', ')}</p>
            </StyledDialogContent>
            <DialogActions>
                <StyledButton onClick={handleClose}>Close</StyledButton>
            </DialogActions>
        </StyledDialog>
    );
};

export default AppointmentDialog;
