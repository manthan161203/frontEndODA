import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
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

const AdminRoleProfile = () => {
    const { userName, role } = useContext(AppContext);
    const lowercaseRole = role.toLowerCase();
    const [adminData, setAdminData] = useState({
        assignedDepartments: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/admin/getRoleBasedDetails/${userName}`);
                if (response.data) {
                    setAdminData(response.data[0]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, [userName, lowercaseRole]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setImageFile(file);

        try {
            const formData = new FormData();
            formData.append('image', file);

            await axios.post(`http://localhost:8001/user/uploadImage/${userName}`, formData);
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
            console.log('Admin data updated successfully:', response.data);
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
                                    <Avatar alt="User Image" src={adminData?.image} sx={{ width: 80, height: 80 }} />
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
                                            value={Array.isArray(adminData.assignedDepartments) ? adminData.assignedDepartments.join(', ') : ''}
                                            onChange={handleChange}
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
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<SaveIcon />}
                                                >
                                                    Save Changes
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<EditIcon />}
                                                    onClick={() => setIsEditing(true)}
                                                >
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

export default AdminRoleProfile;
