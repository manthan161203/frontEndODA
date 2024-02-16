import React from 'react';
import Sidebar from '../components/Sidebar';
import UserList from '../components/UserDetail';
import DoctorList from '../components/DoctorDetail';

const AdminPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <UserList /> */}
                <DoctorList />
            </main>
        </div>
    );
};

export default AdminPage;
