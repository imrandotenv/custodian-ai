"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string; // Container styling (overflow-hidden is enforced)
  imageClassName?: string; // Inner img styling
  parallaxRange?: [string, string]; // Default: ["-10%", "10%"]
  scale?: number; // Oversize factor to avoid clipping empty space (default: 1.2)
  dataCursor?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  parallaxRange = ["-10%", "10%"],
  scale = 1.2,
  dataCursor = "view",
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position from when image enters viewport to when it departs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth translation across the designated parallax offset window
  const rawY = useTransform(scrollYProgress, [0, 1], parallaxRange);

  // Relaxed, fluid spring physics for an organic museum-gallery reveal
  const smoothY = useSpring(rawY, {
    damping: 30,
    stiffness: 90,
    mass: 0.2,
  });

  return (
    <div
      ref={containerRef}
      data-cursor={dataCursor}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y: smoothY,
          scale: scale,
        }}
        className={`w-full h-full object-cover object-center select-none will-change-transform ${imageClassName}`}
      />
      {children}
    </div>
  );
}
