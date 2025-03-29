import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false);

  // Add a wrapper style to prevent white flash
  const videoWrapperStyle = {
    background: 'black', // Match your video background
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <>
      <div className="hidden md:block w-full aspect-[16/9]" style={videoWrapperStyle}>
        {/* Desktop Placeholder Image */}
        <AnimatePresence>
          {!desktopVideoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
            >
              <img 
                src="/images/bg4.jpg" 
                alt="Farmers Bash"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Video */}
        <iframe
          src="https://player.vimeo.com/video/1070514030?background=1&quality=1080p"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: desktopVideoLoaded ? 1 : 0 }} // Hide until loaded
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setDesktopVideoLoaded(true)}
        ></iframe>
      </div>

      <div className="md:hidden w-full aspect-[9/16] mb-[-1px]" style={videoWrapperStyle}>
        {/* Mobile Placeholder Image */}
        <AnimatePresence>
          {!mobileVideoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
            >
              <img 
                src="/images/bg4.jpg" 
                alt="Farmers Bash"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Video */}
        <iframe
          src="https://player.vimeo.com/video/1070514071?background=1&quality=1080p"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: mobileVideoLoaded ? 1 : 0 }} // Hide until loaded
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setMobileVideoLoaded(true)}
        ></iframe>
        
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
    </>
  );
};

export default Hero;