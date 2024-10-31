import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const CreateCenter = ({ role }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedSport, setSelectedSport] = useState(""); // Single selected sport
  const [allSports, setAllSports] = useState([]); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    fetchSports();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCentre = {
      name,
      address,
      sports: [selectedSport], // Using single selected sport
    };

    try {
      await axios.post(`${API_BASE}/centers`, newCentre, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Centre created successfully!");
      setErrorMessage("");
      setName("");
      setAddress("");
      setSelectedSport(""); // Reset selected sport
    } catch (error) {
      console.error("There was an error creating the center!", error);
      setErrorMessage(error.response?.data?.error || error.message);
      setSuccessMessage("");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedSport(e.target.value); // Set the selected sport directly
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Center
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
              <label className="block text-gray-700">Centre Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Sport</label>
              <select
                value={selectedSport} // Display selected sport here
                onChange={handleDropdownChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>Select a sport</option>
                {allSports.length > 0 ? (
                  allSports.map((sport) => (
                    <option key={sport._id} value={sport._id}>
                      {sport.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No sports available</option>
                )}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={!selectedSport}>
              Create Center
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCenter;
