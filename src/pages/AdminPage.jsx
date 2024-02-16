import React from 'react';
import Sidebar from '../components/Sidebar';
import UserList from '../components/UserDetail';
import DoctorList from '../components/DoctorDetail';
import { Link, useParams } from 'react-router-dom';

const AdminPage = () => {
    const { role } = useParams();
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {role === "patient" && <UserList />}
                {["doctor", "therapist", "clinicaldoctor"].includes(role) && <DoctorList role={role} />}
            </main>
        </div>
    );
};

export default AdminPage;
