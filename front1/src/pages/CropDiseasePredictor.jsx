// src/components/CropDiseasePredictor.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { FiUploadCloud } from 'react-icons/fi';

// A simple component to render the markdown-like response from the API
const PredictionResponse = ({ text }) => {
    // Split by newlines and render paragraphs, handling bold text
    const lines = text.split('\n').map((line, index) => {
      if (line.trim() === '') return null; // Ignore empty lines
      
      const parts = line.split('**').map((part, i) => 
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      );
      
      return <p key={index} className="mb-2">{parts}</p>;
    });
    
    return <div className="text-gray-700 leading-relaxed">{lines}</div>;
};


const CropDiseasePredictor = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction('');
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction('');

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      // The backend server should be running on localhost:5000
      const res = await axios.post('http://localhost:3000/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      setError('Failed to get a prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Uploader */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-extrabold text-zinc-900 mb-4 text-center">Crop Disease Detection</h1>
          <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Crop preview" className="h-full w-full object-contain rounded-lg" />
            ) : (
              <div className="text-center text-gray-500">
                <FiUploadCloud className="mx-auto text-4xl mb-2" />
                <span>Upload a leaf image</span>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <input type="file" id="file-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="file-upload" className="w-full text-center bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-300 transition">
              Choose Image
            </label>
            <button
              onClick={handleSubmit}
              disabled={loading || !imageFile}
              className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition disabled:bg-emerald-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Predict Disease'}
            </button>
          </div>
        </div>

        {/* Right Side: Prediction */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">Analysis Result</h2>
          {loading && <p className="text-gray-600">Please wait, the AI is analyzing your image...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          {prediction && (
            <div className="prose">
              <PredictionResponse text={prediction} />
            </div>
          )}
          {!loading && !error && !prediction && <p className="text-gray-500">The analysis of your crop will appear here.</p>}
        </div>
      </div>
    </div>
  );
};

export default CropDiseasePredictor;