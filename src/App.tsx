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

  const artists = [
    {
      name: 'Kaiser Chiefs',
      image: '/images/KaiserChiefs.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'BeWitched',
      image: '/images/Bewitched.png',
      website: 'https://example.com/countrystars'
    },
    {
      name: 'Rural Routes',
      image: '/images/AllFolk_dUp.jpg',
      website: 'https://example.com/ruralroutes'
    },
    {
      name: 'Allie Sherlock',
      image: '/images/AllieSherlock.jpeg',
      website: 'https://example.com/farmhouse'
    },
    {
      name: 'Boyzlife',
      image: '/images/Boyzlife.png',
      website: 'https://example.com/harvestmoon'
    },
    {
      name: 'Clodagh Lawlor',
      image: '/images/ClodaghLawlor.jpg',
      website: 'https://example.com/haymakers'
    },
    {
      name: 'David James',
      image: '/images/DavidJames.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Derek Ryan',
      image: '/images/DerekRyan.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Garron Noone',
      image: '/images/GarronNoone.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Lisa McHugh',
      image: '/images/LisaMcHugh.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Mike Denver',
      image: '/images/MikeDenver.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Nathan Carter',
      image: '/images/NathanCarter.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Olivia Douglas',
      image: '/images/OliviaDouglas.png',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Robert Mizzell',
      image: '/images/RobertMizzell.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Shrek The Rave',
      image: '/images/ShrekTheRave.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'The 2 Johnnies',
      image: '/images/The2Johnnies.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'The Coronas',
      image: '/images/TheCoronas.jpg',
      website: 'https://example.com/countryroads'
    },
    {
      name: 'Tumbling Paddies',
      image: '/images/TumblingPaddies.jpg',
      website: 'https://example.com/countryroads'
    }
  ];

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
      icon: <Music2 className="w-6 h-6" />,
      content: (
        <div className="grid md:grid-cols-3 gap-8">
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
      ),
    },
    {
      id: 'lineup',
      title: 'LINEUP',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Day 1 - Friday</h3>
            <ul className="space-y-2">
              <li>7:00 PM - The Country Stars</li>
              <li>8:30 PM - Rural Routes</li>
              <li>10:00 PM - Farm House Band</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Day 2 - Saturday</h3>
            <ul className="space-y-2">
              <li>6:00 PM - Harvest Moon</li>
              <li>7:30 PM - The Hay Makers</li>
              <li>9:00 PM - Country Roads</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'artists',
      title: 'ARTISTS',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <motion.a
              key={artist.name}
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={artist.image}
                alt={artist.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold mb-1">{artist.name}</h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ),
    },
    {
      id: 'info',
      title: 'INFO',
      icon: <Info className="w-6 h-6" />,
      content: (
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
      ),
    },
    {
      id: 'about',
      title: 'ABOUT',
      icon: <Info className="w-6 h-6" />,
      content: (
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed">
            Farmers Bash is the biggest country music festival celebrating rural life and music.
            Join us for two days of incredible performances, delicious local food, and unforgettable memories.
            Started in 2020, we've grown to become the premier country music event in the region.
          </p>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      icon: <Mail className="w-6 h-6" />,
      content: (
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
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12 space-y-24">
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
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
    </div>
  );
}

export default App;