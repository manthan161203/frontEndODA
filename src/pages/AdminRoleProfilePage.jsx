import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AdminRoleProfile from '../components/AdminProfileUpdate';

const AdminRoleProfilePage = () => {
    const isSubProfileSet = localStorage.getItem("isSubProfileSet");

    useEffect(() => {
        if (isSubProfileSet !== "true") {
            window.location.href = "/role-based-details";
        }
    }, [isSubProfileSet]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AdminRoleProfile />
            </main>
        </div>
    );
};

export default AdminRoleProfilePage;
