import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import HomePage from './pages/HomePage'; 
import CreateBooking from './pages/customer/CreateBooking'; 
import ViewBookings from './pages/customer/ViewBookings';


const App = () => {
  const [userType, setUserType] = useState(null); // Stores the logged-in user type

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> 

        <Route path="/home" element={<HomePage />} />

        <Route path="/create-booking" element={<CreateBooking userType={userType} />} />

        <Route
          path="/customer-dashboard"
          element={userType === 'customer' ? <Navigate to="/create-booking" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login setUserType={setUserType} />} />

        <Route path="*" element={<Navigate to="/home" />} />

        <Route path="/view-bookings" element={<ViewBookings userType={userType} />} />
      </Routes>
    </Router>
  );
};

export default App;
