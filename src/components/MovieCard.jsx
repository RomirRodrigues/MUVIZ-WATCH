import React from 'react';
import { Play, Glasses, Star, Bookmark, Check, Sparkles, Info, ShieldCheck } from 'lucide-react';

export default function MovieCard({ 
  movie, 
  onPlayMovie, 
  onOpenMovieDetail, 
  watchlist, 
  onToggleWatchlist 
}) {
  const isSaved = watchlist.some(m => m.id === movie.id);

  return (
    <div className="group relative bg-[#0f1118] rounded-xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Poster Image & Anaglyph Effect */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900 anaglyph-hover-effect">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {movie.format3D && (
              <span className="px-2 py-0.5 text-[10px] font-black rounded glow-3d-red-cyan text-white flex items-center gap-1 shadow">
                <Glasses className="w-3 h-3 text-cyan-300" />
                3D POLARIZED
              </span>
            )}
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-black/70 text-cyan-400 border border-cyan-500/30 backdrop-blur w-fit">
              {movie.quality}
            </span>
          </div>

          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border backdrop-blur ${movie.platformBadgeColor}`}>
            {movie.platform}
          </span>
        </div>

        {/* Rating Ribbon */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 px-2 py-0.5 rounded bg-black/80 text-amber-400 text-xs font-bold border border-amber-500/30 backdrop-blur">
          <Star className="w-3 h-3 fill-current text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-white line-clamp-1">{movie.title}</h4>
            <p className="text-[11px] text-gray-300 line-clamp-2 italic">"{movie.tagline}"</p>

            <div className="flex items-center space-x-1.5 text-[10px] text-gray-400">
              <span>{movie.year}</span> • <span>{movie.duration}</span> • <span className="text-purple-300 font-semibold">{movie.country}</span>
            </div>

            {/* Quick Play Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => onPlayMovie(movie, "movie")}
                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow hover:scale-105 transition-transform"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Full Movie
              </button>
              <button
                onClick={() => onPlayMovie(movie, "trailer")}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center gap-1 border border-white/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3 bg-[#0a0b0e] space-y-1 border-t border-white/5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {movie.title}
          </h3>
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`p-1 rounded transition-colors ${
              isSaved ? 'text-amber-400' : 'text-gray-400 hover:text-white'
            }`}
            title={isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span className="truncate max-w-[140px] text-gray-400">{movie.genre.slice(0, 2).join(', ')}</span>
          <button 
            onClick={() => onOpenMovieDetail(movie)}
            className="text-[10px] text-cyan-400 hover:underline font-semibold"
          >
            Details &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
