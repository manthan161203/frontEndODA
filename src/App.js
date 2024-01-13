import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Header';
import DoctorPage from './components/DoctorPage';


function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/doctors/:doctorType" element={<DoctorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
