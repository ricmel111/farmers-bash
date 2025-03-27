import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  menuItems: { id: string; title: string }[];
  activeSection: string;
  onMenuItemClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleMenu, 
  isMenuOpen, 
  menuItems,
  activeSection,
  onMenuItemClick 
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (id: string) => {
    const element = document.getElementById(`${id.toLowerCase()}-anchor`);
    if (element) {
      const yOffset = -100; // Adjust this value based on your needs
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    onMenuItemClick(id);
    toggleMenu();
  };

  return (
    <>
      {/* Regular Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className={`h-32 w-28 relative transition-opacity duration-300 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}>
              <img
                src="/images/farmers-bash-logo.svg"
                alt="Farmers Bash Logo"
                className="absolute top-0 left-0 h-full w-full object-contain"
              />
            </div>

            {/* Desktop Menu - Hide when scrolled */}
            <div className={`hidden md:flex items-center space-x-8 transition-opacity duration-300 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}>
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`text-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-green-400'
                      : 'text-white hover:text-green-400'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Button - Show on all widths when scrolled */}
      <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${
        scrolled ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none'
      }`}>
        <motion.button
          onClick={toggleMenu}
          className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay - Now works on all widths */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-black/90 backdrop-blur-xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header with Close Button */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <img
                    src="/images/farmers-bash-logo.svg"
                    alt="Farmers Bash Logo"
                    className="h-12 w-auto object-contain"
                  />
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <ul className="space-y-1 px-2">
                    {menuItems.map((item) => (
                      <motion.li key={item.id}>
                        <motion.button
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                            activeSection === item.id
                              ? 'bg-green-500/20 text-green-400'
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.title}
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Menu Footer */}
                <div className="p-6 border-t border-white/10">
                  <div className="text-sm text-white/60 text-center">
                    © 2024 Farmers Bash
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;