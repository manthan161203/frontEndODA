/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import '../assets/styles/doctorcard.css';
import BookAppointmentForm from '../components/BookAppointment';
import { AppContext } from '../App';

const DoctorCard = ({ doctor }) => {
    const { setDoctorID } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState(null);

    useEffect(() => {
        setCurrentDoctor(doctor);
    }, [doctor]);

    const handleModal = () => {
        if (currentDoctor?._id) {
            setDoctorID((prevDoctorID) =>
                prevDoctorID !== currentDoctor._id ? currentDoctor._id : prevDoctorID
            );
            setModalOpen(true);
        }
    };

    const defaultProfilePic =
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

    return (
        <div className="card">
            <div className="card-img flex-center">
                <img src={currentDoctor?.user?.pic || defaultProfilePic} alt="profile" />
            </div>
            <h3 className="card-name">
                Dr. {currentDoctor?.user?.firstName} {currentDoctor?.user?.lastName}
            </h3>
            <p className="specialization">
                <strong>Specialization: </strong>
                {currentDoctor?.doctorSpecialization}
            </p>
            <p className="fees">
                <strong>Fees per consultation: </strong>${currentDoctor?.fee}
            </p>
            <p className="description">
                <strong>Description: </strong>
                {currentDoctor?.doctorBio}
            </p>
            <button className="btn appointment-btn" onClick={handleModal}>
                Book Appointment
            </button>
            {modalOpen && currentDoctor && currentDoctor._id && (
                <BookAppointmentForm setModalOpen={setModalOpen} doctor={currentDoctor} />
            )}
        </div>
    );
};

export default React.memo(DoctorCard);
