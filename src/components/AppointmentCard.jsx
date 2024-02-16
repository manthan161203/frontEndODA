/* eslint-disable no-unused-vars */
import React from 'react';
import '../assets/styles/appointmentcard.css';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AppointmentCard = ({ appointment }) => {
    const defaultProfilePic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    return (
        
        // <div className="card">
        //     <div className="card-img flex-center">
        //         <img
        //             src={appointment?.pic || defaultProfilePic}
        //             alt="profile"
        //         />
        //     </div>
        //     <p className="card-name">
        //         <strong>AppointmentID: </strong>{appointment?.appointmentId}
        //     </p>
        //     <p className="date">
        //         <strong>Date: </strong>{appointment?.date}
        //     </p>
        //     <p className="slot">
        //         <strong>Slot: </strong>{appointment?.slot?.startTime} - {appointment?.slot?.endTime}
        //     </p>
        //     <p className="status">
        //         <strong>Status: </strong>
        //         {appointment?.status === 'Pending' && <button type="button" className="btn btn-warning">{appointment?.status}</button>}
        //         {appointment?.status === 'Accepted' && <button type="button" className="btn btn-success">{appointment?.status}</button>}
        //         {appointment?.status === 'Rejected' && <button type="button" className="btn btn-danger">{appointment?.status}</button>}
        //         {!['Pending', 'Accepted', 'Rejected'].includes(appointment?.status) && <button type="button" className="btn btn-secondary">{appointment?.status}</button>}
        //     </p>
        // </div>
        <TableContainer component={Paper} className="table-container">
    <Table className="table">
        <TableHead>
            <TableRow>
                <TableCell><strong>Field</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell><strong>Appointment ID:</strong></TableCell>
                <TableCell>{appointment?.appointmentId}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell><strong>Date:</strong></TableCell>
                <TableCell>{appointment?.date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell><strong>Slot:</strong></TableCell>
                <TableCell>{appointment?.slot?.startTime} - {appointment?.slot?.endTime}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell><strong>Status:</strong></TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color={appointment?.status === 'Pending' ? "warning" : appointment?.status === 'Accepted' ? "success" : appointment?.status === 'Rejected' ? "error" : "secondary"}
                        disableElevation={true}
                        className="status-button"
                    >
                        {appointment?.status}
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</TableContainer>
    );
};

export default AppointmentCard;
