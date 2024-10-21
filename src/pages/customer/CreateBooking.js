import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";


const CreateBooking = ({ userType }) => {
  const [centre, setCentre] = useState("");
  const [sport, setSport] = useState("");
  const [court, setCourt] = useState("");
  const [date, setDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const centres = ["Centre 1", "Centre 2", "Centre 3"];
  const sports = ["Tennis", "Badminton", "Squash"];
  const courts = ["Court 1", "Court 2", "Court 3"];

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {
      setAvailableSlots(["10:00 AM", "11:00 AM", "12:00 PM"]);
    } else {
      setAvailableSlots([]);
    }
  };

  return (
    <div>
      <Navbar userType={userType} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-xl w-[150%]">
          <h2 className="text-xl font-semibold text-center text-navyBlue mb-4"> 
            Create Booking
          </h2>

          <form className="space-y-3"> 
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="centre"> 
                Select Centre
              </label>
              <select
                id="centre"
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
              >
                <option value="" disabled>
                  Select a centre
                </option>
                {centres.map((centre) => (
                  <option key={centre} value={centre}>
                    {centre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="sport">
                Select Sport
              </label>
              <select
                id="sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
              >
                <option value="" disabled>
                  Select a sport
                </option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="court">
                Select Court
              </label>
              <select
                id="court"
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
              >
                <option value="" disabled>
                  Select a court
                </option>
                {courts.map((court) => (
                  <option key={court} value={court}>
                    {court}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="date">
                Select Date
              </label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                placeholderText="Select a date"
                dateFormat="yyyy/MM/dd"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Available Time Slots
              </label>
              <div className="border border-gray-300 rounded-lg p-2">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <div key={slot} className="p-1 border-b last:border-b-0">
                      {slot}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No available slots</div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-navyBlue text-white py-1.5 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
