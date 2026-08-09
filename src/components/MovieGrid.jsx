import React from 'react';
import MovieCard from './MovieCard';
import { Glasses, Flame, Tv, Globe, Sparkles, Film, SearchX } from 'lucide-react';

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
      <div className="glass-panel rounded-2xl p-12 text-center my-8 space-y-4 max-w-xl mx-auto border border-white/10">
        <div className="p-4 rounded-full bg-white/5 w-fit mx-auto text-gray-400">
          <SearchX className="w-10 h-10 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white">No Movies Match Your Filter</h3>
        <p className="text-xs text-gray-400">
          Try expanding your search query, clearing audio language filters, or selecting "All Platforms" & "All Regions".
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  // Filter subsets for themed rows if not searching
  const movies3D = movies.filter(m => m.format3D);
  const trendingMovies = movies.filter(m => m.isTrending);
  const netflixDisneyMovies = movies.filter(m => m.platform === 'Netflix' || m.platform === 'Disney+' || m.platform === 'HBO Max');
  const animeAndAsia = movies.filter(m => m.region === 'Anime' || m.region === 'K-Drama' || m.country === 'Japan' || m.country === 'South Korea');

  return (
    <div className="space-y-10 my-8">

      {/* Row 1: 3D Polarized Glasses Cinema Section */}
      {movies3D.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg glow-3d-red-cyan">
                <Glasses className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-white tracking-wide flex items-center gap-2">
                  🥽 3D Polarized Glasses Cinema
                </h2>
                <p className="text-xs text-gray-400">Compatible with Red/Cyan glasses, 3D TVs & VR Headsets</p>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-mono font-bold">{movies3D.length} 3D Titles</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

      {/* Row 2: All Filtered Movies Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg md:text-xl font-black text-white tracking-wide">
              🔥 Full Global Movie Catalog
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">{movies.length} Movies Available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
