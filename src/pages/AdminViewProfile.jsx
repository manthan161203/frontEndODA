import React from 'react';
import Sidebar from '../components/Sidebar';
import RegisterHospital from '../components/HospitalRegistration';
import Profile from '../components/Profile';

const AdminViewProfile = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Profile/>
            </main>
        </div>
    );
};

export default AdminViewProfile;
