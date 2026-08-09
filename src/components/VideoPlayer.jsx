import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  Glasses, Film, Globe, Check, SkipForward, SkipBack,
  Sparkles, ShieldCheck, Eye, Link, Sliders, Info, HelpCircle
} from 'lucide-react';
import { parseSmartStreamUrl } from './ConverterHero';

export const ALL_3D_FORMAT_CHOICES = [
  { id: 'reald-interlaced', label: '🕶️ RealD 3D Polarized (Interlaced Scanlines)', desc: 'For RealD 3D Theater Glasses on 3D Displays' },
  { id: 'anaglyph', label: '🥽 Red / Cyan Anaglyph (Instant PC Pop-Out)', desc: 'Works on EVERY standard computer screen & laptop' },
  { id: 'green-magenta', label: '🟣 Green / Magenta (TriOviz 3D)', desc: 'For Green/Magenta 3D glasses' },
  { id: 'amber-blue', label: '🟡 Amber / Blue (ColorCode 3D)', desc: 'For Amber/Blue 3D glasses' },
  { id: 'sbs', label: '📺 Side-by-Side (SBS 3D TV & VR)', desc: 'For 3D TVs, VR Headsets & Google Cardboard' },
  { id: 'top-bottom', label: '📽️ Top-Bottom (Over-Under 3D)', desc: 'For 3D Projectors & 3D TVs' },
  { id: 'crosseye', label: '👀 Cross-Eye 3D (No Glasses Needed!)', desc: 'Cross your eyes slightly to see instant 3D depth with naked eyes' },
  { id: '2d', label: 'Standard 2D HD (Flat View)', desc: 'Standard 2D high-definition playback' }
];

