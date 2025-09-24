'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TypewriterEffectSmoothDemo from '../components/TypewriterEffectSmoothDemo';

const solutions = [
  {
    image: 'https://www.world-grain.com/ext/resources/TopicLandingPages/Grain-Storage-and-Handling-companies.jpg?1533655181',
    title: 'Yield Prediction',
    description:
      'A data-driven platform that predicts crop yields and optimizes irrigation by analyzing historical yield data, soil conditions, and weather patterns. Helps farmers make informed decisions to maximize productivity and minimize resource wastage',
  },
  {
    image: 'https://tse2.mm.bing.net/th/id/OIP.0Pb1fHPIxQVME-0FOvVTdQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
    title: 'Irrigation Scheduling',
    description:
      'A smart platform that predicts crop yields and generates optimized irrigation schedules by analyzing historical yield data, soil conditions, and weather patterns. Enables farmers to boost productivity while conserving water and resources',
  },
  {
    image: 'https://robots.net/wp-content/uploads/2023/09/ai-startup-revolutionizes-crop-breeding-for-climate-resilience-1695159458.jpg',
    title: 'Crop Disease',
    description:
      'Platform that predicts crop disease and generates optimized treatment by analyzing historical data',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const SolutionsGridSection = () => {
  return (
    <section className="bg-gray-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center md:text-left mb-12 md:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight mb-4"
            variants={textVariants}
          >
            Next-Gen Solutions For <br className="hidden md:block" /> Optimal Crop Growth
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto md:mx-0"
            variants={textVariants}
          >
            We provide cutting-edge services to help farmers maximize crop yields. Our precision farming, crop monitoring, and automation solutions aim to revolutionize agriculture.
          </motion.p>
        </motion.div>

        {/* Cards Row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-base flex-grow">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsGridSection;
