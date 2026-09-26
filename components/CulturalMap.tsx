"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { ateliersApi, Atelier } from "@/lib/api";

export interface ArtisanVillage {
  id: string;
  name: string;
  region: string;
  coordinates: string;
  xPct: number; // Percentage on SVG map X (0 to 100)
  yPct: number; // Percentage on SVG map Y (0 to 100)
  artForm: string;
  artisan: string;
  olChiki: string;
  giTag: string;
  elevation: string;
  lore: string;
}

const VILLAGES: ArtisanVillage[] = [
  {
    id: "hazaribagh",
    name: "Hazaribagh",
    region: "Jharkhand Sacred Plateau",
    coordinates: "23°59'N · 85°21'E",
    xPct: 37,
    yPct: 36,
    artForm: "Sohrai Khovar Mud Sgraffito",
    artisan: "Muni Devi",
    olChiki: "ᱥᱚᱦᱨᱟᱭ ᱠᱷᱳᱵᱟᱨ",
    giTag: "GI Tag #JH-SOHRAI-2020",
    elevation: "610m Sal Forest Plateau",
    lore: "River manganese base coat etched with broken combs celebrating post-harvest fertility.",
  },
  {
    id: "purulia",
    name: "Purulia Hills",
    region: "West Bengal Border Arc",
    coordinates: "23°20'N · 86°22'E",
    xPct: 58,
    yPct: 52,
    artForm: "Dokra Lost-Wax Metallurgy",
    artisan: "Santosh Hemrom & Guild",
    olChiki: "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ",
    giTag: "4,000-Yr Bell-Metal Bronze",
    elevation: "Ajodhya Hills Sacred Kiln",
    lore: "Non-ferrous bronze cast over clay cores using hand-wound pure beeswax filaments.",
  },
  {
    id: "dumka",
    name: "Dumka",
    region: "Santhal Parganas Arc",
    coordinates: "24°16'N · 87°15'E",
    xPct: 66,
    yPct: 24,
    artForm: "Kans Reed Grasscraft & Clay Vessels",
    artisan: "Champa Soren",
    olChiki: "ᱟᱹᱛᱤᱧ ᱛᱮᱭᱟᱨ",
    giTag: "Living Sovereign Weave",
    elevation: "Mayurakshi River Basin",
    lore: "Wild sacred Kans grass hand-twined with river kaolin minerals and natural botanical dyes.",
  },
  {
    id: "mayurbhanj",
    name: "Mayurbhanj Arc",
    region: "Ghatshila Border Plateau",
    coordinates: "22°12'N · 86°28'E",
    xPct: 52,
    yPct: 76,
    artForm: "Jaher Than Laterite Ochre Murals",
    artisan: "Somra Hembrom",
    olChiki: "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ",
    giTag: "Sacred Grove Sanctuary",
    elevation: "Laterite Sal Sanctuary",
    lore: "Ancestral laterite clay gathered under ritual silence honoring the woodland grove spirits.",
  },
  {
    id: "giridih",
    name: "Giridih Plateau",
    region: "Parasnath Foothills",
    coordinates: "24°11'N · 86°18'E",
    xPct: 48,
    yPct: 32,
    artForm: "Banam Lute & Sal Woodcarving",
    artisan: "Budhram Marandi",
    olChiki: "ᱵᱟᱱᱟᱢ ᱥᱮᱨᱣᱟ",
    giTag: "Sovereign Music Guild",
    elevation: "Usri River Valley",
    lore: "Four-stringed acoustic lutes hand-sculpted from fallen Sal timber and dried gourds.",
  },
  {
    id: "ramgarh",
    name: "Ramgarh Cantt",
    region: "Maati Ghar Headquarters & SHG Hub",
    coordinates: "23°38'N · 85°31'E",
    xPct: 42,
    yPct: 46,
    artForm: "Ledra Quilts & Terracotta Pottery",
    artisan: "Ramgarh Women Craft Collective",
    olChiki: "ᱢᱟᱴᱤ ᱜᱷᱟᱨ",
    giTag: "Maati Ghar Atelier HQ",
    elevation: "Damodar River Basin",
    lore: "Generational hub for upcycled organic Ledra folk quilts and wheel-thrown Sohrai terracotta craft.",
  },
  {
    id: "amadubi",
    name: "Amadubi Village",
    region: "East Singhbhum Chitrakar Arc",
    coordinates: "22°35'N · 86°30'E",
    xPct: 62,
    yPct: 68,
    artForm: "Paitkar Ancient Scroll Painting",
    artisan: "Anil Chitrakar & Amadubi Guild",
    olChiki: "ᱯᱟᱭᱤᱛᱠᱟᱨ ᱪᱤᱛᱟᱹᱨ",
    giTag: "Oldest Indian Folk Scroll",
    elevation: "Subarnarekha River Valley",
    lore: "Ancient village of hereditary Chitrakar scroll painters using stone ochre, tree bark, and Mahua leaves.",
  },
];

