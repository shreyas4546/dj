import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Section from '../components/Section';
import Card from '../components/Card';

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
  return (
    <div className="pt-24 min-h-screen">
      <Section spacing="large">
        <h1 className="text-4xl font-display font-bold mb-10">Admin Dashboard</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card hoverEffect={false}>
                <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Total Candidates</h3>
                <div className="text-5xl font-bold text-white mb-2 font-display">1,204</div>
                <span className="text-sm text-green-400 font-mono bg-green-400/10 px-2 py-1 rounded">+12% THIS WEEK</span>
            </Card>
            <Card hoverEffect={false}>
                <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Avg Match Score</h3>
                <div className="text-5xl font-bold text-neon-cyan mb-2 font-display">84.2%</div>
                <span className="text-sm text-muted font-mono">AI ACCURACY METRIC</span>
            </Card>
            <Card hoverEffect={false}>
                <h3 className="text-muted text-sm uppercase tracking-wider mb-4 font-bold">Server Load</h3>
                <div className="text-5xl font-bold text-neon-purple mb-2 font-display">34%</div>
                <span className="text-sm text-green-400 font-mono">OPTIMAL PERFORMANCE</span>
            </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
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
        </div>
      </Section>
    </div>
  );
};

export default Admin;