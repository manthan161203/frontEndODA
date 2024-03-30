import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const PatientRoleProfile = () => {
    const { userName, role } = useContext(AppContext);
    const lowercaseRole = role.toLowerCase();
    const [patientData, setPatientData] = useState({
        medicalHistory: [],
        allergies: [],
        emergencyContact: {
            name: '',
            relationship: '',
            phoneNumber: '',
        },
        healthMetrics: {
            height: '',
            weight: '',
            bloodGroup: '',
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/${lowercaseRole}/getRoleBasedDetails/${userName}`);
                setPatientData(response.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setIsLoading(false);
            }
        };

        fetchPatientData();
    }, [userName, lowercaseRole]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'medicalHistory' || name === 'allergies') {
            const arrValue = value.split(',').map((item) => item.trim());
            setPatientData({
                ...patientData,
                [name]: arrValue,
            });
        } else {
            setPatientData({
                ...patientData,
                [name]: value,
            });
        }
    };

    const handleEmergencyContactChange = (event) => {
        const { name, value } = event.target;
        setPatientData({
            ...patientData,
            emergencyContact: {
                ...patientData.emergencyContact,
                [name]: value,
            },
        });
    };

    const handleHealthMetricsChange = (event) => {
        const { name, value } = event.target;
        setPatientData({
            ...patientData,
            healthMetrics: {
                ...patientData.healthMetrics,
                [name]: value,
            },
        });
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post(`http://localhost:8001/user/uploadImage/${userName}`, formData);
            console.log('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { medicalHistory, allergies, emergencyContact, healthMetrics } = patientData;
        const dataToSend = {
            medicalHistory,
            allergies,
            emergencyContact,
            healthMetrics,
        };

        try {
            const response = await axios.put(`http://localhost:8001/patient/updatePatientData/${userName}`, dataToSend);
            
            // console.log('Patient data updated successfully:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating patient data:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Avatar alt="User Image" src={patientData.image} sx={{ width: 80, height: 80 }} />
                                    <Box mt={2} mb={1}>
                                        {isEditing && (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="upload-image"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange}
                                                />
                                                <label htmlFor="upload-image">
                                                    <IconButton component="span" color="primary" aria-label="upload image">
                                                        <CloudUploadIcon />
                                                    </IconButton>
                                                </label>
                                            </>
                                        )}
                                    </Box>

                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            label="Medical History"
                                            variant="outlined"
                                            name="medicalHistory"
                                            value={patientData.medicalHistory.join(', ')}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Allergies"
                                            variant="outlined"
                                            name="allergies"
                                            value={patientData.allergies.join(', ')}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <FormControl fullWidth sx={{ mb: 2 }} disabled={!isEditing}>
                                            <InputLabel>Emergency Contact: Relationship</InputLabel>
                                            <Select
                                                value={patientData.emergencyContact.relationship}
                                                name="relationship"
                                                onChange={handleEmergencyContactChange}
                                            >
                                                <MenuItem value="Spouse">Spouse</MenuItem>
                                                <MenuItem value="Parent">Parent</MenuItem>
                                                <MenuItem value="Sibling">Sibling</MenuItem>
                                                <MenuItem value="Friend">Friend</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            label="Emergency Contact: Name"
                                            variant="outlined"
                                            name="name"
                                            value={patientData.emergencyContact.name}
                                            onChange={handleEmergencyContactChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Emergency Contact: Phone Number"
                                            variant="outlined"
                                            name="phoneNumber"
                                            value={patientData.emergencyContact.phoneNumber}
                                            onChange={handleEmergencyContactChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Height"
                                            variant="outlined"
                                            name="height"
                                            value={patientData.healthMetrics.height}
                                            onChange={handleHealthMetricsChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Weight"
                                            variant="outlined"
                                            name="weight"
                                            value={patientData.healthMetrics.weight}
                                            onChange={handleHealthMetricsChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Blood Group"
                                            variant="outlined"
                                            name="bloodGroup"
                                            value={patientData.healthMetrics.bloodGroup}
                                            onChange={handleHealthMetricsChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        {isEditing ? (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<CancelIcon />}
                                                    onClick={() => setIsEditing(false)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                                                    Save Changes
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                                                    Edit Profile
                                                </Button>
                                            </Box>
                                        )}
                                    </form>
                                </>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default PatientRoleProfile;
