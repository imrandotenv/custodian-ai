"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
}

export default function RevealText({
  text,
  className = "",
  delay = 0,
  stagger,
  once = true,
  as = "p",
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, amount: 0.15 });

  // Split text into individual words while preserving whitespace
  const words = text ? text.trim().split(/\s+/) : [];

  // Adapt stagger timing to paragraph length for snappy yet organic pacing
  const calculatedStagger =
    stagger !== undefined
      ? stagger
      : Math.min(0.04, Math.max(0.015, 1.1 / Math.max(words.length, 1)));

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: calculatedStagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1], // Custom aggressive snappy cubic-bezier curve
      },
    },
  };

  const Component = motion[as as keyof typeof motion] as typeof motion.p;

  return (
    <Component
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden mr-[0.28em] align-top py-[0.05em]"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
