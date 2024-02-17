import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

const HospitalList = (props) => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/admin/getAllHospital`);
                setHospitals(response.data);
            } catch (error) {
                console.error('Error fetching hospital list:', error);
            }
        };

        fetchHospitals();
    }, []);

    const handleDeleteHospital = async (hospitalId) => {
        try {
            await axios.delete(`http://localhost:8001/admin/deleteHospital/${hospitalId}`);
            setHospitals((prevHospitals) => prevHospitals.filter((hospital) => hospital.hospitalId !== hospitalId));
        } catch (error) {
            console.error('Error deleting hospital:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Hospital List
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Has Ambulance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitals.map((data) => (
                                <TableRow key={data.hospitalId}>
                                    <TableCell align="center">{data.hospitalName}</TableCell>
                                    <TableCell align="center">{data.location}</TableCell>
                                    <TableCell align="center">{data.hasAmbulance ? "Available" : "Not Available"}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="error"
                                            aria-label="Delete"
                                            onClick={() => handleDeleteHospital(data.hospitalId)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default HospitalList;
