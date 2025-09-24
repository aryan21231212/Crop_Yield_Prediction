// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PillNavbar from "./pages/PillNavbar";
import AgriTechLandingPage from "./pages/AgriTechLandingPage";
import YieldsPage from "./pages/YieldsPage";
// import CropsPage from "./pages/CropsPage";
// import WeatherPage from "./pages/WeatherPage";
// import AboutPage from "./pages/AboutPage";
// import AgriWeatherPage from "./pages/AgriWeatherPage";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar visible on all pages */}
      

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<AgriTechLandingPage />} />
          <Route path="/yields" element={<YieldsPage />} />
          {/* <Route path="/crops" element={<CropsPage />} /> */}
          {/* <Route path="/weather" element={<AgriWeatherPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
