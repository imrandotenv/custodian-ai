"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Languages,
  Sparkles,
  Volume2,
  CheckCircle2,
  Quote,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
} from "lucide-react";
import RevealText from "./RevealText";

export interface CulturalStoryViewProps {
  originalText?: string;
  englishTranslatedText?: string;
  originalLanguageLabel?: string;
  translatedLanguageLabel?: string;
  artisanName?: string;
  originHamlet?: string;
}

const DEFAULT_ORIGINAL_SANTHALI =
  "ᱫᱷᱟᱹᱨᱛᱤ ᱥᱤᱨᱡᱚᱱ ᱨᱮᱱᱟᱜ ᱠᱟᱛᱷᱟ: ᱟᱞᱮ ᱥᱟᱱᱛᱟᱲ ᱠᱚᱣᱟᱜ ᱯᱟᱹᱛᱭᱟᱹᱣ ᱞᱮᱠᱟᱛᱮ ᱦᱟᱸᱥ ᱦᱟᱸᱥᱞᱤ ᱪᱮᱬᱮ ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱨᱮ ᱵᱤᱞᱤ ᱠᱤᱱ ᱮᱢ ᱞᱮᱫᱟ ᱟᱨ ᱚᱸᱰᱮ ᱠᱷᱚᱱ ᱜᱮ ᱢᱟᱹᱱᱢᱤ ᱠᱤᱱ ᱥᱤᱨᱡᱚᱱ ᱞᱮᱱᱟ ᱾ ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵᱽ ᱡᱚᱠᱷᱚᱡ ᱟᱞᱮ ᱟᱹᱛᱩ ᱨᱤᱱ ᱟᱭᱳ ᱦᱚᱲ ᱠᱚ ᱠᱟᱸᱛ ᱨᱮ ᱦᱟᱥᱟ, ᱪᱟᱣᱞᱮ ᱦᱚᱞᱚᱝ ᱟᱨ ᱥᱤᱸᱫᱩᱨ ᱛᱮ ᱱᱚᱶᱟ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱵᱮᱱᱟᱣᱟ ᱾ ᱱᱚᱶᱟ ᱫᱚ ᱠᱷᱟᱹᱞᱤ ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱢᱩᱨᱛᱤ ᱫᱚ ᱵᱟᱝ ᱠᱟᱱᱟ, ᱱᱚᱶᱟ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱡᱤᱣᱤ ᱟᱨ ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱨᱤᱱ ᱵᱚᱸᱜᱟ ᱵᱳᱨᱳ ᱠᱚᱣᱟᱜ ᱟᱹᱥᱤᱨᱵᱟᱫᱽ ᱠᱟᱱᱟ ᱾";

const DEFAULT_ENGLISH_TRANSLATION =
  "The Genesis of Earth & Water: In our Santhal oral memory, in the primeval dawn when only boundless water existed, Thakur Jiu created the divine swan pair, Has and Hasil. From their golden eggs nestled upon aquatic reeds, the first ancestors, Pilchu Haram and Pilchu Budhi, awoke to walk upon sacred soil. When our village women model these terracotta reliefs during the post-monsoon Sohrai festival, every stroke of red laterite clay and powdered rice flour re-enacts that first creation. This is never mere clay—it is the breathing conduit of our forest grove ancestors and the eternal sanctity of Jaherthan.";

