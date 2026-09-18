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
    <div className="group relative bg-[#0d1017] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between">
      
      {/* Poster Image & Anaglyph Hover Effect */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950 anaglyph-hover-effect">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-black/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {movie.format3D && (
              <span className="px-2.5 py-0.5 text-[10px] font-black rounded-lg glow-3d-red-cyan text-white flex items-center gap-1 shadow-lg">
                <Glasses className="w-3 h-3 text-cyan-300 animate-pulse" />
                UNIVERSAL 3D
              </span>
            )}
            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur w-fit font-mono shadow">
              {movie.quality}
            </span>
          </div>

          <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md border backdrop-blur shadow ${movie.platformBadgeColor}`}>
            {movie.platform}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-black/80 text-amber-300 text-xs font-black border border-amber-500/40 backdrop-blur shadow">
          <Star className="w-3 h-3 fill-current text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <div className="space-y-2">
            <h4 className="text-sm font-black text-white line-clamp-1 text-glow-cyan">{movie.title}</h4>
            <p className="text-[11px] text-cyan-200 line-clamp-2 italic font-medium">"{movie.tagline}"</p>

            <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 font-semibold">
              <span>{movie.year}</span> • <span>{movie.duration}</span> • <span className="text-purple-300">{movie.country}</span>
            </div>

            {/* Quick Play Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => onPlayMovie(movie, "movie")}
                className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Full Movie</span>
              </button>
              <button
                onClick={() => onPlayMovie(movie, "trailer")}
                className="px-2.5 py-2 rounded-xl glass-pill text-white text-[11px] font-bold flex items-center justify-center gap-1 border border-white/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3.5 bg-[#080a0e] space-y-1.5 border-t border-white/5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs font-black text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {movie.title}
          </h3>
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              isSaved ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span className="truncate max-w-[140px] text-gray-400 font-medium">{movie.genre.slice(0, 2).join(', ')}</span>
          <button 
            onClick={() => onOpenMovieDetail(movie)}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold hover:underline cursor-pointer"
          >
            Details &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
