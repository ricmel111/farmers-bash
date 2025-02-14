import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative  overflow-hidden">
      {/* <div className="absolute inset-0 parallax-bg">
        <img
          src="/images/hero-bg.jpg"
          alt="Festival"
          className="w-full h-full object-cover fixed-bg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10" />
      </div> */}
      
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 z-10 mt-24">
        <motion.img
          src="/images/hero-logo.png"
          alt="Farmers Bash Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/4 lf:w-1/2 mb-6"
        />

      </div>

      {/* <div className="absolute bottom-0 w-full z-5">
        <img
          src="/images/hero-fg.png"
          alt="Foreground"
          className="w-full"
        />
      </div> */}
    </div>
  );
};

export default Hero;