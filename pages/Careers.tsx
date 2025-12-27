import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JOBS } from '../constants';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

const Careers: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { score: number, skills: string[] }>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnalyzing(true);
      setResult(null);
      // Simulate AI processing
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          score: Math.floor(Math.random() * (98 - 75) + 75),
          skills: ["React", "TypeScript", "Machine Learning", "WebGL"]
        });
      }, 3000);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      <Section spacing="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Job Listings */}
            <div>
                <h1 className="text-5xl font-display font-bold mb-10 leading-tight">Open Positions</h1>
                <div className="space-y-6">
                    {JOBS.map((job) => (
                        <motion.div 
                            key={job.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                          <Card className="hover:border-neon-purple/50 cursor-pointer group p-6">
                              <div className="flex justify-between items-start mb-3">
                                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors font-display">{job.title}</h3>
                                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-muted uppercase tracking-wider">{job.type}</span>
                              </div>
                              <p className="text-muted text-base mb-6 leading-relaxed">{job.description}</p>
                              <div className="flex justify-between text-sm text-muted font-mono border-t border-white/5 pt-4">
                                  <span>{job.location}</span>
                                  <span className="text-neon-cyan">{job.salary}</span>
                              </div>
                          </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Resume Analyzer */}
            <div className="relative">
                <div className="sticky top-32">
                    <Card className="bg-gradient-to-b from-white/5 to-transparent border-neon-cyan/20">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 font-display">
                            <span className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#00f3ff]"></span>
                            AI Resume Scanner
                        </h2>
                        <p className="text-muted mb-8 leading-relaxed">
                            Upload your CV. Our neural network will analyze your fit for our open roles instantly.
                        </p>

                        {!analyzing && !result && (
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-neon-cyan/50 hover:bg-white/5 transition-all group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                      <Upload className="w-8 h-8 text-muted group-hover:text-white" />
                                    </div>
                                    <p className="mb-2 text-sm text-muted"><span className="font-semibold text-white">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted/60">PDF, DOCX (MAX. 2MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.doc" />
                            </label>
                        )}

                        {analyzing && (
                            <div className="h-64 flex flex-col items-center justify-center">
                                <Loader2 className="w-16 h-16 text-neon-cyan animate-spin mb-6" />
                                <p className="text-base font-mono text-neon-cyan animate-pulse">EXTRACTING ENTITIES...</p>
                            </div>
                        )}

                        {result && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/5 rounded-xl p-8 border border-white/10"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Analysis Complete</h3>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-mono">PROCESSED</span>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-muted uppercase tracking-wider">Match Score</span>
                                        <span className="text-xl font-bold text-neon-cyan">{result.score}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.score}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-neon-cyan h-3 rounded-full shadow-[0_0_10px_#00f3ff]"
                                        ></motion.div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-muted uppercase tracking-wider mb-3 block">Skills Detected</span>
                                    <div className="flex flex-wrap gap-2">
                                        {result.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-neon-purple/20 text-neon-purple text-xs font-bold rounded border border-neon-purple/30">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
      </Section>
    </div>
  );
};

export default Careers;