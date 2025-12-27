import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Lock, Code, BarChart } from 'lucide-react';
import Section from '../components/Section';
import { BentoGrid, BentoItem } from '../components/BentoGrid';

const Services: React.FC = () => {
  const services = [
    { title: "Generative AI", icon: <Cpu />, desc: "Custom LLMs trained on your proprietary data.", col: "md:col-span-2", row: "md:row-span-2" },
    { title: "Computer Vision", icon: <Globe />, desc: "Automated inspection and surveillance systems.", col: "md:col-span-1", row: "md:row-span-1" },
    { title: "Big Data", icon: <Database />, desc: "Processing petabytes in real-time.", col: "md:col-span-1", row: "md:row-span-1" },
    { title: "Cybersecurity", icon: <Lock />, desc: "AI-driven threat detection.", col: "md:col-span-1", row: "md:row-span-2" },
    { title: "Cloud Architecture", icon: <Code />, desc: "Scalable serverless infrastructure.", col: "md:col-span-2", row: "md:row-span-1" },
    { title: "Business Intel", icon: <BarChart />, desc: "Actionable insights from noise.", col: "md:col-span-1", row: "md:row-span-1" },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <Section spacing="large">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">Our Services</h1>
          <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI solutions tailored for scalability, security, and impact.
          </p>
        </div>

        <BentoGrid className="h-auto md:h-[900px]">
          {services.map((service, idx) => (
            <BentoItem
              key={idx}
              colSpan={service.col}
              rowSpan={service.row}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-4 bg-white/5 w-fit rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:bg-white/10">
                <div className="text-neon-cyan w-8 h-8">
                  {service.icon}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-display mb-3">{service.title}</h3>
                <p className="text-muted group-hover:text-white transition-colors leading-relaxed">{service.desc}</p>
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </Section>
    </div>
  );
};

export default Services;