import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";

const CreateBooking = ({ role }) => {
  const [centre, setCentre] = useState("");
  const [sport, setSport] = useState("");
  const [typeOfBooking, setTypeOfBooking] = useState("");
  const [date, setDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const centres = ["Centre 1", "Centre 2", "Centre 3"];
  const sports = ["Tennis", "Badminton", "Squash"];
  const bookingTypes = [
    "Booking",
    "Checked-in",
    "Coaching",
    "Blocked / Tournament",
    "Completed",
    "Pending Payment",
  ];

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {

      setAvailableSlots([
        { time: "10:00 AM - 11:00 AM", available: 5 },
        { time: "11:00 AM - 12:00 PM", available: 3 },
        { time: "12:00 PM - 1:00 PM", available: 2 },
      ]);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleSlotSelect = (slotTime) => {
    setWarning("");
    const isSelected = selectedSlots.includes(slotTime);
    const updatedSlots = isSelected
      ? selectedSlots.filter((slot) => slot !== slotTime)
      : [...selectedSlots, slotTime].sort();

    const timeIndex = availableSlots.map((slot) => slot.time);
    const slotIndices = updatedSlots.map((slot) => timeIndex.indexOf(slot));

    const isConsecutive = slotIndices.every(
      (val, i, arr) => !i || val === arr[i - 1] + 1
    );

    if (!isConsecutive) {
      setWarning("Selected slots must be consecutive.");
    } else {
      setWarning("");
    }

    setSelectedSlots(updatedSlots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!warning && selectedSlots.length > 0) {
      const firstSlot = selectedSlots[0];
      const lastSlot = selectedSlots[selectedSlots.length - 1];

      setSuccessMessage(
        `Booking confirmed from ${firstSlot} to ${lastSlot}.`
      );

      setCentre("");
      setSport("");
      setTypeOfBooking("");
      setDate(null);
      setSelectedSlots([]);
      setAvailableSlots([]);
    }
  };

  return (
    <div>
      <Navbar role={role} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-xl w-[150%]">
          <h2 className="text-xl font-semibold text-center text-navyBlue mb-4">
            Create Booking
          </h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
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
              <label className="block text-gray-700 mb-1" htmlFor="typeOfBooking">
                Select Type of Booking
              </label>
              <select
                id="typeOfBooking"
                value={typeOfBooking}
                onChange={(e) => setTypeOfBooking(e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
              >
                <option value="" disabled>
                  Select a type of booking
                </option>
                {bookingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-gray-700 mb-1" htmlFor="date">
                Select Date
              </label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                placeholderText="Select a date"
                dateFormat="yyyy/MM/dd"
                minDate={new Date()} 
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
                    <div
                      key={slot.time}
                      className={`flex justify-between p-1 border-b last:border-b-0 cursor-pointer ${
                        selectedSlots.includes(slot.time)
                          ? "bg-blue-100"
                          : ""
                      }`}
                      onClick={() => handleSlotSelect(slot.time)}
                    >
                      <span>{slot.time}</span>
                      <span>{slot.available} slots</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No available slots</div>
                )}
              </div>
              {warning && (
                <p className="text-red-500 text-sm mt-1">{warning}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-navyBlue text-white py-1.5 rounded-lg font-semibold hover:bg-blue-900 transition"
                disabled={!!warning || selectedSlots.length === 0}
              >
                Confirm Booking
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
