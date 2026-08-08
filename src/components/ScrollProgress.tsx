"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar at the very top of the viewport tracking page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#3054ff] via-[#7a8fff] to-[#b4c0ff] shadow-[0_0_12px_rgba(48,84,255,0.8)]"
    />
  );
}
