import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Container, Typography } from '@mui/material';

const AdminForm = () => {
    const [user, setUser] = useState('');
    const [assignedDepartments, setAssignedDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

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
        const { value } = event.target;
        setAssignedDepartments(value.split(',').map((dept) => dept.trim()));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:8001/admin/createAdmin/`, {
                user,
                assignedDepartments,
            });
            console.log('Admin data updated:', response.data);
            localStorage.setItem('isSubProfileSet', true);
            window.location.href = '/admin';
        } catch (error) {
            console.error('Error updating admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4" gutterBottom>
                    Admin Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Assigned Departments"
                        name="assignedDepartments"
                        value={assignedDepartments.join(',')}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        error={formSubmitted && assignedDepartments.length === 0}
                        helperText={formSubmitted && assignedDepartments.length === 0 && 'Please select at least one department'}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading || assignedDepartments.length === 0}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default AdminForm;
