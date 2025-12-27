import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

const data = [
  { name: 'Mon', candidates: 4, traffic: 2400 },
  { name: 'Tue', candidates: 12, traffic: 1398 },
  { name: 'Wed', candidates: 28, traffic: 9800 },
  { name: 'Thu', candidates: 15, traffic: 3908 },
  { name: 'Fri', candidates: 9, traffic: 4800 },
  { name: 'Sat', candidates: 3, traffic: 3800 },
  { name: 'Sun', candidates: 5, traffic: 4300 },
];

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(!username || !password) {
        setError('Please enter all fields');
        return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setError('Invalid credentials. Hint: admin / admin');
        setLoading(false);
      }
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-neon-purple/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_30px_rgba(188,19,254,0.1)]">
                   <Shield className="w-8 h-8 text-neon-purple" />
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Command Center</h1>
                <p className="text-muted text-sm">Restricted access. Authorization required.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Identity</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-all placeholder:text-gray-700"
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Passcode</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-neon-cyan transition-all placeholder:text-gray-700"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  className="w-full relative overflow-hidden" 
                  disabled={loading}
                  variant="primary"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                       <span>Authenticating...</span>
                    </div>
                  ) : (
                    "Initialize Session"
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="pt-24 min-h-screen">
      <Section spacing="large">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-display font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    SECURE CONNECTION ACTIVE
                 </div>
                 <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="text-sm text-muted hover:text-white transition-colors"
                 >
                    Logout
                 </button>
            </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card hoverEffect={false}>
                    <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Total Candidates</h3>
                    <div className="text-5xl font-bold text-white mb-2 font-display">1,204</div>
                    <span className="text-sm text-green-400 font-mono bg-green-400/10 px-2 py-1 rounded">+12% THIS WEEK</span>
                </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card hoverEffect={false}>
                    <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Avg Match Score</h3>
                    <div className="text-5xl font-bold text-neon-cyan mb-2 font-display">84.2%</div>
                    <span className="text-sm text-muted font-mono">AI ACCURACY METRIC</span>
                </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card hoverEffect={false}>
                    <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Server Load</h3>
                    <div className="text-5xl font-bold text-neon-purple mb-2 font-display">34%</div>
                    <span className="text-sm text-green-400 font-mono">OPTIMAL PERFORMANCE</span>
                </Card>
            </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                <Card hoverEffect={false} className="h-[500px]">
                    <h3 className="text-xl font-bold mb-8 font-display">Traffic Analytics</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f0b29', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="traffic" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                <Card hoverEffect={false} className="h-[500px]">
                    <h3 className="text-xl font-bold mb-8 font-display">Resume Processing</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{ backgroundColor: '#0f0b29', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="candidates" fill="#bc13fe" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Admin;