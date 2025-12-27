import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Cinematic transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "premium" feel
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

// Child variants to be used by elements inside the page
export const itemVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(5px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;