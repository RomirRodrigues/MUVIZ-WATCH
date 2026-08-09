import React from 'react';
import { X, Play, Trash2, Bookmark, Glasses, Star } from 'lucide-react';

export default function WatchlistDrawer({ 
  isOpen, 
  onClose, 
  watchlist, 
  onPlayMovie, 
  onRemoveFromWatchlist 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#0a0b0e] h-full border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">My 3D & 4K Watchlist</h2>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400">
              {watchlist.length}
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {watchlist.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-gray-400">
              <Bookmark className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-sm font-semibold text-white">Your Watchlist is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Click the bookmark icon on any 3D or 4K movie card to save it here for quick streaming.
              </p>
            </div>
          ) : (
            watchlist.map(movie => (
              <div 
                key={movie.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-1.5">
                    {movie.format3D && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded glow-3d-red-cyan text-white">
                        3D
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-cyan-400">{movie.quality}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-400">
                    {movie.title}
                  </h4>

                  <p className="text-[11px] text-gray-400 flex items-center gap-2">
                    <span>{movie.year}</span> • <span>{movie.country}</span>
                  </p>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => {
                        onPlayMovie(movie, "movie");
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-md bg-cyan-500 text-black text-[11px] font-bold flex items-center gap-1 hover:bg-cyan-400"
                    >
                      <Play className="w-3 h-3 fill-current" /> Stream 4K
                    </button>
                    
                    <button
                      onClick={() => onRemoveFromWatchlist(movie.id)}
                      className="p-1 text-gray-400 hover:text-red-400"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[11px] text-center text-gray-400">
            Saved movies automatically persist in your local browser cache.
          </p>
        </div>
      </div>
    </div>
  );
}
