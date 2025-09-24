// src/components/AgriWeatherPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaLeaf, FaTint, FaThermometerHalf, FaCloudRain, FaDatabase } from "react-icons/fa";

// --- REAL API FUNCTION ---
const fetchRealAgriData = async (location) => {
  const API_KEY = "0dc61741847944b80e990ce8d732f9fb"; // Replace with your API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    return {
      location: data.name,
      temperature: parseFloat(data.main.temp.toFixed(1)),
      humidity: parseInt(data.main.humidity),
      rainfall: data.rain?.["1h"] ?? 0, // numeric, default 0

      // Simulated Data
      soilType: ["Loamy", "Clay", "Sandy", "Silty"][Math.floor(Math.random() * 4)],
      ph: parseFloat((Math.random() * (8.5 - 5.5) + 5.5).toFixed(1)),
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Location not found: "${location}". Please check the spelling.`);
    } else {
      console.error("API Fetch Error:", error);
      throw new Error("Could not fetch weather data. API key may be invalid or inactive.");
    }
  }
};

// --- Data Card Component ---
const DataCard = ({ icon, title, value, unit }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
    <div className="text-3xl text-emerald-500 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-zinc-800">
      {value} <span className="text-base font-normal text-gray-400">{unit}</span>
    </p>
  </div>
);

// --- Main Component ---
const AgriWeatherPage = () => {
  const [location, setLocation] = useState("Pune");
  const [agriData, setAgriData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const handleFetchData = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError("");
    setAgriData(null);
    setSaveStatus("");

    try {
      const data = await fetchRealAgriData(location.trim());
      setAgriData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDB = async () => {
    if (!agriData) return;
    setSaveStatus("Saving...");
    try {
      const response = await axios.post("http://localhost:5000/api/save-data", agriData);
      setSaveStatus(`Success: ${response.data.message}`);
    } catch (err) {
      console.error("Error saving data:", err);
      setSaveStatus("Error: Could not save data to the database.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-zinc-900 text-center mb-2">
          Agri-Data Dashboard
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter a location to get live agricultural insights.
        </p>

        <form onSubmit={handleFetchData} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="E.g., Pune, Maharashtra"
            className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition disabled:bg-emerald-300"
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

        {agriData && (
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center">
              Showing Data for:{" "}
              <span className="text-emerald-600">{agriData.location}</span>
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Real Data */}
              <DataCard
                icon={<FaThermometerHalf />}
                title="Temperature"
                value={agriData.temperature}
                unit="°C"
              />
              <DataCard
                icon={<FaCloudRain />}
                title="Rainfall (1hr)"
                value={agriData.rainfall}
                unit="mm"
              />
              <DataCard
                icon={<div className="text-3xl text-emerald-500 mb-3">💧</div>}
                title="Humidity"
                value={agriData.humidity}
                unit="%"
              />

              {/* Simulated Data */}
              <DataCard icon={<FaTint />} title="Soil pH" value={agriData.ph} unit="" />
              <DataCard icon={<FaLeaf />} title="Soil Type" value={agriData.soilType} unit="" />
            </div>

            <div className="text-center">
             
              {saveStatus && <p className="text-center mt-4 text-gray-600">{saveStatus}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgriWeatherPage;
