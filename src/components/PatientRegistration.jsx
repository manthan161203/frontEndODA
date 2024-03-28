import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const PatientForm = () => {
    const [medicalHistory, setMedicalHistory] = useState('');
    const [allergies, setAllergies] = useState('');
    const [emergencyContact, setEmergencyContact] = useState({
        name: '',
        relationship: '',
        phoneNumber: ''
    });
    const [healthMetrics, setHealthMetrics] = useState({
        height: '',
        weight: '',
        bloodGroup: ''
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('userName'); // Get the userName from localStorage
        const updatedData = {
            medicalHistory,
            allergies,
            emergencyContact,
            healthMetrics
        };

        try {
            const response = await axios.put(`http://localhost:8001/patient/updatePatientData/${userName}`, updatedData);
            console.log(response.data);
            // Handle success, maybe show a success message to the user
            window.location.href = '/doctors';
        } catch (error) {
            console.error('Error updating patient data:', error.message);
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField
                label="Medical History"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Emergency Contact Name"
                value={emergencyContact.name}
                onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Emergency Contact Relationship"
                value={emergencyContact.relationship}
                onChange={(e) => setEmergencyContact({...emergencyContact, relationship: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Emergency Contact Phone Number"
                value={emergencyContact.phoneNumber}
                onChange={(e) => setEmergencyContact({...emergencyContact, phoneNumber: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Height"
                value={healthMetrics.height}
                onChange={(e) => setHealthMetrics({...healthMetrics, height: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Weight"
                value={healthMetrics.weight}
                onChange={(e) => setHealthMetrics({...healthMetrics, weight: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Blood Group"
                value={healthMetrics.bloodGroup}
                onChange={(e) => setHealthMetrics({...healthMetrics, bloodGroup: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default PatientForm;
