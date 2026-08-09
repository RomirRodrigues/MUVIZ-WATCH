import React from 'react';
import { ShieldCheck, Zap, Glasses, Globe, Sparkles } from 'lucide-react';

export default function AdFreeGuaranteeBanner({ onOpenGlassesGuide }) {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel border border-cyan-500/30 p-6 md:p-8 my-10 shadow-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-black">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Zero Ads & Premium Cinema Quality</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white">
            Pure Cinema Experience. <span className="text-cyan-400">No Ads. No Distractions.</span>
          </h3>

          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Muviz Watch streams full-length films and official trailers at maximum 4K Ultra HD resolution.
            Use affordable 3D glasses or 3D TV side-by-side mode to unlock stereoscopic 3D depth directly in your browser.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
            <Zap className="w-5 h-5 text-amber-400 mx-auto" />
            <span className="text-xs font-bold text-white block">4K Ultra HD</span>
            <span className="text-[10px] text-gray-400">Uncompressed Bitrate</span>
          </div>

          <button 
            onClick={onOpenGlassesGuide}
            className="px-4 py-3 rounded-xl glow-3d-red-cyan text-center space-y-1 hover:scale-105 transition-transform"
          >
            <Glasses className="w-5 h-5 text-cyan-300 mx-auto" />
            <span className="text-xs font-bold text-white block">3D Polarized Mode</span>
            <span className="text-[10px] text-cyan-200">Glasses Calibration</span>
          </button>

          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
            <Globe className="w-5 h-5 text-purple-400 mx-auto" />
            <span className="text-xs font-bold text-white block">Every Country</span>
            <span className="text-[10px] text-gray-400">Multi-Language Audio</span>
          </div>
        </div>

      </div>
    </div>
  );
}
