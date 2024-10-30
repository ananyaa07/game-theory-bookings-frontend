import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateResource = ({ role }) => {
  const [name, setName] = useState("");
  const [centres, setCentres] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token"); 
  const API_BASE = "http://localhost:3001/api/v1";

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get(`${API_BASE}/centers`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setCentres(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
        setMessage("Could not load centers.");
      }
    };

    fetchCenters();
  }, [token]);

  // Fetch sports based on the selected center
  useEffect(() => {
    const fetchSports = async () => {
      if (selectedCentre) {
        try {
          const response = await axios.get(`${API_BASE}/sports`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { centerId: selectedCentre },
          });
          setSports(response.data);
        } catch (error) {
          console.error("Error fetching sports:", error);
          setMessage("Could not load sports.");
        }
      } else {
        setSports([]); 
      }
    };

    fetchSports();
  }, [selectedCentre, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = { name, sport: selectedSport, center: selectedCentre };

    try {
      await axios.post(`${API_BASE}/resources`, newResource, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setMessage("Resource created successfully!");
      setName("");
      setSelectedCentre("");
      setSelectedSport("");
      setSports([]);
    } catch (error) {
      console.error("There was an error creating the resource!", error);
      // Set error message
      setMessage("There was an error creating the resource.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Resource
          </h2>

          {message && (
            <div className={`mb-4 p-2 text-center rounded ${message.includes("successfully") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Resource Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Centre</label>
              <select
                value={selectedCentre}
                onChange={(e) => setSelectedCentre(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>Select a Centre</option>
                {centres.length > 0 ? (
                  centres.map((centre) => (
                    <option key={centre._id} value={centre._id}>
                      {centre.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No centers available</option>
                )}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                disabled={centres.length === 0 || selectedCentre === ""} 
              >
                <option value="" disabled>Select a Sport</option>
                {sports.length > 0 ? (
                  sports.map((sport) => (
                    <option key={sport._id} value={sport._id}>
                      {sport.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No sports available</option>
                )}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={!selectedCentre || !selectedSport}>
              Create Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;
