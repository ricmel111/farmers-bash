import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2,
  Users,
  Info,
  Mail,
  HelpCircle,
  Accessibility,
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProgrammePage from "./ProgrammePage";
import NewsletterSignupPage from "./components/NewsletterSignupPage";

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
  const [comingSoonEmail, setComingSoonEmail] = useState("");
  const [comingSoonStatus, setComingSoonStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [comingSoonError, setComingSoonError] = useState("");
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
                Tickets for the Farmer's Bash are selling fast, 
                so grab yours early to avoid disappointment.
              </p>
            </motion.div>

            {/* Ticket Purchase & Event Details */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Ticket Purchase */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 border-l-4 border-green-400 pl-6"
              >
                <h3 className="text-3xl font-semibold text-white border-b border-white/20 pb-4">
                  Get Your Tickets
                </h3>
                <div className="space-y-4">
                  <div className="text-xl text-white/90">
                    Tickets available here:
                  </div>
                  <a 
                    href="https://www.ticketmaster.ie/artist/5229164?venueId=461698"
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
              </motion.div>

              {/* Event Details */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 border-l-4 border-green-400 pl-6"
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
                      <span className="text-2xl">📅</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-semibold">Date:</span> Friday 12th June 2026
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-semibold">Time:</span> 5:30 pm
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
                  href="https://www.ticketmaster.ie/artist/5229164?venueId=461698"
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
                  Planning to stay in Belfast for the event? The city offers a range of accommodation options to suit every budget and preference, from luxury hotels to budget-friendly stays. Here are some top 
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
                        <span className="text-lg text-white/90"><strong className="text-[#d5a271]">Train:</strong> Balmoral train station is the closest, with regular services from Belfast city centre.</span>
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
            <div className="md:col-span-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 mb-8"
              >
                <h4 className="font-semibold text-red-400 text-2xl mb-4">Important Event Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-white/90 text-lg">
                  <li>Umbrellas, parasols and the like are not permitted at concert events for safety reasons.</li>
                  <li>Chairs, seats and tables are not permitted at events for safety reasons. <strong>ALL EVENTS ARE STANDING SHOWS.</strong></li>
                  <li>There are no cloakroom facilities on site. No bags bigger than A4 size are permitted.</li>
                  <li>Suitcases, luggage and large bags (anything bigger than A4 sized bags) are not permitted.</li>
                  <li>Picnic blankets are not permitted.</li>
                  <li>No flags / emblems and flares / pyrotechnics of any kind permitted - those found to have brought inside face ejection without refund.</li>
                  <li>Anyone considered to be engaging in disruptive behaviour may be ejected with no refund offered.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "accessibility",
      title: "ACCESSIBILITY",
      icon: <Accessibility className="w-6 h-6" />,
      titleStyle: 'large',
      padding: "pt-4 pb-24 md:pb-48",
      background: {
        color: "bg-gray-900",
        image: "url(/images/accessibility-bg.webp)",
        position: "center bottom",
        backgroundSize: "cover",
        mobileImage: "url(/images/accessibility-bg.webp)",
        mobilePosition: "75% bottom",
        mobileBackgroundSize: "cover",
        overlay: "bg-black/50",
      },
      useContainer: true,
      content: (
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-l-4 border-[color:#00adef] pl-6"
            >
              <p className="text-xl text-white/90 leading-relaxed">
                At the Farmer's Bash we endeavour to provide accessible access for all. Please see below for information regarding our accessibility areas and procedures. If you require any further information, please email <a href="mailto:accessibility@farmersbash.com" className="[color:#00adef] hover:[color:#00adaf]">accessibility@farmersbash.com</a>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold [color:#00adef] mb-4">Accessibility Parking</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Blue Badge holders can park close the main entrance on Balmoral Road (indicated on the map). When arriving via car please enter from Stockman's Lane onto Boucher Road. We are enforcing a Road Closure from 9pm on the show night. When turning into Balmoral Road from Boucher Road you will encounter our Security staff simply show them your event tickets and your Blue Badge. Security will advise you to drive at a Maximum of 10 miles per hour and engage your hazard warning lights. This will help protect other customers who are on foot. On the map below you will see the Blue Badge Accessible Parking sign. Please Continue on Balmoral Road and security will direct you to the accessible parking spaces. Our Parking Area if large enough for wheelchair accessible vehicles to full open doors and back loading. Alternatively, if you are travelling by taxi or are being dropped off at the event they can also entrance through Stockman's Lane onto Boucher Road and Drop off at the Accessibility Parking area. Please note for collections, cars will need to be on the Boucher Road from 10:20pm at the latest as no cars will be permitted to drive through the road closure for at least 15 minutes after the show is finished to allow for a safe customer egress.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold [color:#00adef] mb-4">Accessibility Entrancing</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  There is a dropped curb at the pelican crossing directly in front of the Accessible Parking Area, which leads the footpath and the main entrance. Security at the Main Entrance will direct you to the Accessible entrance at GATE A – marked on the map below. This is the most direct Gate to the Accessible facilities at the Farmer's Bash. When you arrive at GATE A, your tickets will be scanned, and a member of our team will escort you to the Accessible Platform.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold [color:#00adef] mb-4">Accessibility Facilities</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Adjacent to the Accessible Platform are Accessible toilets. We have dedicated and trained staff onsite to help with any needs of our Accessible customers, simply ask any of the stewards at the Parking Entrance, Gate Entrances, Accessibility Platform, or any of the team from Event Medical for directions or information.
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg text-white/90">
                  We hope you enjoy your night with us and again for any more information please contact our team at <a href="mailto:accessibility@farmersbash.com" className="[color:#00adef] hover:[color:#00adaf]">accessibility@farmersbash.com</a>
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full mt-16"
              >
                <img
                  src="/images/farmers-bash-map.webp"
                  alt="Accessibility Map"
                  className="w-full h-auto rounded-xl shadow-xl"
                />
              </motion.div>
            </motion.div>
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
                  Now, in 2026, Farmer's Bash continues at Boucher Road Playing Fields as a day event on Friday 12th June. With an unbeatable lineup and an electric atmosphere, it's set to be the music event of the year. Whether you love country, folk, rock, or high-energy live music, Farmer's Bash promises an unforgettable experience of music, dancing, and entertainment.
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
    ...sections.slice(0, 2), // tickets, artists
    sections[2], // info
    // {
    //   id: "scotland",
    //   title: "SCOTLAND",
    //   externalUrl: "https://royalhighlandshow.seetickets.com/event/royal-highland-show/royal-highland-centre/3052240?offercode=rhshoolie&direct=true#op1",
    //   icon: <Globe className="w-6 h-6" />,
    //   // These properties are required by the interface but won't be used
    //   padding: "",
    //   background: {
    //     color: "",
    //     image: "",
    //     position: "",
    //     backgroundSize: "",
    //   },
    //   useContainer: false,
    //   content: null
    // },
    sections[4], // accessibility
    ...sections.slice(5) // about, getintouch
  ];

  const [activeSection, setActiveSection] = useState("tickets");

  const handleMenuItemClick = (id: string) => {
    setActiveSection(id);
  };

  const ComingSoonPage = () => (
    <div className="relative min-h-screen bg-[#181a3d] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/bg3.jpg"
          alt=""
          className="h-full w-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black" />
      </div>
      <div className="relative flex min-h-screen flex-col">
        {/* <header className="flex items-center justify-between px-6 py-6">
          <img
            src="/images/farmers-bash-logo-sm.svg"
            alt="Farmers Bash"
            className="h-10 w-auto drop-shadow-lg"
            loading="lazy"
          />
        </header> */}
        <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src="/images/farmers-bash-logo.svg"
                alt="Farmers Bash Logo"
                className="h-48 w-auto drop-shadow-xl"
                loading="lazy"
              />
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Something big is coming.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
              We’re rebuilding our online home to get ready 
              for Farmers Bash 2026. Check back soon or join the list to be
              first in line for news and updates.
            </p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!comingSoonEmail) {
                return;
              }
              setComingSoonStatus("loading");
              setComingSoonError("");
              try {
                const res = await fetch(
                  "/.netlify/functions/subscribe-newsletter",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: comingSoonEmail }),
                  }
                );
                const data = await res.json();
                if (res.ok) {
                  setComingSoonStatus("success");
                  setComingSoonEmail("");
                } else {
                  setComingSoonStatus("error");
                  setComingSoonError(data.error || "Failed to subscribe.");
                }
              } catch {
                setComingSoonStatus("error");
                setComingSoonError(
                  "Something went wrong. Please try again shortly."
                );
              }
            }}
            className="w-full max-w-lg space-y-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={comingSoonEmail}
                onChange={(event) => setComingSoonEmail(event.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/30 bg-black/40 px-6 py-4 text-base text-white placeholder:text-white/50 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                disabled={comingSoonStatus === "loading"}
              />
              <button
                type="submit"
                className="rounded-full bg-green-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/40 transition hover:bg-green-400 disabled:opacity-60"
                disabled={comingSoonStatus === "loading"}
              >
                {comingSoonStatus === "loading" ? "Submitting..." : "Sign up to Newsletter"}
              </button>
            </div>
            {comingSoonStatus === "success" && (
              <p className="text-sm text-green-300">
                Thanks! Please check your inbox to confirm your subscription.
              </p>
            )}
            {comingSoonStatus === "error" && (
              <p className="text-sm text-red-300">{comingSoonError}</p>
            )}
          </form>
        </main>
        <footer className="px-6 py-8 text-center text-xs text-white/60">
          <p>Follow @farmersbash for live updates and lineup drops.</p>
        </footer>
      </div>
    </div>
  );

  const HomePage = () => (
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
          <div className="relative">
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/programme"
          element={<ProgrammePage />}
        />
        <Route
          path="/signup"
          element={<NewsletterSignupPage />}
        />
        <Route
          path="*"
          element={<HomePage />}
        />
        {/* <Route
          path="*"
          element={<ComingSoonPage />}
        /> */}
      </Routes>
    </BrowserRouter>
  );

}

export default App;