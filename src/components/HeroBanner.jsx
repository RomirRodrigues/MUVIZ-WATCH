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
  const [isMuted, setIsMuted] = useState(true);

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
    <div className="relative w-full h-[65vh] md:h-[75vh] min-h-[500px] overflow-hidden rounded-2xl border border-white/10 my-4 shadow-2xl">
      {/* Background Banner Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{ backgroundImage: `url(${current.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-black/40" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12">
        <div className="max-w-2xl space-y-4">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {current.rating} Rating
            </span>

            {current.format3D && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-md glow-3d-red-cyan text-white flex items-center gap-1.5">
                <Glasses className="w-3.5 h-3.5 text-cyan-400" />
                3D POLARIZED GLASSES
              </span>
            )}

            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {current.quality}
            </span>

            <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${current.platformBadgeColor}`}>
              {current.platform}
            </span>

            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/10 text-gray-300">
              {current.country}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight">
              {current.title}
            </h1>
            <p className="text-sm md:text-lg text-cyan-300 font-medium italic mt-1">
              "{current.tagline}"
            </p>
          </div>

          {/* Synopsis */}
          <p className="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed max-w-xl">
            {current.synopsis}
          </p>

          {/* Available Languages Pill */}
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Spoken Languages:</span>
            <div className="flex flex-wrap gap-1">
              {current.languages.slice(0, 4).map(lang => (
                <span key={lang} className="px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[11px]">
                  {lang}
                </span>
              ))}
              {current.languages.length > 4 && (
                <span className="text-[11px] text-gray-400">+{current.languages.length - 4} more</span>
              )}
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Watch Full Movie 4K/3D */}
            <button
              onClick={() => onPlayMovie(current, "movie")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-cyan-500/30"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Full Movie (4K Ad-Free)
            </button>

            {/* Play Trailer */}
            <button
              onClick={() => onPlayMovie(current, "trailer")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold flex items-center gap-2 border border-white/20 backdrop-blur transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Play HD Trailer
            </button>

            {/* Details Modal */}
            <button
              onClick={() => onOpenMovieDetail(current)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
              title="More Info"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Watchlist Toggle */}
            <button
              onClick={() => onToggleWatchlist(current)}
              className={`p-3 rounded-xl border transition-all ${
                isSaved 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
              title={isSaved ? "Saved to Watchlist" : "Add to Watchlist"}
            >
              {isSaved ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots & Arrows */}
      <div className="absolute right-6 bottom-6 z-20 flex items-center space-x-3">
        <button
          onClick={() => setCurrentIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
          className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex space-x-1.5">
          {featuredMovies.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % featuredMovies.length)}
          className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
