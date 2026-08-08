"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { Eye, Rocket, Brain, Infinity as InfinityIcon } from "lucide-react";
import Scroll3DCard from "./Scroll3DCard";

const visionStatement =
  "We envision a world where intelligent software amplifies every human ambition — building the AI foundations, resilient systems, and digital experiences that power the next generation of enterprises.";

const pillars = [
  {
    icon: Brain,
    title: "Intelligence Everywhere",
    description:
      "Embedding AI into the core of every product we engineer, not bolted on as an afterthought.",
  },
  {
    icon: Rocket,
    title: "Built to Scale",
    description:
      "Architectures designed for millions of users from day one — distributed, fault-tolerant, fast.",
  },
  {
    icon: InfinityIcon,
    title: "Lasting Partnership",
    description:
      "From first prototype to global rollout, we grow with our clients as a long-term engineering ally.",
  },
];

function VisionWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);
  const rotateX = useTransform(progress, [start, end], [40, 0]);
  const z = useTransform(progress, [start, end], [-60, 0]);

  return (
    <motion.span
      style={{ opacity, y, rotateX, z }}
      className="inline-block preserve-3d will-change-transform"
    >
      {word}&nbsp;
    </motion.span>
  );
}

export default function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Word-by-word reveal driven by scroll through the text block
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "start 0.35"],
  });
  const smoothText = useSpring(textProgress, { stiffness: 120, damping: 24 });

  // Parallax layers for the decorative geometry
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(sectionProgress, [0, 1], [140, -140]);
  const ringRotate = useTransform(sectionProgress, [0, 1], [0, 200]);
  const glowScale = useTransform(sectionProgress, [0, 0.5, 1], [0.7, 1.15, 0.7]);
  const badgeZ = useTransform(sectionProgress, [0, 0.5, 1], [-80, 40, -80]);

  const words = visionStatement.split(" ");

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:py-40"
    >
      {/* Parallax decorative layers */}
      <div className="pointer-events-none absolute inset-0 z-0 perspective-2000">
        <motion.div
          style={{ y: ringY, rotateZ: ringRotate }}
          className="absolute top-[10%] right-[6%] h-56 w-56 rounded-full border-[14px] border-[#3054ff]/15 blur-[1px] shadow-[0_0_80px_rgba(48,84,255,0.25)]"
        />
        <motion.div
          style={{ scale: glowScale }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3054ff]/15 blur-[160px]"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          style={{ z: badgeZ }}
          className="preserve-3d mb-10 flex justify-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#3054ff]/25 bg-[#3054ff]/10 px-4 py-1.5 text-xs font-medium text-[#b4c0ff]"
          >
            <Eye className="h-3.5 w-3.5" /> Our Vision
          </motion.span>
        </motion.div>

        {/* Scroll-driven word-by-word 3D reveal */}
        <div ref={textRef} className="perspective-1000">
          <p className="preserve-3d text-center font-instrument-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.3] text-white">
            {words.map((word, i) => (
              <VisionWord
                key={i}
                word={word}
                index={i}
                total={words.length}
                progress={smoothText}
              />
            ))}
          </p>
        </div>

        {/* Vision pillars */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-3 sm:gap-6"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: 25 },
                  show: { opacity: 1, y: 0, rotateX: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="perspective-1000"
              >
                <Scroll3DCard depth={14}>
                  <div className="glass-card h-full min-h-[200px] space-y-3 rounded-2xl p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3054ff]/20 bg-[#3054ff]/10 text-[#3054ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-instrument-sans text-lg font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="font-instrument-sans text-xs leading-relaxed text-white/60">
                      {pillar.description}
                    </p>
                  </div>
                </Scroll3DCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
