import React from 'react';

const Hero = () => {
  return (
    <>
    <div className="hidden md:block relative w-full aspect-[16/9]">
      {/* Desktop Video */}
      <iframe
        src="https://player.vimeo.com/video/1070514030?background=1&quality=1080p"
        className="hidden md:block absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
    <div className="md:hidden relative w-full aspect-[9/16]">
      {/* Mobile Video */}
      <iframe
        src="https://player.vimeo.com/video/1070514071?background=1&quality=1080p"
        className="md:hidden absolute inset-0 w-full h-full"
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