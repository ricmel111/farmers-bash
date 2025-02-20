import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      
      <div className="relative h-[30rem] lg:h-[70rem] flex flex-col items-center justify-center text-white text-center z-10">
        <motion.img
          src="/images/hero-logo.png"
          alt="Farmers Bash Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1200px] mb-6 z-20"
        />
        <div className="absolute bottom-0 w-full">
          <img
            src="/images/hero-fg.png"
            alt="Foreground"
            className="w-full object-cover z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;