export default function CulturalStoryView({
  originalText = DEFAULT_ORIGINAL_SANTHALI,
  englishTranslatedText = DEFAULT_ENGLISH_TRANSLATION,
  originalLanguageLabel = "Original Santhali (Ol Chiki)",
  translatedLanguageLabel = "Global English",
  artisanName = "Guru Somra Hembrom",
  originHamlet = "Purulia, West Bengal",
}: CulturalStoryViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"original" | "english">("english");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const isOriginal = selectedLanguage === "original";

  // Escape key exits Cinematic Focus Mode gracefully
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFocusMode) {
        setIsFocusMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode]);

  return (
    <>
      {/* 1. CINEMATIC FULL-SCREEN BACKDROP OVERLAY */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            key="cinematic-focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setIsFocusMode(false)}
            className="fixed inset-0 z-[9995] bg-[#1A1A1A]/90 backdrop-blur-md cursor-pointer flex items-start justify-end p-6"
            aria-label="Exit Focus Mode (Click anywhere outside)"
          >
            {/* Ambient Exit Prompt */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.15 }}
              className="px-4 py-2 rounded-full bg-[#2A2725] border border-white/10 text-[11px] font-mono text-[#F9F6F0]/70 tracking-widest uppercase flex items-center gap-2 pointer-events-none shadow-lg"
            >
              <span>Click anywhere or press ESC to exit Focus Mode</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE STORY CARD (ELEVATED WHEN IN FOCUS MODE) */}
      <div
        className={`w-full rounded-3xl transition-all duration-400 overflow-hidden flex flex-col ${
          isFocusMode
            ? "relative z-[9996] bg-[#221F1E] border-2 border-[#C25934]/60 shadow-2xl shadow-black/80"
            : "relative bg-white/85 border border-[#C25934]/20 shadow-sm"
        }`}
      >
        
        {/* Editorial Header Bar with AI Accessibility Badge, Language Toggle & Focus Mode Button */}
        <div
          className={`px-6 sm:px-8 py-5 md:px-10 border-b transition-colors duration-400 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
            isFocusMode
              ? "border-[#C25934]/25 bg-[#1C1A19]/90 text-[#F9F6F0]"
              : "border-[#C25934]/15 bg-[#F9F6F0]/60 text-textPrimary"
          }`}
        >
          
          {/* Left: AI Dialect Provenance Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                isFocusMode
                  ? "bg-[#C25934]/25 text-[#F9F6F0]"
                  : "bg-[#C25934]/10 text-primary"
              }`}
            >
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    isFocusMode ? "text-[#F9F6F0]" : "text-textPrimary"
                  }`}
                >
                  Living Oral Lore
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/25">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI Audio-Dialect Preserved
                </span>
              </div>
              <p
                className={`text-[11px] transition-colors ${
                  isFocusMode ? "text-[#F9F6F0]/60" : "text-textPrimary/65"
                }`}
              >
                Narrated by {artisanName} &middot; {originHamlet}
              </p>
            </div>
          </div>

          {/* Right Controls: Language Selector + Cinematic Focus Mode Button */}
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto flex-wrap">
            
            {/* Segmented Language Switch */}
            <div
              className={`flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-2xs transition-colors ${
                isFocusMode
                  ? "bg-[#2C2827] border-white/10"
                  : "bg-white border-[#C25934]/20"
              }`}
            >
              {/* Button: Original Santhali */}
              <button
                type="button"
                onClick={() => setSelectedLanguage("original")}
                className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-serif font-medium transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                  isOriginal
                    ? "text-[#F9F6F0]"
                    : isFocusMode
                    ? "text-[#F9F6F0]/60 hover:text-[#F9F6F0]"
                    : "text-textPrimary/70 hover:text-textPrimary"
                }`}
              >
                {isOriginal && (
                  <motion.div
                    layoutId="cultural-toggle-pill"
                    className="absolute inset-0 rounded-xl bg-[#C25934]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-bold">
                  [ ᱚᱞ ᱪᱤᱠᱤ Santhali ]
                </span>
              </button>

              {/* Button: Global English */}
              <button
                type="button"
                onClick={() => setSelectedLanguage("english")}
                className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-serif font-medium transition-colors cursor-pointer flex items-center gap-1.5 select-none ${
                  !isOriginal
                    ? "text-[#F9F6F0]"
                    : isFocusMode
                    ? "text-[#F9F6F0]/60 hover:text-[#F9F6F0]"
                    : "text-textPrimary/70 hover:text-textPrimary"
                }`}
              >
                {!isOriginal && (
                  <motion.div
                    layoutId="cultural-toggle-pill"
                    className="absolute inset-0 rounded-xl bg-[#C25934]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-bold">
                  [ Global English ]
                </span>
              </button>
            </div>

            {/* CINEMATIC FOCUS MODE TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setIsFocusMode((prev) => !prev)}
              data-cursor="explore"
              title={isFocusMode ? "Exit Focus Mode (Esc)" : "Cinematic Focus Mode"}
              aria-label={isFocusMode ? "Exit Focus Mode" : "Enter Cinematic Focus Mode"}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-serif font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs select-none ${
                isFocusMode
                  ? "bg-[#C25934] text-[#F9F6F0] border border-[#C25934] shadow-md shadow-[#C25934]/30"
                  : "bg-white border border-[#C25934]/25 text-textPrimary/80 hover:text-[#C25934] hover:border-[#C25934]"
              }`}
            >
              {isFocusMode ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Exit Focus</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#C25934]" />
                  <span className="hidden sm:inline">Focus Mode</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Main Text Content Box with Generous Line-Height & Playfair Serif */}
        <div className="p-6 sm:p-8 md:p-12 relative flex flex-col justify-between min-h-[220px]">
          
          {/* Subtle Background Terracotta Quote Emblem */}
          <div
            className={`absolute top-6 right-8 pointer-events-none select-none transition-colors duration-400 ${
              isFocusMode ? "text-[#C25934]/15" : "text-[#C25934]/10"
            }`}
          >
            <Quote className="w-20 h-20 rotate-180" />
          </div>

          {/* Animated Crossfade Content Area with Scale Up & Color Shift */}
          <motion.div
            animate={{
              scale: isFocusMode ? 1.05 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 origin-center py-2"
          >
            <AnimatePresence mode="wait">
              {isOriginal ? (
                <motion.div
                  key="santhali-text"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold">
                    <span className="text-[#C25934]">Santhali Indigenous Script</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/40" : "text-textPrimary/40"}>&middot;</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/70" : "text-textPrimary/60"}>Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)</span>
                  </div>

                  <RevealText
                    text={originalText}
                    className={`font-serif text-xl md:text-2xl leading-relaxed md:leading-loose tracking-wide select-text transition-colors duration-300 ${
                      isFocusMode ? "text-[#F9F6F0]" : "text-textPrimary"
                    }`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="english-text"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold">
                    <span className={isFocusMode ? "text-[#849A89]" : "text-accent"}>Curated Translation</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/40" : "text-textPrimary/40"}>&middot;</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/70" : "text-textPrimary/60"}>English Gallery Catalogue</span>
                  </div>

                  <RevealText
                    text={`“${englishTranslatedText}”`}
                    className={`font-serif text-lg md:text-xl leading-relaxed md:leading-loose tracking-normal italic select-text transition-colors duration-300 ${
                      isFocusMode ? "text-[#F9F6F0]" : "text-textPrimary/90"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Metadata & Acoustic Oral Recitation Bar */}
          <div
            className={`mt-8 pt-5 border-t transition-colors duration-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
              isFocusMode
                ? "border-[#C25934]/20 text-[#F9F6F0]/70"
                : "border-[#C25934]/10 text-textPrimary/70"
            }`}
          >
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
                  isFocusMode
                    ? "bg-[#2C2827] border border-white/10 hover:bg-[#383332] text-[#F9F6F0]"
                    : "bg-[#F9F6F0] border border-[#C25934]/20 hover:bg-white text-textPrimary"
                }`}
              >
                <Volume2
                  className={`w-4 h-4 ${
                    isPlayingAudio
                      ? "text-primary animate-pulse"
                      : isFocusMode
                      ? "text-[#F9F6F0]/60"
                      : "text-textPrimary/60"
                  }`}
                />
                <span>{isPlayingAudio ? "Pause Elder Recitation" : "Listen in Native Voice (2:14)"}</span>
              </button>

              {isPlayingAudio && (
                <span className="text-[11px] font-mono text-primary animate-pulse hidden md:inline">
                  Playing: Purulia Dialect Master Reel #04...
                </span>
              )}
            </div>

            <div
              className={`flex items-center gap-2 text-[11px] ${
                isFocusMode ? "text-[#F9F6F0]/60" : "text-textPrimary/60"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>Anthropologically verified by Central Tribal Museum Board</span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
