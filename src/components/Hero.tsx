import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen md:h-[56.25vw]">
      <div className="absolute inset-0">
        {/* Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/517935003.hd.mp4?s=539faad12f040eb5afd8de3160db2d5dfb2a869a&profile_id=175"
            type="video/mp4"
          />
        </video>
        
        {/* Mobile Video - shorter, more vertical-friendly content */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="md:hidden w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/492834541.hd.mp4?s=1cc65aa6dce0b3aa82a57b04445bac701e622130&profile_id=174"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Music className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            FARMERS BASH
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl mb-8"
          >
            The Ultimate Country Music Festival
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
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
      </div>
    </div>
  );
};

export default Hero;