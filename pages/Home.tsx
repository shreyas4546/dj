import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import HeroParticles from '../components/HeroParticles';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        
        {/* Premium CSS Animated Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Deep Base Background */}
          <div className="absolute inset-0 bg-[#030014]" />
          
          {/* Aurora Effect */}
          <div className="absolute inset-0 aurora-bg animate-aurora blur-[60px]" />

          {/* Floating Glow Orbs */}
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-neon-purple/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob opacity-60" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-60" />
          <div className="absolute bottom-[-20%] left-[30%] w-[700px] h-[700px] bg-neon-blue/20 rounded-full mix-blend-screen filter blur-[140px] animate-blob animation-delay-4000 opacity-40" />
          
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>

        {/* Mouse Reactive Particles - z-index 2 */}
        <div className="absolute inset-0 z-[2] w-full h-full pointer-events-none">
            <HeroParticles />
        </div>
        
        {/* Big Display Font Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-[1] mix-blend-overlay opacity-10">
             <h1 className="text-[15rem] md:text-[25rem] font-display font-bold text-white text-center leading-none tracking-tighter animate-pulse-fast">
               AI CORE
             </h1>
        </div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-sm mb-8 tracking-wider font-medium backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
              NEXT GEN INTELLIGENCE
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
              Constructing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient-xy">
                Digital Minds
              </span>
            </h1>
            
            <p className="text-muted-light text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              We engineer autonomous neural networks that evolve, adapt, and scale. Experience the future of algorithmic decision making today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/projects">
                <Button icon={<ArrowRight className="w-5 h-5" />}>
                  Explore Systems
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">
                  Deploy AI
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Highlight */}
      <Section>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">Core Capabilities</h2>
          <div className="w-24 h-1.5 bg-neon-purple mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="w-12 h-12 text-neon-cyan" />,
              title: "Neural Networks",
              desc: "Deep learning models custom-architected for your enterprise data streams."
            },
            {
              icon: <Zap className="w-12 h-12 text-neon-purple" />,
              title: "Real-time Processing",
              desc: "Edge computing solutions that make decisions in microseconds, not milliseconds."
            },
            {
              icon: <ShieldCheck className="w-12 h-12 text-blue-500" />,
              title: "AI Security",
              desc: "Self-healing cybersecurity protocols driven by adversarial AI agents."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <Card className="h-full flex flex-col items-start text-left group">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 border border-white/5 group-hover:border-neon-cyan/20">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-neon-cyan transition-colors">{feature.title}</h3>
                <p className="text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Animated Text Strip */}
      <div className="w-full bg-neon-cyan/5 border-y border-neon-cyan/10 py-8 overflow-hidden backdrop-blur-sm">
         <div className="whitespace-nowrap animate-marquee flex gap-16 text-3xl font-display font-bold text-muted/50">
             <span>MACHINE LEARNING</span> <span>•</span>
             <span>COMPUTER VISION</span> <span>•</span>
             <span>NATURAL LANGUAGE PROCESSING</span> <span>•</span>
             <span>PREDICTIVE ANALYTICS</span> <span>•</span>
             <span>ROBOTICS</span> <span>•</span>
             <span>QUANTUM ALGORITHMS</span> <span>•</span>
             <span>MACHINE LEARNING</span> <span>•</span>
             <span>COMPUTER VISION</span> <span>•</span>
             <span>NATURAL LANGUAGE PROCESSING</span> <span>•</span>
         </div>
      </div>
    </div>
  );
};

export default Home;