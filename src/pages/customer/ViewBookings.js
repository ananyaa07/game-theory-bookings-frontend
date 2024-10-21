import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const ViewBookings = ({role}) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = [
      {
        id: 1,
        centre: "Centre 1",
        sport: "Tennis",
        court: "Court 2",
        date: "2024-10-25",
        time: { start: "10:00 AM", end: "11:00 AM" }, 
        typeOfBooking: "Booking",
      },
      {
        id: 2,
        centre: "Centre 2",
        sport: "Badminton",
        court: "Court 1",
        date: "2024-10-26",
        time: { start: "11:00 AM", end: "12:00 PM" },
        typeOfBooking: "Coaching",
      },
    ];
    setBookings(storedBookings);
  }, []);

  return (
    <div>
      <Navbar role={role} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            View Your Bookings
          </h2>

          {bookings.length > 0 ? (
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
                    <tr key={booking.id}>
                      <td className="px-4 py-2 border-b">{booking.centre}</td>
                      <td className="px-4 py-2 border-b">{booking.sport}</td>
                      <td className="px-4 py-2 border-b">{booking.court}</td>
                      <td className="px-4 py-2 border-b">{booking.date}</td>
                      <td className="px-4 py-2 border-b">
                        {`${booking.time.start} to ${booking.time.end}`}
                      </td>
                      <td className="px-4 py-2 border-b">{booking.typeOfBooking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 text-center">You have no bookings yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
