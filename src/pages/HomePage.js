import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
        <Navbar/>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-navyBlue mb-6">Welcome to Game Theory Booking</h1>
          <p className="text-lg text-gray-700 mb-10">
            A platform where you can easily manage your bookings. Effortlessly create, view, and manage all your bookings in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <span className="material-icons text-6xl text-navyBlue">visibility</span>
              <h2 className="text-2xl font-semibold text-navyBlue mt-4">View Bookings</h2>
              <p className="text-gray-600 mt-2">Easily view all your current bookings and manage them efficiently.</p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg">
              <span className="material-icons text-6xl text-navyBlue">add_circle</span>
              <h2 className="text-2xl font-semibold text-navyBlue mt-4">Create Bookings</h2>
              <p className="text-gray-600 mt-2">Create new bookings quickly with our user-friendly interface.</p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg">
              <span className="material-icons text-6xl text-navyBlue">manage_accounts</span>
              <h2 className="text-2xl font-semibold text-navyBlue mt-4">Manage Bookings</h2>
              <p className="text-gray-600 mt-2">Take full control and manage all your bookings in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
