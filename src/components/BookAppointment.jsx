import React, { useContext, useState, useEffect } from 'react';
import "../assets/styles/bookappointment.css";
import axios from 'axios';
import { AppContext } from '../App';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

const BookAppointmentForm = ({ setModalOpen }) => {
    const { doctorID, userName, incrementAppointmentCounter, appointmentCounter } = useContext(AppContext);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
    });
    // console.log("Book Appointment: ");
    const email = localStorage.getItem('email');
    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // console.log(email);
    const bookAppointment = async (e) => {
        e.preventDefault();

        try {
            // console.log('Hii');
            // const appointmentId = `APPT${appointmentCounter + 1}`;
            await toast.promise(
                axios.post(
                    `http://localhost:8001/patient/bookAppointment/${email}`,
                    {
                        appointmentId: '1235',
                        patient: await getPatientId(),
                        doctor: doctorID,
                        date: formData.date,
                        slot: {
                            startTime: formData.time,
                            endTime: formData.time,
                        },
                        status: 'Pending',
                        prerequisite: '',
                        recommendedDoctors: [],
                        notes: '',
                    }
                ),
                {
                    success: 'Appointment booked successfully',
                    error: 'Unable to book appointment',
                    loading: 'Booking appointment...',
                }
            );
            // console.log('Appointment');
            setModalOpen(false);
            incrementAppointmentCounter();
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    const getPatientId = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/patient/getRoleBasedDetails/${userName}`);
            console.log(response.data[0]._id);
            return response.data[0]._id;
        } catch (error) {
            console.error('Error fetching patient data:', error);
            return null;
        }
    };

    return (
        <>
            <div className="modal flex-center">
                <div className="modal__content">
                    <h2 className="page-heading">Book Appointment</h2>
                    <IoMdClose
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        className="close-btn"
                    />
                    <div className="register-container flex-center book">
                        <form className="register-form">
                            <input
                                type="date"
                                name="date"
                                className="form-input"
                                value={formData.date}
                                onChange={inputChange}
                            />
                            <input
                                type="time"
                                name="time"
                                className="form-input"
                                value={formData.time}
                                onChange={inputChange}
                            />
                            <button
                                type="submit"
                                className="btn form-btn"
                                onClick={bookAppointment}
                            >
                                book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookAppointmentForm;
