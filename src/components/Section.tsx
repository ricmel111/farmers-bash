import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  titleStyle?: 'default' | 'large' | 'accent';
}

const Section: React.FC<SectionProps> = ({ id, title, children, titleStyle = 'default' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getTitleClasses = () => {
    switch (titleStyle) {
      case 'large':
        return 'text-7xl md:text-8xl';
      case 'accent':
        return 'text-6xl text-green-400';
      default:
        return 'text-5xl';
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center my-16 md:my-24">
        <div id={`${id.toLowerCase().replace(/\s+/g, '')}-anchor`} style={{ height: 100, marginTop: -100 }}></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className={`${getTitleClasses()} ${id === 'getintouch' ? 'text-[#16a34a] my-shadow' : 'text-[rgb(245,243,239)] my-shadow'}`}>
            {title}
          </h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
};

export default Section;