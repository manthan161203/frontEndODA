import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Typography, TextField } from "@mui/material";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const PreviousAppointmentsPage = () => {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const doctorId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8001/doctor/getAppointmentsHistoryByDoctorID/${localStorage.getItem(
            "userId"
          )}`
        );
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.status !== "Pending"
        );
        console.log(filteredAppointments);
        setPastAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };

    fetchPastAppointments();
  }, []);

  // Function to group appointments by date
  const groupAppointmentsByDate = (appointments) => {
    const groupedAppointments = {};
    appointments.forEach((appointment) => {
      const date = appointment.date;
      if (!groupedAppointments[date]) {
        groupedAppointments[date] = [];
      }
      groupedAppointments[date].push(appointment);
    });
    return groupedAppointments;
  };

  // Function to filter appointments by date range
  const filterAppointmentsByDateRange = () => {
    const filteredAppointments = pastAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        (!startDate || appointmentDate >= new Date(startDate)) &&
        (!endDate || appointmentDate <= new Date(endDate))
      );
    });
    return filteredAppointments;
  };

  // Function to get the weekday from date
  const getWeekdayFromDate = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <div style={{ margin: 20 }}>
        <Grid container spacing={3} className="content-container">
          <Grid item xs={12}>
            <div className="panel">
              <div className="panel-content">
                <Typography
                  variant="h4"
                  style={{
                    margin: "20px",
                    backgroundColor: "#E9F1FA",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  gutterBottom
                >
                  Previous Appointments
                </Typography>
                <TextField
                  id="start-date"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginRight: "20px" }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                  id="end-date"
                  label="End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {Object.entries(
                  groupAppointmentsByDate(filterAppointmentsByDateRange())
                ).map(([date, appointments]) => (
                  <div key={date}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#F0F8FF",
                        padding: "5px",
                        borderRadius: "3px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {getWeekdayFromDate(date)}, {date}
                      </span>
                      <span>
                        {" "}
                        {appointments.length}{" "}
                        {appointments.length === 1
                          ? "Appointment"
                          : "Appointments"}
                      </span>
                    </Typography>
                    <Grid container spacing={3}>
                      {appointments.map((appointment) => (
                        <Grid key={appointment._id.$oid} item xs={12} sm={6}>
                          <Card
                            style={{
                              marginBottom: "20px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#FFFFFF",
                            }}
                          >
                            <CardContent>
                              <Typography
                                variant="h6"
                                gutterBottom
                                style={{ color: "#007BFF" }}
                              >
                                Appointment ID: {appointment.appointmentId}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Status: {appointment.status}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Doctor: {appointment.doctor.user.firstName}{" "}
                                {appointment.doctor.user.lastName}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Patient: {appointment.patient.user.firstName}{" "}
                                {appointment.patient.user.lastName}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Date: {appointment.date}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Slot: {appointment.slot.startTime} -{" "}
                                {appointment.slot.endTime}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Prerequisite: {appointment.prerequisite}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Notes: {appointment.notes}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </div>
  );
};

export default PreviousAppointmentsPage;
