import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTransition, { itemVariants } from '../components/PageTransition';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white placeholder-muted focus:outline-none focus:border-neon-cyan transition-colors";

  return (
    <PageTransition className="pt-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Section spacing="large" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            {/* Info */}
            <motion.div variants={itemVariants}>
                <h1 className="text-6xl font-display font-bold mb-8 leading-tight">Let's Build <br/>the Future</h1>
                <p className="text-muted text-xl mb-12 leading-relaxed">
                    Ready to implement autonomous systems in your workflow? Our engineers are ready to deploy.
                </p>

                <div className="space-y-10">
                    <div className="flex items-center gap-6 group cursor-pointer">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan group-hover:text-black transition-all border border-white/5">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted uppercase tracking-widest mb-1">Email Us</p>
                            <p className="text-xl font-bold font-display">hello@mastersolis.ai</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 group cursor-pointer">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-purple group-hover:text-white transition-all border border-white/5">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted uppercase tracking-widest mb-1">Headquarters</p>
                            <p className="text-xl font-bold font-display">404 Silicon Avenue, Tech City</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={itemVariants}>
                <Card>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs text-muted uppercase tracking-wider font-bold">First Name</label>
                                    <input required type="text" className={inputClasses} placeholder="Neo" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs text-muted uppercase tracking-wider font-bold">Last Name</label>
                                    <input required type="text" className={inputClasses} placeholder="Anderson" />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-xs text-muted uppercase tracking-wider font-bold">Email</label>
                                <input required type="email" className={inputClasses} placeholder="neo@matrix.com" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs text-muted uppercase tracking-wider font-bold">Message</label>
                                <textarea required rows={4} className={inputClasses} placeholder="Tell us about your project..."></textarea>
                            </div>

                            <Button type="submit" className="w-full" icon={<Send className="w-4 h-4" />}>
                                Send Transmission
                            </Button>
                        </form>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                                <Send className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 font-display">Message Received</h3>
                            <p className="text-muted leading-relaxed mb-8">Our AI agent has queued your message for priority review. Expect a response within 48 milliseconds... just kidding, 24 hours.</p>
                            <button onClick={() => setSubmitted(false)} className="text-neon-cyan hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">Send another</button>
                        </motion.div>
                    )}
                </Card>
            </motion.div>
        </div>
      </Section>
    </PageTransition>
  );
};

export default Contact;