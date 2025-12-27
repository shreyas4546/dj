import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';
import Section from '../components/Section';
import Card from '../components/Card';

const About: React.FC = () => {
  return (
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
          >
            Our Mission
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-muted max-w-4xl mx-auto leading-relaxed font-light"
          >
            To bridge the gap between biological intelligence and digital potential, creating systems that amplify human capability rather than replace it.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative py-24">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-30"></div>
            
            {[
                { year: "2020", title: "Genesis", desc: "Founded in a garage with a single GPU cluster." },
                { year: "2022", title: "Series A", desc: "Raised $15M to build the NeuroFinance core." },
                { year: "2023", title: "Expansion", desc: "Opened labs in Tokyo and London." },
                { year: "2024", title: "The Singularity", desc: "Released the first autonomous coding agent." }
            ].map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center justify-between w-full mb-16 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                    <div className="w-5/12"></div>
                    <div className="w-2/12 flex justify-center z-10">
                        <div className="w-6 h-6 rounded-full bg-black border-4 border-neon-cyan shadow-[0_0_15px_#00f3ff]"></div>
                    </div>
                    <div className="w-5/12">
                        <Card className="hover:border-neon-cyan/50 transition-colors">
                            <span className="text-neon-purple font-bold font-display text-2xl mb-2 block">{item.year}</span>
                            <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                            <p className="text-muted text-base leading-relaxed">{item.desc}</p>
                        </Card>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Team */}
        <div className="py-24">
          <h2 className="text-5xl font-display font-bold mb-16 text-center leading-tight">The Architects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
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
  );
};

export default About;