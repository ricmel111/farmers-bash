import React, { useState, useEffect } from 'react';
import { Menu, X, Music } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['TICKETS', 'LINEUP', 'ARTISTS', 'INFO', 'ABOUT', 'GET IN TOUCH'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className={`flex items-center gap-2 transition-all duration-300 ${
              scrolled ? 'text-green-600 scale-90' : 'text-white scale-100'
            }`}
          >
            <Music className={`transition-all duration-300 ${
              scrolled ? 'w-8 h-8' : 'w-10 h-10'
            }`} />
            <span className={`font-bold transition-all duration-300 ${
              scrolled ? 'text-xl' : 'text-2xl'
            }`}>
              FARMERS BASH
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                className={`transition-colors ${
                  scrolled 
                    ? 'text-gray-600 hover:text-green-600' 
                    : 'text-white hover:text-green-400'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              scrolled ? 'text-gray-600' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                className="block px-3 py-2 text-gray-600 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;