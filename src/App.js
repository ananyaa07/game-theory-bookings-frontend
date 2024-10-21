import React, { useState } from 'react';
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
  const [role,setRole] = useState(null); 

  const PrivateRoute = ({ children }) => {
    return role? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<Login setUserType={setRole} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {role === 'customer' ? (
                <Navigate to="/bookings/create" />
              ) : role === 'admin' ? (
                <Navigate to="/promote" />
              ) : role === 'operations' ? (
                <Navigate to="/create-sport" />
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings/create"
          element={
            <PrivateRoute>
              <CreateBooking role={role} />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookings/view"
          element={
            <PrivateRoute>
              <ViewBookings role={role} />
            </PrivateRoute>
          }
        />
        <Route
          path="/timewise-bookings"
          element={
            <PrivateRoute>
              <TimeWiseBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/operations/create-sport"
          element={
            <PrivateRoute>
              <CreateSport />
            </PrivateRoute>
          }
        />
        <Route
          path="/operations/create-resource"
          element={
            <PrivateRoute>
              <CreateResource />
            </PrivateRoute>
          }
        />
        <Route
          path="/operations/create-centre"
          element={
            <PrivateRoute>
              <CreateCentre />
            </PrivateRoute>
          }
        />
        <Route
          path="/promote"
          element={
            <PrivateRoute>
              <Promote />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
