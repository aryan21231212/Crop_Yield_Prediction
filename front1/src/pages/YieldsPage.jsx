import React, { useState } from "react";
import { Leaf, Cloud, Droplets, Thermometer, Bug, AlertCircle, CheckCircle, Loader, MapPin, Navigation, Sun } from "lucide-react";

const WeatherDataPage = ({ onBack, onWeatherData }) => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const mockWeatherAPI = async (location) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock weather data with sunshine hours
    const mockData = {
      location: location || "Current Location",
      Temp_Avg_C: Math.round(Math.random() * 20 + 15),
      Humidity: Math.round(Math.random() * 30 + 50),
      Rainfall_mm: Math.round(Math.random() * 100 + 50),
      Soil_pH: (Math.random() * 2 + 6).toFixed(1),
      Sunshine_hr: (Math.random() * 6 + 4).toFixed(1), // 4-10 hours of sunshine
      weather: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)]
    };
    
    return mockData;
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await mockWeatherAPI("Your Current Location");
            setWeatherData(data);
          } catch (err) {
            setError("Failed to fetch weather data");
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          setError("Location access denied");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported");
      setIsLoading(false);
    }
  };

  const searchLocation = async () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const data = await mockWeatherAPI(location);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const useWeatherData = () => {
    if (weatherData) {
      onWeatherData(weatherData);
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Form
          </button>
          
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-lg">
            <Cloud className="w-12 h-12 text-blue-600 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Get Weather Data
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fetch current weather conditions, sunshine data, and soil data for accurate yield predictions
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location Input */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Choose Location Method
              </h3>
              
              {/* Search by Location */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Search by City/Region
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city name..."
                    className="flex-1 border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                  />
                  <button
                    onClick={searchLocation}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                    Search
                  </button>
                </div>
              </div>

              {/* Current Location */}
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-3">OR</div>
                <button
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" />
                      Use Current Location
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}
            </div>

            {/* Weather Data Display */}
            <div className="space-y-6">
              {weatherData ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Weather Data Retrieved
                  </h3>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6">
                    <h4 className="font-semibold text-lg mb-4">{weatherData.location}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4" />
                        <span>{weatherData.Temp_Avg_C}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        <span>{weatherData.Humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4" />
                        <span>{weatherData.Rainfall_mm}mm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        <span>{weatherData.Sunshine_hr}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        <span>pH {weatherData.Soil_pH}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4" />
                        <span>{weatherData.weather}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={useWeatherData}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Use This Weather Data
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Cloud className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Search for a location or use your current location to get weather data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What We'll Get</h3>
          <div className="grid md:grid-cols-5 gap-4 text-sm">
            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <p className="font-semibold">Temperature</p>
              <p className="text-gray-500">Current temp</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-semibold">Humidity</p>
              <p className="text-gray-500">Air moisture</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-cyan-600" />
              </div>
              <p className="font-semibold">Rainfall</p>
              <p className="text-gray-500">Precipitation</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Sun className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="font-semibold">Sunshine</p>
              <p className="text-gray-500">Daily hours</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold">Soil pH</p>
              <p className="text-gray-500">Estimated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const YieldPredictionForm = () => {
  const [currentPage, setCurrentPage] = useState('form');
  const [formData, setFormData] = useState({
    Crop: "",
    season: "",
    Temp_Avg_C: "",
    Rainfall_mm: "",
    Humidity: "",
    Sunshine_hr: "",
    Soil_pH: "",
    Soil_Type: "",
    N: "",
    P: "",
    K: "",
    Fertilizer_kg_ha: "",
    Pesticide_kg_ha: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const cropTypes = [
    "Wheat", "Rice", "Maize", "Barley", "Cotton", "Sugarcane", 
    "Soybean", "Pulses", "Groundnut", "Sunflower"
  ];

  const handleWeatherData = (weatherData) => {
    setFormData(prev => ({
      ...prev,
      Temp_Avg_C: weatherData.Temp_Avg_C.toString(),
      Humidity: weatherData.Humidity.toString(),
      Rainfall_mm: weatherData.Rainfall_mm.toString(),
      Sunshine_hr: weatherData.Sunshine_hr.toString(),
      Soil_pH: weatherData.Soil_pH.toString(),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Crop.trim()) newErrors.Crop = "Crop type is required";
    if (!formData.season) newErrors.season = "Season selection is required";
    
    if (!formData.Temp_Avg_C || formData.Temp_Avg_C < -50 || formData.Temp_Avg_C > 60) {
      newErrors.Temp_Avg_C = "Temperature must be between -50°C and 60°C";
    }
    
    if (!formData.Rainfall_mm || formData.Rainfall_mm < 0 || formData.Rainfall_mm > 5000) {
      newErrors.Rainfall_mm = "Rainfall must be between 0 and 5000mm";
    }
    
    if (!formData.Humidity || formData.Humidity < 0 || formData.Humidity > 100) {
      newErrors.Humidity = "Humidity must be between 0% and 100%";
    }
    
    if (!formData.Sunshine_hr || formData.Sunshine_hr < 0 || formData.Sunshine_hr > 24) {
      newErrors.Sunshine_hr = "Sunshine hours must be between 0 and 24";
    }
    
    if (!formData.Soil_pH || formData.Soil_pH < 0 || formData.Soil_pH > 14) {
      newErrors.Soil_pH = "Soil pH must be between 0 and 14";
    }
    
    if (!formData.Soil_Type) newErrors.Soil_Type = "Soil type selection is required";
    
    if (!formData.N || formData.N < 0) {
      newErrors.N = "Nitrogen value must be positive";
    }
    
    if (!formData.P || formData.P < 0) {
      newErrors.P = "Phosphorus value must be positive";
    }
    
    if (!formData.K || formData.K < 0) {
      newErrors.K = "Potassium value must be positive";
    }
    
    if (!formData.Fertilizer_kg_ha || formData.Fertilizer_kg_ha < 0) {
      newErrors.Fertilizer_kg_ha = "Fertilizer value must be positive";
    }
    
    if (!formData.Pesticide_kg_ha || formData.Pesticide_kg_ha < 0) {
      newErrors.Pesticide_kg_ha = "Pesticide value must be positive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.Crop || !formData.season) {
      alert("Please fill in all required fields (Crop Type & Season).");
      return;
    }
  
    setIsLoading(true);
    setSubmitted(true);
  
    try {
      const response = await fetch("http://10.190.52.128:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Parse JSON once
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
  
      // Access fields returned by your backend
      setPrediction(data.recommendation_text || "No prediction available");
  
      console.log("Prediction response:", data);
  
    } catch (error) {
      console.error("API Error:", error);
      setErrors({
        submit:
          "Failed to get prediction from server. Please check backend connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, type = "text", field, placeholder, icon: Icon, options, step }) => (
    <div>
      <label className="block text-sm font-semibold mb-2 text-green-800 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </label>
      {options ? (
        <select
          className={`w-full border-2 rounded-xl p-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-green-200 bg-white hover:border-green-300'
          }`}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : field === "Crop" ? (
        <input
          type="text"
          list="cropTypes"
          className={`w-full border-2 rounded-xl p-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-green-200 bg-white hover:border-green-300'
          }`}
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <input
          type={type}
          step={step}
          className={`w-full border-2 rounded-xl p-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-green-200 bg-white hover:border-green-300'
          }`}
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      )}
      <datalist id="cropTypes">
        {cropTypes.map(crop => (
          <option key={crop} value={crop} />
        ))}
      </datalist>
      {errors[field] && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  if (currentPage === 'weather') {
    return (
      <WeatherDataPage 
        onBack={() => setCurrentPage('form')} 
        onWeatherData={handleWeatherData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6" />
              Crop Information
            </h2>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Crop Type"
                  field="Crop"
                  placeholder="Select or type crop name"
                  icon={Leaf}
                />
                
                <InputField
                  label="Growing Season"
                  field="season"
                  placeholder="Select Season"
                  options={[
                    { value: "kharif", label: "Kharif (Jun-Oct)" },
                    { value: "rabi", label: "Rabi (Nov-Apr)" },
                    { value: "zaid", label: "Zaid (Mar-Jun)" }
                  ]}
                />
              </div>

              {/* Weather Conditions */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Weather Conditions
                  </h3>
                  <button
                    onClick={() => setCurrentPage('weather')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Weather Data
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Temperature"
                    type="number"
                    field="Temp_Avg_C"
                    placeholder="°C"
                    icon={Thermometer}
                  />
                  <InputField
                    label="Rainfall"
                    type="number"
                    field="Rainfall_mm"
                    placeholder="mm"
                    icon={Droplets}
                  />
                  <InputField
                    label="Humidity"
                    type="number"
                    field="Humidity"
                    placeholder="%"
                    icon={Cloud}
                  />
                  <InputField
                    label="Sunshine Hours"
                    type="number"
                    field="Sunshine_hr"
                    placeholder="hours/day"
                    icon={Sun}
                    step="0.1"
                  />
                </div>
              </div>

              {/* Soil Information */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-4">
                  Soil Properties
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Soil pH Level"
                    type="number"
                    field="Soil_pH"
                    step="0.1"
                    placeholder="6.5"
                  />
                  <InputField
                    label="Soil Type"
                    field="Soil_Type"
                    placeholder="Select Soil Type"
                    options={["Alluvial", "Red", "Desert", "Mountain","Black","Laterite"]}
                  />
                </div>
              </div>

              {/* Nutrients */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">
                  Nutrient Levels (kg/ha)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField
                    label="Nitrogen (N)"
                    type="number"
                    field="N"
                    placeholder="120"
                  />
                  <InputField
                    label="Phosphorus (P)"
                    type="number"
                    field="P"
                    placeholder="60"
                  />
                  <InputField
                    label="Potassium (K)"
                    type="number"
                    field="K"
                    placeholder="40"
                  />
                </div>
              </div>

              {/* Inputs */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  Agricultural Inputs (kg/ha)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Fertilizer"
                    type="number"
                    field="Fertilizer_kg_ha"
                    placeholder="200"
                  />
                  <InputField
                    label="Pesticide"
                    type="number"
                    field="Pesticide_kg_ha"
                    placeholder="2"
                  />
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  {errors.submit}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Predicting Yield...
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    Predict Crop Yield
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Prediction Results */}
            {prediction && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <div className="text-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Yield Prediction Results
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
                    <h4 className="text-lg font-semibold mb-2">Predicted Yield</h4>
                    <div className="text-4xl font-bold mb-1">
                      {prediction.predictedYield?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-green-100">kg/hectare</div>
                  </div>

                  {prediction.confidence && (
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-blue-800 mb-2">
                        Confidence Level
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-blue-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${prediction.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-blue-800 font-semibold">
                          {prediction.confidence}%
                        </span>
                      </div>
                    </div>
                  )}

                  {prediction.recommendations && prediction.recommendations.length > 0 && (
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-amber-800 mb-4">
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-amber-700">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Display any additional data from backend */}
                  {prediction.additionalData && (
                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-purple-800 mb-4">
                        Additional Insights
                      </h4>
                      <pre className="text-sm text-purple-700 whitespace-pre-wrap">
                        {JSON.stringify(prediction.additionalData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info Cards */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-6">
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <Cloud className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Weather Analysis</h4>
                    <p className="text-gray-600 text-sm">
                      Temperature, rainfall, humidity, and sunshine patterns are analyzed for optimal growing conditions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                    <Leaf className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Soil Assessment</h4>
                    <p className="text-gray-600 text-sm">
                      Soil pH and type determine nutrient availability and water retention capacity.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                    <Bug className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Input Optimization</h4>
                    <p className="text-gray-600 text-sm">
                      Fertilizer and pesticide usage is factored into the prediction model for accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!submitted && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Weather Data</h3>
                <p className="text-blue-100 mb-4">
                  Get current weather conditions automatically to improve prediction accuracy.
                </p>
                <button
                  onClick={() => setCurrentPage('weather')}
                  className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Get Weather Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPredictionForm;