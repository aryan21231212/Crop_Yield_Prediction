// src/components/SolutionsGridSection.jsx
import React from 'react';

const solutions = [
  {
    image: 'https://www.world-grain.com/ext/resources/TopicLandingPages/Grain-Storage-and-Handling-companies.jpg?1533655181',
    title: 'Farming Precision',
    description: 'Our precision farming employs state-of-the-art technology to optimize every aspect of farm operations.',
  },
  {
    image: 'https://tse2.mm.bing.net/th/id/OIP.0Pb1fHPIxQVME-0FOvVTdQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
    title: 'Crop Surveillance',
    description: 'Track your crops\' health and growth in real-time with our innovative solutions.',
  },
  {
    image: 'https://robots.net/wp-content/uploads/2023/09/ai-startup-revolutionizes-crop-breeding-for-climate-resilience-1695159458.jpg',
    title: 'Automated Farming',
    description: 'Enhance farm efficiency and productivity with our cutting-edge automation solutions.',
  },
];

const SolutionsGridSection = () => {
  return (
    <section className="bg-gray-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center md:text-left mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight mb-4">
            Next-Gen Solutions For <br className="hidden md:block" /> Optimal Crop Growth
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto md:mx-0">
            We provide cutting-edge services to help farmers maximize crop yields. Our precision farming, crop monitoring, and automation solutions aim to revolutionize agriculture.
          </p>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
              {/* Image */}
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-60 object-cover"
              />
              {/* Text */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-base flex-grow">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGridSection;
