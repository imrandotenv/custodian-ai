"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface CipherLinkProps {
  href: string;
  children: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  dataCursor?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Authentic Ol Chiki glyph set for language access decoding effect
const OL_CHIKI_CHARS = [
  "ᱚ", "ᱛ", "ᱜ", "ᱝ", "ᱞ", "ᱟ", "ᱠ", "ᱡ", "ᱢ", "ᱣ",
  "ᱤ", "ᱥ", "ᱦ", "ᱨ", "ᱩ", "ᱪ", "ᱫ", "ᱬ", "ᱭ", "ᱮ",
  "ᱯ", "ᱰ", "ᱱ", "ᱲ", "ᱳ", "ᱴ", "ᱵ", "ᱶ", "ᱷ"
];

export default function CipherLink({
  href,
  children,
  className = "",
  icon: Icon,
  dataCursor = "explore",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CipherLinkProps) {
  const originalText = children;
  const [displayText, setDisplayText] = useState(originalText);
  const [isScrambling, setIsScrambling] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync displayed text if prop changes
  useEffect(() => {
    setDisplayText(originalText);
  }, [originalText]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();

    // Clear any pending cipher cycles
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsScrambling(true);

    // Rapid scramble loop (updates every 30ms)
    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char) => {
            if (char === " " || char === "\n" || char === "\t") return char;
            const randIdx = Math.floor(Math.random() * OL_CHIKI_CHARS.length);
            return OL_CHIKI_CHARS[randIdx];
          })
          .join("")
      );
    }, 30);

    // After exactly 300ms, snap text immediately back to the original English string
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(originalText);
      setIsScrambling(false);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <Link
      href={href}
      data-cursor={dataCursor}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center gap-2 transition-colors select-none ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}

      {/* Scrambling Text: Uses monospace font temporarily during scramble to prevent layout shift */}
      <motion.span
        className={`inline-block will-change-contents ${
          isScrambling
            ? "font-mono text-[#C25934] tracking-wider"
            : "font-medium"
        }`}
        animate={isScrambling ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {displayText}
      </motion.span>
    </Link>
  );
}
