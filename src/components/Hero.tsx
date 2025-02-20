import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden hero-bg">
      <div className="relative flex flex-col items-center justify-center text-white text-center z-10 pt-20 md:pt-48 pb-0">
        <motion.img
          src="/images/hero-logo.png"
          alt="Farmers Bash Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1800px] mb-6 z-20"
        />
      </div>
      <div className="relative w-full" style={{ marginTop: '-50px' }}>
        <img
          src="/images/hero-fg.png"
          alt="Foreground"
          className="w-full object-cover z-10"
        />
      </div>
    </div>
  );
};

export default Hero;