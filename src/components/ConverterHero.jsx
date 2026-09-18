import React, { useState } from 'react';
import { Glasses, Sparkles, Play, Link, ShieldCheck, Zap, Monitor, Cpu, ArrowRight } from 'lucide-react';

export function parseSmartStreamUrl(url) {
  if (!url) return { streamUrl: '', isDirectVideo: true };

  const raw = url.trim();

  // YouTube matchers
  const ytMatch = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      streamUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&controls=1`,
      isDirectVideo: false
    };
  }

  // Vimeo matcher
  const vimeoMatch = raw.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      streamUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      isDirectVideo: false
    };
  }

  // Default direct video link
  return {
    streamUrl: raw,
    isDirectVideo: true
  };
}

export default function ConverterHero({ onConvertAndPlay }) {
  const [inputUrl, setInputUrl] = useState('');
  const [mode3D, setMode3D] = useState('anaglyph');
  const [videoTitle, setVideoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const parsed = parseSmartStreamUrl(inputUrl);

    const customMovieObj = {
      id: `custom-3d-${Date.now()}`,
      title: videoTitle.trim() || "Pasted Video 3D Stream",
      tagline: "Live Universal 3D Stream Conversion",
      synopsis: "Custom video link converted in real-time for your choice of 3D glasses format.",
      rating: 10.0,
      year: 2026,
      duration: "Live Stream",
      quality: "4K Ultra HD 3D",
      format3D: true,
      supported3DModes: ["anaglyph", "reald-interlaced", "sbs", "green-magenta", "amber-blue", "crosseye"],
      country: "Universal",
      region: "Hollywood",
      platform: "Universal 3D Studio",
      platformBadgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      languages: ["Original Audio"],
      subtitles: [],
      posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",
      embedUrl: parsed.streamUrl,
      videoUrl: parsed.streamUrl,
      backupVideoUrl: parsed.streamUrl,
      trailerUrl: parsed.streamUrl,
      isDirectVideo: parsed.isDirectVideo,
      cast: ["Custom Video Stream"],
      director: "User Pasted Link",
      genre: ["Universal 3D", "Pasted Link", "4K Ultra HD"],
      isTrending: true,
      isFeatured: true
    };

    onConvertAndPlay(customMovieObj, mode3D);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel animated-gradient-border p-6 md:p-10 my-6 shadow-2xl bg-gradient-to-r from-cyan-950/70 via-black/80 to-purple-950/70">
      
      {/* Motion Ambient Glow Backdrop */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
        
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glow-3d-red-cyan text-white text-xs font-black shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <Glasses className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>UNIVERSAL 3D FORMAT CONVERTER STUDIO (CHOOSE ANY GLASSES FORMAT)</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Convert <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-glow-cyan">ANY Video Link</span> into 3D
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Paste any link below. Choose your exact glasses format choice (Red/Cyan, RealD 3D, Green/Magenta, Amber/Blue, SBS, or Naked-Eye Cross-Eye)!
          </p>
        </div>

        {/* 21st.dev Style Form Container */}
        <form onSubmit={handleSubmit} className="glass-panel p-4 md:p-5 rounded-2xl border border-white/15 shadow-2xl space-y-4 text-left">
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="url"
                required
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste any YouTube video link, MP4 link, or movie stream URL..."
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono shadow-inner"
              />
            </div>

            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Movie Title (Optional)"
              className="sm:w-56 bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          {/* 3D Format Choice Pills */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-200 font-extrabold flex items-center gap-1.5">
                <Glasses className="w-4 h-4 text-cyan-400" />
                Select 3D Format Choice for Your Glasses:
              </span>
              <span className="text-[11px] text-cyan-400 font-mono font-bold">7 Modes Available</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'anaglyph', label: '🥽 Red / Cyan Anaglyph (PC Screens)' },
                { id: 'reald-interlaced', label: '🕶️ RealD 3D Polarized (Interlaced)' },
                { id: 'green-magenta', label: '🟣 Green / Magenta 3D' },
                { id: 'amber-blue', label: '🟡 Amber / Blue 3D' },
                { id: 'sbs', label: '📺 Side-by-Side (3D TV & VR)' },
                { id: 'top-bottom', label: '📽️ Top-Bottom (Over-Under)' },
                { id: 'crosseye', label: '👀 Cross-Eye (No Glasses Needed!)' }
              ].map(m => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMode3D(m.id)}
                  className={`px-3 py-2 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 ${
                    mode3D === m.id
                      ? 'glow-3d-red-cyan text-white shadow-lg scale-105 border-cyan-400'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Convert & Stream CTA Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-sm flex items-center justify-center gap-2.5 hover:scale-[1.01] transition-transform shadow-xl shadow-cyan-500/25 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Convert Video to Selected 3D Format & Stream Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
          <span className="flex items-center gap-1 text-cyan-300 font-medium">
            <Cpu className="w-3.5 h-3.5" /> Hardware Accelerated 60 FPS 3D Engine
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Naked-Eye Cross-Eye 3D Supported
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-purple-300 font-medium">
            <Monitor className="w-3.5 h-3.5" /> 4K Ultra HD Stream Retained
          </span>
        </div>

      </div>
    </div>
  );
}
