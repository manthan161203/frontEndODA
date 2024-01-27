/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import '../assets/styles/doctorcard.css';
import BookAppointmentForm from "../components/BookAppointment";
import { AppContext } from '../App';

const DoctorCard = ({ doctor }) => {
    const { setDoctorID } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const handleModal = () => {
        setDoctorID(doctor?._id);
        setModalOpen(true);
    };
    const defaultProfilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    // const handleBookAppointment = () => {
    //     setDoctorID(doctor?._id);
    //     window.location.href = '/book-appointment';
    // };

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
            <button className="btn appointment-btn" onClick={handleModal}>
                Book Appointment
            </button>
            {modalOpen && (
                <BookAppointmentForm
                    setModalOpen={setModalOpen}
                    doctor={doctor}
                />
            )}
        </div>
    );
};

export default DoctorCard;
