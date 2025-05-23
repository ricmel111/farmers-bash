import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        // Reset form after 3 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {status === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 p-4 rounded-lg mb-6"
        >
          <h3 className="text-lg font-bold mb-2">Thank You!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </motion.div>
      )}
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-2 border rounded-lg bg-white"
          disabled={status === 'loading'}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded-lg bg-white"
          disabled={status === 'loading'}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          required
          className="w-full p-2 border rounded-lg bg-white"
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