export default function VideoPlayer({ movie, onClose, initialMode = "movie", initial3DMode = "anaglyph" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [quality, setQuality] = useState("4K Ultra HD 3D");
  
  // Custom video URL input
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Movie vs Trailer mode
  const [playMode, setPlayMode] = useState(initialMode);
  
  // 3D Format Choice State
  const [mode3D, setMode3D] = useState(initial3DMode || "anaglyph");
  const [stereoOffset, setStereoOffset] = useState(12);
  
  // Audio & Subtitle States
  const [audioLang, setAudioLang] = useState(movie.languages[0] || "English");
  const [subtitleLang, setSubtitleLang] = useState("English");

  // Intro & Help State
  const [showIntroSlate, setShowIntroSlate] = useState(true);
  const [showGlassesHelp, setShowGlassesHelp] = useState(false);
  
  // Menus
  const [show3DMenu, setShow3DMenu] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Dynamic Stream Source Calculation
  const getActiveStreamUrl = () => {
    if (customInputUrl.trim()) {
      const parsed = parseSmartStreamUrl(customInputUrl);
      return parsed.streamUrl;
    }
    return playMode === 'trailer' ? movie.trailerUrl : (movie.embedUrl || movie.videoUrl);
  };

  const activeStreamUrl = getActiveStreamUrl();
  const backupVideoUrl = movie.backupVideoUrl || "https://vjs.zencdn.net/v/oceans.mp4";

  // Detect if stream is YouTube/Vimeo embed
  const isEmbedStream = activeStreamUrl.includes('youtube.com') || activeStreamUrl.includes('vimeo.com');

  useEffect(() => {
    setShowIntroSlate(true);
  }, [playMode, movie, customInputUrl]);

  useEffect(() => {
    if (!showIntroSlate) return;
    const timer = setTimeout(() => {
      setShowIntroSlate(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showIntroSlate, playMode, movie]);

  // Real-time Universal 3D Format Canvas Shader Engine
  useEffect(() => {
    if (isEmbedStream) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || mode3D === '2d') return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const renderFrame = () => {
      if (video.paused || video.ended || video.readyState < 2) {
        animFrameIdRef.current = requestAnimationFrame(renderFrame);
        return;
      }

      const width = canvas.width = video.videoWidth || 1280;
      const height = canvas.height = video.videoHeight || 720;
      const offset = Math.round(stereoOffset);

      try {
        if (mode3D === 'anaglyph') {
          // Red / Cyan Anaglyph
          ctx.clearRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(video, -offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#FF0055';
          ctx.fillRect(0, 0, width, height);

          ctx.globalCompositeOperation = 'lighter';
          ctx.drawImage(video, offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#00F0FF';
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
        }
        else if (mode3D === 'green-magenta') {
          // Green / Magenta Anaglyph
          ctx.clearRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(video, -offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#00FF44';
          ctx.fillRect(0, 0, width, height);

          ctx.globalCompositeOperation = 'lighter';
          ctx.drawImage(video, offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#FF00FF';
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
        }
        else if (mode3D === 'amber-blue') {
          // Amber / Blue ColorCode 3D
          ctx.clearRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(video, -offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#FFBB00';
          ctx.fillRect(0, 0, width, height);

          ctx.globalCompositeOperation = 'lighter';
          ctx.drawImage(video, offset, 0, width, height);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#0066FF';
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
        }
        else if (mode3D === 'reald-interlaced') {
          // Interlaced Scanlines for RealD 3D Displays
          ctx.clearRect(0, 0, width, height);
          
          ctx.drawImage(video, -offset / 2, 0, width, height);
          const leftImg = ctx.getImageData(0, 0, width, height);

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(video, offset / 2, 0, width, height);
          const rightImg = ctx.getImageData(0, 0, width, height);

          const outputImg = ctx.createImageData(width, height);
          const lData = leftImg.data;
          const rData = rightImg.data;
          const oData = outputImg.data;

          for (let y = 0; y < height; y++) {
            const isEvenLine = y % 2 === 0;
            const src = isEvenLine ? lData : rData;
            const rowOffset = y * width * 4;

            for (let x = 0; x < width * 4; x += 4) {
              const idx = rowOffset + x;
              oData[idx] = src[idx];
              oData[idx + 1] = src[idx + 1];
              oData[idx + 2] = src[idx + 2];
              oData[idx + 3] = 255;
            }
          }
          ctx.putImageData(outputImg, 0, 0);
        }
        else if (mode3D === 'sbs') {
          // Side-by-Side Split View
          const halfW = width / 2;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(video, 0, 0, width, height, 0, 0, halfW - offset, height);
          ctx.drawImage(video, 0, 0, width, height, halfW + offset, 0, halfW - offset, height);
        }
        else if (mode3D === 'crosseye') {
          // Cross-Eye 3D (Right Eye Left, Left Eye Right)
          const halfW = width / 2;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(video, 0, 0, width, height, halfW + offset, 0, halfW - offset, height);
          ctx.drawImage(video, 0, 0, width, height, 0, 0, halfW - offset, height);
        } 
        else if (mode3D === 'top-bottom') {
          // Top-Bottom Split View
          const halfH = height / 2;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(video, 0, 0, width, height, 0, 0, width, halfH - offset);
          ctx.drawImage(video, 0, 0, width, height, 0, halfH + offset, width, halfH - offset);
        }
      } catch (err) {
        ctx.drawImage(video, 0, 0, width, height);
      }

      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isEmbedStream, mode3D, stereoOffset, activeStreamUrl]);

  // CSS 3D Stereo Style for Embed Streams
  const getEmbed3DFilterStyle = () => {
    if (mode3D === 'anaglyph') {
      return {
        filter: `drop-shadow(-${stereoOffset}px 0 0 rgba(255, 0, 85, 0.85)) drop-shadow(${stereoOffset}px 0 0 rgba(0, 240, 255, 0.85))`
      };
    }
    return {};
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden transition-all duration-300 p-2 md:p-6"
    >
      {/* Dynamic Ambilight Background */}
      <div 
        className="ambilight-glow"
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          backgroundSize: 'cover'
        }}
      />

      {/* Intro Bumper */}
      {showIntroSlate && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-4 p-6">
          <div className="p-4 rounded-3xl glow-3d-red-cyan animate-pulse">
            <Glasses className="w-14 h-14 text-cyan-400" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">
              UNIVERSAL 3D FORMAT SELECTION ACTIVE
            </p>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {movie.title}
            </h1>
            <p className="text-xs text-amber-300 font-bold">
              Choose your exact 3D glasses format from the toolbar below!
            </p>
          </div>
          <button
            onClick={() => setShowIntroSlate(false)}
            className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur"
          >
            Skip Intro ⏭️
          </button>
        </div>
      )}

      {/* Top Title Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/95 via-black/60 to-transparent">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur font-bold"
            title="Close Player"
          >
            ✕
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base md:text-xl font-extrabold text-white tracking-wide">{movie.title}</h2>
              <span className="px-2.5 py-0.5 text-xs font-black rounded glow-3d-red-cyan text-white flex items-center gap-1">
                <Glasses className="w-4 h-4 text-cyan-300" />
                FORMAT: {mode3D.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
              <span>{movie.year}</span> • <span>{movie.duration}</span> • <span className="text-cyan-400 font-semibold">{movie.platform}</span>
            </p>
          </div>
        </div>

        {/* 3D Depth Slider & Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-xl border border-white/20 text-xs">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-300 font-bold">3D Separation:</span>
            <input
              type="range"
              min="0"
              max="30"
              value={stereoOffset}
              onChange={(e) => setStereoOffset(parseInt(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 font-mono font-bold">{stereoOffset}px</span>
          </div>

          <button
            onClick={() => setShowGlassesHelp(!showGlassesHelp)}
            className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-500/40"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Glasses Choice Guide
          </button>

          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5 border border-cyan-500/40"
          >
            <Link className="w-3.5 h-3.5" />
            Paste Any Link
          </button>
        </div>
      </div>

      {/* Glasses Choice Guide */}
      {showGlassesHelp && (
        <div className="relative z-40 max-w-3xl mx-auto w-full glass-panel p-4 rounded-xl border border-amber-500/40 shadow-2xl text-xs space-y-3 mb-2">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
              <Glasses className="w-4.5 h-4.5" /> Select the Exact 3D Format for Your Glasses:
            </span>
            <button onClick={() => setShowGlassesHelp(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
            <button
              onClick={() => { setMode3D('anaglyph'); setShowGlassesHelp(false); }}
              className="p-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-left space-y-0.5"
            >
              <span className="font-extrabold text-cyan-300 block">🥽 Red / Cyan Anaglyph (Standard Screens)</span>
              <span className="text-[11px] text-gray-400">Best for viewing 3D pop-out on standard PC monitors & laptops.</span>
            </button>

            <button
              onClick={() => { setMode3D('sbs'); setShowGlassesHelp(false); }}
              className="p-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left space-y-0.5"
            >
              <span className="font-extrabold text-purple-300 block">📺 Side-by-Side SBS (3D TVs & RealD Glasses)</span>
              <span className="text-[11px] text-gray-400">Best for 3D TVs & Passive Polarized displays with RealD glasses.</span>
            </button>

            <button
              onClick={() => { setMode3D('reald-interlaced'); setShowGlassesHelp(false); }}
              className="p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-left space-y-0.5"
            >
              <span className="font-extrabold text-blue-300 block">🕶️ Interlaced Line-by-Line (3D Monitors)</span>
              <span className="text-[11px] text-gray-400">Scanline interlacing for passive polarized 3D PC monitors.</span>
            </button>

            <button
              onClick={() => { setMode3D('crosseye'); setShowGlassesHelp(false); }}
              className="p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left space-y-0.5"
            >
              <span className="font-extrabold text-amber-300 block">👀 Cross-Eye 3D (No Glasses Needed!)</span>
              <span className="text-[11px] text-gray-400">Allows viewing 3D depth with naked eyes by crossing eyes slightly.</span>
            </button>
          </div>
        </div>
      )}

      {/* Custom Stream URL Drawer */}
      {showCustomInput && (
        <div className="relative z-30 max-w-2xl mx-auto w-full glass-panel p-3 rounded-xl border border-cyan-500/40 flex items-center gap-2 mb-2">
          <Link className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <input
            type="url"
            value={customInputUrl}
            onChange={(e) => setCustomInputUrl(e.target.value)}
            placeholder="Paste any YouTube link, MP4 link, or movie stream URL..."
            className="flex-1 bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
          />
          {customInputUrl && (
            <button onClick={() => setCustomInputUrl('')} className="text-xs text-gray-400 hover:text-white">
              Clear
            </button>
          )}
        </div>
      )}

      {/* Main Screen: Render 3D Canvas */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden z-10 my-auto w-full max-w-6xl mx-auto rounded-2xl shadow-2xl border border-white/10 bg-black">
        
        {isEmbedStream ? (
          <div 
            className={`w-full h-full min-h-[60vh] transition-all ${
              mode3D === 'sbs' || mode3D === 'crosseye' ? 'grid grid-cols-2 gap-2' : ''
            }`}
            style={getEmbed3DFilterStyle()}
          >
            <iframe
              src={activeStreamUrl}
              title={`${movie.title} Stream`}
              className="w-full h-full min-h-[60vh] rounded-xl border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {(mode3D === 'sbs' || mode3D === 'crosseye') && (
              <iframe
                src={activeStreamUrl}
                title={`${movie.title} Stream Right Eye`}
                className="w-full h-full min-h-[60vh] rounded-xl border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              key={activeStreamUrl}
              controls
              autoPlay
              playsInline
              crossOrigin="anonymous"
              className={mode3D === '2d' ? "w-full h-full object-contain max-h-[75vh] rounded-xl" : "hidden"}
            >
              <source src={activeStreamUrl} type="video/mp4" />
              <source src={backupVideoUrl} type="video/mp4" />
            </video>

            {mode3D !== '2d' && (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain max-h-[75vh] rounded-xl border border-cyan-500/40 shadow-2xl"
              />
            )}
          </div>
        )}

        {/* Universal 3D Format Choice Selector Menu */}
        {show3DMenu && (
          <div className="absolute right-6 top-6 z-40 w-96 glass-panel p-4 rounded-xl border border-cyan-500/40 shadow-2xl text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Glasses className="w-4 h-4" /> Pick Your Glasses Format Choice:
              </span>
              <button onClick={() => setShow3DMenu(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {ALL_3D_FORMAT_CHOICES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode3D(m.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex flex-col justify-between transition-all ${
                    mode3D === m.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{m.label}</span>
                    {mode3D === m.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5">{m.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex justify-between text-[11px] text-gray-300">
                <span>3D Parallax Separation:</span>
                <span className="text-cyan-400 font-mono font-bold">{stereoOffset}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={stereoOffset}
                onChange={(e) => setStereoOffset(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="relative z-20 max-w-6xl mx-auto w-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 rounded-b-xl flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Glasses className="w-4 h-4" /> 3D Format Active: {mode3D.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShow3DMenu(!show3DMenu)}
            className="px-4 py-1.5 rounded-xl text-xs font-extrabold glow-3d-red-cyan text-white shadow-lg flex items-center gap-1.5"
          >
            <Glasses className="w-4 h-4 text-cyan-300" />
            <span>Change 3D Format ({mode3D.toUpperCase()})</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
