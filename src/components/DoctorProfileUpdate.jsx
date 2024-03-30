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

const DoctorRoleProfile = () => {
    const { userName, role } = useContext(AppContext);
    const lowercaseRole = role.toLowerCase();
    const [doctorData, setDoctorData] = useState({
        doctorSpecialization: '',
        doctorDegree: '',
        doctorBio: '',
        doctorType: 'doctor',
        hospitalID: '',
        clinicAddress: '',
        therapistAddress: '',
        fee: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/doctor/getRoleBasedDetails/${userName}`);
                if (response.data && response.data.length > 0) {
                    setDoctorData(response.data[0]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
                setIsLoading(false);
            }
        };

        fetchDoctorData();
    }, [userName, lowercaseRole]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

        try {
            const response = await axios.put(`http://localhost:8001/admin/updateDoctorData/${userName}`, doctorData);
            setIsEditing(false);
            console.log('Doctor data updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating doctor data:', error);
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
                                    <Avatar alt="User Image" src={doctorData?.image} sx={{ width: 80, height: 80 }} />
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
                                            label="Doctor Specialization"
                                            variant="outlined"
                                            name="doctorSpecialization"
                                            value={doctorData?.doctorSpecialization || ''}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Doctor Degree"
                                            variant="outlined"
                                            name="doctorDegree"
                                            value={doctorData?.doctorDegree || ''}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Doctor Bio"
                                            variant="outlined"
                                            name="doctorBio"
                                            value={doctorData?.doctorBio || ''}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        <TextField
                                            select
                                            fullWidth
                                            label="Doctor Type"
                                            variant="outlined"
                                            name="doctorType"
                                            value={doctorData?.doctorType || 'doctor'}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        >
                                            <MenuItem value="doctor">Doctor</MenuItem>
                                            <MenuItem value="clinical doctor">Clinical Doctor</MenuItem>
                                            <MenuItem value="therapist">Therapist</MenuItem>
                                        </TextField>
                                        {doctorData?.doctorType === 'doctor' && (
                                            <TextField
                                                fullWidth
                                                label="Hospital ID"
                                                variant="outlined"
                                                name="hospitalID"
                                                value={doctorData?.hospitalID || ''}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                                disabled={!isEditing}
                                            />
                                        )}
                                        {doctorData?.doctorType === 'clinical doctor' && (
                                            <TextField
                                                fullWidth
                                                label="Clinic Address"
                                                variant="outlined"
                                                name="clinicAddress"
                                                value={doctorData?.clinicAddress || ''}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                                disabled={!isEditing}
                                            />
                                        )}
                                        {doctorData?.doctorType === 'therapist' && (
                                            <TextField
                                                fullWidth
                                                label="Therapist Address"
                                                variant="outlined"
                                                name="therapistAddress"
                                                value={doctorData?.therapistAddress || ''}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                                disabled={!isEditing}
                                            />
                                        )}
                                        <TextField
                                            fullWidth
                                            label="Fee"
                                            variant="outlined"
                                            name="fee"
                                            value={doctorData?.fee || ''}
                                            onChange={handleChange}
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

export default DoctorRoleProfile;
