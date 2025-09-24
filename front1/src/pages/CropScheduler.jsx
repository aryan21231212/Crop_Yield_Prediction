import React, { useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiSend, FiLoader } from 'react-icons/fi';


// This component is a bit more advanced to handle Markdown tables
const ScheduleResponse = ({ text }) => {
    const sections = text.split('\n## ');
    return (
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
            {sections.map((section, index) => {
                if(section.trim() === '') return null;
                const lines = section.split('\n').filter(line => line.trim() !== '');
                const heading = index > 0 ? `## ${lines[0]}` : lines[0];
                const content = lines.slice(1);

                const isTable = content.some(line => line.includes('|'));

                if(isTable) {
                    const headerRow = content[0].split('|').map(h => h.trim()).filter(Boolean);
                    const bodyRows = content.slice(2).map((row, rIndex) => (
                        <tr key={rIndex} className="border-b">
                            {row.split('|').map(c => c.trim()).filter(Boolean).map((cell, cIndex) => (
                                <td key={cIndex} className="p-2">{cell}</td>
                            ))}
                        </tr>
                    ));

                    return (
                        <div key={index} className="overflow-x-auto">
                            <h2 className="font-bold text-zinc-800">{heading.replace('## ', '')}</h2>
                            <table className="min-w-full bg-white rounded-lg mt-2">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {headerRow.map((header, hIndex) => (
                                            <th key={hIndex} className="p-2 text-left font-semibold text-zinc-700">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>{bodyRows}</tbody>
                            </table>
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <h2 className="font-bold text-zinc-800">{heading.replace('## ', '')}</h2>
                        {content.map((p, pIndex) => <p key={pIndex} className="mb-3">{p}</p>)}
                    </div>
                );
            })}
        </div>
    );
};


const CropScheduler = () => {
  
    const [formData, setFormData] = useState({
        cropName: '', soilType: 'loamy', soilPH: '6.5',
        temperature: '25', rainfall: '10', growthStage: 'vegetative',
        lastFertilizer: '',
    });
    const [schedule, setSchedule] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSchedule('');
        try {
            const res = await axios.post('http://localhost:3000/api/schedule', formData);
            setSchedule(res.data.schedule);
        } catch (err) {
            console.error(err);
            setError('Failed to generate a schedule. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
             style={{ backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.leUcEChYZIbEsnNYuhNvmAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            
            <div className="relative z-10 max-w-6xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 my-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-zinc-900">Crop Scheduler</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Generate a 7-day crop management schedule based on your farm data.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Form Fields */}
                            <div>
                                <label className="font-semibold text-zinc-700">Crop Name</label>
                                <input type="text" name="cropName" value={formData.cropName} onChange={handleChange} placeholder="Enter crop name" required className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="font-semibold text-zinc-700">Soil Type</label>
                                <select name="soilType" value={formData.soilType} onChange={handleChange} className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-lg">
                                    <option value="sandy">Sandy</option>
                                    <option value="clay">Clay</option>
                                    <option value="loamy">Loamy</option>
                                    <option value="silty">Silty</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold text-zinc-700">Growth Stage</label>
                                <select name="growthStage" value={formData.growthStage} onChange={handleChange} className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-lg">
                                    <option value="germination">Germination</option>
                                    <option value="vegetative">Vegetative</option>
                                    <option value="flowering">Flowering</option>
                                    <option value="fruiting">Fruiting</option>
                                </select>
                            </div>
                             <div>
                                <label className="font-semibold text-zinc-700">Last Fertilizer Date</label>
                                <input type="date" name="lastFertilizer" value={formData.lastFertilizer} onChange={handleChange} className="w-full p-3 mt-1 bg-white border border-gray-300 rounded-lg"/>
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 flex items-center justify-center gap-2">
                                {loading ? <><FiLoader className="animate-spin" /> Generating...</> : <><FiSend /> Generate Schedule</>}
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Results */}
                    <div className="lg:col-span-3 bg-gray-50/80 p-6 rounded-2xl shadow-inner flex flex-col ">
                         <h2 className="text-2xl font-bold text-zinc-800 mb-4 border-b pb-2">Schedule Results</h2>
                         <div className="flex-grow overflow-y-scroll pr-2 h-[300px]">
                            {loading && <div className="flex flex-col items-center justify-center h-full text-gray-600"><FiLoader className="text-4xl animate-spin mb-4" /><p>Generating your schedule...</p></div>}
                            {error && <p className="text-red-500 font-semibold">{error}</p>}
                            {schedule && <ScheduleResponse text={schedule} />}
                            {!loading && !error && !schedule && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                                    <FiCalendar className="text-5xl mb-4" />
                                    <p className="font-semibold">No schedule generated yet</p>
                                    <p className="text-sm mt-2">Fill the form and click "Generate Schedule" to see results.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropScheduler;
