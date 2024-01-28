import React, { createContext, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorPage from './pages/DoctorPage';
import HospitalPage from './pages/HospitalPage';
import HospitalDoctorsPage from './pages/HospitalDoctorsPage';
import ProfilePage from './pages/ProfilePage';
import RoleProfilePage from './pages/RoleProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Loading from './components/Loading';
import EmptyPage from './pages/EmptyPage';
import AppointmentPage from './pages/AppointmentPage';
import { ProtectedRoute } from './middleware';
import AdminPage from './pages/AdminPage';


export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false);
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [doctorID, setDoctorID] = useState('');

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, userName, setUserName, doctorID, setDoctorID }}>
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/hospitals" element={<ProtectedRoute element={<HospitalPage />} />} />
                        <Route
                            path="/hospitals/doctors/:hospitalName"
                            element={<ProtectedRoute element={<HospitalDoctorsPage />} />}
                        />
                        <Route path="/doctors/:doctorType" element={<ProtectedRoute element={<DoctorPage />} />} />
                        <Route path="/profile/:userName" element={<ProtectedRoute element={<ProfilePage />} />} />
                        <Route path="/my-appointments/:userName" element={<ProtectedRoute element={<AppointmentPage />} />} />
                        {/* <Route path="/book-appointment" element={<ProtectedRoute element={<BookAppointmentPage />} />} /> */}
                        <Route
                            path="/profile-role/:userName"
                            element={<ProtectedRoute element={<RoleProfilePage />} />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/admin-page" element={<AdminPage />} />
                        <Route path="/empty" element={<EmptyPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
