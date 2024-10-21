import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = ({ setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'adminPassword') {
      setUserType('admin');
      setRole('admin');
      console.log('Logging in as admin');
      navigate('/promote');
    } else {
      setUserType('customer');
      setRole('customer');
      console.log('Logging in as customer');
      navigate('/create-booking');
    }
  };

  return (
    <div>
      <Navbar role={role} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-navyBlue text-white py-2 rounded-lg">Login</button>
            </div>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Not a user?{' '}
            <Link to="/signup" className="text-navyBlue font-semibold">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
