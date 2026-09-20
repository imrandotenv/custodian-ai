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
  RefreshCw,
} from "lucide-react";
import RevealText from "./RevealText";
import { aiApi } from "@/lib/api";

export interface CulturalStoryViewProps {
  originalText?: string;
  englishTranslatedText?: string;
  originalLanguageLabel?: string;
  translatedLanguageLabel?: string;
  artisanName?: string;
  originHamlet?: string;
  artForm?: string;
}

const DEFAULT_ORIGINAL_SANTHALI =
  "ᱥᱟᱱᱛᱟᱲᱤ ᱠᱟᱹᱦᱱᱤ: ᱫᱷᱟᱹᱨᱛᱤ ᱟᱨ ᱫᱟᱜ ᱥᱤᱨᱡᱚᱱ ᱨᱮ ᱴᱷᱟᱹᱠᱩᱨ ᱡᱤᱣ ᱦᱟᱸᱥ ᱟᱨ ᱦᱟᱸᱥᱤᱞ ᱫᱤᱵᱽᱭᱚ ᱪᱮᱬᱮ ᱡᱩᱲᱤ ᱵᱮᱱᱟᱣ ᱞᱮᱫ ᱠᱤᱱᱟᱭ᱾ ᱩᱱᱠᱤᱱᱟᱜ ᱥᱚᱱᱟ ᱵᱤᱞᱤ ᱠᱷᱚᱱ ᱯᱤᱞᱪᱩ ᱦᱟᱲᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱰᱷᱤ ᱡᱟᱱᱟᱢ ᱞᱮᱱᱟ ᱠᱤᱱ᱾ ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵᱽ ᱨᱮ ᱫᱩᱫᱷᱤ ᱦᱟᱥᱟ ᱛᱮ ᱱᱚᱣᱟ ᱠᱟᱹᱦᱱᱤ ᱜᱮ ᱵᱮᱱᱟᱣ ᱨᱩᱣᱟᱹᱲᱚᱜᱼᱟ᱾";

const DEFAULT_ENGLISH_TRANSLATION =
  "The Genesis of Earth & Water: In our Santhal oral memory, in the primeval dawn when only boundless water existed, Thakur Jiu created the divine swan pair, Has and Hasil. From their golden eggs nestled upon aquatic reeds, the first ancestors, Pilchu Haram and Pilchu Budhi, awoke to walk upon sacred soil. When our village women model these terracotta reliefs during the post-monsoon Sohrai festival, every stroke of red laterite clay and powdered rice flour re-enacts that first creation. This is never mere clay-it is the breathing conduit of our forest grove ancestors and the eternal sanctity of Jaherthan.";

