import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Header';
import Hospitals from './components/Hospitals';
import DoctorPage from './components/DoctorPage';


function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/doctors" element={<DoctorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
