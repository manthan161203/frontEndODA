// DoctorPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorPage = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getAllDoctors');
        setDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctorData.map((doctor) => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPage;
