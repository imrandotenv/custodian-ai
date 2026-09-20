"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Cleanup Web Audio API on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleSound = async () => {
    try {
      if (!isPlaying) {
        // Initialize Web Audio Context on explicit user click (satisfies browser autoplay policies)
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        
        if (!AudioContextClass) return;

        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
          audioCtxRef.current = new AudioContextClass();
        } else if (audioCtxRef.current.state === "suspended") {
          await audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        // Master Gain with slow gentle fade-in to prevent clicks
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.exponentialRampToValueAtTime(0.035, now + 1.2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Lowpass Filter for warm, velvety earthen resonance
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, now);
        filter.Q.setValueAtTime(2.0, now);
        filter.connect(masterGain);

        // Harmonic Drone Frequencies: A2 (110Hz), E3 (165Hz), A3 (220Hz)
        const freqs = [110, 165, 220];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, now);

          // Subtle LFO Pitch Detune for organic acoustic shimmer
          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.35 / (idx + 1), now);

          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } else {
        // Smooth fade out
        if (gainNodeRef.current && audioCtxRef.current) {
          const ctx = audioCtxRef.current;
          const now = ctx.currentTime;
          gainNodeRef.current.gain.setValueAtTime(
            gainNodeRef.current.gain.value,
            now
          );
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          setTimeout(() => {
            oscillatorsRef.current.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch {}
            });
            oscillatorsRef.current = [];
            if (audioCtxRef.current && audioCtxRef.current.state === "running") {
              audioCtxRef.current.suspend().catch(() => {});
            }
          }, 650);
        }
        setIsPlaying(false);
      }
    } catch (err) {
      console.warn("Ambient audio context notice:", err);
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      data-cursor="explore"
      data-cursor-text="SOUND"
      aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2.5 bg-transparent border-none p-0 cursor-pointer select-none group transition-opacity hover:opacity-100"
    >
      {/* Sound Status Minimalist Typography */}
      <span
        className={`font-mono text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold transition-colors duration-300 ${
          isPlaying
            ? "text-[#C25934]"
            : "text-[#1A1A1A]/50 group-hover:text-[#C25934]"
        }`}
      >
        SOUND [{isPlaying ? "ON" : "OFF"}]
      </span>

      {/* 3 Tiny Elegant Equalizer Bars */}
      <div className="flex items-end gap-[3px] h-4 w-3.5 pb-0.5" aria-hidden="true">
        {/* Equalizer Bar 1 */}
        <motion.span
          animate={
            isPlaying
              ? { height: [3, 13, 6, 15, 4, 11, 3] }
              : { height: 3 }
          }
          transition={
            isPlaying
              ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          className={`w-[2px] rounded-full transition-colors duration-300 ${
            isPlaying ? "bg-[#C25934]" : "bg-[#1A1A1A]/35 group-hover:bg-[#C25934]"
          }`}
        />

        {/* Equalizer Bar 2 */}
        <motion.span
          animate={
            isPlaying
              ? { height: [5, 16, 7, 12, 14, 5, 5] }
              : { height: 3 }
          }
          transition={
            isPlaying
              ? { duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.15 }
              : { duration: 0.3 }
          }
          className={`w-[2px] rounded-full transition-colors duration-300 ${
            isPlaying ? "bg-[#C25934]" : "bg-[#1A1A1A]/35 group-hover:bg-[#C25934]"
          }`}
        />

        {/* Equalizer Bar 3 */}
        <motion.span
          animate={
            isPlaying
              ? { height: [4, 9, 14, 5, 11, 15, 4] }
              : { height: 3 }
          }
          transition={
            isPlaying
              ? { duration: 1.25, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              : { duration: 0.3 }
          }
          className={`w-[2px] rounded-full transition-colors duration-300 ${
            isPlaying ? "bg-[#C25934]" : "bg-[#1A1A1A]/35 group-hover:bg-[#C25934]"
          }`}
        />
      </div>
    </button>
  );
}
