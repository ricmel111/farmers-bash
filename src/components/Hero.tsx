import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/1600x900/?country,music,festival"
          alt="Festival"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          FARMERS BASH
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          The Ultimate Country Music Festival
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-4"
        >
          <a
            href="#tickets"
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Get Tickets
          </a>
          <a
            href="#lineup"
            className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            View Lineup
          </a>
        </motion.div>

        <div className="mt-12 w-full max-w-4xl mx-auto">
            <video
            controls
            className="rounded-lg shadow-lg w-full md:w-[880px] mx-auto"
            >
            <source src="/path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </div>
    </div>
  );
};

export default Hero;