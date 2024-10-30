import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import CreateBooking from './pages/customer/CreateBooking';
import ViewBookings from './pages/customer/ViewBookings';
import TimeWiseBookings from './pages/operations/TimeWiseBookings';
import Signup from './pages/Signup';
import Promote from './pages/admin/Promote';
import CreateCenter from './components/createCenter';
import CreateSport from './components/createSport';
import CreateResource from './components/createResource';
import AddSportCenter from './components/addSportCenter';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/bookings/create" element={
            <ProtectedRoute>
              <CreateBooking />
            </ProtectedRoute>
          } />
          <Route path="/bookings/view" element={
            <ProtectedRoute>
              <ViewBookings />
            </ProtectedRoute>
          } />
          <Route path="/timewise-bookings" element={
            <ProtectedRoute>
              <TimeWiseBookings />
            </ProtectedRoute>
          } />
          <Route path="/operations/create-sport" element={
            <ProtectedRoute>
              <CreateSport />
            </ProtectedRoute>
          } />
          <Route path="/operations/create-resource" element={
            <ProtectedRoute>
              <CreateResource />
            </ProtectedRoute>
          } />
          <Route path="/operations/create-center" element={
            <ProtectedRoute>
              <CreateCenter />
            </ProtectedRoute>
          } />
          <Route path="/promote" element={
            <ProtectedRoute>
              <Promote />
            </ProtectedRoute>
          } />
          <Route path="/operations/add-sport-center" element={
            <ProtectedRoute>
              <AddSportCenter />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
