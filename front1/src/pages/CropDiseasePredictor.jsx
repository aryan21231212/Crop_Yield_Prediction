import React, { useState } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiLoader } from 'react-icons/fi';

// A simple component to render the markdown-like response from the API
const PredictionResponse = ({ text }) => {
    // Split by newlines and render paragraphs, handling bold text
    const lines = text.split('\n').map((line, index) => {
      if (line.trim() === '') return null; // Ignore empty lines
      
      const parts = line.split('**').map((part, i) => 
        i % 2 === 1 ? <strong key={i} className="text-zinc-800">{part}</strong> : part
      );
      
      return <p key={index} className="mb-3">{parts}</p>;
    });
    
    return <div className="text-gray-600 leading-relaxed">{lines}</div>;
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
    <div className="relative min-h-screen bg-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Background Image with Dark Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://th.bing.com/th/id/R.cb4282deaeb66c9297c43cb1198e3972?rik=CWmd4LDgynzsGQ&riu=http%3a%2f%2fpicz.in%2fdata%2fmedia%2f6%2fshutterstock_11131789_1932x1445.jpg&ehk=YZNXH1RLdJ%2bpaJJihqwcOwTYTfPoCjThHFdrypU8rCo%3d&risl=&pid=ImgRaw&r=0')" }}
        ></div>
        <div className="absolute inset-0 z-10 bg-black opacity-60"></div>

        {/* Main Content Card */}
        <div className="relative z-20 max-w-5xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side: Uploader */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2 text-center">Crop Disease Detection</h1>
                <p className="text-gray-600 text-center mb-6">Upload an image of a plant leaf to get an instant AI analysis.</p>
                
                <label htmlFor="file-upload" className="w-full h-64 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center mb-4 relative cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Crop preview" className="h-full w-full object-contain rounded-2xl p-2" />
                    ) : (
                        <div className="text-center text-gray-500">
                            <FiUploadCloud className="mx-auto text-5xl mb-2" />
                            <span className="font-semibold">Click to upload an image</span>
                        </div>
                    )}
                </label>

                <input type="file" id="file-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
                
                <button
                    onClick={handleSubmit}
                    disabled={loading || !imageFile}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <FiLoader className="animate-spin" />
                            Analyzing...
                        </>
                    ) : 'Predict Disease'}
                </button>
            </div>

            {/* Right Side: Prediction */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-inner flex flex-col">
                <h2 className="text-2xl font-bold text-zinc-800 mb-4 border-b pb-2">Analysis Result</h2>
                <div className="flex-grow overflow-y-auto pr-2">
                    {loading && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600">
                            <FiLoader className="text-4xl animate-spin mb-4" />
                            <p className="font-semibold">Please wait, the AI is analyzing...</p>
                        </div>
                    )}
                    {error && <p className="text-red-500 font-semibold">{error}</p>}
                    {prediction && (
                        <div className="prose max-w-none">
                            <PredictionResponse text={prediction} />
                        </div>
                    )}
                    {!loading && !error && !prediction && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                            <p className="font-semibold">The analysis of your crop will appear here.</p>
                            <p className="text-sm mt-2">Upload an image and click "Predict" to begin.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default CropDiseasePredictor;
