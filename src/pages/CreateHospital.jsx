import React from 'react';
import Sidebar from '../components/Sidebar';
import RegisterHospital from '../components/HospitalRegistration';

const HospitalCreate = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <RegisterHospital/>
            </main>
        </div>
    );
};

export default HospitalCreate;