export default function CulturalMap() {
  const [villages, setVillages] = useState<ArtisanVillage[]>(VILLAGES);
  const [activeVillage, setActiveVillage] = useState<ArtisanVillage | null>(VILLAGES[0]);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadAteliers() {
      try {
        const liveAteliers = await ateliersApi.list();
        if (mounted && liveAteliers && liveAteliers.length > 0) {
          const enriched = VILLAGES.map((v) => {
            const match = liveAteliers.find(
              (a) =>
                a.name.toLowerCase().includes(v.id.toLowerCase()) ||
                a.region.toLowerCase().includes(v.id.toLowerCase()) ||
                v.region.toLowerCase().includes(a.region.toLowerCase())
            );
            if (match) {
              return {
                ...v,
                artisan: match.masterLineage || v.artisan,
                giTag: match.giTag ? `GI Tag #${match.giTag}` : v.giTag,
                lore: `${match.geologicalNotes} Preserved by ${match.activeArtisans} active master custodians.`,
                elevation: match.elevation ? `${match.elevation} Plateau` : v.elevation,
              };
            }
            return v;
          });
          setVillages(enriched);
          setActiveVillage(enriched[0]);
          setIsLiveConnected(true);
        }
      } catch (err) {
        console.warn("Using baseline territorial cartography coordinates:", err);
      }
    }
    loadAteliers();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="cultural-map" className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative select-none">
      
      {/* Curatorial Header */}
      <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-8 mb-8">
        <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.3em] uppercase font-semibold">
          <span>ᱥᱟᱱᱛᱟᱲᱤ ᱫᱤᱥᱚᱢ</span>
          <span>&middot;</span>
          <span>SECTION 01.75: ANCESTRAL GEOGRAPHY</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-textPrimary tracking-tight">
              Topography of the Living Ateliers
            </h2>
            <p className="text-sm sm:text-base text-textPrimary/75 font-sans max-w-2xl font-light leading-relaxed mt-1">
              Abstract territorial map of the Chota Nagpur Plateau and Purulia Hills indigenous arc. Hover over any sacred coordinate to inspect the local lineage and art form.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A]/60 bg-[#F9F6F0] px-4 py-2 rounded-full border border-[#C25934]/20 self-start md:self-auto shrink-0 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#C25934] animate-spin [animation-duration:12s]" />
            <span>{isLiveConnected ? "LIVE ATELIER RADAR ACTIVE" : "CHOTA NAGPUR INDIGENOUS ARC"}</span>
          </div>
        </div>
      </div>

      {/* Main Abstract SVG Map Canvas Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl bg-white/75 border border-[#C25934]/20 shadow-sm overflow-hidden flex items-center justify-center p-4 sm:p-8">
        
        {/* Subtle Latitude & Longitude Architectural Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(#1A1A1A 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ABSTRACT MINIMALIST SVG MAP OUTLINE (Jharkhand & West Bengal Plateau Arc) */}
        <svg
          viewBox="0 0 900 550"
          className="w-full h-full object-contain pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Regional Plateau Landmass (Charcoal #1A1A1A with 10% opacity) */}
          <path
            d="M 160 180 Q 230 110 330 120 T 520 100 Q 640 90 730 150 T 780 280 Q 810 390 710 460 T 510 490 Q 410 520 310 480 T 170 410 Q 110 330 130 250 Z"
            fill="#1A1A1A"
            fillOpacity="0.05"
            stroke="#1A1A1A"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Internal Tribal Forest Ridge Contours */}
          <path
            d="M 210 210 Q 300 160 410 170 T 620 150 Q 690 200 710 300 T 630 420 Q 480 460 360 430 T 210 350 Z"
            fill="#1A1A1A"
            fillOpacity="0.03"
            stroke="#1A1A1A"
            strokeOpacity="0.08"
            strokeWidth="1.2"
          />

          {/* Sacred Damodar & Subarnarekha River Contour Arcs */}
          <path
            d="M 180 270 Q 310 290 420 260 T 650 310 Q 720 360 760 440"
            stroke="#1A1A1A"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 330 120 Q 430 220 510 310 T 640 470"
            stroke="#1A1A1A"
            strokeOpacity="0.08"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Ambient Region Typography Watermarks in Ol Chiki & English */}
          <text
            x="240"
            y="230"
            fill="#1A1A1A"
            fillOpacity="0.12"
            fontSize="18"
            fontFamily="monospace"
            letterSpacing="0.3em"
            className="uppercase font-bold"
          >
            JHARKHAND PLATEAU
          </text>
          <text
            x="590"
            y="370"
            fill="#1A1A1A"
            fillOpacity="0.12"
            fontSize="18"
            fontFamily="monospace"
            letterSpacing="0.3em"
            className="uppercase font-bold"
          >
            PURULIA ARC &middot; WEST BENGAL
          </text>
          <text
            x="360"
            y="490"
            fill="#C25934"
            fillOpacity="0.15"
            fontSize="32"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.4em"
          >
            ᱥᱟᱱᱛᱟᱲᱤ ᱫᱤᱥᱚᱢ
          </text>
        </svg>

        {/* INTERACTIVE PULSING TERRACOTTA DOTS & GLASSMORPHISM POPUPS */}
        {villages.map((village, idx) => {
          const isCurrentActive = activeVillage?.id === village.id;

          return (
            <div
              key={village.id}
              style={{
                left: `${village.xPct}%`,
                top: `${village.yPct}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {/* Pulsing Pin Button */}
              <button
                type="button"
                data-cursor="explore"
                data-cursor-text={village.name.toUpperCase()}
                onClick={() => setActiveVillage(village)}
                onMouseEnter={() => setActiveVillage(village)}
                aria-label={`Inspect ${village.name} (${village.artForm})`}
                className="relative flex items-center justify-center p-3 rounded-full cursor-pointer focus:outline-none group"
              >
                {/* Radar Ping Wave 1 (Expanding & Fading Sonar Ping) */}
                <motion.span
                  animate={{
                    scale: [1, isCurrentActive ? 4.4 : 3.2],
                    opacity: [isCurrentActive ? 0.85 : 0.55, 0],
                  }}
                  transition={{
                    duration: isCurrentActive ? 1.8 : 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: idx * 0.35,
                  }}
                  className={`absolute w-3.5 h-3.5 rounded-full border pointer-events-none ${
                    isCurrentActive
                      ? "border-2 border-[#C25934] bg-[#C25934]/25"
                      : "border border-[#C25934]/70 bg-[#C25934]/15"
                  }`}
                />

                {/* Radar Ping Wave 2 (Continuous Secondary Sonar Wave) */}
                <motion.span
                  animate={{
                    scale: [1, isCurrentActive ? 4.4 : 3.2],
                    opacity: [isCurrentActive ? 0.85 : 0.55, 0],
                  }}
                  transition={{
                    duration: isCurrentActive ? 1.8 : 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: idx * 0.35 + (isCurrentActive ? 0.9 : 1.2),
                  }}
                  className={`absolute w-3.5 h-3.5 rounded-full border pointer-events-none ${
                    isCurrentActive
                      ? "border border-[#C25934] bg-[#C25934]/20"
                      : "border border-[#C25934]/40 bg-[#C25934]/10"
                  }`}
                />

                {/* Subtle Inner Glow Ring */}
                <span
                  className={`absolute w-3.5 h-3.5 rounded-full border transition-all duration-300 pointer-events-none ${
                    isCurrentActive
                      ? "bg-[#C25934]/30 border-[#C25934] scale-125 shadow-sm shadow-[#C25934]/50"
                      : "bg-[#C25934]/15 border-[#C25934]/40 group-hover:scale-110"
                  }`}
                />

                {/* Core Terracotta Dot */}
                <span
                  className={`relative w-2.5 h-2.5 rounded-full bg-[#C25934] shadow-xs transition-transform duration-300 ${
                    isCurrentActive ? "scale-125 ring-2 ring-white" : "group-hover:scale-110"
                  }`}
                />
              </button>

              {/* Pin Label always visible in minimal mono */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-mono tracking-wider font-semibold text-[#1A1A1A]/70 whitespace-nowrap pointer-events-none bg-[#F9F6F0]/80 px-1.5 py-0.5 rounded-md border border-[#1A1A1A]/5 backdrop-blur-2xs">
                {village.name}
              </span>

              {/* FRAMER MOTION GLASSMORPHISM POP-UP OVERLAY */}
              <AnimatePresence>
                {isCurrentActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.94 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-40 pointer-events-auto"
                  >
                    <div className="w-[82vw] max-w-[320px] sm:w-80 p-4 sm:p-5 rounded-3xl bg-[#F9F6F0]/90 backdrop-blur-xl border border-[#C25934]/30 shadow-2xl flex flex-col gap-3 text-left">
                      
                      {/* Pop-up Header Bar */}
                      <div className="flex items-center justify-between border-b border-[#C25934]/15 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#C25934]">
                            {village.olChiki}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#849A89]/15 text-accent font-semibold border border-[#849A89]/30">
                          {village.giTag}
                        </span>
                      </div>

                      {/* Village Name & Art Form */}
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-serif text-xl font-bold text-[#1A1A1A] leading-tight">
                            {village.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#1A1A1A]/50">
                            {village.coordinates}
                          </span>
                        </div>
                        <p className="text-xs font-serif italic text-[#C25934] font-semibold mt-0.5">
                          {village.artForm}
                        </p>
                      </div>

                      {/* Curatorial Anthropological Lore */}
                      <p className="text-[11px] font-sans text-[#1A1A1A]/80 leading-relaxed font-light">
                        {village.lore}
                      </p>

                      {/* Custodian & Action Link */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-[#1A1A1A]/10 text-xs font-mono text-[#1A1A1A]/70">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#1A1A1A]/50 uppercase">Custodian:</span>
                          <span className="font-semibold text-[#1A1A1A]">{village.artisan}</span>
                        </div>

                        <a
                          href="#pledge-engine"
                          data-cursor="explore"
                          className="inline-flex items-center gap-1 text-[11px] font-serif font-bold text-[#C25934] hover:text-[#A84724] transition-colors"
                        >
                          <span>Pledge</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Bottom Corner Map Legend */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 hidden sm:flex items-center gap-4 bg-[#F9F6F0]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#C25934]/15 text-[10px] font-mono text-[#1A1A1A]/70">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C25934]" />
            <span>Active Custodian Atelier</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>GI Tagged Sacred Lineage</span>
          </div>
        </div>

      </div>

      {/* Quick Interactive Village Selector Pills */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {villages.map((v) => {
          const isSelected = activeVillage?.id === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveVillage(v)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#C25934] text-[#F9F6F0] shadow-xs"
                  : "bg-white/80 border border-[#C25934]/20 text-[#1A1A1A]/75 hover:bg-white hover:text-[#C25934]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-[#F9F6F0]" : "bg-[#C25934]"}`} />
              <span className="font-semibold">{v.name}</span>
              <span className="opacity-60 text-[10px]">({v.artForm.split(" ")[0]})</span>
            </button>
          );
        })}
      </div>

    </section>
  );
}
