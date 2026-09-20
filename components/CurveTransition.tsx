"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface CurveTransitionProps {
  children: React.ReactNode;
}

export default function CurveTransition({ children }: CurveTransitionProps) {
  // Prevent SSR hydration mismatch by deferring SVG overlay until client mount
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setIsMounted(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const w = dimensions.width;
  const h = dimensions.height;
  // Dynamic deep curve height (proportional to window height, clamped for aesthetics)
  const curve = Math.max(220, Math.min(h * 0.35, 380));

  // 1. Initial State: Flat horizontal base at bottom of screen
  const flatStartPath = `M 0 0 L ${w} 0 L ${w} ${h} Q ${w / 2} ${h} 0 ${h} L 0 0 Z`;

  // 2. Mid Sweep State: Dramatic, deep liquid arch pulling upwards
  const deepCurvePath = `M 0 0 L ${w} 0 L ${w} ${h} Q ${w / 2} ${h - curve} 0 ${h} L 0 0 Z`;

  // 3. Final State: Curve flattens as it departs the top boundary
  const flatEndPath = `M 0 0 L ${w} 0 L ${w} 0 Q ${w / 2} 0 0 0 L 0 0 Z`;

  return (
    <div className="flex-1 flex flex-col w-full relative">
      
      {/* HIGH-END LIQUID SVG CURVE TRANSITION OVERLAY (Client-only to eliminate hydration mismatch) */}
      {isMounted && dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -(h + curve) }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1], // Editorial cubic-bezier curve
          }}
          style={{
            height: h + curve,
            filter: "drop-shadow(0 25px 40px rgba(28, 26, 25, 0.18))",
          }}
          className="fixed top-0 left-0 w-full pointer-events-none z-[9990] overflow-hidden"
        >
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${w} ${h + curve}`}
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ d: flatStartPath }}
              animate={{
                d: [flatStartPath, deepCurvePath, flatEndPath],
              }}
              transition={{
                duration: 0.85,
                times: [0, 0.45, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
              fill="#F9F6F0"
            />
          </svg>
        </motion.div>
      )}

      {/* REVEALED PAGE CONTENT */}
      <motion.div
        initial={{ opacity: 0.88, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>

    </div>
  );
}
