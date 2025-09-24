// src/components/ContentGridSection.jsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const categories = ["Organic farm", "Automation farm", "Bio-medical farm"];

const cardImages = [
  "https://via.placeholder.com/400x500/e0e0e0/cccccc?text=Image+1",
  "https://via.placeholder.com/400x350/d0d0d0/bbbbbb?text=Image+2",
  "https://via.placeholder.com/400x450/c0c0c0/aaaaaa?text=Image+3",
  "https://via.placeholder.com/400x400/b0b0b0/999999?text=Image+4",
];

const ContentGridSection = () => {
  const [activeCategory, setActiveCategory] = useState("Organic farm");

  return (
    <section className="bg-gray-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-20 mb-16">
        <div className="flex flex-col md:pr-10">
          <p className="text-gray-500 text-lg font-semibold mb-8">2025</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-lg font-medium pb-1 relative ${
                  activeCategory === category
                    ? "text-zinc-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-zinc-900"
                    : "text-gray-500 hover:text-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col pl-0 md:pl-10 border-l border-gray-300 md:border-none">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight mb-8">
            Despite Advances In Agri-Tech, Traditional Labor-Intensive Farming Highlights Ongoing Inefficiencies.
          </h2>
          <div className="flex flex-wrap gap-x-8 text-lg font-medium text-zinc-900">
            <p className="pb-1 border-b-2 border-zinc-900">Harvesting Legacy.</p>
            <p className="text-gray-500">Planting Tomorrow</p>
          </div>
        </div>
      </div>

      {/* Masonry / Collage Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
        {/* Card 1: Get Started */}
        <div className="bg-white rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-lg relative row-span-2">
          <h3 className="text-3xl font-extrabold text-zinc-900 mb-2">Get Started Now</h3>
          <div className="absolute -top-4 -right-4 bg-emerald-500 rounded-full p-3 shadow-md">
            <AiOutlinePlus className="text-white text-3xl" />
          </div>
        </div>

        {/* Image Cards */}
        {cardImages.map((src, index) => {
          // Random row-span for collage effect
          const rowSpan = [1, 2, 1, 2][index % 4];
          return (
            <div
              key={index}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg row-span-${rowSpan}`}
            >
              <img
                src={src}
                alt={`Card Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContentGridSection;
