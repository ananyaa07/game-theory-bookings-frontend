import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";

const API_BASE = "http://localhost:3001/api/v1";

const CreateBooking = ({ role, token }) => {
  const [centres, setCentres] = useState([]);
  const [sports, setSports] = useState([]);
  const [centre, setCentre] = useState("");
  const [sport, setSport] = useState("");
  const [typeOfBooking, setTypeOfBooking] = useState("");
  const [date, setDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const bookingTypes = [
    "Booking",
    "Checked-in",
    "Coaching",
    "Blocked / Tournament",
    "Completed",
    "Pending Payment",
  ];

  // Fetch centers from the backend
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await axios.get(`${API_BASE}/centers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCentres(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };
    fetchCentres();
  }, [token]);

  // Fetch sports based on selected center
  useEffect(() => {
    const fetchSports = async () => {
      if (centre) {
        try {
          const response = await axios.get(`${API_BASE}/sports`, {
            params: { centerId: centre },
            headers: { Authorization: `Bearer ${token}` },
          });
          setSports(response.data);
        } catch (error) {
          console.error("Error fetching sports:", error);
        }
      }
    };
    fetchSports();
  }, [centre, token]);

  const getAvailableTimeSlots = async (centreId, sportId, date) => {
    try {
      const response = await axios.get(`${API_BASE}/bookings/available`, {
        params: { centreId, sportId, bookingDate: date },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.availableTimeSlots;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      return [];
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const response = await axios.post(`${API_BASE}/bookings/create`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw new Error(error.response?.data?.error || "Failed to create booking");
    }
  };

  const handleDateChange = async (date) => {
    setDate(date);
    if (date && centre && sport) {
      const formattedDate = date.toISOString().split("T")[0];
      const slots = await getAvailableTimeSlots(centre, sport, formattedDate);
      setAvailableSlots(
        slots.map(slot => ({ time: `${slot.startHour}:00 - ${slot.endHour}:00`, available: slot.availableResources }))
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!warning && selectedSlots.length > 0) {
      const startHour = parseInt(selectedSlots[0].split(":")[0]);
      const endHour = parseInt(selectedSlots[selectedSlots.length - 1].split(":")[0]) + 1;
      const formattedDate = date.toISOString().split("T")[0];

      const bookingData = {
        centreId: centre,
        sportId: sport,
        bookingDate: formattedDate,
        startHour,
        endHour,
        status: typeOfBooking,
        remarks: "User booking",
      };

      try {
        await createBooking(bookingData);
        setSuccessMessage(`Booking confirmed from ${selectedSlots[0]} to ${selectedSlots[selectedSlots.length - 1]}.`);
        
        // Reset form
        setCentre("");
        setSport("");
        setTypeOfBooking("");
        setDate(null);
        setSelectedSlots([]);
        setAvailableSlots([]);
      } catch (error) {
        setWarning(error.message);
      }
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
                  <option key={centre._id} value={centre._id}>
                    {centre.name}
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
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
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
                        selectedSlots.includes(slot.time) ? "bg-blue-100" : ""
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
