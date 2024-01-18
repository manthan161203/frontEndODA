import '../assets/styles/hospitalcard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import BasicProfile from '../components/Profile';

const BasicProfilePage = () => {

    return (
        <div>
            <Box sx={{ mb : 4 }} />
            <h2>Your Basic Details</h2>
            {/* <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div> */}
            <BasicProfile/>
        </div>
    );
};

export default BasicProfilePage;
