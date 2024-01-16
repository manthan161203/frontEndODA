/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
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
				console.log(response.data);
                // console.log(doctorData)
			} catch (error) {
				console.error('Error fetching doctor data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="card-container">
            {doctorData.map((doctor) => (
                <div key={doctor._id} className="card">
                    {/* {doctor} */}
                    <div className="card-img flex-center">
                        <img
                            src={doctor?.user?.pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
                            alt="profile"
                        />
                    </div>
                    <h3 className="card-name">
                        Dr. {doctor?.user?.firstName + " " + doctor?.user?.lastName}
                    </h3>
                    <p className="specialization">
                        <strong>Specialization: </strong>
                        {doctor?.doctorSpecialization}
                    </p>
                    <p className="fees">
                        <strong>Fees per consultation: </strong>$ {doctor?.fee}
                    </p>
                    <p className="experience">
                        <strong>Description: </strong>
                        {doctor?.doctorBio}yrs
                    </p>
                    <button className="btn appointment-btn" /*onClick={() => handleModal(doctor)}*/>
                        Book Appointment
                    </button>
                </div>
            ))}
        </div>
	);
};

export default DoctorPage;
