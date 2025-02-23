import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, icon, children }) => {
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
      className="py-16"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          {icon}
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <div className="w-24 h-1 bg-green-600 mx-auto" />
      </div>
      {children}
    </motion.section>
  );
};

export default Section;