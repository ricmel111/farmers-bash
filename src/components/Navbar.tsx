import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex items-center space-x-8">
          <a href="#tickets" className="text-lg font-semibold text-gray-800">Tickets</a>
          <a href="#lineup" className="text-lg font-semibold text-gray-800">Lineup</a>
          <a href="#artists" className="text-lg font-semibold text-gray-800">Artists</a>
          <a href="#info" className="text-lg font-semibold text-gray-800">Info</a>
          <a href="#about" className="text-lg font-semibold text-gray-800">About</a>
          <a href="#contact" className="text-lg font-semibold text-gray-800">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;