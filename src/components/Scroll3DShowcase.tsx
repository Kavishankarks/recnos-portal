"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Sparkles, Terminal, Cpu, Play, CheckCircle, ShieldCheck, Zap } from "lucide-react";

export default function Scroll3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth springs for 3D rotation & scale on scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform 3D values based on scroll
  const rotateX = useTransform(smoothProgress, [0, 0.45], [28, 0]);
  const scale = useTransform(smoothProgress, [0, 0.45], [0.88, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.25], [0.4, 1]);
  const translateY = useTransform(smoothProgress, [0, 0.45], [40, 0]);

  // Interactive Mouse 3D Tilt State
  const [rotateYMouse, setRotateYMouse] = useState(0);
  const [rotateXMouse, setRotateXMouse] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateYMouse((x / rect.width) * 12);
    setRotateXMouse((-y / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    setRotateYMouse(0);
    setRotateXMouse(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto py-12 px-4 perspective-2000"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          y: translateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateY: rotateYMouse,
          rotateX: rotateXMouse ? rotateXMouse : undefined,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-3d-card relative overflow-hidden rounded-3xl border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(48,84,255,0.25)] preserve-3d"
      >
        {/* Glow light accent overlays inside the 3D card */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 bg-[#3054ff]/30 blur-[100px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 bg-[#b4c0ff]/20 blur-[100px] rounded-full" />

        {/* Header bar of mock dashboard */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-white/50 pl-3 border-l border-white/10 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#3054ff]" />
              recnos-neural-engine://v2.4.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Neural Pipeline
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#3054ff]/20 text-[#b4c0ff] border border-[#3054ff]/30">
              <Zap className="w-3 h-3" /> 1.2s Build Time
            </span>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 relative z-10">
          {/* Left panel: Prompt & Code Generator View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-black/60 rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-[#3054ff]" /> Prompt Input
                </span>
                <span className="text-white/40">AI Model: Gemini 3.6 Pro</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3.5 text-sm font-mono text-white/90 border border-white/5">
                <span className="text-[#3054ff]">&gt;</span> Generate enterprise SaaS platform with HLS video streaming, dark mode aesthetics, dynamic 3D scroll physics, and instant SEO deployment.
              </div>
            </div>

            {/* Code Output Terminal Mockup */}
            <div className="bg-[#050814] rounded-2xl p-5 border border-white/10 font-mono text-xs text-white/70 space-y-2.5 overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-white/40">
                <span>Output Code Preview</span>
                <span>TypeScript / React 19</span>
              </div>
              <p className="text-blue-400">import <span className="text-white">{"{ Motion, Scroll3D }"}</span> from <span className="text-emerald-300">&apos;@recnos/neural-engine&apos;</span>;</p>
              <p className="text-purple-400">export default function <span className="text-yellow-300">Application</span>() {"{"}</p>
              <p className="pl-4 text-white/80">return (</p>
              <p className="pl-8 text-emerald-400">&lt;<span className="text-blue-400">Scroll3DScene</span> <span className="text-white/60">physics</span>=<span className="text-amber-300">&quot;high-perf&quot;</span> /&gt;</p>
              <p className="pl-4 text-white/80">);</p>
              <p className="text-purple-400">{"}"}</p>
            </div>
          </div>

          {/* Right panel: Realtime Metrics & Status Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#3054ff]/20 to-black/60 rounded-2xl p-5 border border-[#3054ff]/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#3054ff]" /> Engine Throughput
                </span>
                <span className="text-xs font-bold text-[#b4c0ff]">99.98%</span>
              </div>
              <div className="text-3xl font-bold font-instrument-serif text-white">
                450,000+ <span className="text-xs font-sans text-white/60">req / sec</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#3054ff] to-[#b4c0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                <div className="text-xs text-white/50 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Security
                </div>
                <div className="text-base font-semibold text-white">SOC2 Compliant</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                <div className="text-xs text-white/50 mb-1 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-[#3054ff]" /> Latency
                </div>
                <div className="text-base font-semibold text-white">&lt; 14ms Global</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> WebGL & GPU Accelerated
              </span>
              <span className="text-[#b4c0ff] font-semibold">Ready</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
