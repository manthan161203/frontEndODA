import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const PatientForm = () => {
    const [user, setUser] = useState('');
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [allergies, setAllergies] = useState([]);
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
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userName = localStorage.getItem('userName');
            try {
                const response = await axios.get(`http://localhost:8001/user/getUserDetails/${userName}`);
                setUser(response.data._id);
            } catch (error) {
                console.error('Error fetching user ID:', error.message);
            }
        };

        fetchUser();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const updatedData = {
            user,
            medicalHistory,
            allergies,
            emergencyContact,
            healthMetrics
        };

        try {
            // console.log(updatedData);
            setLoading(true);
            const response = await axios.post(`http://localhost:8001/patient/createPatient`, updatedData);
            // console.log(response.data);
            // console.log(updatedData);
            localStorage.setItem('isSubProfileSet', true);
            window.location.href = '/';
        } catch (error) {
            console.error('Error updating patient data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMedicalHistoryChange = (e) => {
        const value = e.target.value;
        setMedicalHistory(value.split(',').map(item => item.trim()));
    };

    const handleAllergiesChange = (e) => {
        const value = e.target.value;
        setAllergies(value.split(',').map(item => item.trim()));
    };

    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4" gutterBottom>
                    Patient Profile
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Medical History"
                        value={medicalHistory.join(',')}
                        onChange={handleMedicalHistoryChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={formSubmitted && medicalHistory.length === 0}
                        helperText={formSubmitted && medicalHistory.length === 0 && 'Please enter medical history'}
                    />
                    <TextField
                        label="Allergies"
                        value={allergies.join(',')}
                        onChange={handleAllergiesChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={formSubmitted && allergies.length === 0}
                        helperText={formSubmitted && allergies.length === 0 && 'Please enter allergies'}
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default PatientForm;
