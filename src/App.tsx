import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2,
  Calendar,
  Users,
  Info,
  Mail,
  Globe,
  HelpCircle,
} from "lucide-react";
import NewsletterPopup from "./components/NewsletterPopup";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import { artists } from "./artists"; // Import the artists array
import ContactForm from "./components/ContactForm";
import GDPRPopup from "./components/GDPRPopup";
import FAQModal from "./components/FAQModal";
import Image from "./components/Image";

interface Artist {
  name: string;
  image: string;
  imageFallback: string;
  website?: string;
}

interface Background {
  color: string;
  image: string;
  position: string;
  backgroundSize: string;
  attachment?: string;
  overlay?: string;
  mobileImage?: string;
  mobilePosition?: string;
  mobileBackgroundSize?: string;
}

interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
  padding: string;
  background: Background;
  useContainer: boolean;
  content: JSX.Element | null;
  titleStyle?: 'default' | 'large' | 'accent';
  externalUrl?: string;
}

function App() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      title: "GET YOUR TICKETS",
      icon: <Music2 className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-24 md:pb-48",
      background: {
        color: "bg-gray-100",
        image: "url(/images/bg6.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
        overlay: "bg-black/40",
      },
      useContainer: true,
      content: (
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {/* Intro Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="border-l-4 border-green-400 pl-6"
            >
              <p className="text-3xl text-white/90 leading-relaxed">
                Tickets for the Farmer's Bash Weekender are selling fast, 
                so grab yours early to avoid disappointment.
              </p>
            </motion.div>

            {/* Ticket Types & Event Details */}
            <div className="grid md:grid-cols-5 gap-12">
              {/* Ticket Types */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 md:col-span-3 border-l-4 border-green-400 pl-6"
              >
                <h3 className="text-3xl font-semibold text-white border-b border-white/20 pb-4">
                  Available Ticket Types
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xl text-white/90">
                      Day, Weekend, and VIF (Very Important Farmer) Tickets available here:
                    </div>
                    <a 
                      href="https://www.ticketmaster.ie/the-farmer-s-bash-tickets/artist/5229164"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Book on Ticketmaster
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Event Details */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 md:col-span-2 border-l-4 border-green-400 pl-6"
              >
                <h3 className="text-3xl font-semibold text-white border-b border-white/20 pb-4">
                  Event Details
                </h3>
                <div className="space-y-6 text-lg text-white/90">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-semibold">Gates Open:</span> 2pm
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-semibold">Show Starts:</span> 3pm
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Age Restriction */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="border-l-4 border-green-400 pl-6"
            >
              <div className="max-w-2xl">
                <h3 className="text-3xl font-semibold text-white mb-4 flex items-center gap-3">
                  Age Restriction
                </h3>
                <p className="text-xl leading-relaxed text-white/90">
                  Under 16s can attend provided they are accompanied by a parent 
                  or guardian who is also a ticketholder.
                </p>
              </div>
            </motion.div>

            {/* More Details Link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="border-t border-white/20 pt-12 text-center"
            >
              <p className="text-lg text-white/90">
                For more details, visit{' '}
                <a 
                  href="https://www.ticketmaster.ie/the-farmer-s-bash-tickets/artist/5229164"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 underline font-semibold inline-flex items-center gap-1"
                >
                  www.ticketmaster.ie
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </p>
              <button
                        onClick={() => setShowFAQ(true)}
                        className="inline-flex items-center gap-3 px-10 mt-16 py-5 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <HelpCircle className="w-8 h-8" />
                        View FAQs
                      </button>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "lineup",
      title: "LINEUP",
      icon: <Calendar className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4",
      background: {
        color: "bg-blue-100",
        image: "url(/images/hero-bg.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
      },
      useContainer: false,
      content: (
        <div className="w-full overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center container mx-auto px-4"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="/images/hero-logo.webp"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/images/hero-lo.png";
              }}
              alt="Farmers Bash Banner"
              className="max-w-full h-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center space-y-4 px-4"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="/images/Banner-A.png"
              alt="Farmers Bash Banner"
              className="max-w-full h-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col items-center justify-center container mx-auto px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 md:p-12 justify-items-center">
              <motion.img
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                src="/images/Lineup-Saturday.png"
                alt="Lineup Saturday"
                className="max-w-full h-auto mb-12 md:mb-0"
              />
              <motion.img
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                src="/images/Lineup-Sunday.png"
                alt="Lineup Sunday"
                className="max-w-full h-auto mb-4 md:mb-0"
              />
            </div>
          </motion.div>

          <div className="relative flex flex-col items-center w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative flex flex-col items-center justify-center container mx-auto px-4"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="/images/Plus.png"
                alt="Plus"
                className="max-w-full h-auto mb-16 md:mb-0"
              />
            </motion.div>
            <img
              src="/images/hero-fg.png"
              alt="Lineup Footer"
              className="h-auto -mt-24 w-full object-cover"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "artists",
      title: "ARTISTS",
      icon: <Users className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-24 md:pb-48",
      background: {
        color: "bg-[#1f2356]",
        image: "url(/images/bg3.jpg)",
        position: "75% bottom md:center bottom",
        backgroundSize: "cover",
        mobileImage: "url(/images/bg3a.jpg)",
        mobilePosition: "center bottom",
        mobileBackgroundSize: "100%",
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
              <Image
                src={artist.image}
                fallbackSrc={artist.imageFallback}
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
      id: "info",
      title: "INFO",
      icon: <Info className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-24 md:pb-48",
      background: {
        color: "bg-gray-900",
        image: "url(/images/farmers-bash-bg21.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
        mobileImage: "url(/images/farmers-bash-bg21.jpg)",
        mobilePosition: "75% bottom",
        mobileBackgroundSize: "cover",
        overlay: "bg-black/50",
      },
      useContainer: true,
      content: (
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="md:col-span-7 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border-l-4 border-green-400 pl-6"
              >
                <h3 className="text-4xl md:text-5xl text-white mb-6">Accommodation</h3>
                <p className="text-xl text-white/90 leading-relaxed">
                  Planning to stay in Belfast for the Weekender? The city offers a range of accommodation options to suit every budget and preference, from luxury hotels to budget-friendly stays. Here are some top 
                  recommendations:
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid gap-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-green-400 text-xl mb-3">Luxury Stays</h4>
                    <p className="text-lg text-white/90">The Merchant Hotel, Grand Central Hotel, Fitzwilliam Hotel</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-green-400 text-xl mb-3">Mid-Range Hotels</h4>
                    <p className="text-lg text-white/90">Maldron Hotel, Europa Hotel, AC Hotel Belfast</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-green-400 text-xl mb-3">Budget-Friendly</h4>
                    <p className="text-lg text-white/90">Ibis Belfast, ETAP Hotel, Travelodge Belfast</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-green-400 text-xl mb-3">Self-Catering & B&Bs</h4>
                    <p className="text-lg text-white/90">Dream Apartments, Titanic Guesthouse, Bullitt Hotel</p>
                  </motion.div>
                </div>
                <p className="italic text-green-400 text-lg">
                  ⚡ Pro tip: Book early as rooms fill up quickly during the event!
                </p>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-5 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border-l-4 border-[#d5a271] pl-6"
              >
                <h3 className="text-4xl md:text-5xl text-white mb-6">Getting Here</h3>
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-[#d5a271] text-xl mb-4">Public Transport</h4>
                    <div className="text-white/90 mb-6 text-lg">Belfast has excellent public transport links, making it easy to get to Boucher Road Playing Fields.</div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-lg text-white/90"><strong className="text-[#d5a271]">Train:</strong> Balmoral and Adelaide train stations are the closest, with regular services from Belfast city centre.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-lg text-white/90"><strong className="text-[#d5a271]">Bus:</strong> Translink Metro services operate routes that stop near Boucher Road.</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="font-semibold text-[#d5a271] text-xl mb-4">Driving & Parking</h4>
                    <div className="text-white/90 mb-6 text-lg">If you're driving, limited parking will be available near the venue, but we strongly encourage using public transport or carpooling. Nearby alternatives include</div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-lg text-white/90">
                          <strong className="text-[#d5a271]">Park & Ride services</strong> (Details to be confirmed closer to the event)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-lg text-white/90">
                        <strong className="text-[#d5a271]">City Centre parking</strong> with public transport links
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "about",
      title: "ABOUT",
      icon: <Info className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-24 md:pb-48",
      background: {
        color: "bg-gray-900",
        image: "url(/images/bg1.jpg)",
        position: "center center",
        backgroundSize: "cover",
        overlay: "bg-black/30",
      },
      useContainer: true,
      content: (
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="md:col-span-7 md:col-start-1 space-y-12">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="border-l-4 border-green-400 pl-6"
                >
                  <h3 className="text-4xl md:text-5xl text-white mb-6">THE ULTIMATE LIVE MUSIC EXPERIENCE</h3>
                  <p className="text-2xl text-white/90 leading-relaxed">
                  The Farmer's Bash has become Northern Ireland's biggest music event, uniting top live talent with thousands of passionate fans.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-3 gap-2 md:gap-8"
                >
                  <div className="text-center p-2 md:p-6 bg-white/15 rounded-xl">
                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">2025</div>
                    <div className="text-sm md:text-base text-white/90">Biggest Year Yet</div>
                  </div>
                  <div className="text-center p-2 md:p-6 bg-white/15 rounded-xl">
                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">30K+</div>
                    <div className="text-sm md:text-base text-white/90">Expected Attendees</div>
                  </div>
                  <div className="text-center p-2 md:p-6 bg-white/15 rounded-xl">
                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">40+</div>
                    <div className="text-sm md:text-base text-white/90">Top Artists</div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-6 text-xl text-white/90 leading-relaxed">
                  <p>
                  Since launching at the SSE Arena in 2017, it has grown into an annual must-attend celebration. In 2019, Farmer's Bash: Live at the Beach drew nearly 20,000 to Portrush, and in 2020, it adapted to host the UK's biggest drive-in concerts. After returning to the SSE in 2022, it moved to Belsonic in 2024, selling out at 22,000. In 2023, it expanded to Scotland with the Royal Highland Hoolie at the Royal Highland Show.
                  </p>
                  <p>
                  Now, in 2025, Farmer's Bash evolves into a two-day festival—the Weekender—at Boucher Road Playing Fields. With multiple stages, an unbeatable lineup, and an electric atmosphere, it's set to be the music event of the year. Whether you love country, folk, rock, or high-energy live music, the Farmer's Bash Weekender promises an unforgettable experience of music, dancing, and entertainment.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "getintouch",
      title: "GET IN TOUCH",
      icon: <Mail className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-48",
      background: {
        color: "bg-white-100",
        image: "url(/images/cowboy-bg1.jpg)",
        position: "center bottom",
        backgroundSize: "cover",
      },
      useContainer: true,
      content: <ContactForm />
    },
  ];

  // Create menu items with Scotland between Info and About
  const menuItems = [
    ...sections.slice(0, 3), // tickets, lineup, artists
    sections[3], // info
    {
      id: "scotland",
      title: "SCOTLAND",
      externalUrl: "https://royalhighlandshow.seetickets.com/event/royal-highland-show/royal-highland-centre/3052240?offercode=rhshoolie&direct=true#op1",
      icon: <Globe className="w-6 h-6" />,
      // These properties are required by the interface but won't be used
      padding: "",
      background: {
        color: "",
        image: "",
        position: "",
        backgroundSize: "",
      },
      useContainer: false,
      content: null
    },
    ...sections.slice(4) // about, getintouch
  ];

  const [activeSection, setActiveSection] = useState("tickets");

  const handleMenuItemClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar 
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        menuItems={menuItems}
        activeSection={activeSection}
        onMenuItemClick={handleMenuItemClick}
      />
      <div ref={heroRef}>
        <Hero />
      </div>

      {sections.map((section) => (
        <div
          key={section.id}
          className={`${section.background.color} relative ${section.padding} overflow-hidden`}
          style={{
            '--desktop-image': section.background.image,
            '--mobile-image': section.background.mobileImage || section.background.image,
            '--desktop-position': section.background.position,
            '--mobile-position': section.background.mobilePosition || section.background.position,
            '--desktop-backgroundsize': section.background.backgroundSize,
            '--mobile-backgroundsize': section.background.backgroundSize || section.background.backgroundSize,
            backgroundImage: 'var(--desktop-image)',
            backgroundPosition: 'var(--desktop-position)',
            backgroundSize: 'var(--desktop-backgroundsize)',
            backgroundAttachment: section.background.attachment,
          } as React.CSSProperties}
        >
          {section.background.overlay && (
            <div className={`absolute inset-0 ${section.background.overlay}`}></div>
          )}
          <div className="relative">  {/* Add this wrapper */}
            {section.useContainer ? (
              <div className="container mx-auto px-4">
                <Section
                  id={section.id}
                  title={section.title}
                  icon={section.icon}
                  titleStyle={section.titleStyle}
                >
                  {section.content}
                  {section.id === "info" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-16 text-center"
                    >
                      <button
                        onClick={() => setShowFAQ(true)}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <HelpCircle className="w-8 h-8" />
                        View FAQs
                      </button>
                    </motion.div>
                  )}
                </Section>
              </div>
            ) : (
              <Section id={section.id} title={section.title} icon={section.icon} titleStyle={section.titleStyle}>
                {section.content}
              </Section>
            )}
          </div>
        </div>
      ))}

      <Footer />

      <AnimatePresence>
        {showNewsletter && (
          <NewsletterPopup onClose={() => setShowNewsletter(false)} />
        )}
      </AnimatePresence>

      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />

      <GDPRPopup />
    </div>
  );
}

export default App;