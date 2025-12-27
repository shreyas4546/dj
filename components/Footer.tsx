import React from 'react';
import { Cpu, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-16 pb-8 mt-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-neon-purple" />
              <span className="font-display font-bold text-xl">MASTERSOLIS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering the future of artificial intelligence with human-centric design and ethical engineering.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-white mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Enterprise AI</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Neural Networks</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Predictive Analytics</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Computer Vision</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-neon-cyan cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-neon-cyan/20 cursor-pointer transition-all">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-neon-cyan/20 cursor-pointer transition-all">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-neon-cyan/20 cursor-pointer transition-all">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Mastersolis Infotech. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500 text-sm">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;