import { useState } from 'react';
import {
  Home,
  Search,
  BarChart3,
  History,
  LogOut,
  Activity,
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import AnalyzeSection from './AnalyzeSection';
import AnalyticsSection from './AnalyticsSection';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('analyze');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 glass-card border-r border-cyan-500/20 flex flex-col">
          <div className="p-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-cyan-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                TruthLens AI
              </h1>
            </div>
            <p className="text-xs text-gray-400">Misinformation Analyzer</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'dashboard'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSection('analyze')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'analyze'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Analyze News</span>
            </button>

            <button
              onClick={() => setActiveSection('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'analytics'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveSection('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'history'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300'
              }`}
            >
              <History className="w-5 h-5" />
              <span>History</span>
            </button>
          </nav>

          <div className="p-4 border-t border-cyan-500/20">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/30 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="glass-card border-b border-cyan-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Welcome back, Analyst
                </h2>
                <p className="text-gray-400 text-sm">
                  AI-powered content verification system
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">AI Model Active</span>
              </div>
            </div>
          </header>

          <div className="p-6">
            {activeSection === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">1,247</h3>
                  <p className="text-gray-400 text-sm">Total Analyzed</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">67%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">836</h3>
                  <p className="text-gray-400 text-sm">Real Articles</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <span className="text-red-400 text-sm font-medium">33%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">411</h3>
                  <p className="text-gray-400 text-sm">Fake Detected</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-violet-500/10 rounded-lg">
                      <Activity className="w-6 h-6 text-violet-400" />
                    </div>
                    <Target className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">87.3%</h3>
                  <p className="text-gray-400 text-sm">Avg Accuracy</p>
                </div>
              </div>
            )}

            {activeSection === 'analyze' && (
              <AnalyzeSection />
            )}

            {activeSection === 'analytics' && <AnalyticsSection />}

            {activeSection === 'history' && (
              <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Analysis History</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Breaking: Major Political Development', result: 'FAKE', confidence: 94.2, time: '2 hours ago' },
                    { title: 'Scientific Study Published in Nature', result: 'REAL', confidence: 98.7, time: '5 hours ago' },
                    { title: 'Celebrity Scandal Exposed', result: 'FAKE', confidence: 89.3, time: '1 day ago' },
                    { title: 'Economic Report Released', result: 'REAL', confidence: 95.1, time: '2 days ago' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.result === 'REAL'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {item.result}
                          </span>
                          <span className="text-cyan-400 text-sm font-medium">{item.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 group">
          <MessageSquare className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
