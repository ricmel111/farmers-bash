import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield } from 'lucide-react';

const GDPRPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasMadeChoice = localStorage.getItem('gdprChoice');
    if (!hasMadeChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprChoice', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('gdprChoice', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-green-400/30 shadow-xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Cookie className="w-4 h-4" />
                Accept All
              </button>
              <button
                onClick={handleAccept}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GDPRPopup; 