import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({role}) => {
  return (
    <nav className="bg-navyBlue text-white p-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-lg font-bold">
          Game Theory Booking
        </Link>
        <div>
          {role === 'customer' ? (
            <>
              <Link to="/view-bookings">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                  View Bookings
                </button>
              </Link>
              <Link to="/create-booking">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  Create Booking
                </button>
              </Link>
            </>
          ) : role === 'operations' ? (
            <>
              <Link to="/timewise-bookings">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                  View Bookings
                </button>
              </Link>
              <Link to="/operations-page">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  Perform Operations
                </button>
              </Link>
            </>
          ) : role === 'admin' ? ( 
            <>
              <Link to="/promote">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                  Promote User
                </button>
              </Link>
              <Link to="/timewise-bookings">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  View Timewise Bookings
                </button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-white text-navyBlue px-6 py-2 rounded-md hover:bg-gray-200 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;