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

const RoleProfile = () => {
    const { userName, role } = useContext(AppContext);
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/${role}/getRoleBasedDetails/${userName}`);
                setUserDetails(response.data[0]);
                setIsLoading(false);
                console.log(response.data);
                localStorage.setItem('roleID', userDetails._id);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userName, role]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setImageFile(null);
    };

    const handleInputChange = (key, value) => {
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [key]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                await axios.post(`http://localhost:8001/user/uploadImage/${userName}`, formData);
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

    const renderFields = (obj, parentKey = '') => {
        return Object.keys(obj).map((key) => {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;
            // console.log("Key: " + key);
            // console.log("Parent: " + parentKey);
            // console.log("Current: " + currentKey);
            if (!isNaN(key) && typeof obj[key] !== 'object') {
                return null;
            }

            if (Array.isArray(obj[key])) {
                return (
                    <TextField
                        key={currentKey}
                        fullWidth
                        label={currentKey.charAt(0).toUpperCase() + currentKey.slice(1)}
                        variant="outlined"
                        name={currentKey}
                        value={obj[key].join(', ')}
                        disabled={!isEditing}
                        onChange={(e) => setUserDetails({ ...userDetails, [currentKey]: e.target.value.split(', ') })}
                        sx={{ mb: 1 }}
                    />
                );
            } else if (typeof obj[key] === 'object') {
                return !ignoredFields.includes(currentKey) ? (
                    <Box key={currentKey} sx={{ mb: 1 }}>
                        {renderFields(obj[key], currentKey)}
                    </Box>
                ) : null;
            } else if (!ignoredFields.includes(currentKey)) {
                if (!isNaN(key)) {
                    return (
                        <TextField
                            key={currentKey}
                            fullWidth
                            label={parentKey.charAt(0).toUpperCase() + parentKey.slice(1)}
                            variant="outlined"
                            name={parentKey}
                            value={obj.map((item) => item[key]).join(', ')}
                            disabled={!isEditing}
                            onChange={(e) => setUserDetails({ ...userDetails, [parentKey]: e.target.value.split(', ') })}
                            sx={{ mb: 1 }}
                        />
                    );
                } else {
                    const label = `${parentKey.charAt(0).toUpperCase() + parentKey.slice(1)} - ${key.charAt(0).toUpperCase() + key.slice(1)}`;
                
                    return (
                        <TextField
                            key={currentKey}
                            fullWidth
                            label={label}
                            variant="outlined"
                            name={label}
                            value={obj[key]}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange(currentKey, e.target.value)}
                            sx={{ mb: 1 }}
                        />
                    );
                }
                
            }
            return null;
        });
    };

    const ignoredFields = ['_id', 'user', 'updatedAt', '__v'];

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
                                        {renderFields(userDetails)}
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

export default RoleProfile;
