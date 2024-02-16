/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/appointmentcard.css';

const AppointmentCard = ({ appointment }) => {
    const defaultProfilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    return (
        <div className="card">
            <div className="card-img flex-center">
                <img
                    src={appointment?.pic || defaultProfilePic}
                    alt="profile"
                />
            </div>
            <p className="card-name">
                <strong>AppointmentID: </strong>{appointment?.appointmentId}
            </p>
            <p className="date">
                <strong>Date: </strong>{appointment?.date}
            </p>
            <p className="slot">
                <strong>Slot: </strong>{appointment?.slot?.startTime} - {appointment?.slot?.endTime}
            </p>
            <p className="status">
                <strong>Status: </strong>
                {appointment?.status === 'Pending' && <button type="button" className="btn btn-warning">{appointment?.status}</button>}
                {appointment?.status === 'Accepted' && <button type="button" className="btn btn-success">{appointment?.status}</button>}
                {appointment?.status === 'Rejected' && <button type="button" className="btn btn-danger">{appointment?.status}</button>}
                {!['Pending', 'Accepted', 'Rejected'].includes(appointment?.status) && <button type="button" className="btn btn-secondary">{appointment?.status}</button>}
            </p>
        </div>
    );
};

export default AppointmentCard;
