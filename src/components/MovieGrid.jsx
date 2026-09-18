import React from 'react';
import MovieCard from './MovieCard';
import { Glasses, Flame, Tv, Globe, Sparkles, Film, SearchX, Layers } from 'lucide-react';

export default function MovieGrid({ 
  movies, 
  onPlayMovie, 
  onOpenMovieDetail, 
  watchlist, 
  onToggleWatchlist,
  onResetFilters 
}) {
  if (movies.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center my-8 space-y-4 max-w-xl mx-auto border border-white/15 shadow-2xl">
        <div className="p-4 rounded-2xl bg-cyan-500/10 w-fit mx-auto text-cyan-400 border border-cyan-500/20">
          <SearchX className="w-10 h-10 text-cyan-400" />
        </div>
        <h3 className="text-xl font-black text-white">No Movies Match Your Filter</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Try expanding your search term, clearing language filters, or selecting "All Platforms" & "All Regions".
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-transform cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  // Filter subsets for themed rows
  const movies3D = movies.filter(m => m.format3D);

  return (
    <div className="space-y-12 my-8">

      {/* Row 1: Universal 3D Cinema Section */}
      {movies3D.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl glow-3d-red-cyan shadow-lg">
                <Glasses className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  🥽 Universal Stereoscopic 3D Cinema
                </h2>
                <p className="text-xs text-gray-400">Compatible with Red/Cyan glasses, RealD 3D, 3D TVs & VR Headsets</p>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-mono font-black px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              {movies3D.length} 3D FILMS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {movies3D.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlayMovie={onPlayMovie}
                onOpenMovieDetail={onOpenMovieDetail}
                watchlist={watchlist}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        </section>
      )}

      {/* Row 2: Full Global Cinema Catalog Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 text-white shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                🔥 Full Global Cinema Showcase
              </h2>
              <p className="text-xs text-gray-400">Curated 4K Ultra HD films across all regions and platforms</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-mono font-bold px-3 py-1 rounded-xl bg-white/5 border border-white/10">
            {movies.length} MOVIES
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayMovie={onPlayMovie}
              onOpenMovieDetail={onOpenMovieDetail}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
