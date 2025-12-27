import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import Section from '../components/Section';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "FinTech", "IoT", "Healthcare", "Security"];

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="pt-24 min-h-screen">
      <Section spacing="large">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">Case Studies</h1>
                <p className="text-muted text-xl">Transforming industries with intelligent code.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-8 md:mt-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter === cat 
                                ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
                                : 'glass-panel text-muted hover:text-white hover:border-white/20'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-neon-cyan/50 transition-colors"
                    >
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-dark-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center p-12">
                            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-neon-cyan text-sm uppercase tracking-widest mb-3 block font-bold">{project.category}</span>
                                <h3 className="text-4xl font-bold font-display text-white mb-6 leading-tight">{project.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{project.aiSummary}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent w-full group-hover:opacity-0 transition-opacity">
                            <span className="text-neon-cyan text-xs uppercase tracking-wider mb-2 block">{project.category}</span>
                            <h3 className="text-3xl font-bold text-white font-display">{project.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  );
};

export default Projects;