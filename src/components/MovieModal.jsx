import React, { useState } from 'react';
import { 
  X, Play, Sparkles, Glasses, ShieldCheck, Star, Globe, 
  Bookmark, Check, Film, Tv, Clock, User, Layers, Info
} from 'lucide-react';

export default function MovieModal({ 
  movie, 
  onClose, 
  onPlayMovie, 
  watchlist, 
  onToggleWatchlist,
  onOpenGlassesGuide
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'specs', 'cast'
  const isSaved = watchlist.some(m => m.id === movie.id);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Preview */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-950 flex-shrink-0">
          <img
            src={movie.bannerUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-[#0d1017]/70 to-transparent" />

          {/* Title & Badges Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-black rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {movie.rating} RATING
                </span>

                {movie.format3D && (
                  <button
                    onClick={onOpenGlassesGuide}
                    className="px-3 py-1 text-xs font-black rounded-xl glow-3d-red-cyan text-white flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow"
                  >
                    <Glasses className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                    UNIVERSAL 3D CINEMA
                  </button>
                )}

                <span className="px-3 py-1 text-xs font-black rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow font-mono">
                  {movie.quality}
                </span>

                <span className={`px-3 py-1 text-xs font-extrabold rounded-xl border shadow ${movie.platformBadgeColor}`}>
                  {movie.platform}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-white text-glow-cyan">{movie.title}</h2>
              <p className="text-xs md:text-sm text-cyan-300 font-bold italic mt-0.5">"{movie.tagline}"</p>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center space-x-2 px-6 pt-3 border-b border-white/10 text-xs font-bold bg-[#0a0c12]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400 font-black'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" /> Overview & Story
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'specs'
                ? 'border-cyan-400 text-cyan-400 font-black'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 3D & Technical Specs
          </button>
          <button
            onClick={() => setActiveTab('cast')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cast'
                ? 'border-cyan-400 text-cyan-400 font-black'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Cast & Crew
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-white/10">
            <button
              onClick={() => onPlayMovie(movie, "movie")}
              className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-cyan-500/30 cursor-pointer"
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              Watch Full Movie (4K Ad-Free)
            </button>

            <button
              onClick={() => onPlayMovie(movie, "trailer")}
              className="flex-1 md:flex-none px-5 py-3.5 rounded-2xl glass-pill text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Play Trailer
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow'
                  : 'glass-pill text-gray-300'
              }`}
            >
              {isSaved ? <Check className="w-4.5 h-4.5" /> : <Bookmark className="w-4.5 h-4.5" />}
              <span>{isSaved ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">Synopsis</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">{movie.synopsis}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Audio Tracks & Subtitles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold">
                      🔊 {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Technical Specs */}
          {activeTab === 'specs' && (
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Cinema Technical Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 font-medium">Ad Status:</span>
                  <span className="text-amber-400 font-black">100% Zero Ads</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 font-medium">Max Resolution:</span>
                  <span className="text-cyan-400 font-black font-mono">4K Ultra HD (2160p)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 font-medium">3D Formats:</span>
                  <span className="text-white font-extrabold">{movie.format3D ? 'Red/Cyan, RealD, SBS, 8 Modes' : 'Standard 2D HD'}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 font-medium">Country / Region:</span>
                  <span className="text-purple-300 font-extrabold">{movie.country}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Cast & Crew */}
          {activeTab === 'cast' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-400 font-semibold">Director:</span> <strong className="text-white font-extrabold">{movie.director}</strong>
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400 font-semibold">Cast Members:</span> <span className="text-gray-200 font-medium">{movie.cast.join(', ')}</span>
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
