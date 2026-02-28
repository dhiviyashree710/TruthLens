import { useState } from 'react';
import { Sparkles, AlertTriangle, Shield, Target, Activity } from 'lucide-react';

interface AnalyzeSectionProps {
  onAnalysisComplete?: (data: any) => void;
}

function AnalyzeSection({ onAnalysisComplete }: AnalyzeSectionProps = {}) {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const suspiciousWords = ['allegedly', 'claim', 'shocking', 'exclusive', 'breaking', 'unbelievable', 'secret', 'revealed'];
  const positiveWords = ['study', 'research', 'according', 'official', 'confirmed', 'evidence', 'published'];

  const analyzeText = () => {
    if (!text.trim()) return;

    setAnalyzing(true);

    setTimeout(() => {
      const isFake = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 20) + 80;
      const trustScore = isFake ? Math.floor(Math.random() * 40) + 10 : Math.floor(Math.random() * 30) + 70;
      const emotionalScore = Math.floor(Math.random() * 100);
      const credibilityScore = isFake ? Math.floor(Math.random() * 40) + 20 : Math.floor(Math.random() * 30) + 70;
      const biasLevel = Math.floor(Math.random() * 100);

      const analysisResult = {
        prediction: isFake ? 'FAKE' : 'REAL',
        confidence,
        trustScore,
        emotionalScore,
        credibilityScore,
        biasLevel,
        riskLevel: trustScore < 40 ? 'High' : trustScore < 70 ? 'Medium' : 'Low',
        adversarialRobustness: confidence > 90 ? 'Stable' : 'Vulnerable',
        text,
      };

      setResult(analysisResult);
      onAnalysisComplete?.(analysisResult);
      setAnalyzing(false);
    }, 2000);
  };

  const highlightText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;]/g, '');
      const isSuspicious = suspiciousWords.includes(cleanWord);
      const isPositive = positiveWords.includes(cleanWord);

      if (isSuspicious) {
        return (
          <span
            key={index}
            className="relative group cursor-help"
          >
            <span className="bg-red-500/20 text-red-300 px-1 rounded hover:bg-red-500/30 transition-all duration-200">
              {word}
            </span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-red-500/30 shadow-lg">
              Suspicious indicator
            </span>
            {' '}
          </span>
        );
      }

      if (isPositive) {
        return (
          <span
            key={index}
            className="relative group cursor-help"
          >
            <span className="bg-green-500/20 text-green-300 px-1 rounded hover:bg-green-500/30 transition-all duration-200">
              {word}
            </span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-500/30 shadow-lg">
              Credibility indicator
            </span>
            {' '}
          </span>
        );
      }

      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          Analyze News Article
        </h3>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news article here for AI analysis..."
          className="w-full h-40 px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
        />

        <button
          onClick={analyzeText}
          disabled={!text.trim() || analyzing}
          className={`mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 ${
            analyzing
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:from-cyan-400 hover:to-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50'
          }`}
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Analyze Article
            </span>
          )}
        </button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`glass-card p-8 rounded-xl border-2 ${
              result.prediction === 'REAL' ? 'border-green-500/50' : 'border-red-500/50'
            }`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.prediction === 'REAL' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {result.prediction === 'REAL' ? (
                    <Shield className="w-10 h-10 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">AI Prediction</h3>
                <p className={`text-5xl font-bold mb-4 ${
                  result.prediction === 'REAL' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.prediction}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90" width="128" height="128">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - result.confidence / 100)}`}
                        className={result.prediction === 'REAL' ? 'text-green-400' : 'text-red-400'}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold text-white">{result.confidence}%</span>
                      <span className="text-xs text-gray-400">Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Trust Score
                  </h4>
                  <span className="text-cyan-400 font-bold text-xl">{result.trustScore}/100</span>
                </div>
                <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${result.trustScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Risk Level: <span className={`font-semibold ${
                    result.riskLevel === 'Low' ? 'text-green-400' :
                    result.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>{result.riskLevel}</span>
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-violet-400" />
                    Emotional Manipulation
                  </h4>
                  <span className="text-violet-400 font-bold text-xl">{result.emotionalScore}%</span>
                </div>
                <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${result.emotionalScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Intensity: <span className="font-semibold text-violet-400">
                    {result.emotionalScore < 30 ? 'Low' : result.emotionalScore < 70 ? 'Moderate' : 'High'}
                  </span>
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">Source Credibility</h4>
                  <span className="text-blue-400 font-bold text-xl">{result.credibilityScore}/100</span>
                </div>
                <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ width: `${result.credibilityScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Adversarial Robustness
              </h4>
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  result.adversarialRobustness === 'Stable'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {result.adversarialRobustness}
                </span>
                <p className="text-gray-400 text-sm">Model resistance to attacks</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Bias Level Detector
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-1000"
                      style={{ width: `${result.biasLevel}%` }}
                    />
                  </div>
                </div>
                <span className="text-orange-400 font-bold">{result.biasLevel}%</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl border border-cyan-500/20">
            <h4 className="text-white font-semibold mb-4">Word-Level Analysis</h4>
            <div className="p-4 bg-slate-900/50 rounded-lg text-gray-300 leading-relaxed">
              {highlightText(result.text)}
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500/20 border border-red-500/50 rounded" />
                <span className="text-gray-400">Suspicious</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded" />
                <span className="text-gray-400">Credible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500/20 border border-gray-500/50 rounded" />
                <span className="text-gray-400">Neutral</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyzeSection;
