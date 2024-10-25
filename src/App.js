import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import CreateBooking from './pages/customer/CreateBooking';
import ViewBookings from './pages/customer/ViewBookings';
import TimeWiseBookings from './pages/operations/TimeWiseBookings';
import Signup from './pages/Signup';
import Promote from './pages/admin/Promote';
import CreateCentre from './components/createCentre';
import CreateSport from './components/createSport';
import CreateResource from './components/createResource';

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<Login setUserType={setRole} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/bookings/create" element={<CreateBooking role={role} />} />
        <Route path="/bookings/view" element={<ViewBookings role={role} />} />
        <Route path="/timewise-bookings" element={<TimeWiseBookings />} />
        <Route path="/operations/create-sport" element={<CreateSport />} />
        <Route path="/operations/create-resource" element={<CreateResource />} />
        <Route path="/operations/create-centre" element={<CreateCentre />} />
        <Route path="/promote" element={<Promote />} />

        {/* Fallback route to home page */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
