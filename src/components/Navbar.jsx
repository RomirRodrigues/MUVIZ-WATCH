import React, { useState } from 'react';
import { 
  Film, Search, Glasses, Bookmark, ShieldCheck, Globe, 
  Tv, Sparkles, X, Menu
} from 'lucide-react';
import { PLATFORMS, REGIONS } from '../data/globalMovies';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedPlatform, 
  setSelectedPlatform, 
  selectedRegion, 
  setSelectedRegion,
  watchlistCount,
  onOpenWatchlist,
  onOpenGlassesGuide
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 glass-panel border-b border-white/10 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo with 3D Lens Effect */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xl md:text-2xl font-black tracking-wider text-white">MUVIZ</span>
              <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500 text-glow-cyan">
                WATCH
              </span>
              <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                3D 4K
              </span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              100% Ad-Free Global Cinema
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search films, actors, directors, countries (e.g. Avatar, Anime, India)..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-10 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* 3D Glasses Guide Button */}
          <button
            onClick={onOpenGlassesGuide}
            className="px-3 py-1.5 rounded-full glow-3d-red-cyan text-xs font-semibold text-white flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <Glasses className="w-4 h-4 text-cyan-400" />
            <span>3D Glasses Guide</span>
          </button>

          {/* Watchlist Trigger */}
          <button
            onClick={onOpenWatchlist}
            className="relative px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-2 transition-all"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>My Watchlist</span>
            {watchlistCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-gradient-to-r from-red-500 to-purple-600 text-white">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg bg-white/5"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onOpenGlassesGuide();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg glow-3d-red-cyan text-xs font-semibold text-white flex items-center justify-center gap-1.5"
            >
              <Glasses className="w-4 h-4 text-cyan-400" />
              3D Guide
            </button>
            <button
              onClick={() => {
                onOpenWatchlist();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-white/10 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              Watchlist ({watchlistCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
