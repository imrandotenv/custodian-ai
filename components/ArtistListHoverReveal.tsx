"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export interface TribalArtist {
  id: string;
  name: string;
  olChiki: string;
  craft: string;
  location: string;
  artworkTitle: string;
  image: string;
  giTag: string;
}

const TRIBAL_ARTISTS: TribalArtist[] = [
  {
    id: "muni-devi",
    name: "Muni Devi",
    olChiki: "ᱥᱚᱦᱨᱟᱭ ᱠᱷᱳᱵᱟᱨ",
    craft: "Sohrai Khovar Mud Sgraffito",
    location: "Hazaribagh, Jharkhand",
    artworkTitle: "Sacred Horned Bull & Dudhi Clay Murals",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    giTag: "GI Tag #JH-SOHRAI-2020",
  },
  {
    id: "santosh-hemrom",
    name: "Santosh Hemrom",
    olChiki: "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ",
    craft: "Purulia Dokra Lost-Wax Metallurgy",
    location: "Purulia Hills, West Bengal",
    artworkTitle: "Ancient Lost-Wax Bell-Metal Bison",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    giTag: "4,000-Yr Bronze Guild",
  },
  {
    id: "somra-hembrom",
    name: "Somra Hembrom",
    olChiki: "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ",
    craft: "Raw Laterite Clay & Ochre Murals",
    location: "Mayurbhanj Arc, Odisha",
    artworkTitle: "Jaher Than Sacred Sal Grove Ochre Panel",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    giTag: "Sacred Grove Custodian",
  },
  {
    id: "champa-soren",
    name: "Champa Soren",
    olChiki: "ᱟᱹᱛᱤᱧ ᱛᱮᱭᱟᱨ",
    craft: "Sovereign Grasscraft & Botanical Dyes",
    location: "Dumka, Santhal Parganas",
    artworkTitle: "Kans Reed Weaving & River Kaolin Clay",
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
    giTag: "Living Heritage Guild",
  },
  {
    id: "budhram-marandi",
    name: "Budhram Marandi",
    olChiki: "ᱵᱟᱱᱟᱢ ᱥᱮᱨᱣᱟ",
    craft: "Sacred Sal Woodcarving & Banam Lute",
    location: "Giridih Plateau, Jharkhand",
    artworkTitle: "Ancestral Four-Stringed Banam Instrument",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    giTag: "Sovereign Music Master",
  },
  {
    id: "anil-chitrakar",
    name: "Anil Chitrakar",
    olChiki: "ᱯᱟᱭᱤᱛᱠᱟᱨ ᱪᱤᱛᱟᱹᱨ",
    craft: "Paitkar Ancient Scroll Painting",
    location: "Amadubi, East Singhbhum",
    artworkTitle: "Santhal Genesis & Pilchu Haram Scroll",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    giTag: "Amadubi Chitrakar Guild",
  },
  {
    id: "parvati-devi",
    name: "Parvati Devi & SHG",
    olChiki: "ᱞᱮᱫᱽᱨᱟ ᱠᱤᱪᱨᱤᱡ",
    craft: "Ledra Hand-Stitched Folk Quilting",
    location: "Ramgarh Cantt, Jharkhand",
    artworkTitle: "Multi-layered Kantha-Stitch Earthen Quilt",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
    giTag: "Ramgarh Women Collective",
  },
];

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
    const pledgeSection = document.getElementById("pledge-engine");
    if (pledgeSection) {
      pledgeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative select-none">
      
      {/* Curatorial Header */}
      <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-8 mb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.3em] uppercase font-semibold">
          <span>ᱥᱟᱱᱛᱟᱲᱤ ᱵᱟᱰᱚᱦᱤ</span>
          <span>&middot;</span>
          <span>SECTION 01.5: LIVING CUSTODIAN DIRECTORY</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-textPrimary tracking-tight">
            The Living Custodian Guild
          </h2>
          <span className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/50 pb-1">
            <span className="hidden md:inline">[ Hover to Reveal Sacred Works ]</span>
            <span className="md:hidden">[ Tap Artist to View &amp; Pledge ]</span>
          </span>
        </div>

        <p className="text-sm sm:text-base text-textPrimary/75 font-sans max-w-2xl font-light leading-relaxed">
          Hover over each master artisan to glimpse their sacred wall reliefs, lost-wax bronzes, and sovereign atelier archives before initiating a cultural visit.
        </p>
      </div>

      {/* Interactive Minimalist Vertical List Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        className="relative w-full border-t border-[#1A1A1A]/10"
      >
        {/* ULTRA-PREMIUM HOVER IMAGE REVEAL (Desktop Only, Follows Cursor via useMotionValue & useSpring) */}
        <motion.img
          ref={imgRef}
          src={activeArtist?.image}
          alt={activeArtist?.artworkTitle || "Tribal Art"}
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
          className="hidden md:block pointer-events-none absolute top-0 left-0 z-30 w-64 sm:w-72 md:w-80 lg:w-96 aspect-[4/5] object-cover rounded-3xl shadow-2xl border-2 border-[#F9F6F0] bg-[#1C1A19] will-change-transform shadow-[#1C1A19]/30"
        />

        {/* Vertical List of Artist Names */}
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
                className={`group py-6 sm:py-8 md:py-12 flex flex-col justify-between gap-4 transition-all duration-300 cursor-pointer ${
                  isAnyHovered && !isCurrentHovered
                    ? "opacity-35"
                    : "opacity-100"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                  {/* Left: Numbering, Ol Chiki Script & Massive Artist Name */}
                  <div className="flex flex-col gap-1.5 transition-transform duration-300 ease-out md:group-hover:translate-x-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="font-mono text-xs text-[#1A1A1A]/40 group-hover:text-[#C25934] transition-colors">
                        [ 0{idx + 1} ]
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#C25934] font-semibold">
                        {artist.olChiki}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A]/70 group-hover:bg-[#C25934]/10 group-hover:text-[#C25934] transition-colors">
                        {artist.giTag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A] group-hover:text-[#C25934] transition-colors duration-300">
                      {artist.name}
                    </h3>
                  </div>

                  {/* Right: Craft Discipline, Hamlet, and Animated Diagonal Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
                    <div className="flex flex-col md:text-right">
                      <span className="font-sans text-sm sm:text-base text-[#1A1A1A]/90 font-medium group-hover:text-[#1A1A1A] transition-colors">
                        {artist.craft}
                      </span>
                      <span className="font-mono text-xs text-[#1A1A1A]/60">
                        {artist.location}
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
                    alt={artist.artworkTitle}
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-[#1C1A19]/30 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-sans pointer-events-none">
                    <span className="font-serif italic drop-shadow-sm truncate max-w-[70%]">
                      {artist.artworkTitle}
                    </span>
                    <span className="font-mono text-[10px] text-[#E5A882] bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold">
                      Pledge &rarr;
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
