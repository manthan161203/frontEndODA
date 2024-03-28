import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem } from '@mui/material';

const DoctorForm = () => {
    const [user, setUser] = useState('');
    const [doctorSpecialization, setDoctorSpecialization] = useState('');
    const [doctorDegree, setDoctorDegree] = useState('');
    const [doctorBio, setDoctorBio] = useState('');
    const [doctorType, setDoctorType] = useState('doctor');
    const [hospitalID, setHospitalID] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [therapistAddress, setTherapistAddress] = useState('');
    const [appointmentTimeSlots, setAppointmentTimeSlots] = useState([]);
    const [fee, setFee] = useState('');
    const [assignedDepartments, setAssignedDepartments] = useState([]);

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

        let updatedData = {
            user,
            doctorSpecialization,
            doctorDegree,
            doctorBio,
            doctorType,
            appointmentTimeSlots,
            fee,
            assignedDepartments,
        };

        if (doctorType === 'doctor') {
            updatedData = {
                ...updatedData,
                hospitalID,
            };
        } else if (doctorType === 'clinical doctor') {
            updatedData = {
                ...updatedData,
                clinicAddress,
            };
        } else if (doctorType === 'therapist') {
            updatedData = {
                ...updatedData,
                therapistAddress,
            };
        }

        try {
            const response = await axios.post(`http://localhost:8001/doctor/createDoctor`, updatedData);
            console.log(response.data);
            window.location.href = '/doctor';
        } catch (error) {
            console.error('Error creating doctor:', error.message);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField
                label="Doctor Specialization"
                value={doctorSpecialization}
                onChange={(e) => setDoctorSpecialization(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Doctor Degree"
                value={doctorDegree}
                onChange={(e) => setDoctorDegree(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Doctor Bio"
                value={doctorBio}
                onChange={(e) => setDoctorBio(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                select
                label="Doctor Type"
                value={doctorType}
                onChange={(e) => setDoctorType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            >
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="clinical doctor">Clinical Doctor</MenuItem>
                <MenuItem value="therapist">Therapist</MenuItem>
            </TextField>
            {doctorType === 'doctor' && (
                <TextField
                    label="Hospital ID"
                    value={hospitalID}
                    onChange={(e) => setHospitalID(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
            {doctorType === 'clinical doctor' && (
                <TextField
                    label="Clinic Address"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
            {doctorType === 'therapist' && (
                <TextField
                    label="Therapist Address"
                    value={therapistAddress}
                    onChange={(e) => setTherapistAddress(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
            {doctorType !== 'doctor' && (
                <TextField
                    label="Fee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default DoctorForm;
