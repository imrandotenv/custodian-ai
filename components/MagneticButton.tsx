"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Factor by which button pulls towards cursor (default: 0.35)
  parallaxStrength?: number; // Factor by which text lags behind button background (default: 0.35)
  dataCursor?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  parallaxStrength = 0.35,
  dataCursor = "explore",
  disabled = false,
  onClick,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse coordinates relative to button center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Snappy, organic spring physics for the button body
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  // Parallax: inner text moves slightly less than button background (lagging counter-shift)
  const textX = useTransform(buttonX, (v) => -v * parallaxStrength);
  const textY = useTransform(buttonY, (v) => -v * parallaxStrength);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX * strength);
    mouseY.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isFullWidth = className.includes("w-full");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center p-2.5 -m-2.5 ${
        isFullWidth ? "w-full" : "w-fit"
      }`}
    >
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        data-cursor={dataCursor}
        style={{
          x: buttonX,
          y: buttonY,
        }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={className}
        {...(props as any)}
      >
        <motion.span
          style={{
            x: textX,
            y: textY,
          }}
          className="w-full h-full flex items-center justify-center gap-3 pointer-events-none select-none"
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  );
}
