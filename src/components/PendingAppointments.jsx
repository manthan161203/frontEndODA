// DoctorDashboardPage.jsx

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentLabel, setAppointmentLabel] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [doctorList, setDoctorList] = useState(null);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8001/doctor/getAppointments/${doctorId}`
        );
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.status === "Pending"
        );
        setAppointments(filteredAppointments);
        if (response.data[0] !== 0) {
          for (const app of response.data) {
            if (app.status === "Pending") {
              setSelectedAppointment(app);
              break;
            }
          }
        }
        if (selectedAppointment == null) {
          setAppointmentLabel("No Appointments To Preview");
        } else {
          setAppointmentLabel("Appointmnet Preview");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    const getdoctorList = async () => {
      try {
        const doctors = await axios.get(
          `http://localhost:8001/doctor/getAllDoctors`
        );
        console.log(doctors);
        setDoctorList(doctors.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
    getdoctorList();
  }, []);

  const handleSlotClick = (info) => {
    const appointment = info.event.extendedProps.data;
    console.log(appointment);
    setAppointmentLabel("Appointmnet Preview");
    setSelectedAppointment(appointment);
  };

  const handleAccept = async (appointment) => {
    const prerequisiteInput = await Swal.fire({
      title: "Enter Prerequisite",
      input: "text",
      inputPlaceholder: "Enter prerequisite...",
      inputValidator: (value) => {
        if (!value) {
          return "Prerequisite cannot be empty";
        }
      },
      showCancelButton: true,
      confirmButtonText: "Next &rarr;",
    });

    if (prerequisiteInput.isDismissed) return;

    const notesInput = await Swal.fire({
      title: "Enter Notes",
      input: "textarea",
      inputPlaceholder: "Enter notes...",
      showCancelButton: true,
      confirmButtonText: "Accept",
      preConfirm: (notes) => {
        return axios.post(
          `http://localhost:8001/doctor/acceptAppointment/${appointment._id}`,
          {
            prerequisite: prerequisiteInput.value,
            notes: notes,
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (notesInput.isConfirmed && notesInput.value.status === 200) {
      Swal.fire("Accepted!", "Appointment has been accepted.", "success");
      // You may want to perform additional actions here after accepting the appointment
    } else {
      Swal.fire(
        "Error",
        "An error occurred while accepting the appointment.",
        "error"
      );
    }
    window.location.reload();
  };
  const handleRecommendReject = async (appointment) => {
    setDialogOpen(true);
  };
  const handleReject = (appointment) => {
    console.log("Appointment rejected:", appointment);
  };

  const handleRecommend = async (doctorId) => {
    console.log("Recommendation sent to doctor:", doctorId);
    const result = await axios.get(
      `http://localhost:8001/doctor/recommendDoctor/${selectedAppointment._id}/${doctorId}`
    );
    if (result.status == 200) {
      Swal.fire(
        "Doctor Recommendation Added",
        "Email has been sent to patient",
        "success"
      );
      window.location.reload();
    }
    setDialogOpen(false);
    // Handle recommendation logic...
  };
  return (
    <div className="dashboard-container">
      <NavBar />
      <Grid container spacing={3} className="content-container">
        <Grid item xs={12} md={6}>
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
                      marginTop: "20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#E9F1FA",
                    }}
                  >
                    <CardContent>
                      <h2
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          backgroundColor: "#d0d9eb",
                        }}
                      >
                        {appointmentLabel}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Appointment ID: {selectedAppointment.appointmentId}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Date: {selectedAppointment.date}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Notes: {selectedAppointment.notes}
                          </h4>
                        </div>
                        <div>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Patient Name:{" "}
                            {selectedAppointment.patient.user.firstName +
                              " " +
                              selectedAppointment.patient.user.lastName}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Allergies:{" "}
                            {selectedAppointment.patient &&
                              selectedAppointment.patient.allergies &&
                              selectedAppointment.patient.allergies.join(", ")}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Emergency Contact:{" "}
                            {selectedAppointment.patient &&
                              selectedAppointment.patient.emergencyContact &&
                              `${selectedAppointment.patient.emergencyContact.name}, Relationship: ${selectedAppointment.patient.emergencyContact.relationship}, Phone Number: ${selectedAppointment.patient.emergencyContact.phoneNumber}`}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Health Metrics:{" "}
                            {selectedAppointment.patient &&
                              selectedAppointment.patient.healthMetrics &&
                              `Height: ${selectedAppointment.patient.healthMetrics.height}, Weight: ${selectedAppointment.patient.healthMetrics.weight}, Blood Group: ${selectedAppointment.patient.healthMetrics.bloodGroup}`}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Medical History:{" "}
                            {selectedAppointment.patient &&
                              selectedAppointment.patient.medicalHistory &&
                              selectedAppointment.patient.medicalHistory.join(
                                ", "
                              )}
                          </h4>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            User ID:{" "}
                            {selectedAppointment.patient &&
                              selectedAppointment.patient.user &&
                              selectedAppointment.patient.user.userId}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Prerequisite: {selectedAppointment.prerequisite}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Recommended Doctors:{" "}
                            {selectedAppointment.recommendedDoctors &&
                              selectedAppointment.recommendedDoctors.join(", ")}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Slot :{" "}
                            {selectedAppointment.slot &&
                              selectedAppointment.slot.startTime}
                          </h4>
                          <h4
                            style={{
                              color: "#333",
                              marginBottom: "0.5rem",
                              fontSize: "1rem",
                            }}
                          >
                            Status: {selectedAppointment.status}
                          </h4>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAccept(selectedAppointment)}
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleRecommendReject(selectedAppointment)
                            }
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Recommand & Reject
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleReject(selectedAppointment)}
                            style={{
                              marginBottom: "0.5rem",
                              backgroundColor: "#FFD700",
                              color: "black",
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => console.log("View More clicked")}
                            style={{ marginBottom: "0.5rem" }}
                          >
                            View More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Card>
              </div>
            </div>
          )}
          {!selectedAppointment && (
            <div className="panel">
              <div className="panel-content">
                <Card
                  style={{
                    marginTop: "8.5%",
                  }}
                >
                  <CardContent>
                    <h2
                      style={{
                        textAlign: "center",
                        paddingBottom: "5px",
                      }}
                    >
                      {appointmentLabel}
                    </h2>
                    <img
                      src="http://easy-health-care.infinityfreeapp.com/doctor_chilling.png"
                      alt="Appointment Placeholder"
                      style={{ width: "100%", maxHeight: "400px" }}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={appointments.map((appointment) => ({
                title:
                  appointment.slot.startTime + " - " + appointment.slot.endTime,
                start: appointment.date,
                end: appointment.date,
                data: appointment,
                backgroundColor:
                  appointment.status === "Rejected" ? "#c43c33" : "#9fc5fd",
              }))}
              eventClick={handleSlotClick}
              height="100%"
              headerToolbar={{
                left: "",
                center: "title",
                right: "",
              }}
              contentHeight="auto"
              dayMaxEventRows={true}
              dayMaxEvents={true}
              eventDisplay="block"
              eventBackgroundColor="#FFA500"
            />
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth={true}
        maxWidth="md" // Adjust the width as needed
      >
        <DialogTitle>Recommend a Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a doctor to recommend to the patient.
          </DialogContentText>
          {doctorList &&
            doctorList.map((doctor) => (
              <div
                key={doctor.id}
                style={{
                  padding: "20px",
                  backgroundColor: "#DCDCDC",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-between", // Align items to the right
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}>Doctor Name :</span>
                  {doctor.user.firstName + " " + doctor.user.lastName}
                  {doctor.user.address}
                </div>
                <Button
                  onClick={() => handleRecommend(doctor._id)}
                  variant="contained"
                  color="primary"
                >
                  Recommend
                </Button>
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default PendingAppointments;
