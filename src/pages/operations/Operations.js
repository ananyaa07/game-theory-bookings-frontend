import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Operations = ({ userType }) => {
  const [centreName, setCentreName] = useState("");
  const [sportName, setSportName] = useState("");
  const [resourceName, setResourceName] = useState("");

  const handleCentreSubmit = (e) => {
    e.preventDefault();
    console.log("Centre Created:", centreName);
    setCentreName("");
  };

  const handleSportSubmit = (e) => {
    e.preventDefault();
    console.log("Sport Created:", sportName);
    setSportName(""); 
  };

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    console.log("Resource Created:", resourceName);
    setResourceName(""); 
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-navyBlue mb-6">
            Admin Panel
          </h2>

          <form onSubmit={handleCentreSubmit} className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">Create Centre</h3>
            <input
              type="text"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
              placeholder="Enter Centre Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
              required
            />
            <button
              type="submit"
              className="w-full bg-navyBlue text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Create Centre
            </button>
          </form>

          <form onSubmit={handleSportSubmit} className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">Create Sport</h3>
            <input
              type="text"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              placeholder="Enter Sport Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
              required
            />
            <button
              type="submit"
              className="w-full bg-navyBlue text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Create Sport
            </button>
          </form>

          <form onSubmit={handleResourceSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Create Resource</h3>
            <input
              type="text"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Enter Resource Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navyBlue"
              required
            />
            <button
              type="submit"
              className="w-full bg-navyBlue text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Create Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Operations;
