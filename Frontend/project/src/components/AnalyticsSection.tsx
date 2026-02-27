import { TrendingUp, Activity, Target, AlertTriangle } from 'lucide-react';

function AnalyticsSection() {
  const weeklyData = [
    { day: 'Mon', real: 45, fake: 23 },
    { day: 'Tue', real: 52, fake: 18 },
    { day: 'Wed', real: 38, fake: 31 },
    { day: 'Thu', real: 61, fake: 15 },
    { day: 'Fri', real: 48, fake: 27 },
    { day: 'Sat', real: 35, fake: 12 },
    { day: 'Sun', real: 29, fake: 8 },
  ];

  const maxValue = Math.max(...weeklyData.flatMap(d => [d.real, d.fake]));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Articles</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-2">1,247</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">+12.5%</span>
            <span className="text-gray-500">vs last week</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Fake Detected</h3>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-2">33%</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-400">-2.3%</span>
            <span className="text-gray-500">vs last week</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Real Articles</h3>
            <Target className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-2">67%</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">+2.3%</span>
            <span className="text-gray-500">vs last week</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Avg Emotional Score</h3>
            <Activity className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-4xl font-bold text-white mb-2">42.7</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-400">+5.8%</span>
            <span className="text-gray-500">vs last week</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-white font-bold text-xl mb-6">Weekly Analysis Trends</h3>
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400 font-medium w-12">{data.day}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-400">{data.real} Real</span>
                    <span className="text-red-400">{data.fake} Fake</span>
                  </div>
                </div>
                <div className="flex gap-2 h-8">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 rounded transition-all duration-500 hover:brightness-110"
                    style={{ width: `${(data.real / maxValue) * 100}%` }}
                  />
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-400 rounded transition-all duration-500 hover:brightness-110"
                    style={{ width: `${(data.fake / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-white font-bold text-xl mb-6">Detection Distribution</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 80 * 0.67} ${2 * Math.PI * 80}`}
                  className="transition-all duration-1000"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 80 * 0.33} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${2 * Math.PI * 80 * 0.67}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-white">1,247</span>
                <span className="text-sm text-gray-400">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-2xl font-bold text-green-400">67%</p>
              <p className="text-sm text-gray-400 mt-1">Real Articles</p>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-2xl font-bold text-red-400">33%</p>
              <p className="text-sm text-gray-400 mt-1">Fake Articles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-white font-bold text-lg mb-4">AI Risk Meter</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-20 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 160 80">
                <path
                  d="M 10 70 A 70 70 0 0 1 150 70"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="15"
                />
                <path
                  d="M 10 70 A 70 70 0 0 1 150 70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="15"
                  strokeDasharray="220"
                  strokeDashoffset={220 - (220 * 0.35)}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <p className="text-2xl font-bold text-cyan-400">35%</p>
                <p className="text-xs text-gray-400">Risk Level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-white font-bold text-lg mb-4">Media Manipulation Alert</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Image Tampering</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                Medium
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Deepfake Detection</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                Low
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Audio Synthesis</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                High
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-white font-bold text-lg mb-4">System Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Accuracy</span>
                <span className="text-green-400 font-semibold">94.2%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: '94.2%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Precision</span>
                <span className="text-blue-400 font-semibold">91.8%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000" style={{ width: '91.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Recall</span>
                <span className="text-violet-400 font-semibold">89.5%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-1000" style={{ width: '89.5%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSection;
