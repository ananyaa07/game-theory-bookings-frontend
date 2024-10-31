import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const AddSportToCenter = ({ role }) => {
  const [selectedCenter, setSelectedCenter] = useState("");
  const [allCenters, setAllCenters] = useState([]);
  const [allSports, setAllSports] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get(`${API_BASE}/centers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllCenters(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
        setErrorMessage("Could not load centers.");
      }
    };

    const fetchSports = async () => {
      try {
        const response = await axios.get(`${API_BASE}/sports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllSports(response.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
        setErrorMessage("Could not load sports.");
      }
    };

    fetchCenters();
    fetchSports();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sportId = e.target.sportId.value;

    try {
      await axios.post(`${API_BASE}/centers/${selectedCenter}/sports`, { sportId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Sport added to center successfully!");
      setErrorMessage("");
      setSelectedCenter("");
      e.target.reset();
    } catch (error) {
      console.error("There was an error adding the sport to the center!", error);
      setErrorMessage(error.response?.data?.error || error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Add Sport to Center
          </h2>

          {successMessage && (
            <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Select Center</label>
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>Select a center</option>
                {allCenters.map((center) => (
                  <option key={center._id} value={center._id}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Sport</label>
              <select
                name="sportId"
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>Select a sport</option>
                {allSports.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Sport
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSportToCenter;
