import React from 'react';
import { 
  Tv, Glasses, Zap, Globe, Sparkles, Filter, Check, RotateCcw
} from 'lucide-react';
import { PLATFORMS, REGIONS, LANGUAGES } from '../data/globalMovies';

export default function GlobalFilters({
  selectedPlatform,
  setSelectedPlatform,
  selectedRegion,
  setSelectedRegion,
  only3D,
  setOnly3D,
  only4K,
  setOnly4K,
  selectedLanguage,
  setSelectedLanguage,
  onResetFilters
}) {
  const isFiltered = selectedPlatform !== 'all' || selectedRegion !== 'all' || only3D || only4K || selectedLanguage !== 'All Languages';

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 my-6 border border-white/10 space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Explore Global Catalog</h3>
          <span className="text-xs text-gray-400">(Filter by Country, Platform, Language & 3D Format)</span>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}
      </div>

      {/* Row 1: Platforms Pills (Netflix, Disney+, Prime, HBO, Cable, Cinema) */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
          <Tv className="w-3.5 h-3.5 text-red-400" /> Stream Platform Source:
        </p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedPlatform === p.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 font-bold scale-105'
                  : 'glass-pill text-gray-300'
              }`}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Region / Country Pills (Hollywood, Bollywood, Anime, K-Drama, European) */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-purple-400" /> Country & Film Industry:
        </p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedRegion === r.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 font-bold scale-105'
                  : 'glass-pill text-gray-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: 3D Glasses Format, 4K Switcher, Audio Language Dropdown */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* 3D Polarized Toggle Pill */}
        <button
          onClick={() => setOnly3D(!only3D)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            only3D 
              ? 'glow-3d-red-cyan text-white shadow-lg scale-105' 
              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
          }`}
        >
          <Glasses className="w-4 h-4 text-cyan-400" />
          <span>🥽 3D Glasses Movies Only</span>
          {only3D && <Check className="w-3.5 h-3.5 text-cyan-300" />}
        </button>

        {/* 4K Ultra HD Toggle Pill */}
        <button
          onClick={() => setOnly4K(!only4K)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            only4K 
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/25 scale-105' 
              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>⚡ 4K Ultra HD Only</span>
          {only4K && <Check className="w-3.5 h-3.5 text-black" />}
        </button>

        {/* Audio Language Dropdown */}
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-gray-400">Audio Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang} className="bg-zinc-900 text-white">
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
