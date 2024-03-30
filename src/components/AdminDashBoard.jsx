import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js/auto';

const AdminDashboardPage = () => {
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);
    const [patientsData, setPatientsData] = useState([]);
    const [hospitalsData, setHospitalsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch appointments data
                const appointmentsResponse = await axios.get('http://localhost:8001/doctor/getAllAppointments');
                setAppointmentsData(appointmentsResponse.data);

                // Fetch doctors data
                const doctorsResponse = await axios.post('http://localhost:8001/admin/getAllDoctors');
                setDoctorsData(doctorsResponse.data);

                // Fetch patients data
                const patientsResponse = await axios.get('http://localhost:8001/superAdmin/getAllPatient');
                setPatientsData(patientsResponse.data);

                // Fetch hospitals data
                const hospitalsResponse = await axios.get('http://localhost:8001/admin/getAllHospital');
                setHospitalsData(hospitalsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        Chart.register(CategoryScale, LinearScale, Title, Tooltip);
    }, []);

    const createChartData = (data, label, field) => ({
        labels: data.map(item => {
            const date = new Date(field ? item[field] : item.date || item.createdAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const formattedMonth = month < 10 ? `0${month}` : month;
            return `${year}-${formattedMonth}`;
        }),
        datasets: [
            {
                label,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: data.map(item => item.count)
            }
        ]
    });
    
    
    

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <NavBar />
            <Box sx={{ mb: 4 }} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <div className="panel">
                        <h2 style={{ textAlign: "center" }}>Dashboard Overview</h2>
                        <div className="panel-content">
                            <div className="card-group">
                                <div className="card inline">
                                    <h3>Appointments</h3>
                                    <p>Total: {appointmentsData.length}</p>
                                </div>
                                <div className="card inline">
                                    <h3>Doctors</h3>
                                    <p>Total: {doctorsData.length}</p>
                                </div>
                                <div className="card inline">
                                    <h3>Patients</h3>
                                    <p>Total: {patientsData.length}</p>
                                </div>
                                <div className="card inline">
                                    <h3>Hospitals</h3>
                                    <p>Total: {hospitalsData.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="panel">
                        <h2 style={{ textAlign: "center" }}>Graphs</h2>
                        <div className="panel-content">
                            <div className="chart-container">
                                <Bar
                                    data={createChartData(appointmentsData, 'Appointments')}
                                    options={chartOptions}
                                />
                            </div>
                            <div className="chart-container">
                                <Bar
                                    data={createChartData(doctorsData, 'Doctors')}
                                    options={chartOptions}
                                />
                            </div>
                            <div className="chart-container">
                                <Bar
                                    data={createChartData(patientsData, 'Patients')}
                                    options={chartOptions}
                                />
                            </div>
                            <div className="chart-container">
                                <Bar
                                    data={createChartData(hospitalsData, 'Hospitals')}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
};

export default AdminDashboardPage;
