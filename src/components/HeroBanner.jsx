import React, { useState, useEffect } from 'react';
import { 
  Play, Sparkles, Glasses, ShieldCheck, Star, Volume2, VolumeX, 
  ChevronLeft, ChevronRight, Globe, Info, Bookmark, Check
} from 'lucide-react';

export default function HeroBanner({ 
  featuredMovies, 
  onPlayMovie, 
  onOpenMovieDetail,
  watchlist,
  onToggleWatchlist
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 8 seconds
  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies || featuredMovies.length === 0) return null;

  const current = featuredMovies[currentIndex];
  const isSaved = watchlist.some(m => m.id === current.id);

  return (
    <div className="relative w-full h-[65vh] md:h-[75vh] min-h-[520px] overflow-hidden rounded-3xl border border-white/15 my-4 shadow-2xl group">
      
      {/* Background Motion Banner */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105 group-hover:scale-100"
        style={{ backgroundImage: `url(${current.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-black/50" />
      </div>

      {/* Dynamic Ambient Blur Mesh */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none transition-all duration-700 blur-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(0, 240, 255, 0.3), rgba(168, 85, 247, 0.2), transparent 70%)`
        }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12">
        <div className="max-w-2xl space-y-4">
          
          {/* Bento Tech Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-black rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow">
              <Star className="w-3.5 h-3.5 fill-current" />
              {current.rating} RATING
            </span>

            {current.format3D && (
              <span className="px-3 py-1 text-xs font-black rounded-xl glow-3d-red-cyan text-white flex items-center gap-1.5 shadow">
                <Glasses className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                UNIVERSAL 3D CINEMA
              </span>
            )}

            <span className="px-3 py-1 text-xs font-black rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow font-mono">
              {current.quality}
            </span>

            <span className={`px-3 py-1 text-xs font-extrabold rounded-xl border shadow ${current.platformBadgeColor}`}>
              {current.platform}
            </span>

            <span className="px-3 py-1 text-xs font-bold rounded-xl bg-white/10 text-gray-200 border border-white/10">
              {current.country}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight text-glow-cyan">
              {current.title}
            </h1>
            <p className="text-sm md:text-lg text-cyan-300 font-bold italic mt-1">
              "{current.tagline}"
            </p>
          </div>

          {/* Synopsis */}
          <p className="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed max-w-xl font-medium">
            {current.synopsis}
          </p>

          {/* Languages Pill */}
          <div className="flex items-center space-x-2 text-xs text-gray-400 pt-1">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-gray-300">Audio Tracks:</span>
            <div className="flex flex-wrap gap-1">
              {current.languages.slice(0, 4).map(lang => (
                <span key={lang} className="px-2 py-0.5 rounded-lg bg-white/5 text-gray-200 text-[11px] border border-white/10">
                  {lang}
                </span>
              ))}
              {current.languages.length > 4 && (
                <span className="text-[11px] text-gray-400 font-mono">+{current.languages.length - 4} more</span>
              )}
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {/* Watch Full Movie */}
            <button
              onClick={() => onPlayMovie(current, "movie")}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-black flex items-center gap-2.5 hover:scale-105 transition-all shadow-xl shadow-cyan-500/30 cursor-pointer"
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              <span>Watch Full Movie (4K Ad-Free)</span>
            </button>

            {/* Play Trailer */}
            <button
              onClick={() => onPlayMovie(current, "trailer")}
              className="px-5 py-3.5 rounded-2xl glass-pill text-white text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Play HD Trailer</span>
            </button>

            {/* Details Modal */}
            <button
              onClick={() => onOpenMovieDetail(current)}
              className="p-3.5 rounded-2xl glass-pill text-gray-300 hover:text-white cursor-pointer"
              title="More Details"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Watchlist Bookmark */}
            <button
              onClick={() => onToggleWatchlist(current)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-lg' 
                  : 'glass-pill text-gray-300'
              }`}
              title={isSaved ? "Saved to Watchlist" : "Add to Watchlist"}
            >
              {isSaved ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Motion Slide Navigation Controls */}
      <div className="absolute right-6 bottom-6 z-20 flex items-center space-x-3">
        <button
          onClick={() => setCurrentIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
          className="p-2.5 rounded-full glass-panel text-white hover:border-cyan-400 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex space-x-1.5">
          {featuredMovies.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-7 bg-cyan-400 shadow-lg shadow-cyan-400/50' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % featuredMovies.length)}
          className="p-2.5 rounded-full glass-panel text-white hover:border-cyan-400 transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
