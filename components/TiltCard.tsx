"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  maxRotation?: number; // Maximum rotation in degrees (default: 8)
  perspective?: number; // Perspective distance in px (default: 1000)
  maxGlareOpacity?: number; // Glare maximum opacity (default: 0.22)
  scaleOnHover?: number; // Subtle scale factor on hover (default: 1.02)
  dataCursor?: string;
}

export default function TiltCard({
  children,
  className = "",
  innerClassName = "",
  maxRotation = 8,
  perspective = 1000,
  maxGlareOpacity = 0.22,
  scaleOnHover = 1.02,
  dataCursor,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates relative to center (-0.5 to 0.5)
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  const rawGlare = useMotionValue(0);
  const rawScale = useMotionValue(1);

  // Responsive, fluid spring physics for an organic physical feel
  const springConfig = { damping: 22, stiffness: 240, mass: 0.12 };
  const smoothX = useSpring(xPct, springConfig);
  const smoothY = useSpring(yPct, springConfig);
  const glareOpacity = useSpring(rawGlare, { damping: 20, stiffness: 200 });
  const scale = useSpring(rawScale, { damping: 20, stiffness: 260 });

  // Rotate on X axis (driven by vertical mouse displacement)
  // Mouse up (yPct < 0) -> tilt up (rotateX > 0)
  // Mouse down (yPct > 0) -> tilt down (rotateX < 0)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxRotation, -maxRotation]);

  // Rotate on Y axis (driven by horizontal mouse displacement)
  // Mouse left (xPct < 0) -> tilt left (rotateY < 0)
  // Mouse right (xPct > 0) -> tilt right (rotateY > 0)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Glare moves across the surface opposite to the mouse position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["85%", "15%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["85%", "15%"]);

  // Hardware-accelerated radial glare template
  const glareBackground = useMotionTemplate`radial-gradient(circle 420px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    // Calculate mouse position relative to container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to [-0.5, 0.5]
    const xPctVal = mouseX / width - 0.5;
    const yPctVal = mouseY / height - 0.5;

    xPct.set(xPctVal);
    yPct.set(yPctVal);
    rawGlare.set(maxGlareOpacity);
    rawScale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    xPct.set(0);
    yPct.set(0);
    rawGlare.set(0);
    rawScale.set(1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      style={{
        perspective: `${perspective}px`,
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full will-change-transform ${innerClassName}`}
      >
        {children}

        {/* Dynamic 3D Glare Light Reflection Sheen (Opposite to Mouse) */}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay z-30"
        />
      </motion.div>
    </div>
  );
}
