/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Eye, 
  EyeOff, 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  History, 
  LogOut, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare,
  Activity,
  CheckCircle2,
  XCircle,
  Zap,
  MousePointer2,
  Radar,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- Types ---
type Page = 'login' | 'dashboard' | 'analyze' | 'analytics' | 'history';

// --- Mock Data ---
const ANALYTICS_DATA = [
  { name: 'Mon', fake: 12, real: 45 },
  { name: 'Tue', fake: 19, real: 38 },
  { name: 'Wed', fake: 15, real: 52 },
  { name: 'Thu', fake: 22, real: 41 },
  { name: 'Fri', fake: 30, real: 35 },
  { name: 'Sat', fake: 10, real: 20 },
  { name: 'Sun', fake: 8, real: 15 },
];

const PIE_DATA = [
  { name: 'Fake', value: 35, color: '#ef4444' },
  { name: 'Real', value: 65, color: '#22c55e' },
];

// --- Components ---

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00f2ff]/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block p-3 bg-[#00f2ff]/10 rounded-2xl mb-4"
          >
            <Brain className="w-12 h-12 neon-text" />
          </motion.div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-2">
            TruthLens <span className="neon-text">AI</span>
          </h1>
          <p className="text-slate-400 font-medium">Intelligent Misinformation Analyzer</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Secure AI-powered verification system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-x-0 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
            <div className="relative">
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter analyst ID"
                className="w-full bg-white/5 border neon-border rounded-xl py-3 px-4 outline-none text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border neon-border rounded-xl py-3 px-4 outline-none text-white placeholder:text-slate-600"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00f2ff] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isLoading}
            className="neon-button w-full flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Initialize System
                <Zap size={18} className="group-hover:scale-125 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            Authorized Personnel Only. All activities are monitored by TruthLens Security.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ activePage, setActivePage, onLogout }: { 
  activePage: Page, 
  setActivePage: (p: Page) => void,
  onLogout: () => void
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze News', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <aside className="w-64 glass-card h-[calc(100vh-2rem)] m-4 fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8 neon-text" />
          <span className="text-xl font-bold font-display tracking-tight">TruthLens <span className="neon-text">AI</span></span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mt-4" />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as Page)}
            className={`w-full sidebar-link ${activePage === item.id ? 'sidebar-link-active' : ''}`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Analyzed', value: '1,284', icon: Search, color: 'text-blue-400' },
          { label: 'Fake Detected', value: '432', icon: XCircle, color: 'text-red-400' },
          { label: 'Real Verified', value: '852', icon: CheckCircle2, color: 'text-green-400' },
          { label: 'Avg. Bias Score', value: '24%', icon: TrendingUp, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="neon-text" />
            Detection Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="real" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fake" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="neon-text" />
            Verification Ratio
          </h3>
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4">
              {PIE_DATA.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyzeView = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        prediction: Math.random() > 0.5 ? 'REAL' : 'FAKE',
        confidence: Math.floor(Math.random() * 20) + 75,
        trustScore: Math.floor(Math.random() * 40) + 50,
        risk: 'Medium',
        emotionalScore: 68,
        credibility: 82,
        robustness: 'Stable',
        highlightedText: text
      });
    }, 2000);
  };

  const getHighlightedText = (content: string) => {
    const words = content.split(' ');
    const suspicious = ['conspiracy', 'secret', 'hidden', 'shocking', 'unbelievable', 'exposed', 'scandal'];
    const positive = ['verified', 'confirmed', 'official', 'evidence', 'source', 'report'];

    return words.map((word, i) => {
      const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      if (suspicious.includes(cleanWord)) {
        return (
          <span key={i} className="relative group cursor-help">
            <span className="text-red-400 bg-red-400/10 px-1 rounded border-b border-red-400/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              {word}{' '}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30">
              <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg border border-white/10 whitespace-nowrap">
                Contributed to prediction score
              </div>
            </div>
          </span>
        );
      }
      if (positive.includes(cleanWord)) {
        return (
          <span key={i} className="relative group cursor-help">
            <span className="text-green-400 bg-green-400/10 px-1 rounded border-b border-green-400/50">
              {word}{' '}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30">
              <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg border border-white/10 whitespace-nowrap">
                Positive credibility indicator
              </div>
            </div>
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="neon-text" />
          Input News Content
        </h3>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news article here for AI analysis..."
          className="w-full h-48 bg-white/5 border neon-border rounded-xl p-4 outline-none text-white placeholder:text-slate-600 resize-none mb-4"
        />
        <div className="flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className={`neon-button flex items-center gap-2 ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <Activity className="animate-spin" size={20} />
                Analyzing Neural Patterns...
              </>
            ) : (
              <>
                Analyze News
                <Zap size={20} />
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Result Card */}
              <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${result.prediction === 'REAL' ? 'bg-green-500' : 'bg-red-500'}`} />
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">AI Prediction</h4>
                <div className={`text-6xl font-black mb-4 ${result.prediction === 'REAL' ? 'text-green-400' : 'text-red-400'}`}>
                  {result.prediction}
                </div>
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-white/5 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                    <motion.circle 
                      className={`${result.prediction === 'REAL' ? 'text-green-500' : 'text-red-500'} stroke-current`} 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50"
                      initial={{ strokeDasharray: "0 251" }}
                      animate={{ strokeDasharray: `${result.confidence * 2.51} 251` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{result.confidence}%</span>
                    <span className="text-[10px] text-slate-500 uppercase">Confidence</span>
                  </div>
                </div>
              </div>

              {/* Trust & Risk */}
              <div className="glass-card p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="text-sm font-bold text-slate-300">Trust Score</h4>
                    <span className="text-xl font-bold neon-text">{result.trustScore}/100</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.trustScore}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[#00f2ff]"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-slate-500 uppercase">Low Trust</span>
                    <span className="text-[10px] text-slate-500 uppercase">High Trust</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-yellow-400" size={24} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Risk Level</p>
                      <p className="text-lg font-bold text-yellow-400">{result.risk} Risk</p>
                    </div>
                  </div>
                  <Info size={20} className="text-slate-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-400" size={24} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Adversarial Robustness</p>
                      <p className="text-lg font-bold text-blue-400">{result.robustness}</p>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
              </div>

              {/* Gauges & Radar */}
              <div className="glass-card p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Emotional Manipulation
                  </h4>
                  <div className="relative pt-8 flex justify-center">
                    <div className="w-40 h-20 overflow-hidden relative">
                      <div className="w-40 h-40 rounded-full border-[12px] border-white/5" />
                      <motion.div 
                        initial={{ rotate: -90 }}
                        animate={{ rotate: (result.emotionalScore / 100) * 180 - 90 }}
                        transition={{ duration: 1.5 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border-[12px] border-transparent border-t-purple-500"
                      />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-2xl font-bold">{result.emotionalScore}%</p>
                      <p className="text-[10px] text-slate-500 uppercase">Intensity</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                    <Radar size={16} />
                    Source Credibility
                  </h4>
                  <div className="flex items-center justify-center h-24">
                    <div className="relative">
                      <Radar className="w-20 h-20 text-[#00f2ff]/20" />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-xl font-bold neon-text">{result.credibility}</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Highlighting Section */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MousePointer2 size={20} className="neon-text" />
                Neural Word Analysis
              </h3>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 leading-relaxed text-slate-300 font-medium">
                {getHighlightedText(result.highlightedText)}
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400/50 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <span className="text-xs text-slate-500">Suspicious Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400/50 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs text-slate-500">Credibility Indicator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded-full" />
                  <span className="text-xs text-slate-500">Neutral Context</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnalyticsView = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-8">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          <BarChart3 size={24} className="neon-text" />
          System-Wide Analytics
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Bias Level Detector</h4>
            <div className="space-y-4">
              {[
                { label: 'Political Bias', value: 45, color: 'bg-blue-500' },
                { label: 'Corporate Bias', value: 28, color: 'bg-purple-500' },
                { label: 'Social Bias', value: 62, color: 'bg-pink-500' },
                { label: 'Media Manipulation', value: 15, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">AI Risk Meter</h4>
            <div className="relative w-64 h-32 overflow-hidden">
              <div className="w-64 h-64 rounded-full border-[20px] border-white/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-[20px] border-transparent border-t-orange-500 rotate-[45deg]" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <p className="text-4xl font-black text-orange-500">MODERATE</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Current Global Risk Level</p>
              </div>
            </div>
            <div className="flex justify-between w-full mt-4 px-4">
              <span className="text-[10px] text-green-500 font-bold">SAFE</span>
              <span className="text-[10px] text-red-500 font-bold">CRITICAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="text-blue-400" size={32} />
          </div>
          <h4 className="text-2xl font-bold mb-1">84.2%</h4>
          <p className="text-sm text-slate-400">Detection Accuracy</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-purple-400" size={32} />
          </div>
          <h4 className="text-2xl font-bold mb-1">1.2s</h4>
          <p className="text-sm text-slate-400">Avg. Analysis Time</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="text-green-400" size={32} />
          </div>
          <h4 className="text-2xl font-bold mb-1">4.8M</h4>
          <p className="text-sm text-slate-400">Verified Sources</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
          >
            <Sidebar 
              activePage={currentPage} 
              setActivePage={setCurrentPage} 
              onLogout={handleLogout} 
            />
            
            <main className="flex-1 ml-72 p-8 min-h-screen">
              <header className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold font-display tracking-tight">
                    Welcome back, <span className="neon-text">Analyst</span>
                  </h2>
                  <p className="text-slate-400">Neural system status: Operational</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-green-500 uppercase tracking-wider">AI Model Active</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f2ff] to-[#7000ff] p-0.5">
                    <div className="w-full h-full rounded-full bg-[#0a0b1e] flex items-center justify-center">
                      <Brain size={20} className="neon-text" />
                    </div>
                  </div>
                </div>
              </header>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentPage === 'dashboard' && <DashboardView />}
                  {currentPage === 'analyze' && <AnalyzeView />}
                  {currentPage === 'analytics' && <AnalyticsView />}
                  {currentPage === 'history' && (
                    <div className="glass-card p-8 text-center text-slate-500">
                      <History size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Historical data is currently being indexed...</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Floating AI Assistant */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#00f2ff] to-[#7000ff] rounded-full shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center z-50 group"
            >
              <Brain className="text-white group-hover:animate-pulse" size={28} />
              <div className="absolute bottom-full right-0 mb-4 hidden group-hover:block">
                <div className="glass-card p-3 whitespace-nowrap text-xs font-bold neon-text">
                  How can I help you today?
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
