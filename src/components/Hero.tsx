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

  // Handle desktop video playback detection
  useEffect(() => {
    if (desktopVideoRef.current) {
      const player = new Player(desktopVideoRef.current);
      player.on('play', () => setDesktopVideoReady(true));
      return () => player.off('play');
    }
  }, []);

  // Handle mobile video playback detection
  useEffect(() => {
    if (mobileVideoRef.current) {
      const player = new Player(mobileVideoRef.current);
      player.on('play', () => setMobileVideoReady(true));
      return () => player.off('play');
    }
  }, []);

  return (
    <>
     <div className="hidden md:block w-full aspect-[16/9]" style={{ position: 'relative', background: 'black' }}>
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
          src="/images/bg4.jpg"
          alt="Farmer's Bash"
          className="w-full h-full object-cover"
        />
      </motion.div>
    )}
  </AnimatePresence>

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

  {/* Gradient Overlay for Desktop */}
  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
</div>


      {/* Mobile Video Section */}
      <div className="md:hidden w-full aspect-[9/16] mb-[-1px]" style={{ position: 'relative', background: 'black' }}>
        <AnimatePresence>
          {mobilePlaceholderVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: mobileVideoReady ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <img
                src="/images/bg4.jpg"
                alt="Farmer's Bash"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          ref={mobileVideoRef}
          src="https://player.vimeo.com/video/1070514071?background=1&quality=1080p"
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: mobileVideoReady ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>

        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
    </>
  );
};

export default Hero;
