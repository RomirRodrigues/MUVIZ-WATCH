import React, { useState } from 'react';
import { 
  X, Play, Sparkles, Glasses, ShieldCheck, Star, Globe, 
  Bookmark, Check, Film, Tv, Clock, User
} from 'lucide-react';

export default function MovieModal({ 
  movie, 
  onClose, 
  onPlayMovie, 
  watchlist, 
  onToggleWatchlist,
  onOpenGlassesGuide
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'trailer'
  const isSaved = watchlist.some(m => m.id === movie.id);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Preview */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-950 flex-shrink-0">
          {activeTab === 'trailer' ? (
            <iframe
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img
              src={movie.bannerUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-[#0f1118]/60 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {movie.rating}
                </span>

                {movie.format3D && (
                  <button
                    onClick={onOpenGlassesGuide}
                    className="px-2 py-0.5 text-xs font-bold rounded glow-3d-red-cyan text-white flex items-center gap-1 hover:scale-105 transition-transform"
                  >
                    <Glasses className="w-3.5 h-3.5 text-cyan-400" />
                    3D POLARIZED GLASSES
                  </button>
                )}

                <span className="px-2 py-0.5 text-xs font-bold rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {movie.quality}
                </span>

                <span className={`px-2 py-0.5 text-xs font-bold rounded border ${movie.platformBadgeColor}`}>
                  {movie.platform}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-white">{movie.title}</h2>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-white/10">
            <button
              onClick={() => onPlayMovie(movie, "movie")}
              className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Full Movie (4K Ad-Free)
            </button>

            <button
              onClick={() => onPlayMovie(movie, "trailer")}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Play Trailer
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Synopsis & Audio Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Synopsis</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{movie.synopsis}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Spoken Audio & Subtitles
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {movie.languages.map(lang => (
                    <span key={lang} className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium">
                      🔊 {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cast & Crew</h3>
                <p className="text-xs text-gray-300">
                  <span className="text-gray-400">Director:</span> <strong className="text-white">{movie.director}</strong>
                </p>
                <p className="text-xs text-gray-300 mt-0.5">
                  <span className="text-gray-400">Cast:</span> {movie.cast.join(', ')}
                </p>
              </div>
            </div>

            {/* Right Col: Technical Specifications Box */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3 text-xs">
              <h3 className="font-bold text-white border-b border-white/10 pb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Platform Technical Specs
              </h3>

              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ad Status:</span>
                  <span className="text-amber-400 font-bold">100% Zero Ads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Resolution:</span>
                  <span className="text-cyan-400 font-bold">4K Ultra HD (2160p)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">3D Glasses Tech:</span>
                  <span className="text-white font-semibold">{movie.format3D ? 'Polarized / Red-Cyan' : 'N/A (Standard 2D)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Origin Country:</span>
                  <span className="text-purple-300 font-semibold">{movie.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Source Platform:</span>
                  <span className="text-white font-semibold">{movie.platform}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
