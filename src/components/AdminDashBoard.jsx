import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js/auto';

import axios from 'axios';

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

    const CountCard = ({ title, count }) => (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" color="primary" sx={{ mt: 1 }}>
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <CountCard title="Appointments" count={appointmentsData.length} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CountCard title="Doctors" count={doctorsData.length} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CountCard title="Patients" count={patientsData.length} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CountCard title="Hospitals" count={hospitalsData.length} />
                </Grid>
            </Grid>
            <Box sx={{ mb: 4 }} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Graphs
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div className="chart-container">
                                        <Bar
                                            data={createChartData(appointmentsData, 'Appointments')}
                                            options={chartOptions}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="chart-container">
                                        <Bar
                                            data={createChartData(doctorsData, 'Doctors')}
                                            options={chartOptions}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="chart-container">
                                        <Bar
                                            data={createChartData(patientsData, 'Patients')}
                                            options={chartOptions}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="chart-container">
                                        <Bar
                                            data={createChartData(hospitalsData, 'Hospitals')}
                                            options={chartOptions}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashboardPage;
