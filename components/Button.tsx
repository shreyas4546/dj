import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  icon, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300";
  
  const variants = {
    primary: "bg-neon-cyan text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(0,243,255,0.3)]",
    secondary: "glass-panel text-white hover:bg-white/10 border border-neon-purple/30 hover:border-neon-purple",
    outline: "border border-white/20 text-muted hover:text-white hover:border-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
};

export default Button;