import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/superAdmin/getAllPatient`);
                setUsers(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userName) => {
        try {
            await axios.delete(`http://localhost:8001/superAdmin/deleteAdmin/${userName}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userName !== userName));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" color="primary" gutterBottom>
                    User List
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">User ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((data) => (
                                <TableRow key={data.user.userId}>
                                    <TableCell align="center">{data.user.userId}</TableCell>
                                    <TableCell align="center">{`${data.user.firstName} ${data.user.lastName}`}</TableCell>
                                    <TableCell align="center">{data.user.email}</TableCell>
                                    <TableCell align="center">{data.user.userName}</TableCell>
                                    <TableCell align="center">{data.user.role}</TableCell>
                                    <TableCell align="center">
                                        <Link to={`/profile/${data.user?.userName}`}>
                                            <IconButton color="info" aria-label="View">
                                                <Visibility />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            color="error"
                                            aria-label="Delete"
                                            onClick={() => handleDeleteUser(data.user.userName)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default UserList;
