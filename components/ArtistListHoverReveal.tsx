"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { DEMO_ARTISANS, DemoArtisan } from "@/lib/demoData";

export interface TribalArtist {
  id: string;
  name: string;
  hindiName: string;
  olChiki: string;
  craft: string;
  location: string;
  price: number;
  artworkTitle: string;
  story: string;
  image: string;
  giTag: string;
}

const TRIBAL_ARTISTS: TribalArtist[] = DEMO_ARTISANS.map((a) => ({
  id: a.id,
  name: a.name,
  hindiName: a.hindiName,
  olChiki: a.olChiki,
  craft: a.artForm,
  location: a.villageDistrict,
  price: a.priceInINR,
  artworkTitle: a.dimensions,
  story: a.originalStory,
  image: a.image,
  giTag: a.giTag || "Certified Custodian",
}));

export default function ArtistListHoverReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Hardware-accelerated mouse coordinates using Framer Motion useMotionValue
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth, relaxed spring physics for elegant cursor trailing
  const springConfig = { damping: 24, stiffness: 220, mass: 0.12 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [activeArtist, setActiveArtist] = useState<TribalArtist | null>(TRIBAL_ARTISTS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Preload artist images into browser memory to eliminate hover delays
  useEffect(() => {
    TRIBAL_ARTISTS.forEach((artist) => {
      const img = new Image();
      img.src = artist.image;
    });
  }, []);

  // Update cursor position relative to the container and center the image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = imgRef.current?.offsetWidth || 320;
    const height = imgRef.current?.offsetHeight || 400;

    mouseX.set(e.clientX - rect.left - width / 2);
    mouseY.set(e.clientY - rect.top - height / 2);
  };

  const handleContainerMouseLeave = () => {
    setHoveredId(null);
  };

  const handleArtistClick = (artist: TribalArtist) => {
    const pledgeSection = document.getElementById("collection");
    if (pledgeSection) {
      pledgeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative select-none">
      
      {/* Curatorial Header */}
      <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-8 mb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.3em] uppercase font-semibold">
          <span>ᱥᱟᱱᱛᱟᱲᱤ ᱵᱟᱰᱚᱦᱤ &middot; 15 SOVEREIGN MASTERS</span>
          <span>&middot;</span>
          <span>SECTION 01.5: LIVING CUSTODIAN DIRECTORY</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-textPrimary tracking-tight">
              The Living Custodian Guild
            </h2>
            <p className="text-sm sm:text-base text-textPrimary/75 font-sans max-w-2xl font-light leading-relaxed mt-1">
              Meet the 15 generational artisans across Jharkhand and West Bengal keeping Sohrai murals, Dokra bronzes, and Santhali handlooms alive.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/50 pb-1 shrink-0">
            <span className="hidden md:inline">[ Hover to Reveal Sacred Works ]</span>
            <span className="md:hidden">[ Tap Artist to View &amp; Pledge ]</span>
          </span>
        </div>
      </div>

      {/* Interactive Minimalist Vertical List Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        className="relative w-full border-t border-[#1A1A1A]/10"
      >
        {/* ULTRA-PREMIUM HOVER IMAGE REVEAL (Desktop Only, Follows Cursor via useMotionValue & useSpring) */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: hoveredId ? 1 : 0,
            scale: hoveredId ? 1 : 0.6,
          }}
          transition={{
            opacity: { duration: 0.25, ease: "easeOut" },
            scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="hidden md:block pointer-events-none absolute top-0 left-0 z-30 w-72 sm:w-80 md:w-96 rounded-3xl shadow-2xl border-2 border-[#F9F6F0] bg-[#1C1A19] overflow-hidden will-change-transform shadow-[#1C1A19]/35"
        >
          <img
            ref={imgRef}
            src={activeArtist?.image}
            alt={activeArtist?.name || "Tribal Art"}
            className="w-full aspect-[4/3] object-cover"
          />
          {activeArtist && (
            <div className="p-4 bg-[#1C1917] text-[#F9F6F0] flex flex-col gap-1.5 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#E5A882]">
                <span>{activeArtist.craft}</span>
                <span>₹{activeArtist.price.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[11px] font-sans text-white/80 line-clamp-2 italic">
                &ldquo;{activeArtist.story}&rdquo;
              </p>
            </div>
          )}
        </motion.div>

        {/* Vertical List of 15 Artist Names */}
        <div className="flex flex-col divide-y divide-[#1A1A1A]/10">
          {TRIBAL_ARTISTS.map((artist, idx) => {
            const isCurrentHovered = hoveredId === artist.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <div
                key={artist.id}
                data-cursor="view"
                onClick={() => handleArtistClick(artist)}
                onMouseEnter={() => {
                  setActiveArtist(artist);
                  setHoveredId(artist.id);
                }}
                className={`group py-5 sm:py-7 md:py-8 flex flex-col justify-between gap-4 transition-all duration-300 cursor-pointer ${
                  isAnyHovered && !isCurrentHovered
                    ? "opacity-35"
                    : "opacity-100"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                  {/* Left: Numbering, Ol Chiki Script & Artist Name */}
                  <div className="flex flex-col gap-1 transition-transform duration-300 ease-out md:group-hover:translate-x-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="font-mono text-xs text-[#1A1A1A]/40 group-hover:text-[#C25934] transition-colors">
                        [ {idx < 9 ? `0${idx + 1}` : idx + 1} ]
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#C25934] font-semibold">
                        {artist.olChiki}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A]/70 group-hover:bg-[#C25934]/10 group-hover:text-[#C25934] transition-colors">
                        {artist.giTag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A] group-hover:text-[#C25934] transition-colors duration-300">
                      {artist.name}{" "}
                      <span className="font-sans text-sm sm:text-lg text-[#1A1A1A]/60 font-normal">
                        ({artist.hindiName})
                      </span>
                    </h3>
                  </div>

                  {/* Right: Craft Discipline, Hamlet, and Animated Diagonal Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
                    <div className="flex flex-col md:text-right">
                      <span className="font-sans text-sm sm:text-base text-[#1A1A1A]/90 font-medium group-hover:text-[#1A1A1A] transition-colors">
                        {artist.craft}
                      </span>
                      <span className="font-mono text-xs text-[#1A1A1A]/60">
                        {artist.location} &bull; ₹{artist.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center group-hover:border-[#C25934] group-hover:bg-[#C25934] transition-all duration-300 shrink-0 shadow-2xs">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A]/60 group-hover:text-[#F9F6F0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Mobile Static Artwork Showcase Fallback (< 768px) */}
                <div className="block md:hidden w-full rounded-2xl overflow-hidden border border-[#C25934]/20 shadow-sm bg-[#1C1A19] relative aspect-[16/10] mt-2">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-[#1C1A19]/35 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-sans pointer-events-none">
                    <span className="font-serif italic drop-shadow-sm truncate max-w-[65%]">
                      &ldquo;{artist.story}&rdquo;
                    </span>
                    <span className="font-mono text-[10px] text-[#E5A882] bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs font-semibold">
                      ₹{artist.price.toLocaleString("en-IN")} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
