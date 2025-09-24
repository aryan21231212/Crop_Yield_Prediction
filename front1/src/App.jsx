// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PillNavbar from "./pages/PillNavbar";
import AgriTechLandingPage from "./pages/AgriTechLandingPage";
import YieldsPage from "./pages/YieldsPage";
import CropDiseasePredictor from "./pages/CropDiseasePredictor";
import AboutPage from "./pages/AboutPage";
import ChatBotWidget from "./pages/ChatBotWidget";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen relative">
   

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<AgriTechLandingPage />} />
          <Route path="/yields" element={<YieldsPage />} />

          {/* <Route path="/crops" element={<CropsPage />} /> */}

          {/* <Route path="/weather" element={<AgriWeatherPage />} /> */}
          <Route path="/about" element={<AboutPage />} />

          <Route path="/disease" element={<CropDiseasePredictor />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}


          <Route path="/disease" element={<CropDiseasePredictor />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>

        {/* Sticky ChatBot on all pages */}
        <ChatBotWidget />
      </div>
    </Router>
  );
};

export default App;
