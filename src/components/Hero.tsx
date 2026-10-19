"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import styles from "./Hero.module.css";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  // 3D scroll parallax: content recedes into depth as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, [videoSrc]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.video
          ref={videoRef}
          style={{ scale: videoScale }}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Gradients */}
      <div className="pointer-events-none absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] mix-blend-screen rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] mix-blend-screen rounded-full z-0" />

      {/* Content Container */}
      <motion.div
        style={{
          y: contentY,
          scale: contentScale,
          rotateX: contentRotateX,
          opacity: contentOpacity,
          transformPerspective: 1000,
        }}
        className={styles.content}
      >
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.eyebrow}
        >
          We build AI products and software
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.title}
        >
          <span className={styles.titleGradientText}>that scale.</span>
        </motion.h1>

        {/*
          The visible headline is intentionally short and brand-led. The
          descriptive tail that used to sit here in an `sr-only` span is gone:
          hiding keywords inside the H1 is a pattern search engines treat as
          deceptive, and it made the heading disagree with the text a reader
          actually sees. The subheadline below carries the description, and it
          is visible to everyone.
        */}

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={styles.description}
        >
          RECNOS is an engineering studio. We build AI agents and automation platforms, custom software, and the distributed systems behind them — from first prototype to production traffic.
        </motion.p>

        {/* CTA Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={styles.actions}
        >
          {/* Primary Button */}
          <Magnetic>
            <Link
              href="/contact"
              className={styles.primaryCta}
            >
              <span>Book an Engineering Call</span>
              <span className={styles.primaryIcon}>
                <ArrowRight size={20} aria-hidden="true" />
              </span>
            </Link>
          </Magnetic>

          {/* Secondary Button */}
          <Magnetic strength={0.25}>
            <Link
              href="/portfolio"
              className={styles.secondaryCta}
            >
              <span>View Our Work</span>
              <ArrowRight className={styles.secondaryIcon} size={16} aria-hidden="true" />
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
