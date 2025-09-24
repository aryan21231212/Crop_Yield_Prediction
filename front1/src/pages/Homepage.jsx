// src/components/HeroSection.jsx

import React from 'react';
import { BsArrowRight } from 'react-icons/bs'; // For the arrow icon in the button
import { FaPlus, FaStarOfLife } from 'react-icons/fa'; // Using FaPlus for the star-like elements
import GlassyBadge from '../../../front1/src/components/GlassyBadge';
import MorphingButton from '../../../front1/src/components/MorphingButton';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20 overflow-hidden">
      {/* Background image at the bottom, adjusted to match the reference */}
      <div
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[450px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://img.freepik.com/premium-photo/dirt-road-large-green-wheat-field-beautiful-clouds-agricultural-land_592721-689.jpg")', // Placeholder image
          maskImage: 'linear-gradient(to top, black 10%, transparent 100%)', // Fades the top of the image
          WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)', // For Safari compatibility
        }}
      ></div>

      {/* Decorative elements (adjust positioning as needed) */}
      <FaStarOfLife className="absolute top-10 left-10 text-emerald-600 text-xl rotate-45" />
      <FaPlus className="absolute top-20 right-10 text-emerald-600 text-xl" />
      {/* <FaPlus className="absolute bottom-1/3 left-20 text-emerald-600 text-xl" /> */}
      {/* <FaStarOfLife className="absolute bottom-40 right-40 text-emerald-600 text-xl rotate-45" /> */}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-4xl mx-auto">
        {/* Top Tagline */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-4">
         
          <span><GlassyBadge/></span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-tight mb-6">
          Bring Fresh Growth <br className="hidden md:block" /> To Agriculture.
        </h1>

        {/* Sub-heading / Description */}
        <p className="text-base md:text-lg text-gray-600 mb-10 max-w-xl">
          Experience the ultimate golfing journey with expert tips, premium gear, and professional insights.
        </p>

        {/* Call to Action Button */}
       <MorphingButton/>
      </div>
    </div>
  );
};

export default HeroSection;