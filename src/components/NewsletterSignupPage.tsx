import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsletterSignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/bg6.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Rosebay_Slab']">
                Stay Updated!
              </h1>
              <p className="text-gray-600 text-lg">
                Subscribe to our newsletter for exclusive updates, artist announcements,
                and special offers!
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-md focus:border-green-500 focus:outline-none transition-colors"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl"
              >
                <h3 className="font-bold text-lg mb-1">🎉 Welcome aboard!</h3>
                <p>Thanks for subscribing to our newsletter!</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl"
              >
                <h3 className="font-bold text-lg mb-1">Oops!</h3>
                <p>{errorMessage}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupPage;
