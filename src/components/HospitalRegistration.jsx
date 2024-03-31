import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Button,
    Container,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';

const RegisterHospital = () => {
    const [hospitalId, setHospitalId] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [location, setLocation] = useState('');
    const [hasAmbulance, setHasAmbulance] = useState(false);
    const [ambulances, setAmbulances] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleAddAmbulance = () => {
        setAmbulances([...ambulances, { plateNumber: '', model: '', isAvailable: true }]);
    };

    const handleAmbulanceChange = (index, event) => {
        const updatedAmbulances = [...ambulances];
        updatedAmbulances[index][event.target.name] = event.target.value;
        setAmbulances(updatedAmbulances);
    };

    const handleRemoveAmbulance = (index) => {
        const updatedAmbulances = [...ambulances];
        updatedAmbulances.splice(index, 1);
        setAmbulances(updatedAmbulances);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);
        if (!hospitalId || !hospitalName || !location) {
            Swal.fire('Error', 'Please fill in all required fields', 'error');
            return;
        }

        setLoading(true);
        // console.log("Hi");
        try {
            await axios.post(`http://localhost:8001/admin/createHospital`, {
                hospitalId,
                hospitalName,
                location,
                hasAmbulance,
                ambulances,
                image,
            });

            Swal.fire('Success', 'Hospital registered successfully', 'success');
            setHospitalId('');
            setHospitalName('');
            setLocation('');
            setHasAmbulance(false);
            setAmbulances([]);
            setImage('');
            setFormSubmitted(false);
        } catch (error) {
            console.error('Error registering hospital:', error);
            Swal.fire('Error', 'An error occurred while registering the hospital', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4" gutterBottom>
                    Create Hospital
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        label="Hospital ID"
                        variant="outlined"
                        type="text"
                        value={hospitalId}
                        onChange={(e) => setHospitalId(e.target.value)}
                        sx={{ mb: 2 }}
                        error={formSubmitted && !hospitalId}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Hospital Name"
                        variant="outlined"
                        type="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        sx={{ mb: 2 }}
                        error={formSubmitted && !hospitalName}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        variant="outlined"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ mb: 2 }}
                        error={formSubmitted && !location}
                        required
                    />
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Has Ambulance</InputLabel>
                        <Select
                            value={hasAmbulance}
                            onChange={(e) => setHasAmbulance(e.target.value)}
                            label="Has Ambulance"
                            error={formSubmitted && hasAmbulance === ''}
                            required
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    {hasAmbulance && (
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddAmbulance}
                                sx={{ mb: 2 }}
                            >
                                Add Ambulance
                            </Button>
                            {ambulances.map((ambulance, index) => (
                                <div key={index} style={{ marginBottom: '8px' }}>
                                    <TextField
                                        fullWidth
                                        label={`Ambulance #${index + 1} Plate Number`}
                                        variant="outlined"
                                        type="text"
                                        name="plateNumber"
                                        value={ambulance.plateNumber}
                                        onChange={(e) => handleAmbulanceChange(index, e)}
                                        sx={{ mb: 1 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label={`Ambulance #${index + 1} Model`}
                                        variant="outlined"
                                        type="text"
                                        name="model"
                                        value={ambulance.model}
                                        onChange={(e) => handleAmbulanceChange(index, e)}
                                        sx={{ mb: 1 }}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveAmbulance(index)}
                                    >
                                        Remove Ambulance
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        accept="image/*"
                        id="image-file"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="image-file">
                        <Button
                            variant="outlined"
                            component="span"
                            sx={{ mb: 2 }}
                        >
                            Upload Hospital Image
                        </Button>
                    </label>
                    {image && (
                        <img src={image} alt="Hospital Preview" style={{ maxWidth: '100%', marginBottom: '16px' }} />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register Hospital'}
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default RegisterHospital;
