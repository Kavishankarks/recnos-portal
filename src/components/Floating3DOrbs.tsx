"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function Floating3DOrbs() {
  const { scrollY } = useScroll();

  // Multi-layered 3D scroll parallax transforms
  const yOrb1 = useTransform(scrollY, [0, 2000], [0, -350]);
  const yOrb2 = useTransform(scrollY, [0, 2000], [0, 400]);
  const rotateOrb1 = useTransform(scrollY, [0, 2000], [0, 360]);
  const rotateOrb2 = useTransform(scrollY, [0, 2000], [0, -280]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* 3D Floating Geometry 1: Spinning Metallic Ring */}
      <motion.div
        style={{ y: yOrb1, rotateZ: rotateOrb1 }}
        className="absolute top-[15%] left-[3%] w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[12px] border-[#3054ff]/20 blur-[1px] shadow-[0_0_60px_rgba(48,84,255,0.3)] preserve-3d rotate-45"
      />

      {/* 3D Floating Geometry 2: Counter-rotating Glass Square Ring */}
      <motion.div
        style={{ y: yOrb2, rotateZ: rotateOrb2 }}
        className="absolute top-[50%] right-[4%] w-40 h-40 sm:w-56 sm:h-56 rounded-3xl border-[10px] border-[#b4c0ff]/15 blur-[1px] shadow-[0_0_50px_rgba(180,192,255,0.2)] preserve-3d -rotate-12"
      />

      {/* Ambient 3D Light Glow Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[75%] left-[8%] w-72 h-72 bg-gradient-to-tr from-[#3054ff]/30 to-indigo-600/10 rounded-full blur-[120px]"
      />
    </div>
  );
}
