/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/doctorcard.css';

const DoctorCard = ({ doctor }) => {
    const defaultProfilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    return (
        <div className="card">
            <div className="card-img flex-center">
                <img
                    src={doctor?.user?.pic || defaultProfilePic}
                    alt="profile"
                />
            </div>
            <h3 className="card-name">
                Dr. {doctor?.user?.firstName} {doctor?.user?.lastName}
            </h3>
            <p className="specialization">
                <strong>Specialization: </strong>{doctor?.doctorSpecialization}
            </p>
            <p className="fees">
                <strong>Fees per consultation: </strong>${doctor?.fee}
            </p>
            <p className="description">
                <strong>Description: </strong>{doctor?.doctorBio}
            </p>
            <button className="btn appointment-btn">
                Book Appointment
            </button>
        </div>
    );
};

export default DoctorCard;
