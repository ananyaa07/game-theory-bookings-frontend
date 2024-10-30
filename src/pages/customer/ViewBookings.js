import React, { useState, useEffect ,useContext} from "react";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";

const ViewBookings = ({ role }) => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:3001/api/v1";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE}/bookings/user/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            View Your Bookings
          </h2>

          {loading && <div className="text-gray-500 text-center">Loading...</div>}
          
          {error && <div className="text-red-500 text-center">{error}</div>}

          {bookings.length > 0 && !loading && !error ? (
            <div className="flex justify-center">
              <table className="min-w-full bg-white border text-center">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Centre</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Sport</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Court</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Date</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Time</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300">Type of Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-4 py-2 border-b">{booking.center.name}</td>
                      <td className="px-4 py-2 border-b">{booking.sport.name}</td>
                      <td className="px-4 py-2 border-b">{booking.resource.name}</td>
                      <td className="px-4 py-2 border-b">{formatDate(booking.date)}</td> 
                      <td className="px-4 py-2 border-b">
                        {`${booking.startTime} to ${booking.endTime}`}
                      </td>
                      <td className="px-4 py-2 border-b">{booking.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <div className="text-gray-500 text-center">You have no bookings yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
