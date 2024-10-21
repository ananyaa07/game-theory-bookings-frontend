import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const CreateSport = ({role}) => {
  const [name, setName] = useState("");
  const [centres, setCentres] = useState([]);
  const [resourceName, setResourceName] = useState("");
  const [resources, setResources] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSport = { name, centres, resourceName, resources };

    try {
      await axios.post("/api/sports", newSport);
      alert("Sport created successfully!");
    } catch (error) {
      console.error("There was an error creating the sport!", error);
    }
  };

  return (
    <div>
      <Navbar role={role}/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Create Sport
          </h2>

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
              <label className="block text-gray-700">Centres</label>
              <input
                type="text"
                value={centres}
                onChange={(e) => setCentres(e.target.value.split(","))}
                placeholder="Enter centre IDs separated by commas"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Resource Name</label>
              <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Resources (optional)</label>
              <input
                type="text"
                value={resources}
                onChange={(e) => setResources(e.target.value.split(","))}
                placeholder="Enter resource IDs separated by commas"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Sport
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSport;
