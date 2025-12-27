import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am Nexus, the Mastersolis AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      if (process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: userMsg,
          config: {
            // Enable thinking mode with max budget for complex reasoning
            thinkingConfig: { thinkingBudget: 32768 }
          }
        });
        
        setMessages(prev => [...prev, { role: 'ai', text: response.text || "I processed that, but have no output." }]);
      } else {
        // Fallback simulation if no API key is present
        setTimeout(() => {
          let response = "I'm processing your request using our proprietary neural network.";
          if (userMsg.toLowerCase().includes('job') || userMsg.toLowerCase().includes('career')) {
            response = "We are currently hiring for AI Engineers and Product Designers. Check our Careers page!";
          } else if (userMsg.toLowerCase().includes('service') || userMsg.toLowerCase().includes('price')) {
            response = "We offer bespoke AI solutions. I can schedule a consultation with our sales team.";
          }
          setMessages(prev => [...prev, { role: 'ai', text: response }]);
          setIsTyping(false);
        }, 1500);
        return; // Early return to avoid setting isTyping false twice
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I apologize, my neural link is experiencing interference. Please try again." }]);
    } finally {
      if (process.env.API_KEY) {
        setIsTyping(false);
      }
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.4)] text-black ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-80 sm:w-96 glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neon-cyan/30"
            style={{ maxHeight: '600px', height: '500px' }}
          >
            {/* Header */}
            <div className="p-4 bg-neon-cyan/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nexus AI</h3>
                  <span className="text-xs text-neon-cyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-neon-purple/20 text-white border border-neon-purple/30 rounded-br-none' 
                      : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg rounded-bl-none border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                disabled={isTyping}
                placeholder={isTyping ? "Nexus is thinking..." : "Ask about our AI services..."}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;