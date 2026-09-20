"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

// Global in-memory flag to ensure it never runs on route changes within the same SPA session
let hasLoadedInMemory = false;

export default function Preloader() {
  const isAlreadyShown = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return !!sessionStorage.getItem("mitti_preloader_shown") || hasLoadedInMemory;
      } catch {
        return hasLoadedInMemory;
      }
    },
    () => false
  );

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAlreadyShown) {
      return;
    }

    // Lock page scroll during initial sequence
    document.body.style.overflow = "hidden";

    // Smooth, calibrated 1.5-second animation curve
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (latest) => {
        setProgress(Math.round(latest));
      },
      onComplete: () => {
        // Brief pause at 100% before triggering smooth curtain slide-up
        setTimeout(() => {
          setIsLoading(false);
          hasLoadedInMemory = true;
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("mitti_preloader_shown", "true");
          } catch {
            // Ignore storage errors
          }
        }, 180);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, []);

  if (isAlreadyShown) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="mitti-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // High-end editorial curtain curve
            },
          }}
          className="fixed inset-0 z-[9990] bg-[#F9F6F0] flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Subtle Ambient Watermark in Ol Chiki */}
          <div
            aria-hidden="true"
            className="absolute text-[22vw] font-mono text-[#2C2A29]/[0.02] pointer-events-none select-none tracking-widest font-bold whitespace-nowrap"
          >
            ᱥᱟᱱᱛᱟᱲᱤ
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Minimalist Sub-heading */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#C25934] font-semibold">
                ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ &middot; HERITAGE GATEWAY
              </span>
            </motion.div>

            {/* Brand Title: 'Mitti' in Playfair Display */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#1A1A1A] leading-none"
            >
              Mitti
            </motion.h1>

            {/* Minimal Thin Terracotta Progress Line */}
            <div className="w-48 sm:w-64 h-[1.5px] bg-[#1A1A1A]/10 relative overflow-hidden rounded-full mt-8 sm:mt-10">
              <motion.div
                className="h-full bg-[#C25934]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage & Status Counter */}
            <div className="flex items-center justify-between w-48 sm:w-64 mt-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#C25934] font-semibold">
              <span className="text-[#1A1A1A]/50 uppercase">Loading</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Bottom Minimalist Curatorial Tag */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#1A1A1A]/40">
              Indigenous Living &middot; Est. 2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
