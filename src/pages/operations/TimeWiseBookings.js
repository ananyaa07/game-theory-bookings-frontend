import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const bookingsData = [
  { id: 1, center: 'Center A', support: 'Technical', date: '2024-10-21', customer: 'John Doe', service: 'Service 1' },
  { id: 2, center: 'Center B', support: 'Customer Service', date: '2024-10-21', customer: 'Jane Smith', service: 'Service 2' },
  { id: 3, center: 'Center A', support: 'Technical', date: '2024-10-22', customer: 'Michael Brown', service: 'Service 3' },
];

const TimelyBookings = ({ userType }) => {
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedSupport, setSelectedSupport] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  const handleCenterChange = (event) => {
    setSelectedCenter(event.target.value);
  };

  const handleSupportChange = (event) => {
    setSelectedSupport(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleViewBookings = (e) => {
    e.preventDefault();
    const filtered = bookingsData.filter((booking) => {
      const matchesCenter = selectedCenter ? booking.center === selectedCenter : true;
      const matchesSupport = selectedSupport ? booking.support === selectedSupport : true;
      const matchesDate = selectedDate ? booking.date === selectedDate : true;
      return matchesCenter && matchesSupport && matchesDate;
    });
    setFilteredBookings(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType={userType} />
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">Timely Bookings</h2>

        <form onSubmit={handleViewBookings} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold text-navyBlue mb-4">Filter Bookings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="center" className="block text-gray-700 mb-2">Select Center:</label>
              <select
                id="center"
                value={selectedCenter}
                onChange={handleCenterChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              >
                <option value="" disabled>Select Center</option>
                <option value="Center A">Center A</option>
                <option value="Center B">Center B</option>
              </select>
            </div>

            <div>
              <label htmlFor="support" className="block text-gray-700 mb-2">Select Sport Type:</label>
              <select
                id="support"
                value={selectedSupport}
                onChange={handleSupportChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              >
                <option value="" disabled>Select Sport Type</option>
                <option value="Technical">Technical</option>
                <option value="Customer Service">Customer Service</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-gray-700 mb-2">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-navyBlue text-white py-2 px-4 rounded-lg"
              >
                View Bookings
              </button>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-navyBlue text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Center</th>
                <th className="py-2 px-4 border">Support Type</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Service</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{booking.id}</td>
                    <td className="py-2 px-4 border">{booking.center}</td>
                    <td className="py-2 px-4 border">{booking.support}</td>
                    <td className="py-2 px-4 border">{booking.date}</td>
                    <td className="py-2 px-4 border">{booking.customer}</td>
                    <td className="py-2 px-4 border">{booking.service}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimelyBookings;
