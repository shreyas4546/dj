import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-24 h-24 rounded-full border-t-2 border-r-2 border-neon-cyan animate-spin-slow"></div>
        
        {/* Inner Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-b-2 border-l-2 border-neon-purple animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        
        {/* Center Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse-fast shadow-[0_0_15px_white]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-mono text-neon-cyan text-sm tracking-widest"
      >
        INITIALIZING NEURAL LINK...
      </motion.div>
    </motion.div>
  );
};

export default Loader;