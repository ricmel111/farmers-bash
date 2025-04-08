import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const faqs = [
    {
      question: "What time does the event start?",
      answer: "2pm each day"
    },
    {
      question: "Are there still tickets available?",
      answer: <>Yes - you can get tickets <a href="https://www.ticketmaster.ie/the-farmer-s-bash-tickets/artist/5229164" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">here</a></>
    },
    {
      question: "Can I buy a ticket for just one day instead of a weekend?",
      answer: "Yes, you can buy either a day ticket or weekend ticket."
    },
    {
      question: "Can I bring children?",
      answer: "Absolutely - we're a very family friendly event. Make a day of it!!"
    },
    {
      question: "Can you tell me more about public transport?",
      answer: "Train: Balmoral and Adelaide train stations are the closest, with regular services from Belfast city centre.\nBus: Translink Metro services operate routes that stop near Boucher Road."
    },
    {
      question: "Is there parking available?",
      answer: "There is very limited parking near and around the venue. We would strongly advise using public transport to get to Farmers Bash."
    },
    {
      question: "Is there any camper van parking in or near the event?",
      answer: "Unfortunately, there is no space for Camper Vans at Farmers Bash."
    },
    {
      question: "Is there any camping facilities?",
      answer: "There is no camping on site."
    },
    {
      question: "Is there a line up for each day?",
      answer: "Yes, a full line up can be found on our website."
    },
    {
      question: "Is there disabled parking in the event?",
      answer: "Disabled parking is limited and first come / served."
    },
    {
      question: "Lost Property - who do I contact if I lose something?",
      answer: "For lost property, you can contact lostproperty@farmersbash.com"
    },
    {
      question: "I have a question about my ticket, who can I contact?",
      answer: "Please contact Ticketmaster should you have any questions about your ticket."
    },
    {
      question: "Are there cloakroom or ATM facilities on site?",
      answer: "No, there are no cloakroom or lockers on site. There are no ATMS but you can pay by card at all bars and vendors."
    },
    {
      question: "Can you leave and reenter?",
      answer: "Once you've been scanned into the festival site, there will be no option to leave and re-enter. If you leave during the event hours, you will not be able to get back in."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-[#1f2356] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-green-400 mb-2">{faq.question}</h3>
                      <p className="text-white/90 whitespace-pre-line">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FAQModal; 