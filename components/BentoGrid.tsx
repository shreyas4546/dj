import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 ${className}`}>
      {children}
    </div>
  );
};

export const BentoItem: React.FC<BentoItemProps> = ({ 
  children, 
  className = '', 
  colSpan = '', 
  rowSpan = '',
  ...props 
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-neon-cyan/30 transition-all duration-500 ${colSpan} ${rowSpan} ${className}`}
      {...props}
    >
      {/* Ambient Animated Gradient (Always moving, visible on hover) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:400%_400%] animate-gradient-xy pointer-events-none -z-20" 
      />
      
      {/* Mouse Tracking Spotlight Gradient */}
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 -z-10"
        style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 243, 255, 0.15), transparent 40%)`
        }}
      />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10"></div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};