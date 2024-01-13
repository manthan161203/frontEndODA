/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DoctorPage = () => {
  const { doctorType } = useParams();
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/doctor/getDoctorsByType/${doctorType}`);
        setDoctorData(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
    </div>
  );
};

export default DoctorPage;
