import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center my-16 md:my-24 ${id === 'tickets' ? md:mb-12 : ">
      <div id={`${id.toLowerCase().replace(/\s+/g, '')}-anchor`} style={{ height: 100, marginTop: -100 }}></div>
        <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className={`text-5xl ${id === 'getintouch' ? 'text-[#16a34a] text-3d-dark'  : 'text-[rgb(245,243,239)] my-shadow text-3d-light'}`}>{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
};

export default Section;