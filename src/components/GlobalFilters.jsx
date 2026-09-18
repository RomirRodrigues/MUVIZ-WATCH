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
    <div className="glass-panel rounded-3xl p-5 md:p-6 my-6 border border-white/15 space-y-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-wide">Explore Global Cinema Catalog</h3>
            <p className="text-[11px] text-gray-400">Filter by Country, Platform, Language & 3D Glasses Format</p>
          </div>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}
      </div>

      {/* Row 1: Platforms Segmented Pills */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
          <Tv className="w-3.5 h-3.5 text-red-400" /> Streaming Platform Origin:
        </p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPlatform === p.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105 font-black'
                  : 'glass-pill text-gray-300'
              }`}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Region / Country Pills */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-purple-400" /> Country & Film Industry:
        </p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105 font-black'
                  : 'glass-pill text-gray-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: 3D Glasses Format & 4K Switcher */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* 3D Polarized Toggle Pill */}
        <button
          onClick={() => setOnly3D(!only3D)}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            only3D 
              ? 'glow-3d-red-cyan text-white shadow-lg scale-105' 
              : 'glass-pill text-gray-300'
          }`}
        >
          <Glasses className="w-4 h-4 text-cyan-300" />
          <span>🥽 3D Glasses Cinema Only</span>
          {only3D && <Check className="w-3.5 h-3.5 text-cyan-300" />}
        </button>

        {/* 4K Ultra HD Toggle Pill */}
        <button
          onClick={() => setOnly4K(!only4K)}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            only4K 
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/30 scale-105' 
              : 'glass-pill text-gray-300'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>⚡ 4K Ultra HD Only</span>
          {only4K && <Check className="w-3.5 h-3.5 text-black" />}
        </button>

        {/* Audio Language Dropdown */}
        <div className="flex items-center space-x-2 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-gray-400">Audio Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-white font-extrabold focus:outline-none cursor-pointer"
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
