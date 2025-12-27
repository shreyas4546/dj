import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  icon, 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "px-8 py-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    primary: "bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]",
    secondary: "glass-panel text-white border border-neon-purple/30",
    outline: "border border-white/20 text-muted"
  };

  const hoverStyles = !disabled ? {
    primary: "hover:bg-white",
    secondary: "hover:bg-white/10 hover:border-neon-purple",
    outline: "hover:text-white hover:border-white"
  } : {
    primary: "", secondary: "", outline: ""
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed grayscale pointer-events-none" : "";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
};

export default Button;