import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-green-100 text-green-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
          disabled={status === 'loading'}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
          disabled={status === 'loading'}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full p-2 border rounded-lg"
          disabled={status === 'loading'}
        />
        {errorMessage && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm"
          >
            {errorMessage}
          </motion.p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? "Sending..." : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm; 