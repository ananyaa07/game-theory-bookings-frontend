import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import HomePage from './pages/HomePage'; 
import CreateBooking from './pages/customer/CreateBooking'; 
import ViewBookings from './pages/customer/ViewBookings';
import Operations from './pages/operations/Operations';
import TimeWiseBookings from './pages/operations/TimeWiseBookings';
import Promote from './pages/admin/promote';

const App = () => {
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> 

        <Route path="/home" element={<HomePage />} />

        <Route path="/create-booking" element={<CreateBooking userType={userType} />} />

        <Route
          path="/customer-dashboard"
          element={
            userType === 'customer' ? (
              <Navigate to="/create-booking" />
            ) : userType === 'operations' ? (
              <Navigate to="/operations-page" /> 
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login setUserType={setUserType} />} />

        <Route path="*" element={<Navigate to="/home" />} />

        <Route path="/view-bookings" element={<ViewBookings userType={userType} />} />

        <Route path="/operations-page" element={<Operations/>} /> 
        <Route path="/timewise-bookings" element={<TimeWiseBookings />} />
        <Route path="/promote" element={<Promote/>}/>

      </Routes>
    </Router>
  );
};

export default App;
