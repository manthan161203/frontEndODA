import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const AdminForm = () => {
    const [user, setUser] = useState('');
    const [assignedDepartments, setAssignedDepartments] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userName = localStorage.getItem('userName');
            try {
                const response = await axios.get(`http://localhost:8001/user/getUserDetails/${userName}`);
                setUser(response.data._id);
            } catch (error) {
                console.error('Error fetching user ID:', error.message);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAssignedDepartments(value.split(',').map((dept) => dept.trim()));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8001/admin/createAdmin/`, {
                user,
                assignedDepartments,
            });
            console.log('Admin data updated:', response.data);
            window.location.href = '/admin';
        } catch (error) {
            console.error('Error updating admin data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Assigned Departments"
                name="assignedDepartments"
                value={assignedDepartments.join(',')}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default AdminForm;
