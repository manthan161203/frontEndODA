import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
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

const Profile = () => {
    const { userName } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [originalEmail, setOriginalEmail] = useState('');
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/user/getUserDetails/${userName}`);
                setUserDetails(response.data);
                setIsLoading(false);
                setOriginalEmail(response.data.email);
                setOriginalPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userName]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setImageFile(null);
    };

    const handleSaveChanges = async () => {
        try {
            // Proceed with saving changes
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                await axios.post(`http://localhost:8001/user/uploadImage/${userName}`, formData);
            }

            if (userDetails.email !== originalEmail) {
                const emailExistsResponse = await axios.post(`http://localhost:8001/user/checkEmail`, { email: userDetails.email });
                if (emailExistsResponse.data.exists) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already exists!',
                    });
                    return;
                }
            }

            if (userDetails.phoneNumber !== originalPhoneNumber) {
                const phoneNumberExistsResponse = await axios.post(`http://localhost:8001/user/checkPhoneNumber`, { phoneNumber: userDetails.phoneNumber });
                if (phoneNumberExistsResponse.data.exists) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Phone number already exists!',
                    });
                    return;
                }
            }

            await axios.put(`http://localhost:8001/user/updateUserDetails/${userName}`, userDetails);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving user details:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const ignoredFields = ['_id', 'otp', 'userId', 'invalidOTPAttempts', 'updatedAt', '__v', 'password', 'createdAt', 'isSubProfileSet', 'role'];

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
                                    <Avatar alt="User Image" src={userDetails.image} sx={{ width: 80, height: 80 }} />
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

                                    <form>
                                        {Object.keys(userDetails)
                                            .filter((key) => !ignoredFields.includes(key))
                                            .map((key) => (
                                                <TextField
                                                    key={key}
                                                    fullWidth
                                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                    variant="outlined"
                                                    name={key}
                                                    value={userDetails[key]}
                                                    disabled={!isEditing || key === 'userName'} // Disable userName field
                                                    onChange={(e) => setUserDetails({ ...userDetails, [key]: e.target.value })}
                                                    sx={{ mb: 1 }}
                                                />
                                            ))}
                                        {isEditing ? (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<CancelIcon />}
                                                    onClick={handleCancelEdit}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveChanges}>
                                                    Save Changes
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEditClick}>
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

export default Profile;
