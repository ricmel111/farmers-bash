import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Music2,
  Calendar,
  Users,
  Info,
  Mail,
  MapPin,
} from "lucide-react";
import NewsletterPopup from "./components/NewsletterPopup";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import { artists } from "./artists"; // Import the artists array

interface Artist {
  name: string;
  image: string;
  website: string;
}

interface Background {
  color: string;
  image: string;
  position: string;
  backgroundSize: string;
  attachment?: string;
}

interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
  padding: string;
  background: Background;
  useContainer: boolean;
  content: JSX.Element;
}

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom =
          heroRef.current.getBoundingClientRect().bottom + window.scrollY;
        if (window.scrollY > heroBottom && !hasSeenPopup) {
          setShowNewsletter(true);
          setHasSeenPopup(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSeenPopup]);

  const sections: Section[] = [
    {
      id: "tickets",
      title: "TICKETS",
      icon: <Music2 className="w-6 h-6" />,
      padding: "pt-4 pb-48",
      background: {
        color: "bg-gray-100",
        image: "url(/images/music-bg1.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
      },
      useContainer: true,
      content: (
        <div className="grid md:grid-cols-3 gap-8">
          {["Early Bird", "Regular", "VIP"].map((type) => (
            <div key={type} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{type}</h3>
              <p className="text-3xl font-bold mb-4">
                ${type === "VIP" ? "299" : type === "Regular" ? "199" : "149"}
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
      id: "lineup",
      title: "LINEUP",
      icon: <Calendar className="w-6 h-6" />,
      padding: "pt-4",
      background: {
        color: "bg-blue-100",
        image: "url(/images/hero-bg.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
      },
      useContainer: false,
      content: (
        <>
          <div className="relative flex flex-col items-center space-y-4">
            <img
              src="/images/Banner-A.png"
              alt="Farmers Bash Banner"
              className="max-w-full h-auto"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 md:p-12 justify-items-center">
              <img
                src="/images/Lineup-Saturday.png"
                alt="Lineup Saturday"
                className="max-w-full h-auto mb-12 md:mb-0"
              />
              <img
                src="/images/Lineup-Sunday.png"
                alt="Lineup Sunday"
                className="max-w-full h-auto mb-4 md:mb-0"
              />
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center container mx-auto">
              <img
                src="/images/Plus.png"
                alt="Plus"
                className="max-w-full h-auto mb-16 md:mb-0"
              />
            </div>
            <img
              src="/images/hero-fg.png"
              alt="Lineup Footer"
              className="w-max h-auto -mt-24"
            />
          </div>
        </>
      ),
    },
    {
      id: "artists",
      title: "ARTISTS",
      icon: <Users className="w-6 h-6" />,
      padding: "pt-4 pb-48",
      background: {
        color: "bg-red-900",
        image: "url(/images/farmers-bash-bg2.jpg)",
        position: "center bottom md:center bottom",
        backgroundSize: "cover",
        attachment: "scroll md:fixed",
      },
      useContainer: true,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {artists.map((artist: Artist) => (
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
                  <h3 className="text-white text-xl font-bold mb-1">
                    {artist.name}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ),
    },
    {
      id: "info-about",
      title: "INFO & ABOUT",
      icon: <Info className="w-6 h-6" />,
      padding: "pt-4 pb-48",
      background: {
        color: "bg-green-100",
        image: "url(/images/music-bg2.jpg)",
        position: "center center",
        backgroundSize: "cover",
      },
      useContainer: true,
      content: (
        <>
          <div id="info" className="mb-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Info
            </h2>
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
          </div>
          <div id="about" className="mt-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              About
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg leading-relaxed text-white">
                Farmers Bash is the biggest country music festival celebrating
                rural life and music. Join us for two days of incredible
                performances, delicious local food, and unforgettable memories.
                Started in 2020, we've grown to become the premier country music
                event in the region.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      title: "GET IN TOUCH",
      icon: <Mail className="w-6 h-6" />,
      padding: "pt-4 pb-48",
      background: {
        color: "bg-white-100",
        image: "url(/images/cowboy-bg1.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
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
      <div ref={heroRef}>
        <Hero />
      </div>

      {sections.map((section) => (
        <div
          key={section.id}
          className={`${section.background.color} ${section.padding}`}
          style={{
            backgroundImage: section.background.image,
            backgroundPosition: section.background.position,
            backgroundSize: section.background.backgroundSize,
            backgroundAttachment: section.background.attachment,
          }}
        >
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
            <Section id={section.id} title={section.title} icon={section.icon}>
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