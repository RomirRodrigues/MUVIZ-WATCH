import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Film, Glasses, Sparkles, ShieldCheck, Play, ArrowRight } from 'lucide-react';

export default function WelcomeIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1); // 1: Loading, 2: Ready, 3: Slide Out
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Animate progress bar from 0% to 100% over 1.8 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage(2);
          // Trigger celebratory 3D particles
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {}
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Auto transition to main site after 2.6 seconds
  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleEnter = () => {
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#06070a] flex flex-col items-center justify-center p-6 transition-all duration-700 ${
        isClosing ? '-translate-y-full opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
      }`}
    >
      {/* Motion Ambient Glow Mesh */}
      <div className="absolute inset-0 bg-radial from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Intro Card Container */}
      <div className="relative z-10 max-w-lg w-full text-center space-y-6 glass-panel p-8 md:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl">
        
        {/* Animated 3D Logo Badge */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 animate-spin opacity-40 blur-md" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40">
            <Film className="w-10 h-10 text-white animate-bounce" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 rounded-xl glow-3d-red-cyan shadow-lg">
            <Glasses className="w-4 h-4 text-cyan-300" />
          </div>
        </div>

        {/* Welcome Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-black tracking-widest uppercase shadow">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CINEMA PRESENTATION</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-glow-cyan">MUVIZ WATCH</span>
          </h1>

          <p className="text-xs md:text-sm text-gray-300 font-medium max-w-sm mx-auto leading-relaxed">
            100% Ad-Free 4K Ultra HD & Universal Stereoscopic 3D Cinema Platform
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 font-bold">
            <span className="text-cyan-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {stage === 1 ? 'Initializing 3D Shaders...' : 'Ready for Stream'}
            </span>
            <span className="text-cyan-300">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150 shadow-lg shadow-cyan-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter CTA Button */}
        <button
          onClick={handleEnter}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/30 cursor-pointer"
        >
          <span>Enter Cinema Platform</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
