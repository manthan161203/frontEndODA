import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ViewAppointment from "../components/ViewAppointment";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import FullCalendar from "@fullcalendar/react";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import dayGridPlugin from "@fullcalendar/daygrid";
import ActiveAppointmentCard from "../components/ActiveAppointmentCard";
import AppointmentPanel from "../components/AppointmentPanel";
import { useEffect, useState } from "react";
import axios from "axios";
const DoctorDashboardPage = () => {
  const centeredHeadingStyle = {
    textAlign: "center",
  };
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [appointmentLabel, setappointmentLabel] = useState(0);
  // const [doctorId, setDoctorId] = useState(0);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem("userId");
        console.log("doctor id : " + doctorId);
        const response = await axios.get(
          `http://localhost:8001/doctor/getAppointments/${doctorId}`
        );
        setAppointments(response.data);
        const activeApp = await axios.get(
          `http://localhost:8001/doctor/getActiveAppointment/${doctorId}`
        );

        const todayCountRes = await axios.get(
          `http://localhost:8001/doctor/getTodayAppointmentsCount/${doctorId}`
        );
        const upcomingCountRes = await axios.get(
          `http://localhost:8001/doctor/getUpComingAppointmentsCount/${doctorId}`
        );
        const pendingCountRes = await axios.get(
          `http://localhost:8001/doctor/getPendingAppointmentsCount/${doctorId}`
        );
        if (activeApp.data === 0) {
          for (const app of response.data) {
            if (app.status === "Pending" || app.status === "Accepted") {
              setSelectedAppointment(app);
              setappointmentLabel("Appointment Details");
              break;
            }
          }
        } else {
          setSelectedAppointment(activeApp.data[0]);
          setappointmentLabel("Active Appointment");
        }
        console.log(activeApp);
        setTodayCount(todayCountRes.data);
        setUpcomingCount(upcomingCountRes.data);
        setPendingCount(pendingCountRes.data);
        // console.log(activeApp)
        // console.log("JOD")
        // console.log(activeApp.data[0])
        // console.log("JODD")
        // console.log(selectedAppointment)
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSlotClick = (info) => {
    const appointment = info.event.extendedProps.data;
    console.log(appointment.doctor);
    setSelectedAppointment(appointment);
    setappointmentLabel("Appointment Details");
  };

  const handleStartAppointment = async (appointment) => {
    const startappSwal = await Swal.fire({
      title: "Are you sure you want to start appointment",
      showCancelButton: true,
      confirmButtonText: "Accept",
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (startappSwal.isConfirmed) {
      const response = await axios.get(
        `http://localhost:8001/doctor/startAppointment/${appointment._id}`
      );
      Swal.fire("Appointment is started", "done", "success").then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire("Cancelled", "Task Cancelled", "error");
    }
  };

  const handleCompleteAppointment = async (appointment) => {
    const compAppSwal = await Swal.fire({
      title: "Are you sure you want to complete appointment",
      showCancelButton: true,
      confirmButtonText: "Accept",
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (compAppSwal.isConfirmed) {
      const response = await axios.get(
        `http://localhost:8001/doctor/completeAppointment/${appointment._id}`
      );
      Swal.fire("Appointment is completed", "done", "success").then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire("Cancelled", "Task Cancelled", "error");
    }
  };
  const events = appointments.map((appointment) => ({
    title: appointment.slot.startTime + " - " + appointment.slot.endTime,
    start: appointment.date,
    end: appointment.date,
    data: appointment,
    backgroundColor:
      appointment.status === "Rejected"
        ? "#c43c33"
        : appointment.status === "Accepted"
        ? "#00FF00"
        : "#9fc5fd",
  }));

  return (
    <div>
      <NavBar />
      <Box sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div className="panel">
            <h2 style={{ textAlign: "center" }}>Appointments</h2>
            <div className="panel-content">
              <div className="card-group">
                <div className="card inline">
                  <h3>Remaining Appointments</h3>
                  <p>Total: {pendingCount}</p>
                </div>
                <div className="card inline">
                  <h3>Today's Appointments</h3>
                  <p>Total: {todayCount}</p>
                </div>
                <div className="card inline">
                  <h3>Upcoming Appointments</h3>
                  <p>Total: {upcomingCount}</p>
                </div>
              </div>
              {selectedAppointment && (
                <div className="panel">
                  <div className="panel-content">
                    <Card
                      sx={{
                        width: "99%",
                        height: "100%",
                        margin: "auto",
                        marginTop: 2,
                        marginLeft: 1,
                        padding: 0.5,
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#1873CC",
                      }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "6px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#E9F1FA",
                        }}
                      >
                        <CardContent>
                          <h2
                            style={{
                              textAlign: "center",
                              marginTop: 2,
                              backgroundColor: "#d0d9eb",
                            }}
                          >
                            {appointmentLabel}
                          </h2>

                          <h2
                            style={{
                              marginBottom: "1rem",
                              marginTop: 3,
                              color: "#333",
                            }}
                          >
                            Appointment ID: {selectedAppointment.appointmentId}
                          </h2>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Doctor:{" "}
                            {selectedAppointment.doctor.user.firstName +
                              " " +
                              selectedAppointment.doctor.user.lastName}
                          </h4>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Date: {selectedAppointment.date}
                          </h4>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Slot: {selectedAppointment.slot.startTime} -{" "}
                            {selectedAppointment.slot.endTime}
                          </h4>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Status: {selectedAppointment.status}
                          </h4>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Prerequisite: {selectedAppointment.prerequisite}
                          </h4>
                          <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                            Notes: {selectedAppointment.notes}
                          </h4>
                          <div
                            style={{
                              borderRadius: "20px",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => console.log("View More clicked")}
                            >
                              View More
                            </Button>
                            {selectedAppointment.status == "Accepted" && (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                  handleStartAppointment(selectedAppointment)
                                }
                              >
                                Start Appointment
                              </Button>
                            )}
                            {selectedAppointment.status == "Active" && (
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                  handleCompleteAppointment(selectedAppointment)
                                }
                              >
                                Complete Appointment
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleSlotClick}
            />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default DoctorDashboardPage;
