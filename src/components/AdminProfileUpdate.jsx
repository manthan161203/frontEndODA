import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AdminProfileForm = () => {
    const userName = localStorage.getItem('userName');
    const [adminData, setAdminData] = useState({
        user: '',
        assignedDepartments: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/admin/getRoleBasedDetails/${userName}`);
                // console.log(response.data[0])
                setAdminData(response.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, [userName]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'assignedDepartments') {
            const arrValue = value.split(',').map((item) => item.trim());
            setAdminData({
                ...adminData,
                [name]: arrValue,
            });
        } else {
            setAdminData({
                ...adminData,
                [name]: value,
            });
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post(`http://localhost:8001/admin/uploadImage/${userName}`, formData);
            console.log('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8001/admin/updateAdminData/${userName}`, adminData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating admin data:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Avatar alt="Admin Image" src={adminData.image} sx={{ width: 80, height: 80 }} />
                                    <Box mt={2} mb={1}>
                                        {isEditing && (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="upload-image"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange}
                                                />
                                                <label htmlFor="upload-image">
                                                    <IconButton component="span" color="primary" aria-label="upload image">
                                                        <CloudUploadIcon />
                                                    </IconButton>
                                                </label>
                                            </>
                                        )}
                                    </Box>

                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            label="Assigned Departments"
                                            variant="outlined"
                                            name="assignedDepartments"
                                            value={adminData.assignedDepartments ? adminData.assignedDepartments.join(', ') : ''}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            sx={{ mb: 2 }}
                                            disabled={!isEditing}
                                        />
                                        {isEditing ? (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<CancelIcon />}
                                                    onClick={() => setIsEditing(false)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                                                    Save Changes
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                                                    Edit Profile
                                                </Button>
                                            </Box>
                                        )}
                                    </form>
                                </>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default AdminProfileForm;
