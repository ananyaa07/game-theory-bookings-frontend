import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";
const API_BASE = process.env.REACT_APP_API_BASE_URL;

const CreateBooking = () => {
  const {user}=useContext(AuthContext);
  const [centres, setCentres] = useState([]);
  const [sports, setSports] = useState([]);
  const [centre, setCentre] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingType, setBookingType] = useState("Booking");
  const token = localStorage.getItem("token");


  const bookingTypesOperations = ["Booking", "Blocked / Tournament"];

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await axios.get(`${API_BASE}/centers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCentres(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
        setWarning("Failed to fetch centers. Please try again.");
      }
    };
    fetchCentres();
  }, [token]);

  useEffect(() => {
    const fetchSports = async () => {
      if (centre) {
        try {
          const response = await axios.get(`${API_BASE}/sports`, {
            params: { centerId: centre },
            headers: { Authorization: `Bearer ${token}` },
          });
          setSports(response.data);
          setSport("");
        } catch (error) {
          console.error("Error fetching sports:", error);
          setWarning("Failed to fetch sports. Please try again.");
        }
      }
    };
    fetchSports();
  }, [centre, token]);

  const getAvailableTimeSlots = async (centerId, sportId, selectedDate) => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await axios.get(`${API_BASE}/bookings/available`, {
        params: { centerId, sportId, date: formattedDate },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setWarning("Failed to fetch available slots. Please try again.");
      return [];
    }
  };

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    setSelectedSlots([]);
    setWarning("");
    setSuccessMessage("");

    if (selectedDate && centre && sport) {
      setIsLoading(true);
      const slots = await getAvailableTimeSlots(centre, sport, selectedDate);
      setAvailableSlots(slots);
      setIsLoading(false);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleSlotSelect = (slotTime) => {
    setWarning("");
    const isSelected = selectedSlots.includes(slotTime);

    if (isSelected) {
      setSelectedSlots((prev) => prev.filter((slot) => slot !== slotTime));
      return;
    }

    const updatedSlots = [...selectedSlots, slotTime].sort((a, b) => {
      const timeA = parseInt(a.split(":")[0]);
      const timeB = parseInt(b.split(":")[0]);
      return timeA - timeB;
    });

    const isConsecutive = updatedSlots.every((slot, index) => {
      if (index === 0) return true;
      const prevHour = parseInt(updatedSlots[index - 1].split(":")[0]);
      const currentHour = parseInt(slot.split(":")[0]);
      return currentHour === prevHour + 1;
    });

    if (!isConsecutive) {
      setWarning("Please select consecutive time slots only.");
      return;
    }

    if (updatedSlots.length > 3) {
      setWarning("Maximum booking duration is 3 hours.");
      return;
    }

    setSelectedSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");
    setSuccessMessage("");

    if (selectedSlots.length === 0) {
      setWarning("Please select at least one time slot.");
      return;
    }

    try {
      setIsLoading(true);

      const startTimeStr = selectedSlots[0];
      const lastSlotTime = selectedSlots[selectedSlots.length - 1];

      const startHour = parseInt(startTimeStr.split(":")[0]);
      const endHour = parseInt(lastSlotTime.split(":")[0]) + 1;

      const startTime = `${startHour.toString().padStart(2, "0")}:00`;
      const endTime = `${endHour.toString().padStart(2, "0")}:00`;

      const formattedDate = date.toISOString().split("T")[0];

      const bookingData = {
        centerId: centre,
        sportId: sport,
        date: formattedDate,
        startTime,
        endTime,
        note: `User booking - Type: ${user.role === "operations" ? bookingType : "Booking"}`, 
      };

      const apiEndpoint = user.role === "operations" 
        ? `${API_BASE}/bookings/operations`  
        : `${API_BASE}/bookings`; 

      const response = await axios.post(apiEndpoint, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage(`Booking confirmed for ${formattedDate} from ${startTime} to ${endTime}`);

      setCentre("");
      setSport("");
      setDate(null);
      setSelectedSlots([]);
      setAvailableSlots([]);

    } catch (error) {
      console.error("Booking creation error:", error);
      setWarning(error.response?.data?.error || "Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFutureDate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-[150%]">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Booking
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {user.role === "operations" && (
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="bookingType">
                  Type of Booking
                </label>
                <select
                  id="bookingType"
                  value={bookingType}
                  onChange={(e) => setBookingType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                  required
                >
                  {bookingTypesOperations.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="centre">
                Select Centre
              </label>
              <select
                id="centre"
                value={centre}
                onChange={(e) => {
                  setCentre(e.target.value);
                  setAvailableSlots([]);
                  setSelectedSlots([]);
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
                disabled={isLoading}
              >
                <option value="">Select a centre</option>
                {centres.map((centre) => (
                  <option key={centre._id} value={centre._id}>
                    {centre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="sport">
                Select Sport
              </label>
              <select
                id="sport"
                value={sport}
                onChange={(e) => {
                  setSport(e.target.value);
                  setAvailableSlots([]);
                  setSelectedSlots([]);
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                required
                disabled={!centre || isLoading}
              >
                <option value="">Select a sport</option>
                {sports.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="date">
                Select Date
              </label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
                placeholderText="Select a date"
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                filterDate={isFutureDate}
                required
                disabled={!sport || isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Available Time Slots
              </label>
              <div className="border border-gray-300 rounded-lg p-2 max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-4 text-gray-600">Loading slots...</div>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <div
                      key={slot.slot}
                      className={`flex justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-blue-50 transition-colors ${
                        selectedSlots.includes(slot.slot) ? "bg-blue-100" : ""
                      } ${slot.availableSlots === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => slot.availableSlots > 0 && handleSlotSelect(slot.slot)}
                    >
                      <span className="font-medium">{slot.slot}</span>
                      <span className={`${slot.availableSlots === 0 ? "text-red-500" : "text-green-600"}`}>
                        {slot.availableSlots} available
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    {date ? "No available slots" : "Select date to view available slots"}
                  </div>
                )}
              </div>
            </div>

            {warning && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {warning}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-navyBlue text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading || !selectedSlots.length || !!warning}
            >
              {isLoading ? "Creating Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
