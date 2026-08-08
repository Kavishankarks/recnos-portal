"use client";

import { motion } from "motion/react";

interface RevealHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * Heading whose words rise out of 3D depth one after another when it
 * scrolls into view.
 */
export default function RevealHeading({
  text,
  className = "",
  as: Tag = "h2",
}: RevealHeadingProps) {
  const words = text.split(" ");

  return (
    <Tag className={`perspective-1000 ${className}`}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="preserve-3d inline-block"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              variants={{
                hidden: { y: "110%", rotateX: -55, opacity: 0 },
                show: { y: "0%", rotateX: 0, opacity: 1 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block preserve-3d will-change-transform"
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
