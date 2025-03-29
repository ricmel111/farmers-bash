import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/manebdwj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-white rounded-xl shadow-xl w-[90%] max-w-[360px] p-5 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Updated!</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for exclusive updates, artist announcements,
          and special offers!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-green-600 mt-4">Thanks  for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NewsletterPopup;