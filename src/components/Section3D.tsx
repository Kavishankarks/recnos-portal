"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface Section3DProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees as the section enters/leaves the viewport */
  tilt?: number;
  /** How far (px) the section sits "behind" the screen before settling */
  depth?: number;
}

/**
 * Wraps a full section in a scroll-driven 3D transform: it tilts up out of
 * the depth as it scrolls into view, sits flat while centered, then recedes
 * as it leaves — like panels rotating on a stage.
 */
export default function Section3D({
  children,
  className = "",
  tilt = 8,
  depth = 120,
}: Section3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const rotateX = useTransform(smooth, [0, 0.35, 0.65, 1], [tilt, 0, 0, -tilt]);
  const z = useTransform(smooth, [0, 0.35, 0.65, 1], [-depth, 0, 0, -depth]);
  const opacity = useTransform(smooth, [0, 0.2, 0.85, 1], [0.35, 1, 1, 0.35]);
  const scale = useTransform(smooth, [0, 0.35, 0.65, 1], [0.96, 1, 1, 0.96]);

  return (
    <div ref={ref} className="perspective-2000">
      <motion.div
        style={{ rotateX, z, opacity, scale }}
        className={`preserve-3d ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
