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
			{/* Display doctor data */}
			{doctorData.map((doctor) => (
				<div key={doctor._id}>
					<h2>{doctor.name}</h2>
					<p>Specialization: {doctor.specialization}</p>
					<p>Experience: {doctor.experience} years</p>
					{/* Add more details based on your doctor data structure */}
				</div>
			))}
		</div>
	);
};

export default DoctorPage;
