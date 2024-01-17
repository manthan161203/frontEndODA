import { createContext, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import DoctorPage from './pages/DoctorPage';
import HospitalPage from './pages/HospitalPage';
import HospitalDoctorPage from './pages/HospitalDoctorPage';
import { Grid, GridItem } from '@chakra-ui/react';

export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <Router>
                <Grid
                    templateAreas={`"header header"
                                    "main main"
                                    "footer footer"`}
                    gridTemplateRows={'50px 1fr 30px'}
                    gridTemplateColumns={'150px 1fr'}
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
                        </Routes>
                    </GridItem>

                    <GridItem pl='2' bg='green.300' area={'main'}>
                        <Routes>
                            <Route path="/hospitals/doctors/:hospitalName" element={<HospitalDoctorPage />} />
                        </Routes>
                    </GridItem>

                    <GridItem pl='2' bg='green.300' area={'main'}>
                        <Routes>
                            <Route path="/doctors/:doctorType" element={<DoctorPage />} />
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
