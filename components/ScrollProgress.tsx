"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  // SVG Geometry for Circle (Radius: 20, Circumference ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  // Map scroll progress to SVG strokeDashoffset (Clockwise fill from 12 o'clock)
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  // Update dynamic integer percentage text without unnecessary renders
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercent(Math.round(latest * 100));
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      data-cursor="explore"
      data-cursor-text="TOP"
      aria-label={`Scroll progress: ${percent}%. Click to scroll to top.`}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#F9F6F0]/90 backdrop-blur-md border border-[#C25934]/20 shadow-md flex items-center justify-center cursor-pointer select-none group focus:outline-none"
    >
      {/* Circular SVG Scroll Meter */}
      <svg
        className="absolute inset-0 w-full h-full p-1 pointer-events-none"
        viewBox="0 0 50 50"
      >
        {/* Base Track: Charcoal (#1A1A1A) at 10% Opacity */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.10"
          strokeWidth="2.5"
        />

        {/* Fill Track: Terracotta (#C25934) with Dynamic Dashoffset */}
        <motion.circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#C25934"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          transform="rotate(-90 25 25)"
        />
      </svg>

      {/* Tiny Dynamic Percentage Display in Inter Font */}
      <span className="font-sans text-[10px] font-bold text-[#1A1A1A] tabular-nums tracking-tighter leading-none group-hover:text-[#C25934] transition-colors">
        {percent}%
      </span>
    </motion.button>
  );
}
