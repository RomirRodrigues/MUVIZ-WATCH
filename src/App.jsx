import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { GLOBAL_MOVIES } from './data/globalMovies';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ConverterHero from './components/ConverterHero';
import GlobalFilters from './components/GlobalFilters';
import MovieGrid from './components/MovieGrid';
import VideoPlayer from './components/VideoPlayer';
import MovieModal from './components/MovieModal';
import GlassesGuideModal from './components/GlassesGuideModal';
import WatchlistDrawer from './components/WatchlistDrawer';
import AdFreeGuaranteeBanner from './components/AdFreeGuaranteeBanner';
import WelcomeIntro from './components/WelcomeIntro';
import { ShieldCheck, Film, Glasses, Tv, Globe, Sparkles, Heart, Shield } from 'lucide-react';

export default function App() {
  // Welcome Intro State
  const [showWelcome, setShowWelcome] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [only3D, setOnly3D] = useState(false);
  const [only4K, setOnly4K] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');

  // Modal & Player States
  const [activePlayingMovie, setActivePlayingMovie] = useState(null);
  const [activePlayMode, setActivePlayMode] = useState('movie');
  const [active3DMode, setActive3DMode] = useState('anaglyph');
  const [activeDetailMovie, setActiveDetailMovie] = useState(null);
  const [showGlassesGuide, setShowGlassesGuide] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);

  // Watchlist Local Storage Sync
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('muviz_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('muviz_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  // Toggle Watchlist
  const handleToggleWatchlist = (movie) => {
    const exists = watchlist.some(m => m.id === movie.id);
    if (exists) {
      setWatchlist(prev => prev.filter(m => m.id !== movie.id));
    } else {
      setWatchlist(prev => [...prev, movie]);
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (err) {}
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedRegion('all');
    setOnly3D(false);
    setOnly4K(false);
    setSelectedLanguage('All Languages');
  };

  // Filtered Movies computation
  const filteredMovies = useMemo(() => {
    return GLOBAL_MOVIES.filter(movie => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(query);
        const matchesCast = movie.cast.some(c => c.toLowerCase().includes(query));
        const matchesDirector = movie.director.toLowerCase().includes(query);
        const matchesCountry = movie.country.toLowerCase().includes(query);
        const matchesGenre = movie.genre.some(g => g.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCast && !matchesDirector && !matchesCountry && !matchesGenre) {
          return false;
        }
      }

      if (selectedPlatform !== 'all' && movie.platform !== selectedPlatform) return false;
      if (selectedRegion !== 'all' && movie.region !== selectedRegion) return false;
      if (only3D && !movie.format3D) return false;
      if (only4K && !movie.quality.includes('4K')) return false;
      if (selectedLanguage !== 'All Languages' && !movie.languages.includes(selectedLanguage)) return false;

      return true;
    });
  }, [searchQuery, selectedPlatform, selectedRegion, only3D, only4K, selectedLanguage]);

  // Featured movies for Hero carousel
  const featuredMovies = useMemo(() => {
    return GLOBAL_MOVIES.filter(m => m.isFeatured);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07080b] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Welcome Intro Animation Screen */}
      {showWelcome && (
        <WelcomeIntro onComplete={() => setShowWelcome(false)} />
      )}

      {/* Global Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setShowWatchlist(true)}
        onOpenGlassesGuide={() => setShowGlassesGuide(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-4 space-y-6">
        
        {/* Universal 3D Link Converter Studio Bar */}
        <ConverterHero
          onConvertAndPlay={(movieObj, chosen3DMode) => {
            setActivePlayingMovie(movieObj);
            setActivePlayMode("movie");
            setActive3DMode(chosen3DMode || "anaglyph");
          }}
        />

        {/* Featured Hero Banner */}
        {!searchQuery && selectedPlatform === 'all' && selectedRegion === 'all' && (
          <HeroBanner
            featuredMovies={featuredMovies}
            onPlayMovie={(movie, mode) => {
              setActivePlayingMovie(movie);
              setActivePlayMode(mode);
              setActive3DMode("anaglyph");
            }}
            onOpenMovieDetail={(movie) => setActiveDetailMovie(movie)}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* Global Filter Toolbar */}
        <GlobalFilters
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          only3D={only3D}
          setOnly3D={setOnly3D}
          only4K={only4K}
          setOnly4K={setOnly4K}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onResetFilters={handleResetFilters}
        />

        {/* Ad-Free Assurance Banner */}
        <AdFreeGuaranteeBanner onOpenGlassesGuide={() => setShowGlassesGuide(true)} />

        {/* Movie Grid & Rows */}
        <MovieGrid
          movies={filteredMovies}
          onPlayMovie={(movie, mode) => {
            setActivePlayingMovie(movie);
            setActivePlayMode(mode);
            setActive3DMode("anaglyph");
          }}
          onOpenMovieDetail={(movie) => setActiveDetailMovie(movie)}
          watchlist={watchlist}
          onToggleWatchlist={handleToggleWatchlist}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/10 mt-16 py-10 px-6 md:px-12 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Film className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-white text-base tracking-wider">MUVIZ WATCH</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400">UNIVERSAL 3D 4K</span>
            </div>
            <p className="max-w-md text-gray-400">
              Convert any movie or video link into your choice of 8 stereoscopic 3D glasses formats instantly. 100% ad-free 4K Ultra HD streaming.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-300 font-medium justify-center">
            <button onClick={() => setShowGlassesGuide(true)} className="hover:text-cyan-400 transition-colors">
              3D Glasses Setup
            </button>
            <button onClick={() => setShowWatchlist(true)} className="hover:text-cyan-400 transition-colors">
              My Watchlist
            </button>
            <span className="text-gray-600">|</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Ad Guarantee
            </span>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <p className="font-semibold text-gray-300">
            © 2026 Muviz Watch Platform by <span className="text-cyan-400 font-extrabold">Romir Rodrigues</span>. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 text-gray-400">
            Designed & Developed by Romir Rodrigues for 4K Ultra HD & Universal 3D Cinema
          </p>
        </div>
      </footer>

      {/* Full Movie & 3D Video Player Overlay */}
      {activePlayingMovie && (
        <VideoPlayer
          movie={activePlayingMovie}
          initialMode={activePlayMode}
          initial3DMode={active3DMode}
          onClose={() => {
            setActivePlayingMovie(null);
          }}
        />
      )}

      {/* Movie Details Modal */}
      {activeDetailMovie && (
        <MovieModal
          movie={activeDetailMovie}
          onClose={() => setActiveDetailMovie(null)}
          onPlayMovie={(movie, mode) => {
            setActivePlayingMovie(movie);
            setActivePlayMode(mode);
            setActive3DMode("anaglyph");
            setActiveDetailMovie(null);
          }}
          watchlist={watchlist}
          onToggleWatchlist={handleToggleWatchlist}
          onOpenGlassesGuide={() => {
            setActiveDetailMovie(null);
            setShowGlassesGuide(true);
          }}
        />
      )}

      {/* 3D Glasses Guide Modal */}
      {showGlassesGuide && (
        <GlassesGuideModal onClose={() => setShowGlassesGuide(false)} />
      )}

      {/* Watchlist Slide-out Drawer */}
      <WatchlistDrawer
        isOpen={showWatchlist}
        onClose={() => setShowWatchlist(false)}
        watchlist={watchlist}
        onPlayMovie={(movie, mode) => {
          setActivePlayingMovie(movie);
          setActivePlayMode(mode);
          setActive3DMode("anaglyph");
        }}
        onRemoveFromWatchlist={(movieId) => {
          setWatchlist(prev => prev.filter(m => m.id !== movieId));
        }}
      />
    </div>
  );
}
