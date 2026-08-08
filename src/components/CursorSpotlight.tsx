"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft radial glow that trails the cursor, lighting up the dark page
 * around the pointer. Pointer-events none, screen-blended, desktop only.
 */
export default function CursorSpotlight() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[600px] w-[600px] rounded-full mix-blend-screen md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(48,84,255,0.14)_0%,rgba(48,84,255,0.05)_40%,transparent_70%)]" />
    </motion.div>
  );
}
