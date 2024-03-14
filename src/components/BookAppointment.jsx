import React, { useContext, useState, useEffect } from 'react';
import "../assets/styles/bookappointment.css";
import axios from 'axios';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

import { IoMdClose } from 'react-icons/io';
import Swal from 'sweetalert2';

const BookAppointmentForm = ({ setModalOpen }) => {
    const { doctorID, userName, incrementAppointmentCounter, appointmentCounter } = useContext(AppContext);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
    });
    const [timeOptions, setTimeOptions] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        generateTimeOptions();
    }, []); // Generate options when component mounts

    useEffect(() => {
        const interval = setInterval(() => setCurrentDateTime(new Date()), 1000); // Update current date and time every second
        return () => clearInterval(interval);
    }, []);

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 9; hour < 17; hour++) { // Restrict hours from 9 to 16 (5 PM)
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const startTime = `${formattedHour}:${formattedMinute}`;
                const endTime = new Date(`1970-01-01T${startTime}:00`);
                endTime.setMinutes(endTime.getMinutes() + 15); // Add 15 minutes to the start time
                const formattedEndTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
                options.push(`${startTime} - ${formattedEndTime}`);
            }
        }
        setTimeOptions(options);
    };
    

    const email = localStorage.getItem('email');
    
    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const bookAppointment = async (e) => {
        e.preventDefault();

        try {
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
                            endTime: formData.time, // Assuming appointment is of 30 minutes
                        },
                        status: 'Pending',
                        prerequisite: '',
                        recommendedDoctors: [],
                        notes: '',
                    }
                ),
                {
                    success: Swal.fire('Done', 'Appointment booked successfully', 'success'),
                    error: 'Unable to book appointment',
                    loading: 'Booking appointment...',
                }
            );
            
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
                            <div className="form-group">
                                <label>Date:<span style={{marginLeft:"20px"}}></span></label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-input"
                                    value={formData.date}
                                    onChange={inputChange}
                                    min={currentDateTime.toISOString().split('T')[0]} // Prevent selecting past dates
                                />
                            </div>
                            <div className="form-group">
                                <label>Time: <span style={{marginLeft:"15px"}}></span></label>
                                <select
                                    name="time"
                                    className="form-input"
                                    value={formData.time}
                                    onChange={inputChange}
                                    disabled={!formData.date} // Disable time selection until date is selected
                                >
                                    <option value="">Select Time</option>
                                    {timeOptions.map((option, index) => (
                                        <option key={index} value={option} disabled={formData.date && new Date(formData.date + 'T' + option + ':00') < currentDateTime}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type="submit"
                                className="btn form-btn"
                                onClick={bookAppointment}
                                disabled={!formData.date || !formData.time} // Disable button until both date and time are selected
                            >
                                Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookAppointmentForm;
