import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DoctorPage from './pages/DoctorPage';
import HospitalPage from './pages/HospitalPage';
import HospitalDoctorsPage from './pages/HospitalDoctorsPage';
import ProfilePage from './pages/ProfilePage';
import RoleProfilePage from './pages/RoleProfilePage';
import ErrorPage from './pages/ErrorPage';
import RegisterHospital from './pages/CreateHospital';
import AdminDashboard from './pages/AdminDashBoardPage';
import AdminPage from './pages/AdminPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminRoleProfilePage from './pages/AdminRoleProfilePage';
import AdminViewProfile from './pages/AdminViewProfile';
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import DoctorDashBoardPage from './pages/DoctorDashBoardPage';
import PendingAppointments from './components/PendingAppointments';
import HistoryAppointments from './components/HistoryDoctorPanel';
import EmptyPage from './pages/EmptyPage';
import RoleBasedDetailsPage from './pages/RoleBasedDetailsPage';

export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [role, setRole] = useState(localStorage.getItem('role'));

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/doctor" element={isLoggedIn && role === 'DOCTOR' ? <DoctorDashBoardPage /> : <Navigate to="/login" />} />
                    <Route path="/doctor/review-appointments" element={isLoggedIn && (role === 'DOCTOR' || role === 'CLINICAL DOCTOR' || role === 'THERAPIST') ? <PendingAppointments /> : <Navigate to="/login" />} />
                    <Route path="/doctor/history" element={isLoggedIn && (role === 'DOCTOR' || role === 'CLINICAL DOCTOR' || role === 'THERAPIST') ? <HistoryAppointments /> : <Navigate to="/login" />} />
                    <Route path="/hospitals" element={isLoggedIn ? <HospitalPage /> : <Navigate to="/login" />} />
                    <Route path="/hospitals/doctors/:hospitalName" element={isLoggedIn ? <HospitalDoctorsPage /> : <Navigate to="/login" />} />
                    <Route path="/profile/:userName" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
                    <Route path="/my-appointments/:userName" element={isLoggedIn ? <AppointmentPage /> : <Navigate to="/login" />} />
                    <Route path="/profile-role/:userName" element={isLoggedIn ? <RoleProfilePage /> : <Navigate to="/login" />} />
                    <Route path="/profile-role-admin/:userName" element={isLoggedIn && role === 'ADMIN' ? <AdminRoleProfilePage /> : <Navigate to="/login" />} />
                    <Route path="/admin/*" element={isLoggedIn && role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
                    <Route path="/admin-page/:role/*" element={isLoggedIn && role === 'ADMIN' ? <AdminPage /> : <Navigate to="/login" />} />
                    <Route path="/profile-admin/:userName" element={isLoggedIn && role === 'ADMIN' ? <AdminProfilePage /> : <Navigate to="/login" />} />
                    <Route path="/admin-page/profile/:userName" element={isLoggedIn && role === 'ADMIN' ? <AdminViewProfile /> : <Navigate to="/login" />} />
                    <Route path="/empty" element={<EmptyPage />} />
                    <Route path="/role-based-details" element={<RoleBasedDetailsPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