export default function CulturalStoryView({
  originalText = DEFAULT_ORIGINAL_SANTHALI,
  englishTranslatedText = DEFAULT_ENGLISH_TRANSLATION,
  artisanName = "Guru Somra Hembrom",
  originHamlet = "Purulia, West Bengal",
  artForm = "Santhali Mud Painting",
}: CulturalStoryViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"original" | "english">("english");
  const [currentEnglishText, setCurrentEnglishText] = useState(englishTranslatedText);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [aiProviderNote, setAiProviderNote] = useState<string | null>(null);

  const isOriginal = selectedLanguage === "original";

  // Handle switching to English with live backend translation
  const handleSelectEnglish = async () => {
    setSelectedLanguage("english");
    if (!currentEnglishText || currentEnglishText === DEFAULT_ENGLISH_TRANSLATION) {
      setIsTranslating(true);
      try {
        const res = await aiApi.translate(originalText, "santhali", "english");
        setCurrentEnglishText(res.translatedText);
        setAiProviderNote(res.culturalNote);
      } catch (err) {
        console.warn("Using fallback translation:", err);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  // Re-synthesize Lore using AI Lore Generation Endpoint
  const handleRegenerateLore = async () => {
    setIsTranslating(true);
    try {
      const res = await aiApi.generateLore({
        artForm,
        motifs: "Thakur Jiu, Has and Hasil swan pair, Dudhi clay",
        region: originHamlet,
        artisanName,
      });
      setCurrentEnglishText(res.lore);
      setSelectedLanguage("english");
      setAiProviderNote("Freshly synthesized via Custodian AI Cultural Engine");
    } catch (err) {
      console.error("Lore generation failed:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Escape key exits Cinematic Focus Mode
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

      {/* 2. THE STORY CARD */}
      <div
        className={`w-full rounded-3xl transition-all duration-400 overflow-hidden flex flex-col ${
          isFocusMode
            ? "relative z-[9996] bg-[#221F1E] border-2 border-[#C25934]/60 shadow-2xl shadow-black/80"
            : "relative bg-white/85 border border-[#C25934]/20 shadow-xs"
        }`}
      >
        {/* Editorial Header Bar */}
        <div
          className={`px-6 sm:px-8 py-5 md:px-10 border-b transition-colors duration-400 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
            isFocusMode
              ? "border-[#C25934]/30 bg-[#2A2625]"
              : "border-[#C25934]/15 bg-[#F9F6F0]/60"
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#849A89] animate-ping" />
              <span
                className={`text-[11px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 ${
                  isFocusMode ? "text-[#849A89]" : "text-accent"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Live AI Oral Preservation Engine
              </span>
            </div>
            <h3
              className={`font-serif text-lg md:text-xl font-normal tracking-tight ${
                isFocusMode ? "text-[#F9F6F0]" : "text-textPrimary"
              }`}
            >
              Oral Heritage Archive &middot; {artisanName}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Live AI Lore Re-synthesize Button */}
            <button
              type="button"
              onClick={handleRegenerateLore}
              disabled={isTranslating}
              title="Resynthesize lore via AI"
              className={`px-3 py-2 rounded-xl text-xs font-serif font-medium transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                isFocusMode
                  ? "bg-[#2C2827] text-[#F9F6F0]/80 hover:text-white border border-white/10"
                  : "bg-white text-textPrimary/80 hover:text-[#C25934] border border-[#C25934]/20"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTranslating ? "animate-spin text-[#C25934]" : ""}`} />
              <span className="hidden sm:inline">AI Resynthesize</span>
            </button>

            {/* Language Toggle Pill Container */}
            <div
              className={`p-1 rounded-2xl flex items-center gap-1 border transition-colors ${
                isFocusMode
                  ? "bg-[#1A1817] border-white/10"
                  : "bg-white border-[#C25934]/20 shadow-2xs"
              }`}
            >
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

              <button
                type="button"
                onClick={handleSelectEnglish}
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

            {/* Focus Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsFocusMode((prev) => !prev)}
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

        {/* Content Box */}
        <div className="p-6 sm:p-8 md:p-12 relative flex flex-col justify-between min-h-[220px]">
          <div
            className={`absolute top-6 right-8 pointer-events-none select-none transition-colors duration-400 ${
              isFocusMode ? "text-[#C25934]/15" : "text-[#C25934]/10"
            }`}
          >
            <Quote className="w-20 h-20 rotate-180" />
          </div>

          <motion.div
            animate={{ scale: isFocusMode ? 1.05 : 1 }}
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
                    <span className={isFocusMode ? "text-[#849A89]" : "text-accent"}>Live Curated Translation</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/40" : "text-textPrimary/40"}>&middot;</span>
                    <span className={isFocusMode ? "text-[#F9F6F0]/70" : "text-textPrimary/60"}>
                      {aiProviderNote || "Santhali Oral Dialect Grounding"}
                    </span>
                  </div>

                  {isTranslating ? (
                    <div className="py-8 flex items-center gap-3 text-sm font-serif italic text-textPrimary/60">
                      <span className="w-4 h-4 border-2 border-[#C25934] border-t-transparent rounded-full animate-spin" />
                      <span>Translating sacred nuances via Custodian AI...</span>
                    </div>
                  ) : (
                    <RevealText
                      text={`“${currentEnglishText}”`}
                      className={`font-serif text-lg md:text-xl leading-relaxed md:leading-loose tracking-normal italic select-text transition-colors duration-300 ${
                        isFocusMode ? "text-[#F9F6F0]" : "text-textPrimary/90"
                      }`}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Bar */}
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
              <span>Anthropologically certified under GI Tag #JH-SOHRAI-2020</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
