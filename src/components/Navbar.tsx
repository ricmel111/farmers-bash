import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      const sections = document.querySelectorAll('section');
      let currentSection = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 60;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['TICKETS', 'LINEUP', 'ARTISTS', 'INFO', 'ABOUT', 'GET IN TOUCH'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className={`flex items-center gap-2 transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}
          >
            <div className={`transition-all duration-300 ${scrolled ? 'bg-white rounded-full' : ''}`}>
              <img 
                src={scrolled ? "/images/farmers-bash-logo-sm.svg" : "/images/farmers-bash-logo.svg"} 
                alt="Farmers Bash Logo" 
                className={`transition-all duration-300 ${scrolled ? 'w-24' : 'w-40'}`} 
              />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                className={`transition-colors ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-400'} ${activeSection === item.toLowerCase().replace(/\s+/g, '') ? 'text-green-600' : ''}`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
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
                className={`block px-3 py-2 text-gray-600 hover:text-green-600 transition-colors ${activeSection === item.toLowerCase().replace(/\s+/g, '') ? 'text-green-600' : ''}`}
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