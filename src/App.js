import { createContext, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import DoctorPage from './pages/DoctorPage';
import { Grid, GridItem } from '@chakra-ui/react'; // Import Chakra UI Grid components

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
          h='100vh' // Set height to 100% of the viewport height
          gap='1'
          color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem pl='2' bg='orange.300' area={'header'}>
            <ResponsiveAppBar />
          </GridItem>

          <GridItem pl='2' bg='green.300' area={'main'}>
            <Routes>
              <Route path="/doctors/:doctorType" element={<DoctorPage />} />
            </Routes>
          </GridItem>

          <GridItem pl='2' bg='blue.300' area={'footer'}>
            Footer
          </GridItem>
          
        </Grid>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
