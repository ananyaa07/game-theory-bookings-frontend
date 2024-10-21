import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateCentre = ({role}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [sports, setSports] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCentre = { name, location, sports };
    
    try {
      await axios.post("/api/centres", newCentre);
      alert("Centre created successfully!");
    } catch (error) {
      console.error("There was an error creating the centre!", error);
    }
  };

  return (
    <div>
      <Navbar role={role}/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Centre
          </h2>

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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Sports (optional)</label>
              <input
                type="text"
                value={sports}
                onChange={(e) => setSports(e.target.value.split(","))}
                placeholder="Enter sport IDs separated by commas"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Centre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCentre;
