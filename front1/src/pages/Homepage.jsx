// src/components/HeroSection.jsx

import React from 'react';
import { BsArrowRight } from 'react-icons/bs'; // For the arrow icon in the button
import { FaPlus, FaStarOfLife } from 'react-icons/fa'; // Using FaPlus for the star-like elements
import GlassyBadge from '../../../front1/src/components/GlassyBadge';
import MorphingButton from '../../../front1/src/components/MorphingButton';
import back from '../assets/bg.png'
import RotatingText from '../components/RotatingText';
const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20 overflow-hidden ">
      {/* Background image at the bottom, adjusted to match the reference */}
      <div
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[450px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${back})`, // Placeholder image
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
<div className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-tight mb-6 flex flex-wrap items-center gap-2 justify-center">
  <span>Bring</span>
  
  <span className="flex mx-4">
    <RotatingText
      texts={['Bright', 'Smart', 'Heavy', 'Faster']}
      mainClassName="bg-transparent text-blue-600 overflow-hidden px-2  rounded-lg"
      staggerFrom="last"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-120%' }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden  sm:pb-1 md:pb-1"
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  </span>

  <span>Growth</span>
  
  <br className="hidden md:block" />
  
  <span>To Agriculture.</span>
</div>


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