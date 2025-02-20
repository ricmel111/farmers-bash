import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music2, Calendar, Users, Info, Mail, MapPin } from 'lucide-react';
import NewsletterPopup from './components/NewsletterPopup';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setShowNewsletter(true);
        setHasSeenPopup(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasSeenPopup]);

  const sections = [
    {
      id: 'tickets',
      title: 'TICKETS',
      bg: 'bg-gray-100',
      icon: <Music2 className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12 bg">
          <div className="grid md:grid-cols-3 gap-8 backdrop">
            {['Early Bird', 'Regular', 'VIP'].map((type) => (
              <div key={type} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{type}</h3>
                <p className="text-3xl font-bold mb-4">
                  ${type === 'VIP' ? '299' : type === 'Regular' ? '199' : '149'}
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'lineup',
      title: 'LINEUP',
      bg: 'bg-white',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <div>
              <img
                src="/images/Banner-A.png"
                alt="Farmers Bash Banner"
                className="w-full h-auto"
              />
              <img
                src="/images/Lineup.png"
                alt="Farmers Bash Lineup"
                className="w-full h-auto -mt-16"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'artists',
      title: 'ARTISTS',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative group">
                <img
                  src={`https://source.unsplash.com/800x600/?country,music,artist&sig=${i}`}
                  alt={`Artist ${i}`}
                  className="rounded-lg shadow-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Artist Name {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'info',
      title: 'INFO',
      icon: <Info className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Farmers Field, Country Road, Rural County
              </p>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Getting Here</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Free parking available</li>
                  <li>Shuttle service from downtown</li>
                  <li>RV camping spots available</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Festival Rules</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>No outside food or drinks</li>
                <li>No pets allowed</li>
                <li>Bring your own chairs</li>
                <li>All ages welcome</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'about',
      title: 'ABOUT',
      icon: <Info className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              Farmers Bash is the biggest country music festival celebrating rural life and music.
              Join us for two days of incredible performances, delicious local food, and unforgettable memories.
              Started in 2020, we've grown to become the premier country music event in the region.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      icon: <Mail className="w-6 h-6" />,
      content: (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Hero />
      
      <div className="">
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            bg={section.bg || ''}
            icon={section.icon}
          >
            {section.content}
          </Section>
        ))}
      </div>

      <Footer />

      <AnimatePresence>
        {showNewsletter && (
          <NewsletterPopup onClose={() => setShowNewsletter(false)} />
        )}
      </AnimatePresence>

      <img
        src="/images/top-left.png"
        alt="Top Left Corner"
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 z-20"
      />
      <img
        src="/images/top-right.png"
        alt="Top Right Corner"
        className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 z-20"
      />
    </div>
  );
}

export default App;