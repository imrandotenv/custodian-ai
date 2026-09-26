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
    artForm: "Sohrai painting",
    artisan: "Birsa Murmu",
    olChiki: "ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ",
    giTag: "GI Tag #JH-SOHRAI-2020",
    elevation: "610m Sal Forest Plateau",
    lore: "Birsa mitti ki deewar par janwaron aur kheton ke rang banate hain, jo unhe apne gaon ki purani yaadein yaad dilate hain.",
  },
  {
    id: "ramgarh",
    name: "Ramgarh Cantt",
    region: "Maati Ghar Headquarters Hub",
    coordinates: "23°38'N · 85°31'E",
    xPct: 42,
    yPct: 46,
    artForm: "Sohrai painting & Terracotta",
    artisan: "Jamuna Hembram",
    olChiki: "ᱢᱟᱴᱤ ᱜᱷᱟᱨ",
    giTag: "Maati Ghar Atelier HQ",
    elevation: "Damodar River Basin",
    lore: "Jamuna prakritik mitti ke rangon se ped, pakshi aur pashuon ko apni paintings mein jagah deti hain.",
  },
  {
    id: "dumka",
    name: "Dumka",
    region: "Santhal Parganas Arc",
    coordinates: "24°16'N · 87°15'E",
    xPct: 66,
    yPct: 24,
    artForm: "Santhali Handloom",
    artisan: "Phulo Soren",
    olChiki: "ᱯᱷᱩᱞᱳ ᱥᱚᱨᱮᱱ",
    giTag: "Santhal Handloom Guild",
    elevation: "Mayurakshi River Basin",
    lore: "Phulo haath se bunai karte hue apni maa se seekhe hue paramparik patterns ko zinda rakhti hain.",
  },
  {
    id: "seraikela",
    name: "Seraikela-Kharsawan",
    region: "Kharsawan Metallurgy Hills",
    coordinates: "22°42'N · 85°55'E",
    xPct: 50,
    yPct: 64,
    artForm: "Dokra craft",
    artisan: "Ramesh Kisku",
    olChiki: "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ",
    giTag: "Lost-Wax Metallurgy",
    elevation: "Sanjay River Valley",
    lore: "Ramesh dhatu ko garam karke chhoti murtiyon mein purani kahaniyon ka roop dete hain.",
  },
  {
    id: "purulia",
    name: "Purulia",
    region: "West Bengal Border Arc",
    coordinates: "23°20'N · 86°22'E",
    xPct: 58,
    yPct: 52,
    artForm: "Dokra craft",
    artisan: "Sukri Kisku",
    olChiki: "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ",
    giTag: "Bikna Dokra GI Protected",
    elevation: "Ajodhya Hills Sacred Kiln",
    lore: "Sukri dhatu ki chhoti kalakritiyon mein lok jeevan aur prakriti ke roop banati hain.",
  },
  {
    id: "west-singhbhum",
    name: "West Singhbhum",
    region: "Chaibasa Forest Basin",
    coordinates: "22°34'N · 85°48'E",
    xPct: 40,
    yPct: 70,
    artForm: "Dokra craft",
    artisan: "Karmi Baskey",
    olChiki: "ᱠᱟᱨᱢᱤ ᱵᱟᱥᱠᱮ",
    giTag: "Singhbhum Tribal Foundry",
    elevation: "Roro River Plateau",
    lore: "Karmi chhoti dhatu ki murtiyon mein nritya, pashu aur gaon ke jeevan ko darshati hain.",
  },
  {
    id: "jhargram",
    name: "Jhargram",
    region: "Jangalmahal Forest Arc",
    coordinates: "22°27'N · 86°59'E",
    xPct: 68,
    yPct: 62,
    artForm: "Santhali Bamboo Craft",
    artisan: "Lakhan Hansda",
    olChiki: "ᱞᱟᱠᱷᱚᱱ ᱦᱟᱸᱥᱫᱟ",
    giTag: "Jangalmahal Artisan Guild",
    elevation: "Dulung River Basin",
    lore: "Lakhan baans ki patli lakdiyon ko haath se modkar tokri aur ghar ke upyogi samaan banate hain.",
  },
  {
    id: "bankura",
    name: "Bankura",
    region: "Bikna Bell-Metal Hub",
    coordinates: "23°14'N · 87°04'E",
    xPct: 70,
    yPct: 54,
    artForm: "Dokra craft",
    artisan: "Debu Hembram",
    olChiki: "ᱫᱮᱵᱩ ᱦᱮᱢᱵᱽᱨᱚᱢ",
    giTag: "Bankura Bell-Metal Heritage",
    elevation: "Gandheswari River Basin",
    lore: "Debu paramparik lost-wax technique se dhatu ki kalakritiyan taiyar karte hain.",
  },
  {
    id: "pakur",
    name: "Pakur",
    region: "Rajmahal Hills Arc",
    coordinates: "24°38'N · 87°50'E",
    xPct: 72,
    yPct: 20,
    artForm: "Santhali Handloom",
    artisan: "Somai Tudu",
    olChiki: "ᱥᱳᱢᱟᱭ ᱛᱩᱫᱩ",
    giTag: "Pakur Weaver Collective",
    elevation: "Ganges Basin Terrace",
    lore: "Somai apne kargha par dheere-dheere dhaage jodkar paramparik kapde banate hain.",
  },
  {
    id: "latehar",
    name: "Latehar",
    region: "Palamu Forest Fringe",
    coordinates: "23°44'N · 84°30'E",
    xPct: 30,
    yPct: 40,
    artForm: "Sohrai painting",
    artisan: "Harilal Murmu",
    olChiki: "ᱦᱟᱹᱨᱤᱞᱟᱞ ᱢᱩᱨᱢᱩ",
    giTag: "GI Tag #JH-SOHRAI-2020",
    elevation: "North Koel River Plateau",
    lore: "Harilal apni Sohrai paintings mein gaon ke pashuon aur pedon ko gahre prakritik rangon se ubharte hain.",
  },
  {
    id: "malda",
    name: "Malda",
    region: "Mahananda River Basin",
    coordinates: "25°00'N · 88°08'E",
    xPct: 78,
    yPct: 18,
    artForm: "Santhali Embroidery",
    artisan: "Sita Soren",
    olChiki: "ᱥᱤᱛᱟ ᱥᱚᱨᱮᱱ",
    giTag: "Malda Needlecraft Guild",
    elevation: "Alluvial Plain",
    lore: "Sita kapde par rangin dhaagon se phool, pakshi aur paramparik patterns banati hain.",
  },
  {
    id: "jamtara",
    name: "Jamtara",
    region: "Ajay River Basin",
    coordinates: "23°57'N · 86°48'E",
    xPct: 56,
    yPct: 30,
    artForm: "Sohrai painting",
    artisan: "Rupa Baskey",
    olChiki: "ᱨᱩᱯᱟ ᱵᱟᱥᱠᱮ",
    giTag: "GI Tag #JH-SOHRAI-2020",
    elevation: "Chota Nagpur Fringe",
    lore: "Rupa deewar par prakriti ke roop banate hue mitti ke saadhaaran rangon ka istemal karti hain.",
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
