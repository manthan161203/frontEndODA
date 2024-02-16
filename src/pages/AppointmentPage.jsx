import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
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
    Typography,
    IconButton
} from '@mui/material';

const SearchInput = styled.input`
    width: 400px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
    outline: none;
`;

const AppointmentPage = () => {
    const { userName } = useParams();
    const [appointmentData, setAppointmentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [appointmentsPerPage, setAppointmentsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/patient/getAppointments/${userName}`);
                setAppointmentData(response.data);
                if (response.data[0] === undefined) {
                    window.location.href = '/empty';
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredAppointments = appointmentData.filter(appointment =>
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.slot.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedAppointments = () => {
        if (sortConfig.key !== null) {
            return filteredAppointments.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return filteredAppointments;
    };

    const pageCount = Math.ceil(filteredAppointments.length / appointmentsPerPage);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRecordsPerPageChange = (event) => {
        setAppointmentsPerPage(event.target.value);
        setCurrentPage(0);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <div className="search-bar">
                <h1 className='h2-tag'>Your Appointments</h1>
                <SearchInput
                    style={{ width: '400px', padding: '15px' }}
                    type="text"
                    placeholder="Search Appointment"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Container style={{ width: '100%' }}>
                <Box mt={4}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Your Appointments
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <Button onClick={() => requestSort('appointmentId')}>Appointment ID</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => requestSort('date')}>Date</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => requestSort('slot.startTime')}>Slot</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => requestSort('status')}>Status</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedAppointments()
                                    .slice(currentPage * appointmentsPerPage, (currentPage + 1) * appointmentsPerPage)
                                    .map((appointment) => (
                                        <TableRow key={appointment?.appointmentId}>
                                            <TableCell align="center">{`${appointment?.appointmentId}`}</TableCell>
                                            <TableCell align="center">{appointment?.date}</TableCell>
                                            <TableCell align="center">{appointment?.slot?.startTime}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color={appointment?.status === 'Pending' ? "warning" : appointment?.status === 'Accepted' ? "success" : appointment?.status === 'Rejected' ? "error" : "secondary"}
                                                    disableElevation={true}
                                                    className="status-button"
                                                >
                                                    {appointment?.status}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box>
                            <Typography variant="body1" sx={{ mr: 2 }}>Records per page:</Typography>
                            <Select value={appointmentsPerPage} onChange={handleRecordsPerPageChange}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                            {Array.from(Array(pageCount).keys()).map((index) => (
                                <Button key={index} onClick={() => handleChangePage(index)}>{index + 1}</Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default AppointmentPage;
