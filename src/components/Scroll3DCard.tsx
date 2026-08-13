"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface Scroll3DCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export default function Scroll3DCard({
  children,
  className = "",
  depth = 15,
}: Scroll3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Driven Entrance Perspective
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  const scrollRotateX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [15, 0, 0, -15]);
  const scrollTranslateZ = useTransform(smoothProgress, [0, 0.5, 1], [-40, 0, -40]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateY((x / rect.width) * depth);
    setRotateX((-y / rect.height) * depth);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        style={{
          rotateX: isHovered ? rotateX : scrollRotateX,
          rotateY,
          z: scrollTranslateZ,
          opacity,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`preserve-3d transition-shadow duration-300 h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
