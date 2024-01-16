import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DoctorPage = () => {
    const { doctorType } = useParams();
    const [doctorData, setDoctorData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/doctor/getDoctorsByType/${doctorType}`);
                setDoctorData(response.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchData();
    }, [doctorType]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctorData.slice(indexOfFirstDoctor, indexOfLastDoctor);

    return (
        <>
            <div className="card-container">
                {currentDoctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>
            <div className="pagination-container">
                <Stack spacing={2} className="pagination">
                    <Pagination
                        count={Math.ceil(doctorData.length / doctorsPerPage)}
                        page={currentPage}
                        onChange={handleChange}
                        boundaryCount={2}
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            </div>
        </>
    );
};

export default DoctorPage;
