import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; 

const Navbar = () => {
  const [role, setRole] = useState(() => localStorage.getItem('role') || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();  

  const logOut = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole('');  
    navigate('/home');  
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);  
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-navyBlue text-white p-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-lg font-bold">
          Game Theory Booking
        </Link>
        <div>
          {role === 'customer' ? (
            <>
              <Link to="/bookings/view">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                  View Bookings
                </button>
              </Link>
              <Link to="/bookings/create">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  Create Booking
                </button>
              </Link>
              <button
                className="bg-white mx-2 text-navyBlue px-6 py-2 rounded-md hover:bg-gray-200 transition"
                onClick={logOut}
              >
                Logout
              </button>
            </>
          ) : (role === 'operations' || role === 'admin') ? (
            <>
              {role === 'admin' && (
                <Link to="/promote">
                  <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                    Promote User
                  </button>
                </Link>
              )}
              <Link to="/timewise-bookings">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2">
                  View Timewise Bookings
                </button>
              </Link>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    Perform Operations
                    <FaChevronDown className="ml-2" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <Link to="/operations/create-center">
                        <button className="block px-4 py-2 text-navyBlue hover:bg-gray-200 w-full text-left">
                          Create Center
                        </button>
                      </Link>
                      <Link to="/operations/create-sport">
                        <button className="block px-4 py-2 text-navyBlue hover:bg-gray-200 w-full text-left">
                          Create Sport
                        </button>
                      </Link>
                      <Link to="/operations/create-resource">
                        <button className="block px-4 py-2 text-navyBlue hover:bg-gray-200 w-full text-left">
                          Create Resource
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="bg-white mx-2 text-navyBlue px-6 py-2 rounded-md hover:bg-gray-200 transition"
                onClick={logOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-navyBlue px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
