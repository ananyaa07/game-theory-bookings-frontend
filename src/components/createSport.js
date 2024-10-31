import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const CreateSport = ({ role }) => {
  const [name, setName] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(""); 
  const [allCenters, setAllCenters] = useState([]); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch centers from the server
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
    fetchCenters();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSport = {
      name,
      centers: [selectedCenter],
    };

    try {
      await axios.post(`${API_BASE}/sports`, newSport, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Sport created successfully!");
      setErrorMessage("");
      setName("");
      setSelectedCenter("");
    } catch (error) {
      console.error("There was an error creating the sport!", error);
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
            Create Sport
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
              <label className="block text-gray-700">Sport Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Centre</label>
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
                disabled={allCenters.length === 0} 
              >
                <option value="" disabled>Select a center</option>
                {allCenters.length > 0 ? (
                  allCenters.map((center) => (
                    <option key={center._id} value={center._id}>
                      {center.name} - {center.address}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No centers available</option>
                )}
              </select>
            </div>


            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={allCenters.length === 0}>
              Create Sport
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSport;
