import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import DoctorPage from './pages/DoctorPage';
import HospitalPage from './pages/HospitalPage';
import HospitalDoctorsPage from './pages/HospitalDoctorsPage';
import ProfilePage from './pages/ProfilePage';
import RoleProfilePage from './pages/RoleProfilePage';

export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [role, setRole] = useState('Patient');
    const [userName, setUserName] = useState('priya_d');

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, userName, setUserName }}>
            <Router>
                <Grid
                    templateAreas={`"header" "main" "footer"`}
                    gridTemplateRows={'50px 1fr 30px'}
                    gridTemplateColumns={'1fr'}
                    h='100vh'
                    gap='1'
                    color='blackAlpha.700'
                    fontWeight='bold'
                >
                    <GridItem pl='2' bg='orange.300' area={'header'}>
                        <NavBar />
                    </GridItem>

                    <GridItem pl='2' bg='green.300' area={'main'}>
                        <Routes>
                            <Route path="/hospitals" element={<HospitalPage />} />
                            <Route path="/hospitals/doctors/:hospitalName" element={<HospitalDoctorsPage />} />
                            <Route path="/doctors/:doctorType" element={<DoctorPage />} />
                            <Route path="/profile/:userName" element={<ProfilePage />} />
                            <Route path="/profile-role/:userName" element={<RoleProfilePage />} />
                        </Routes>
                    </GridItem>

                    <GridItem pl='2' bg='blue.300' area={'footer'}>
                        <Footer />
                    </GridItem>
                </Grid>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
