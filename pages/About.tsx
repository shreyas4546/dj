import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM } from '../constants';
import Section from '../components/Section';
import Card from '../components/Card';
import PageTransition, { itemVariants } from '../components/PageTransition';
import { ChevronDown, Zap, Code, Database, Cpu } from 'lucide-react';

const TIMELINE_DATA = [
  { 
    year: "2020", 
    title: "Genesis", 
    desc: "Founded in a garage with a single GPU cluster.",
    details: "The initial algorithm 'Alpha-Zero' was written in raw C++ to maximize efficiency. We spent 6 months manually labeling datasets before the first successful inference.",
    stats: [
      { label: "Compute", value: "4x A100s", icon: <Cpu className="w-3 h-3" /> },
      { label: "Parameters", value: "1.2B", icon: <Database className="w-3 h-3" /> }
    ]
  },
  { 
    year: "2022", 
    title: "Series A", 
    desc: "Raised $15M to build the NeuroFinance core.",
    details: "Partnered with global banking institutions to deploy our first commercial fraud detection sentinel. False positives dropped by 94% within the first week of deployment.",
    stats: [
      { label: "Valuation", value: "$80M", icon: <Zap className="w-3 h-3" /> },
      { label: "Latency", value: "<12ms", icon: <Code className="w-3 h-3" /> }
    ]
  },
  { 
    year: "2023", 
    title: "Expansion", 
    desc: "Opened labs in Tokyo and London.",
    details: "Established our dedicated Quantum Research Division. Released 'Nexus', our first general-purpose reasoning agent, to a closed beta of 500 enterprise developers.",
    stats: [
      { label: "Employees", value: "140+", icon: <Cpu className="w-3 h-3" /> },
      { label: "Patents", value: "24 Pending", icon: <Database className="w-3 h-3" /> }
    ]
  },
  { 
    year: "2024", 
    title: "The Singularity", 
    desc: "Released the first autonomous coding agent.",
    details: "Our proprietary model 'Architect' successfully rewrote its own kernel to optimize for energy efficiency, reducing power consumption by 40% without human intervention.",
    stats: [
      { label: "Autonomy", value: "Level 4", icon: <Zap className="w-3 h-3" /> },
      { label: "Efficiency", value: "+400%", icon: <Code className="w-3 h-3" /> }
    ]
  }
];

const About: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleTimeline = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="pt-24 min-h-screen overflow-hidden">
          
        {/* Background Type Element */}
        <div className="fixed top-20 right-0 opacity-[0.03] select-none pointer-events-none -z-10">
           <h1 className="text-[20rem] font-display font-bold leading-none rotate-90 origin-top-right">
             VISION
           </h1>
        </div>

        <Section spacing="large">
          {/* Mission */}
          <div className="text-center mb-32">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
            >
              Our Mission
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-2xl text-muted max-w-4xl mx-auto leading-relaxed font-light"
            >
              To bridge the gap between biological intelligence and digital potential, creating systems that amplify human capability rather than replace it.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative py-24">
              {/* Animated Center Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-30 h-full"
              />
              
              {TIMELINE_DATA.map((item, idx) => {
                  const isExpanded = expandedIndex === idx;
                  const isLeft = idx % 2 === 0;

                  return (
                    <motion.div 
                        key={idx}
                        layout
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                        className={`flex items-start justify-between w-full mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                        <div className="w-5/12"></div>
                        
                        {/* Center Dot */}
                        <div className="w-2/12 flex justify-center z-10 sticky top-1/2">
                            <motion.button 
                               onClick={() => toggleTimeline(idx)}
                               whileHover={{ scale: 1.2, boxShadow: "0 0 20px #00f3ff" }}
                               whileTap={{ scale: 0.9 }}
                               animate={{ 
                                 scale: isExpanded ? 1.3 : 1,
                                 borderColor: isExpanded ? '#bc13fe' : '#00f3ff'
                               }}
                               className={`w-6 h-6 rounded-full bg-black border-4 transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.5)] cursor-pointer ${isExpanded ? 'border-neon-purple' : 'border-neon-cyan'}`}
                            />
                        </div>

                        {/* Content Card */}
                        <div className="w-5/12">
                            <motion.div layout>
                                <Card 
                                    onClick={() => toggleTimeline(idx)}
                                    className={`cursor-pointer transition-all duration-300 group ${isExpanded ? 'border-neon-cyan/50 bg-white/5' : 'hover:border-neon-cyan/30'}`}
                                    hoverEffect={true}
                                >
                                    <motion.div layout className="flex justify-between items-start mb-2">
                                        <span className={`font-bold font-display text-2xl block transition-colors ${isExpanded ? 'text-neon-purple' : 'text-neon-cyan'}`}>
                                            {item.year}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-neon-purple' : 'text-muted group-hover:text-white'}`} />
                                        </motion.div>
                                    </motion.div>
                                    
                                    <motion.h3 layout className="text-white font-bold text-xl mb-2">{item.title}</motion.h3>
                                    <motion.p layout className="text-muted text-base leading-relaxed mb-2">{item.desc}</motion.p>
                                    
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 border-t border-white/10 mt-4">
                                                    <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                                        {item.details}
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {item.stats.map((stat, i) => (
                                                            <div key={i} className="bg-black/40 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                                                                <div className="text-neon-cyan">
                                                                    {stat.icon}
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                                                                    <div className="text-sm font-bold text-white">{stat.value}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                  );
              })}
          </div>

          {/* Team */}
          <div className="py-24">
            <motion.h2 variants={itemVariants} className="text-5xl font-display font-bold mb-16 text-center leading-tight">The Architects</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member, idx) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="group relative h-[500px] rounded-2xl overflow-hidden glass-panel border border-white/5"
                >
                  <img 
                      src={member.image} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                      <h3 className="text-3xl font-bold font-display text-white mb-1">{member.name}</h3>
                      <p className="text-neon-cyan font-medium mb-4 tracking-wide">{member.role}</p>
                      <p className="text-gray-300 text-sm translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 leading-relaxed">
                          {member.aiBio}
                      </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
};

export default About;