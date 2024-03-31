import React from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import AdminDashboardPage from '../components/AdminDashBoard';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AdminDashboardPage/>
            </main>
        </div>
    );
};

export default AdminDashboard;
