import { useState } from "react";
// Import agriculture-related icons
import { FaSeedling, FaTractor, FaAppleAlt, FaGlobeAmericas, FaWater, FaSolarPanel, FaWarehouse } from "react-icons/fa";
import { GiCow, GiSunflower, GiChicken, GiBee, GiFarmer } from "react-icons/gi";

export default function ScrollingBar() {
  const [isPaused, setIsPaused] = useState(false);

  // Agriculture stack items (icons + colors)
  const items = [
    { id: 1, icon: <FaSeedling size={32} color="#228B22" /> },
    { id: 2, icon: <FaTractor size={32} color="#D2691E" /> },
    { id: 3, icon: <GiCow size={32} color="#8B4513" /> },
    { id: 4, icon: <GiSunflower size={32} color="#FFD700" /> },
    { id: 5, icon: <FaAppleAlt size={32} color="#FF0000" /> },
    { id: 6, icon: <GiChicken size={32} color="#FFA500" /> },
    { id: 7, icon: <FaGlobeAmericas size={32} color="#2E8B57" /> },
    { id: 8, icon: <FaWater size={32} color="#1E90FF" /> },
    { id: 9, icon: <FaSolarPanel size={32} color="#006400" /> },
    { id: 10, icon: <GiBee size={32} color="#FFD700" /> },
    { id: 11, icon: <FaWarehouse size={32} color="#708090" /> },
    { id: 12, icon: <GiFarmer size={32} color="#A0522D" /> },
  ];

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="w-full mx-auto">
        {/* Scrolling Bar */}
        <div className="relative overflow-hidden w-full">
          {/* Left blur gradient */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
          {/* Right blur gradient */}
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

          {/* Continuous Scrolling Track */}
          <div
            className="flex space-x-8 py-5 animate-scroll-left"
            style={{ width: "fit-content" }}
          >
            {[...items, ...items].map((item, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full font-semibold whitespace-nowrap bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/50 transition-all duration-500 cursor-pointer flex items-center justify-center"
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
