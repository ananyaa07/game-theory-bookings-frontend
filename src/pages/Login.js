import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = ({ setUserType }) => {
  const [userTypeLocal, setUserTypeLocal] = useState(''); 
  const [loggedInUserType, setLoggedInUserType] = useState(null); 
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserTypeLocal(event.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserType(userTypeLocal); 
    setLoggedInUserType(userTypeLocal); 
    console.log("Logging in as", userTypeLocal);
    
    if (userTypeLocal === 'customer') {
      navigate('/create-booking');  
    } else {
      navigate('/home'); 
    }
  };

  return (
    <div>
      <Navbar userType={loggedInUserType} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your username" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your password" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="userType">Login as</label>
              <select id="userType" value={userTypeLocal} onChange={handleUserTypeChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
                <option value="" disabled>Select your user type</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="operations">Operations</option>
              </select>
            </div>
            <div>
              <button type="submit" className="w-full bg-navyBlue text-white py-2 rounded-lg">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;


