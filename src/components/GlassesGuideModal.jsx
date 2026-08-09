import React, { useState, useRef, useEffect } from 'react';
import { X, Glasses, Tv, Monitor, Sliders, CheckCircle2, Sparkles, HelpCircle, Play, Check } from 'lucide-react';

export default function GlassesGuideModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('test'); // Default to 'test' tab so calibration opens immediately!
  const [testMode3D, setTestMode3D] = useState('reald-3d'); // 'reald-3d', 'anaglyph', 'sbs'
  const [testOffset, setTestOffset] = useState(14);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animFrameRef = useRef(null);
  const angleRef = useRef(0);

  // 60 FPS Procedural & Video RealD 3D Live Calibration Generator
  useEffect(() => {
    if (activeTab !== 'test') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width = 640;
    const height = canvas.height = 360;

    const render3DTestScene = () => {
      angleRef.current += 0.03;
      const angle = angleRef.current;
      const offset = Math.round(testOffset);

      // Create Offscreen Left & Right Eye Frames
      const createEyeFrame = (eyeShift) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = width;
        offCanvas.height = height;
        const oCtx = offCanvas.getContext('2d');

        // Dark Dystopian Cinema Background
        const grad = oCtx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 300);
        grad.addColorStop(0, '#0c192c');
        grad.addColorStop(1, '#020408');
        oCtx.fillStyle = grad;
        oCtx.fillRect(0, 0, width, height);

        // Animated Depth Grid Lines
        oCtx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        oCtx.lineWidth = 1;
        for (let i = -200; i < width + 200; i += 40) {
          oCtx.beginPath();
          oCtx.moveTo(i + eyeShift * 0.5, 0);
          oCtx.lineTo(i * 1.2 + eyeShift, height);
          oCtx.stroke();
        }

        // Draw 3D Rotating Central Sphere / Target Object
        const centerX = width / 2 + eyeShift * 2.5;
        const centerY = height / 2 + Math.sin(angle * 2) * 15;
        const sphereRadius = 45;

        // Outer Glow Ring
        oCtx.beginPath();
        oCtx.arc(centerX, centerY, sphereRadius + 15, 0, Math.PI * 2);
        oCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        oCtx.lineWidth = 3;
        oCtx.stroke();

        // Main 3D Sphere Body
        const sGrad = oCtx.createRadialGradient(
          centerX - 15 + eyeShift, centerY - 15, 5,
          centerX, centerY, sphereRadius
        );
        sGrad.addColorStop(0, '#00f0ff');
        sGrad.addColorStop(0.5, '#0077ff');
        sGrad.addColorStop(1, '#050c1a');
        oCtx.fillStyle = sGrad;
        oCtx.beginPath();
        oCtx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
        oCtx.fill();

        // Rotating Orbital 3D Ring
        const ringRx = (sphereRadius + 30) * Math.cos(angle);
        const ringRy = 15 * Math.sin(angle);
        oCtx.beginPath();
        oCtx.ellipse(centerX, centerY, Math.abs(ringRx) + 10, 20, angle * 0.5, 0, Math.PI * 2);
        oCtx.strokeStyle = '#ff0055';
        oCtx.lineWidth = 4;
        oCtx.stroke();

        // Floating 3D Text
        oCtx.fillStyle = '#ffffff';
        oCtx.font = '900 24px Outfit, sans-serif';
        oCtx.textAlign = 'center';
        oCtx.shadowColor = 'rgba(0, 240, 255, 0.8)';
        oCtx.shadowBlur = 10;
        oCtx.fillText('🕶️ REALD 3D CALIBRATION', centerX, centerY + 90);
        oCtx.font = '600 13px Outfit, sans-serif';
        oCtx.fillStyle = '#ffd700';
        oCtx.fillText('POP-OUT TEST OBJECT', centerX, centerY + 112);

        return offCanvas;
      };

      const leftCanvas = createEyeFrame(-offset / 2);
      const rightCanvas = createEyeFrame(offset / 2);

      if (testMode3D === 'reald-3d') {
        // RealD 3D Interlaced Line-by-Line Scanlines
        ctx.clearRect(0, 0, width, height);

        const leftImg = leftCanvas.getContext('2d').getImageData(0, 0, width, height);
        const rightImg = rightCanvas.getContext('2d').getImageData(0, 0, width, height);
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
      else if (testMode3D === 'anaglyph') {
        // Red/Cyan Anaglyph Pop-Out
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(leftCanvas, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = '#FF0055';
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(rightCanvas, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      } 
      else if (testMode3D === 'sbs') {
        // Side-by-Side Dual Viewport
        const halfW = width / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(leftCanvas, 0, 0, width, height, 0, 0, halfW, height);
        ctx.drawImage(rightCanvas, 0, 0, width, height, halfW, 0, halfW, height);
      }

      animFrameRef.current = requestAnimationFrame(render3DTestScene);
    };

    animFrameRef.current = requestAnimationFrame(render3DTestScene);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeTab, testMode3D, testOffset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden my-auto p-6 md:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl glow-3d-red-cyan">
            <Glasses className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              RealD 3D Live Calibration Test
            </h2>
            <p className="text-xs text-cyan-300">
              Calibrate your non-powered RealD 3D glasses with a live 60 FPS 3D motion scene before watching movies
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('test')}
            className={`py-2 rounded-lg font-bold transition-all ${
              activeTab === 'test'
                ? 'bg-cyan-500 text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎬 RealD 3D Live Sample Video Test
          </button>

          <button
            onClick={() => setActiveTab('reald')}
            className={`py-2 rounded-lg font-bold transition-all ${
              activeTab === 'reald'
                ? 'glow-3d-red-cyan text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🕶️ RealD 3D Setup Info
          </button>

          <button
            onClick={() => setActiveTab('anaglyph')}
            className={`py-2 rounded-lg font-bold transition-all ${
              activeTab === 'anaglyph'
                ? 'bg-purple-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🥽 Red/Cyan PC Screen Guide
          </button>
        </div>

        {/* Tab 1: Live 60 FPS RealD 3D Sample Motion Test */}
        {activeTab === 'test' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-200 font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                Live 60 FPS 3D Pop-Out Test Screen:
              </span>
              <div className="flex space-x-1.5">
                {[
                  { id: 'reald-3d', label: '🕶️ RealD 3D Interlaced' },
                  { id: 'anaglyph', label: '🥽 Red/Cyan Anaglyph' },
                  { id: 'sbs', label: '📺 Side-by-Side' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setTestMode3D(m.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      testMode3D === m.id
                        ? 'bg-cyan-500 text-black shadow'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live 3D Motion Canvas */}
            <div className="relative w-full h-64 rounded-xl bg-black border-2 border-cyan-500/50 overflow-hidden flex items-center justify-center shadow-2xl">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Focal Depth Slider */}
            <div className="max-w-md mx-auto space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="font-bold text-cyan-300">RealD 3D Focal Depth Separation:</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{testOffset}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={testOffset}
                onChange={(e) => setTestOffset(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-center text-amber-300 font-semibold">
                🕶️ Put on your 3D glasses now and adjust slider until the sphere pops out in 3D!
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: RealD 3D Setup */}
        {activeTab === 'reald' && (
          <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
              <h3 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> RealD 3D Passive Polarized Cinema Setup
              </h3>
              <p>
                RealD 3D glasses are non-powered passive glasses. They work by filtering circular polarized light. 
                On standard monitors, Muviz Watch uses <strong>Interlaced Scanline Shaders</strong> to separate Left and Right eye views!
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Anaglyph Setup */}
        {activeTab === 'anaglyph' && (
          <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Standard PC Screen & Red/Cyan Glasses Setup
              </h3>
              <p>
                If your PC monitor emits standard 2D RGB light, select <strong>Red/Cyan Anaglyph 3D</strong> for instant dramatic 3D pop-out depth!
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg"
          >
            Calibration Complete • Start Streaming RealD 3D
          </button>
        </div>

      </div>
    </div>
  );
}
