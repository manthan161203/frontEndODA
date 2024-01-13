import { createContext, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Header';
import DoctorPage from './components/DoctorPage';
export const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AppContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/doctors/:doctorType" element={<DoctorPage />} />
        </Routes>
      </div>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
