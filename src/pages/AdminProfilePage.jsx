import React from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const AdminProfilePage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Profile/>
            </main>
        </div>
    );
};

export default AdminProfilePage;
