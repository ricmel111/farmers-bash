import React, { useState, useEffect, useRef } from 'react';
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
  const heroRef = useRef<HTMLDivElement>(null);

  const artists = [
    {
      name: 'Kaiser Chiefs',
      image: '/images/artists/KaiserChiefs.jpg',
      website: 'https://www.kaiserchiefs.com/'
    },
    {
      name: 'The 2 Johnnies',
      image: '/images/artists/The2Johnnies.jpg',
      website: 'https://www.the2johnnies.ie/'
    },
    {
      name: 'The Coronas',
      image: '/images/artists/TheCoronas.jpg',
      website: 'https://thecoronas.net/'
    },
    {
      name: 'Boyzlife',
      image: '/images/artists/Boyzlife.png',
      website: 'https://www.facebook.com/BoyzlifeTour'
    },
    {
      name: 'BWitched',
      image: '/images/artists/BWitched.png',
      website: 'https://bwitchedofficial.com/'
    },
    {
      name: 'Garron Noone',
      image: '/images/artists/GarronNoone.jpg',
      website: 'https://linktr.ee/garronnoone'
    },
    {
      name: 'Tumbling Paddies',
      image: '/images/artists/TumblingPaddies.jpg',
      website: 'https://thetumblingpaddiesofficial.com/'
    },
    {
      name: 'Rural Routes',
      image: '/images/artists/AllFolk_dUp.jpg',
      website: 'https://www.allfolkdup.ie/'
    },
    {
      name: 'Allie Sherlock',
      image: '/images/artists/AllieSherlock.jpeg',
      website: 'https://www.alliesherlock.com/'
    },
    {
      name: 'Clodagh Lawlor',
      image: '/images/artists/ClodaghLawlor.jpg',
      website: 'https://www.clodaghlawlormusic.com/'
    },
    {
      name: 'David James',
      image: '/images/artists/DavidJames.jpg',
      website: 'https://davidjamesmusic.co.uk/'
    },
    {
      name: 'Derek Ryan',
      image: '/images/artists/DerekRyan.jpg',
      website: 'https://derekryanmusic.com/'
    },
    {
      name: 'Lisa McHugh',
      image: '/images/artists/LisaMcHugh.jpg',
      website: 'https://lisamchughmusic.com/'
    },
    {
      name: 'Mike Denver',
      image: '/images/artists/MikeDenver.jpg',
      website: 'https://www.mikedenvermusic.com/'
    },
    {
      name: 'Nathan Carter',
      image: '/images/artists/NathanCarter.jpg',
      website: 'https://www.nathancartermusic.com/'
    },
    {
      name: 'Olivia Douglas',
      image: '/images/artists/OliviaDouglas.png',
      website: 'https://www.oliviadouglasmusic.com/'
    },
    {
      name: 'Robert Mizzell',
      image: '/images/artists/RobertMizzell.jpg',
      website: 'https://robertmizzell.ie/'
    },
    {
      name: 'Shrek Rave',
      image: '/images/artists/ShrekTheRave.jpg',
      website: 'https://www.shrekraveofficial.com/'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom + window.scrollY;
        if (window.scrollY > heroBottom && !hasSeenPopup) {
          setShowNewsletter(true);
          setHasSeenPopup(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasSeenPopup]);
  const sections = [
    {
      id: 'tickets',
      title: 'TICKETS',
      icon: <Music2 className="w-6 h-6" />,
      padding: 'pt-4 pb-48',
      background: {
        color: 'bg-gray-100',
        image: 'url(/images/farmers-bash-bg12.jpg)',
        position: 'right bottom',
        backgroundSize: 'cover',
      },
      useContainer: true,
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
      padding: 'pt-4',
      background: {
        color: 'bg-blue-100',
        image: 'url(/images/hero-bg.jpg)',
        position: 'center bottom',
        backgroundSize: 'cover'
      },
      useContainer: false,
      content: (
        <>
        <div className="relative flex flex-col items-center space-y-4">
          <img src="/images/Banner-A.png" alt="Farmers Bash Banner" className="max-w-full h-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 md:p-12">
          <img src="/images/Lineup-Saturday.png" alt="Lineup Saturday" className="max-w-full h-auto mb-12 md:mb-0" />
          <img src="/images/Lineup-Sunday.png" alt="Lineup Sunday" className="max-w-full h-auto" />
          </div>
          <div className="relative flex flex-col items-center space-y-4">
          <img src="/images/hero-fg.png" alt="Lineup Footer" className="w-max h-auto -mt-12" />
        </div>
        </>
            ),
          },
          {
            id: 'artists',
            title: 'ARTISTS',
            icon: <Users className="w-6 h-6" />,
            padding: 'pt-4 pb-48',
            background: {
        color: 'bg-red-900',
        image: 'url(/images/farmers-bash-bg3.jpg)',
        position: 'center bottom',
        backgroundSize: 'cover',
        attachment: 'fixed'
            },
            useContainer: true,
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-4 transition-transform duration-300">
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
      padding: 'pt-4 pb-48',
      background: {
        color: 'bg-green-100',
        image: 'url(/images/farmers-bash-bg5.jpg)',
        position: 'center center',
        backgroundSize: 'cover'
      },
      useContainer: true,
      content: (
        <div className="grid md:grid-cols-2 gap-8 text-white">
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
      padding: 'pt-4 pb-[30rem]',
      background: {
        color: 'bg-purple-100',
        image: 'url(/images/farmers-bash-bg1.jpg)',
        position: 'center bottom'
      },
      useContainer: true,
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
      padding: 'pt-4 pb-48',
      background: {
        color: 'bg-white-100',
        image: 'url(/images/farmers-bash-bg4.jpg)',
        position: 'center bottom',
        backgroundSize: 'cover',
        attachment: 'fixed'
      },
      useContainer: true,
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
      
      {sections.map((section) => (
        <div key={section.id} className={`${section.background.color} ${section.padding}`} style={{ backgroundImage: section.background.image, backgroundPosition: section.background.position, backgroundSize: section.background.backgroundSize, backgroundAttachment: section.background.attachment }}>
          {section.useContainer ? (
            <div className="container mx-auto px-4">
              <Section
                id={section.id}
                title={section.title}
                icon={section.icon}
              >
                {section.content}
              </Section>
            </div>
          ) : (
            <Section
              id={section.id}
              title={section.title}
              icon={section.icon}
            >
              {section.content}
            </Section>
          )}
        </div>
      ))}

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
