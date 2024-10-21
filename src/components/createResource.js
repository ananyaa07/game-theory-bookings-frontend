import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateResource = ({role}) => {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [centre, setCentre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = { name, sport, centre };

    try {
      await axios.post("/api/resources", newResource);
      alert("Resource created successfully!");
    } catch (error) {
      console.error("There was an error creating the resource!", error);
    }
  };

  return (
    <div>
      <Navbar role={role}/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Resource
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Resource Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Sport ID</label>
              <input
                type="text"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Centre ID</label>
              <input
                type="text"
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;
