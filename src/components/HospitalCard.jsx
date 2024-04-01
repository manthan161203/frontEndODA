/* eslint-disable no-unused-vars */
import '../assets/styles/hospitalcard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
    return (
        <div className="card">
            <div className="card-img flex-center">
                <img
                    src={hospital?.pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
                    alt="profile"
                />
            </div>
            <p className="hospital">
                <strong>Hospital: </strong>
                {hospital?.hospitalName}
            </p>
            <p className="ambulance">
                <strong>Ambulance: </strong>
                {hospital?.hasAmbulance && "Available"}
                {!hospital?.hasAmbulance && "Not Available"}
            </p>
            <p className="address">
                <strong>Address: </strong>
                {hospital?.location}
            </p>
            <Link to={`/hospitals/doctors/${encodeURIComponent(hospital.hospitalName)}`}>
                <button className="btn appointment-btn">
                    View Doctors
                </button>
            </Link>
        </div>
    );
};

export default HospitalCard;
