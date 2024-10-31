import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const Promote = () => {
  const [customers, setCustomers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 
  const token = localStorage.getItem("token"); 

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/auth/customers`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Promote Customer to Operations
  const handlePromote = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE}/auth/promote?userId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setSuccessMessage(response.data.message);
      
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === id ? { ...customer, role: 'operations' } : customer
        )
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error("Error promoting user:", error);
      const errorMessage = error.response?.data?.message || "Failed to promote user.";
      setSuccessMessage(errorMessage); 
    }
  };

  useEffect(() => {
    fetchCustomers(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="admin" />
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">Promote Users</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center">
            {successMessage}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-navyBlue text-white">
                <th className="py-2 px-4 border text-center">ID</th>
                <th className="py-2 px-4 border text-center">Name</th>
                <th className="py-2 px-4 border text-center">Role</th>
                <th className="py-2 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{customer._id}</td>
                  <td className="py-2 px-4 border text-center">{customer.name}</td>
                  <td className="py-2 px-4 border text-center">{customer.role}</td>
                  <td className="py-2 px-4 border text-center">
                    {customer.role === 'operations' ? (
                      <span className="text-green-500">Promoted</span>
                    ) : (
                      <button
                        onClick={() => handlePromote(customer._id)} 
                        className="bg-navyBlue text-white py-1 px-3 rounded-lg"
                      >
                        Promote to Operations
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Promote;
