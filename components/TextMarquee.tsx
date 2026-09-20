"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TextMarqueeProps {
  text?: string;
  speed?: number; // Animation duration in seconds (higher = slower & more elegant)
  className?: string;
}

const DEFAULT_MARQUEE_ITEMS = [
  "CULTURE ON ITS OWN TERMS",
  "✦",
  "SANTHALI HERITAGE",
  "✦",
  "DIGITAL SOVEREIGNTY",
  "✦",
];

export default function TextMarquee({
  speed = 32,
  className = "",
}: TextMarqueeProps) {
  // Build cohesive repeating segment
  const marqueePhrase = DEFAULT_MARQUEE_ITEMS.join("  ") + "  ";

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden py-8 sm:py-16 md:py-24 bg-[#F9F6F0] border-y border-[#C25934]/15 select-none ${className}`}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex whitespace-nowrap w-fit will-change-transform"
      >
        {/* First Half (Cycles through 0% to -50%) */}
        <div className="flex shrink-0 items-center">
          <span
            className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase whitespace-nowrap pr-8 text-stroke-terracotta"
            style={{
              WebkitTextStroke: "1.2px #C25934",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {marqueePhrase} {marqueePhrase}
          </span>
        </div>

        {/* Second Identical Half for 100% Seamless Infinite Repeat */}
        <div className="flex shrink-0 items-center">
          <span
            className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase whitespace-nowrap pr-8 text-stroke-terracotta"
            style={{
              WebkitTextStroke: "1.2px #C25934",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {marqueePhrase} {marqueePhrase}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
