import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '@vimeo/player'; // Import Vimeo Player API

const Hero = () => {
  const [desktopVideoReady, setDesktopVideoReady] = useState(false);
  const [mobileVideoReady, setMobileVideoReady] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [mobilePlaceholderVisible, setMobilePlaceholderVisible] = useState(true);
  
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // Video playback hooks commented out since we're showing static images
  /*
  useEffect(() => {
    if (desktopVideoRef.current) {
      const player = new Player(desktopVideoRef.current);
      player.on('play', () => setDesktopVideoReady(true));
      return () => player.off('play');
    }
  }, []);

  useEffect(() => {
    if (mobileVideoRef.current) {
      const player = new Player(mobileVideoRef.current);
      player.on('play', () => setMobileVideoReady(true));
      return () => player.off('play');
    }
  }, []);
  */

  return (
    <>
      {/* Desktop: static image instead of video */}
      <div className="hidden md:block w-full aspect-[3/2]" style={{ position: 'relative', background: 'black' }}>
        <AnimatePresence>
          {placeholderVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: desktopVideoReady ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <img
                src="/images/FB26-BG-E.jpg"
                alt="Farmer's Bash"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop video iframe commented out - static image used */}
        {/*
        <iframe
          ref={desktopVideoRef}
          src="https://player.vimeo.com/video/1070514030?background=1&quality=1080p"
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: desktopVideoReady ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
        */}

        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        
        {/* Desktop Logo and Lineup */}
        <div className="absolute inset-0 flex flex-col items-center justify-start z-20 px-4 pt-24">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            src="/images/FB26-Logo-[V1].png"
            alt="FB26 Logo"
            className="max-w-[25%] h-auto mb-6"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
            src="/images/FB26-Lineup-B-[V1].png"
            alt="Farmers Bash Lineup"
            className="max-w-4xl w-full h-auto"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
            src="/images/FB26-Footer-[V1].png"
            alt="Farmers Bash Footer"
            className="max-w-4xl w-full h-auto mt-4"
          />
        </div>
      </div>

      {/* Mobile: use FB26-BG-B.jpg as background and center FB26-Logo-[V1].png */}
      <div
        className="md:hidden w-full aspect-[9/16] mb-[-1px] relative"
        style={{
          backgroundImage: "url('/images/FB26-BG-B.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* <div className="absolute inset-0 flex items-center justify-center z-20">
          <img
            src="/images/FB26-Logo-[V1].png"
            alt="FB26 Logo"
            style={{ maxWidth: '75%', height: 'auto' }}
          />
        </div> */}

        <div className="absolute inset-0 flex flex-col items-center justify-start z-20 px-4 pt-16">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            src="/images/FB26-Logo-[V1].png"
            alt="FB26 Logo"
            className="max-w-[90%] h-auto mb-4"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            src="/images/FB26-Lineup-B-[V1].png"
            alt="Farmers Bash Lineup"
            className="max-w-full w-full h-auto mb-4"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="flex flex-col items-center gap-2"
          >
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              src="/images/FB26-Venue-[V1].png"
              alt="Venue"
              className="max-w-[60%] h-auto"
            />
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 1.0,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              src="/images/FB26-Date-[V1].png"
              alt="Date"
              className="max-w-[50%] h-auto"
            />
          </motion.div>
        </div>

        {/* keep gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
    </>
  );
};

export default Hero;
