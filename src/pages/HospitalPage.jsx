import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import HospitalCard from '../components/HospitalCard';
import '../assets/styles/hospitalcard.css';

const HospitalPage = () => {
    const [hospitalData, setHospitalData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/admin/getAllHospital`);
                console.log(response.data);
                setHospitalData(response.data);
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredHospitals = hospitalData.filter((hospital) =>
        hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.hasAmbulance.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Box sx={{ mb: 4 }} />
            <h2>Our Hospitals</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="card-container">
                {filteredHospitals.map((hospital) => (
                    <HospitalCard key={hospital._id} hospital={hospital} />
                ))}
            </div>
        </div>
    );
};

export default HospitalPage;
