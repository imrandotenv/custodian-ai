"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  // Ultra-fast mouse tracking with Framer Motion useMotionValue (Zero useState for coordinates)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  // Snappy, lag-free spring physics with high stiffness and low mass for instant response
  const springConfig = { damping: 28, stiffness: 450, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Hover expansion state (only toggles on element boundary crossing, never on mousemove)
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isHoveredRef = useRef(false);
  const cursorTextRef = useRef("");

  const isTouchDevice = useSyncExternalStore(
    () => () => {},
    () => {
      if (typeof window === "undefined") return false;
      return (
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    },
    () => false
  );

  useEffect(() => {
    // Disable on touch devices to maintain native mobile touch interactions
    if (isTouchDevice) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Direct hardware-accelerated MotionValue updates (NO React re-renders)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect clickable or interactive elements
      const explicitCursor = target.closest("[data-cursor]") as HTMLElement | null;
      const mediaEl = target.closest("img, picture, [role='img']");
      const interactiveEl = target.closest(
        "a, button, [role='button'], [role='checkbox'], input, select, textarea, .cursor-pointer"
      ) as HTMLElement | null;

      let nextText = "";
      let nextHovered = false;

      if (explicitCursor) {
        nextText = explicitCursor.getAttribute("data-cursor")?.toUpperCase() || "VIEW";
        nextHovered = true;
      } else if (mediaEl) {
        nextText = "VIEW";
        nextHovered = true;
      } else if (interactiveEl) {
        nextText = interactiveEl.getAttribute("data-cursor-text")?.toUpperCase() || "EXPLORE";
        nextHovered = true;
      }

      // Only trigger state updates when boundary condition actually changes
      if (nextHovered !== isHoveredRef.current || nextText !== cursorTextRef.current) {
        isHoveredRef.current = nextHovered;
        cursorTextRef.current = nextText;
        setIsHovered(nextHovered);
        setCursorText(nextText);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, cursorOpacity]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        opacity: cursorOpacity,
      }}
      className="custom-cursor hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 select-none"
    >
      <motion.div
        animate={{
          width: isHovered ? (cursorText ? 68 : 38) : 10,
          height: isHovered ? (cursorText ? 68 : 38) : 10,
          backgroundColor: isHovered
            ? cursorText
              ? "#C25934"
              : "rgba(194, 89, 52, 0.25)"
            : "#C25934",
          borderColor: isHovered ? "#C25934" : "rgba(0, 0, 0, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 26,
          mass: 0.15,
        }}
        className="rounded-full flex items-center justify-center border shadow-sm shadow-[#C25934]/25 overflow-hidden pointer-events-none"
      >
        <AnimatePresence mode="wait">
          {isHovered && cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-mono tracking-[0.22em] font-bold text-[#F9F6F0] pl-0.5 text-center leading-none pointer-events-none select-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
