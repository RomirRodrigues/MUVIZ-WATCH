import React, { useState, useEffect } from 'react';
import { 
  Film, Search, Glasses, Bookmark, ShieldCheck, Globe, 
  Tv, Sparkles, X, Menu, Command
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'glass-panel border-b border-white/15 shadow-2xl py-2.5 backdrop-blur-xl' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Motion Lens Accent */}
        <div 
          onClick={() => {
            setSearchQuery('');
            setSelectedPlatform('all');
            setSelectedRegion('all');
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-xl shadow-cyan-500/25 group-hover:scale-105 transition-all duration-300">
            <Film className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white">MUVIZ</span>
              <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-glow-cyan">
                WATCH
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                UNIVERSAL 3D 4K
              </span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              100% Ad-Free Global Cinema Platform
            </p>
          </div>
        </div>

        {/* 21st.dev Spotlight Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, actors, directors, countries..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-16 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono shadow-inner"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-gray-500 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* 3D Glasses Setup Guide Button */}
          <button
            onClick={onOpenGlassesGuide}
            className="px-3.5 py-1.5 rounded-2xl glow-3d-red-cyan text-xs font-bold text-white flex items-center gap-1.5 hover:scale-105 transition-all shadow-lg"
          >
            <Glasses className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>3D Glasses Guide</span>
          </button>

          {/* Watchlist Trigger Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative px-4 py-1.5 rounded-2xl glass-pill text-xs font-bold text-gray-200 flex items-center gap-2 transition-all"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 mt-3 pt-3 border-t border-white/10 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onOpenGlassesGuide();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl glow-3d-red-cyan text-xs font-bold text-white flex items-center justify-center gap-1.5"
            >
              <Glasses className="w-4 h-4 text-cyan-300" />
              3D Guide
            </button>
            <button
              onClick={() => {
                onOpenWatchlist();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-white/10"
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
