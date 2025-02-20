import React, { useState, useEffect } from 'react';
import { Menu, X, Ticket, Calendar, Music, Info, Users, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`md:fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent md:py-4 md:bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="hidden md:flex items-center space-x-8">
          <a href="#tickets" className="text-lg font-semibold text-[#664738]">Tickets</a>
          <a href="#lineup" className="text-lg font-semibold text-[#664738]">Lineup</a>
          <a href="#artists" className="text-lg font-semibold text-[#664738]">Artists</a>
          <a href="#info" className="text-lg font-semibold text-[#664738]">Info</a>
          <a href="#about" className="text-lg font-semibold text-[#664738]">About</a>
          <a href="#contact" className="text-lg font-semibold text-[#664738]">Contact</a>
        </div>
        <div className="md:hidden fixed top-4 right-4 z-50">
          <button onClick={toggleMenu} className="text-white bg-red-600 p-2 rounded-xl">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-red-600 to-red-400 shadow-lg z-30 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="#tickets" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Ticket className="w-6 h-6 mr-2" /> Tickets
          </a>
          <a href="#lineup" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Calendar className="w-6 h-6 mr-2" /> Lineup
          </a>
          <a href="#artists" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Music className="w-6 h-6 mr-2" /> Artists
          </a>
          <a href="#info" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Info className="w-6 h-6 mr-2" /> Info
          </a>
          <a href="#about" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Users className="w-6 h-6 mr-2" /> About
          </a>
          <a href="#contact" className="flex items-center text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
            <Mail className="w-6 h-6 mr-2" /> Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;