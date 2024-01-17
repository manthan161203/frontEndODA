/* eslint-disable no-unused-vars */
import '../assets/styles/doctorcard.css';
import React from 'react';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="card">
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
            <p className="description">
                <strong>Description: </strong>
                {doctor?.doctorBio}
            </p>
            <button className="btn appointment-btn" /*onClick={() => handleModal(doctor)}*/>
                Book Appointment
            </button>
        </div>
    );
};

export default DoctorCard;
