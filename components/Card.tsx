import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, hoverEffect = true, className = '', ...props }) => {
  return (
    <motion.div
      className={`glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden ${
        hoverEffect ? 'hover:border-neon-cyan/30 group transition-all duration-500' : ''
      } ${className}`}
      {...props}
    >
      {hoverEffect && (
         <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;