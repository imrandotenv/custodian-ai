"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { artworksApi, resolveImageUrl } from "@/lib/api";

interface GallerySlide {
  id: string;
  titlePart1: string;
  titlePart2: string;
  fullTitle: string;
  olChiki: string;
  subCategory: string;
  artist: string;
  giTag: string;
  image: string;
  curatorialNote: string;
  accentBadge: string;
}

const SANTHALI_SLIDES: GallerySlide[] = [
  {
    id: "sohrai-khovar",
    titlePart1: "Sohrai",
    titlePart2: "Khovar",
    fullTitle: "Sohrai Khovar Mud Painting (Hazaribagh & Ramgarh)",
    olChiki: "ᱥᱚᱦᱨᱟᱭ ᱠᱷᱳᱵᱟᱨ",
    subCategory: "HAZARIBAGH MUD SGRAFFITO",
    artist: "Muni Devi & Ramgarh Women SHG",
    giTag: "GI TAG #JH-SOHRAI-2020",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1800&q=85",
    curatorialNote: "Finger-combed sgraffito through unsealed Dudhi kaolin clay into black manganese mud, invoking post-harvest fertility and reverence to cattle.",
    accentBadge: "Master Mural",
  },
  {
    id: "paitkar-scroll",
    titlePart1: "Paitkar",
    titlePart2: "Scrolls",
    fullTitle: "Paitkar Ancient Scroll Art (Amadubi Village)",
    olChiki: "ᱯᱟᱭᱤᱛᱠᱟᱨ ᱪᱤᱛᱟᱹᱨ",
    subCategory: "AMADUBI CHITRAKAR LORE",
    artist: "Anil Chitrakar & Amadubi Guild",
    giTag: "OLDEST FOLK SCROLL",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1800&q=85",
    curatorialNote: "Painted on handmade jute parchment with stone ochres, neem leaf extract, and Mahua bark depicting Santhal creation epics.",
    accentBadge: "Living Scroll",
  },
  {
    id: "purulia-dokra",
    titlePart1: "Purulia",
    titlePart2: "Dokra",
    fullTitle: "Bastar & Purulia Dokra Lost-Wax Metalcraft",
    olChiki: "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ",
    subCategory: "4,000-YR LOST-WAX METALLURGY",
    artist: "Santosh Hemrom & Purulia Bell-Metal Guild",
    giTag: "GI CERTIFIED METALLURGY",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1800&q=85",
    curatorialNote: "Non-ferrous bronze cast over clay cores using hand-wound pure beeswax filaments, celebrating sacred horned bison and hunting deities.",
    accentBadge: "Ancient Lost-Wax",
  },
  {
    id: "jadopatia-scroll",
    titlePart1: "Jado",
    titlePart2: "Patia",
    fullTitle: "Jadopatia Santhal Narrative Scrolls (Dumka)",
    olChiki: "ᱡᱟᱫᱳᱯᱟᱴᱤᱭᱟ",
    subCategory: "SANTHAL PARGANAS TRADITION",
    artist: "Champa Soren & Dumka Jadu Patuas",
    giTag: "SANTHAL ANCESTRAL LORE",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=85",
    curatorialNote: "Sacred narrative scrolls recited by wandering Jadu Patuas during rituals, painted with terracotta slip, lampblack, and wild tamarind seed gum.",
    accentBadge: "Ritual Archive",
  },
  {
    id: "ledra-textile",
    titlePart1: "Ledra",
    titlePart2: "Quilts",
    fullTitle: "Ledra Vintage Hand-Stitched Folk Quilts (Ramgarh Cantt)",
    olChiki: "ᱞᱮᱫᱽᱨᱟ ᱠᱤᱪᱨᱤᱡ",
    subCategory: "RAMGARH FOLK TEXTILE SHG",
    artist: "Ramgarh Cantt Rural Women Collective",
    giTag: "UPCYCLED HEIRLOOM",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1800&q=85",
    curatorialNote: "Layered vintage organic cotton lovingly hand-quilted with rhythmic running stitches and botanical dyes, providing dignified livelihood to Jharkhand rural women.",
    accentBadge: "Zero-Waste Quilt",
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<GallerySlide[]>(SANTHALI_SLIDES);
  const [isLiveCatalog, setIsLiveCatalog] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchLiveArtworks() {
      try {
        const artworks = await artworksApi.list();
        if (active && artworks && artworks.length > 0) {
          const mappedSlides: GallerySlide[] = artworks.map((art, idx) => {
            const words = art.title.trim().split(/\s+/);
            const mid = Math.ceil(words.length / 2);
            const part1 = words.slice(0, mid).join(" ");
            const part2 = words.slice(mid).join(" ");

            // Extract Ol Chiki or provide authentic script fallback
            const olChikiMatch = art.nativeDescription.match(/[\u1C50-\u1C7F\s]+/);
            const olChiki =
              olChikiMatch && olChikiMatch[0].trim().length > 3
                ? olChikiMatch[0].trim().slice(0, 30)
                : idx === 0
                ? "ᱥᱚᱦᱨᱟᱭ ᱠᱷᱳᱵᱟᱨ"
                : idx === 1
                ? "ᱫᱷᱚᱠᱨᱟ ᱢᱮᱬᱦᱮᱫ"
                : "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ";

            return {
              id: art.id,
              titlePart1: part1,
              titlePart2: part2,
              fullTitle: art.title,
              olChiki: olChiki,
              subCategory: (art.artForm || "INDIGENOUS MASTERWORK").toUpperCase(),
              artist: art.artisanName || art.custodian?.name || "Master Custodian",
              giTag: art.giTagNumber || `GI CERTIFIED #${art.id.slice(-6).toUpperCase()}`,
              image: resolveImageUrl(art.images && art.images[0]),
              curatorialNote:
                art.englishDescription ||
                art.nativeDescription ||
                "Living masterwork preserved under sovereign customary stewardship.",
              accentBadge:
                art.status === "AVAILABLE" ? "Living Masterwork" : "GI Protected",
            };
          });
          setSlides(mappedSlides);
          setIsLiveCatalog(true);
        }
      } catch (err) {
        console.warn("Using curated fallback slides for exhibition track:", err);
      }
    }
    fetchLiveArtworks();
    return () => {
      active = false;
    };
  }, []);

  // Bind scroll progress directly to this sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal translation across all 5 slides
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-auto md:h-[480vh] w-full bg-[#F9F6F0]">
      
      {/* Viewport: Relative on Mobile, Sticky 100vh on Desktop */}
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between pt-20 md:pt-24 pb-8 md:pb-10 select-none overflow-visible md:overflow-hidden">
        
        {/* Subtle Background Watermark in Ol Chiki */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-10 text-[18vw] font-mono text-[#2C2A29]/[0.025] pointer-events-none select-none tracking-widest whitespace-nowrap font-bold"
        >
          ᱢᱟᱴᱤ ᱜᱷᱟᱨ &middot; ᱥᱟᱱᱛᱟᱲᱤ
        </div>

        {/* Minimalist Top Museum Header Bar */}
        <header className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between z-30 pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              data-cursor="explore"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#1A1A1A]/70 hover:text-[#C25934] transition-colors py-1.5 px-3.5 sm:py-2 sm:px-4 rounded-full bg-[#F9F6F0]/80 backdrop-blur-md border border-[#C25934]/20 hover:bg-[#F9F6F0] shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Gatekeeper</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[#2C2A29]/15">
              <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-semibold text-[#1A1A1A]/80">
                MAATI GHAR &middot; 5 INDIGENOUS TRADITIONS
              </span>
            </div>
          </div>

          {/* Dynamic Scroll Progress Indicator - Desktop Horizontal Line */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-[#1A1A1A]/60">
              Living Scroll Track
            </span>
            <div className="hidden md:block w-28 sm:w-40 h-[1.5px] bg-[#1A1A1A]/15 relative overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-[#C25934]"
              />
            </div>
            <a
              href="#collection"
              data-cursor="explore"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
            >
              Atelier &darr;
            </a>
          </div>
        </header>

        {/* 1. MOBILE VERTICAL STACK (< 768px): Normal Vertical Scrolling */}
        <div className="flex md:hidden flex-col gap-10 sm:gap-14 px-4 md:px-8 lg:px-12 py-6 w-full z-20">
          {slides.map((slide, idx) => (
            <div
              key={`mobile-${slide.id}`}
              className="relative w-full flex flex-col gap-4 rounded-3xl bg-white/75 border border-[#C25934]/20 p-4 sm:p-6 shadow-sm overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-[#EFE9DF]">
                <img
                  src={slide.image}
                  alt={slide.fullTitle}
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-[#1C1A19]/30 pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-[#F9F6F0]/90 backdrop-blur-md text-[10px] font-mono tracking-wider font-bold uppercase text-[#1A1A1A] shadow-xs">
                    {slide.giTag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-accent/90 backdrop-blur-md text-white text-[10px] font-mono font-semibold shadow-xs">
                    {slide.accentBadge}
                  </span>
                </div>

                {/* Artist Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#1C1A19]/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-serif italic border border-white/10">
                  <span className="text-white/70">Artisan:</span>
                  <span className="font-sans font-semibold text-[#E5A882]">{slide.artist}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C25934] font-bold">
                  {slide.olChiki} &middot; {slide.subCategory}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A]">
                  <span>{slide.titlePart1}</span>{" "}
                  <span className="italic text-[#C25934]">{slide.titlePart2}</span>
                </h3>
              </div>

              {/* Curatorial Note & Action */}
              <div className="pt-3 border-t border-[#C25934]/15 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#C25934] font-bold uppercase">№ 0{idx + 1} Provenance</span>
                  <span className="text-accent font-semibold">Authentic Handcrafted</span>
                </div>
                <p className="text-xs text-[#1A1A1A]/80 font-sans leading-relaxed">
                  {slide.curatorialNote}
                </p>
                <a
                  href="#collection"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold shadow-xs hover:opacity-90 transition-opacity"
                >
                  <span>Explore in Maati Ghar Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2. DESKTOP HORIZONTAL STICKY MOTION TRACK (>= 768px) */}
        <div className="hidden md:flex relative w-full h-[60vh] sm:h-[65vh] lg:h-[68vh] items-center overflow-visible z-20">
          <motion.div
            style={{ x }}
            className="flex items-center gap-20 sm:gap-32 lg:gap-48 pl-6 sm:pl-16 lg:pl-24 pr-[25vw] h-full w-fit"
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="relative w-[82vw] sm:w-[70vw] lg:w-[58vw] h-full shrink-0 flex items-center"
              >
                {/* Large Edge-to-Edge Artwork Image Container */}
                <div
                  data-cursor="view"
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[#EFE9DF] group"
                >
                  <img
                    src={slide.image}
                    alt={slide.fullTitle}
                    className="w-full h-full object-cover object-center select-none scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />

                  {/* Dark & Warm Earthen Overlay for Contrast */}
                  <div className="absolute inset-0 bg-[#1C1A19]/35 pointer-events-none" />

                  {/* Floating Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#F9F6F0]/90 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-wider font-bold uppercase text-[#1A1A1A] shadow-sm">
                      {slide.giTag}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-accent/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-mono font-semibold shadow-sm">
                      {slide.accentBadge}
                    </span>
                  </div>

                  {/* Curatorial Artist Attribution Pill */}
                  <div className="absolute bottom-6 right-6 pointer-events-none hidden sm:flex items-center gap-2 bg-[#1C1A19]/75 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-serif italic border border-white/10">
                    <span>Artisan:</span>
                    <span className="font-sans font-semibold text-[#E5A882]">
                      {slide.artist}
                    </span>
                  </div>
                </div>

                {/* MASSIVE PLAYFAIR DISPLAY TYPOGRAPHY OVERLAPPING THE BOTTOM-LEFT EDGE */}
                <div className="absolute -bottom-8 sm:-bottom-12 lg:-bottom-16 -left-4 sm:-left-8 lg:-left-12 z-30 pointer-events-none select-none max-w-[88vw]">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#C25934] font-bold block mb-1 pl-1 drop-shadow-sm">
                    {slide.olChiki} &middot; {slide.subCategory}
                  </span>
                  <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal tracking-tight leading-[0.85] text-[#1A1A1A] whitespace-nowrap">
                    <span className="text-[#F9F6F0] drop-shadow-2xl">
                      {slide.titlePart1}
                    </span>{" "}
                    <span className="italic font-light text-[#C25934] drop-shadow-md">
                      {slide.titlePart2}
                    </span>
                  </h2>
                </div>

                {/* Floating Curatorial Specification Card Overlapping Top-Right Edge */}
                <div className="hidden md:flex absolute -top-6 -right-6 z-30 p-6 rounded-2xl bg-[#F9F6F0]/95 backdrop-blur-md border border-[#C25934]/20 shadow-2xl flex-col gap-3 max-w-xs pointer-events-auto">
                  <div className="flex items-center justify-between border-b border-[#C25934]/10 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                      № 0{idx + 1} Provenance
                    </span>
                    <span className="text-[10px] font-mono text-accent font-semibold">
                      Authentic Handcrafted
                    </span>
                  </div>

                  <p className="text-xs text-[#1A1A1A]/80 font-sans leading-relaxed font-normal">
                    {slide.curatorialNote}
                  </p>

                  <a
                    href="#collection"
                    data-cursor="explore"
                    className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#C25934] hover:text-[#A84724] transition-colors pt-1"
                  >
                    <span>View in Atelier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Minimalist Ledger & Scroll Hint */}
        <footer className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between z-30 pointer-events-none text-xs text-[#1A1A1A]/70 pt-4">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
<span className="text-[#C25934] font-bold">[ 01 &mdash; 0{slides.length} ]</span>
            <span className="hidden sm:inline">Ramgarh Cantt &bull; Hazaribagh &bull; Amadubi &bull; Purulia &bull; Dumka</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/60">
            <span className="hidden md:inline">Scroll Down to Advance Heritage Track</span>
            <span className="md:hidden">Maati Ghar Heritage Arc</span>
            <Compass className="w-3.5 h-3.5 text-[#C25934] animate-spin [animation-duration:8s]" />
          </div>
        </footer>

      </div>
    </section>
  );
}
