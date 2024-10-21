import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const initialCustomers = [
  { id: 1, name: 'John Doe', role: 'customer' },
  { id: 2, name: 'Jane Smith', role: 'customer' },
  { id: 3, name: 'Michael Brown', role: 'customer' },

];

const Promote = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  const handlePromote = (id) => {
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === id) {
        return { ...customer, promoted: true }; 
      }
      return customer;
    });
    setCustomers(updatedCustomers);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="admin" />
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">Promote Users</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-navyBlue text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{customer.id}</td>
                  <td className="py-2 px-4 border">{customer.name}</td>
                  <td className="py-2 px-4 border text-center">
                    {customer.promoted ? (
                      <span className="text-green-500">Promoted</span>
                    ) : (
                      <button
                        onClick={() => handlePromote(customer.id)}
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
