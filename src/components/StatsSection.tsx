"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 99.9, suffix: "%", label: "Uptime Across Deployments", decimals: 1 },
  { value: 12, suffix: "+", label: "Industries Served" },
  { value: 24, suffix: "/7", label: "Engineering Support" },
];

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/** Count-up stats strip with a scroll-parallax gradient sweep behind it. */
export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sweepX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <motion.div
        style={{ x: sweepX }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3054ff]/10 blur-[130px]"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40, rotateX: 30, scale: 0.92 },
              show: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="perspective-1000"
          >
            <div className="glass-card flex h-full flex-col items-center justify-center gap-2 rounded-2xl px-4 py-8 text-center">
              <div className="font-instrument-serif text-4xl text-white sm:text-5xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="font-instrument-sans text-xs text-white/55 sm:text-sm">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
