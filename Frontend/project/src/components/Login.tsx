import { useState } from 'react';
import { Eye, EyeOff, Brain, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="floating-particles absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Brain className="w-16 h-16 text-cyan-400 animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
            TruthLens AI
          </h1>

          <p className="text-cyan-300 text-lg font-light tracking-wide mb-2">
            Intelligent Misinformation Analyzer
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secure AI-powered verification system</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl shadow-2xl border border-cyan-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className={`relative input-glow ${focusedField === 'username' ? 'focused' : ''}`}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className={`relative input-glow ${focusedField === 'password' ? 'focused' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 glow-button"
            >
              <span className="flex items-center justify-center gap-2">
                Login to System
              </span>
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            Demo credentials: Any username (3+ chars) and password (6+ chars)
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-xs">
          Protected by advanced AI security protocols
        </div>
      </div>
    </div>
  );
}

export default Login;
