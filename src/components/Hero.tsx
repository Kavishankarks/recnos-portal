"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

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
    <section className={styles.hero}>
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
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
      <div className={styles.content}>
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.eyebrow}
        >
          Engineering the Future with
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.title}
        >
          <span className={styles.aiHighlight}>AI</span>{" "}
          <span className={styles.titleGradientText}>+ Scalable Software</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={styles.description}
        >
          RECNOS is your end-to-end engineering partner for AI foundation models, distributed systems, and enterprise-grade digital solutions.
        </motion.p>

        {/* CTA Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={styles.actions}
        >
          {/* Primary Button */}
          <Link
            href="/#contact"
            className={styles.primaryCta}
          >
            <span>Get Started</span>
            <span className={styles.primaryIcon}>
              <ArrowRight size={20} aria-hidden="true" />
            </span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/#services"
            className={styles.secondaryCta}
          >
            <span>Explore Services</span>
            <ArrowRight className={styles.secondaryIcon} size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
