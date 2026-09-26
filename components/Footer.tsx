"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Compass, ShieldCheck, Sparkles, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="relative min-h-[70vh] w-full bg-[#C25934] text-[#F9F6F0] overflow-x-hidden overflow-y-hidden flex flex-col justify-between pt-14 sm:pt-20 pb-8 sm:pb-10 px-4 md:px-8 lg:px-12 select-none"
    >
      {/* 1. SUBTLE TRIBAL GEOMETRIC BACKGROUND PATTERN */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.14] transition-opacity duration-700"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L64 32 L32 64 L0 32 Z' fill='none' stroke='%23F9F6F0' stroke-width='1.2' stroke-dasharray='3 3'/%3E%3Ccircle cx='32' cy='32' r='3.5' fill='%23F9F6F0'/%3E%3Cpath d='M0 0 L16 16 M64 0 L48 16 M0 64 L16 48 M64 64 L48 48' stroke='%23F9F6F0' stroke-width='0.8'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 2. TOP EDITORIAL HEADER & NAVIGATION LEDGER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-[#F9F6F0]/20 pb-12">
        
        {/* Left: Brand Lore & Maati Ghar Social Enterprise Mission */}
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9F6F0] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-semibold text-[#F9F6F0]/80">
              माटी घर &middot; FROM THE EARTH, FOR THE SOUL
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F9F6F0] tracking-tight leading-snug">
            Sovereign Art from the Heart of Jharkhand.
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#F9F6F0]/80 leading-relaxed font-light max-w-md">
            A grassroots social enterprise celebrating Jharkhand&apos;s indigenous tribal arts, organic earthen crafts, and rural women Self-Help Groups (SHGs). 100% natural earth pigments, zero toxic chemicals, and direct fair-trade artisan remuneration.
          </p>

          <div className="flex flex-col gap-1.5 pt-2 text-xs font-mono text-[#F9F6F0]/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F9F6F0]/70" />
              <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#F9F6F0]/70" />
              <a
                href="https://wa.me/917260815628"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-bold"
              >
                WhatsApp: +91 72608 15628
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#F9F6F0]/70" />
              <a href="mailto:maatikaghar@gmail.com" className="hover:underline">
                maatikaghar@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: Curatorial Navigation Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto">
          {/* Column 1: Atelier Collection */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0]/60 font-semibold">
              Atelier
            </span>
            <Link
              href="/explore#collection"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>Maati Ghar Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="/explore"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>5 Sacred Traditions</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="/explore#cultural-map"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>Living Atelier Map</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="/explore#pledge-engine"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>Digital Consent Pledge</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </div>

          {/* Column 2: Sovereign Artisans */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0]/60 font-semibold">
              Custodians
            </span>
            <Link
              href="/dashboard"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>Artisan Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="/add-art"
              data-cursor="explore"
              className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 hover:text-[#F9F6F0] hover:translate-x-1 transition-all flex items-center gap-1"
            >
              <span>Catalog New Art</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <span className="text-xs sm:text-sm font-serif text-[#F9F6F0]/80">
              Ramgarh Women SHG
            </span>
            <span className="text-xs sm:text-sm font-serif text-[#F9F6F0]/80">
              Amadubi Chitrakars
            </span>
          </div>

          {/* Column 3: Heritage Provenance */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F9F6F0]/60 font-semibold">
              Provenance
            </span>
            <span className="text-xs text-[#F9F6F0]/85 font-mono">
              Ramgarh &bull; Hazaribagh
            </span>
            <span className="text-xs text-[#F9F6F0]/85 font-mono">
              Amadubi &bull; Dumka
            </span>
            <span className="text-xs text-[#F9F6F0]/85 font-mono">
              GI Tag #JH-SOHRAI-2020
            </span>
            <span className="text-xs text-[#F9F6F0]/85 font-mono">
              100% Soil &amp; Mineral Dyes
            </span>
          </div>
        </div>

      </div>

      {/* 3. THE CENTERPIECE: MASSIVE AWWWARDS-STYLE EDITORIAL TYPOGRAPHY */}
      <div className="relative z-10 w-full my-auto py-8 sm:py-12 md:py-16 flex items-center justify-center overflow-hidden">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="explore"
          data-cursor-text="MAATI"
          className="group relative cursor-pointer text-center w-full max-w-[96vw]"
        >
          {/* Subtle Tribal Motif Highlight inside container */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl ${
              isHovered ? "opacity-35" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='24,4 44,24 24,44 4,24' fill='none' stroke='%23F9F6F0' stroke-width='1.5'/%3E%3Ccircle cx='24' cy='24' r='3' fill='%23F9F6F0'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* Massive Centerpiece Text: MAATI GHAR */}
          <h2
            className="font-serif text-5xl sm:text-7xl md:text-[11vw] lg:text-[13vw] font-bold uppercase tracking-tight leading-[0.88] select-none text-[#F9F6F0] hover:text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_#F9F6F0] group-hover:[-webkit-text-stroke:2px_#F9F6F0] drop-shadow-sm transform group-hover:scale-[1.01] will-change-transform max-w-full overflow-hidden"
          >
            MAATI GHAR
          </h2>

          {/* Floating Hindi & Ol Chiki Subtitle Pill */}
          <div className="mt-2 sm:mt-4 flex items-center justify-center gap-3 text-xs font-mono tracking-[0.35em] uppercase text-[#F9F6F0]/70 group-hover:text-[#F9F6F0] transition-colors">
            <span>माटी घर</span>
            <span>&middot;</span>
            <span>FROM THE EARTH, FOR THE SOUL</span>
            <span>&middot;</span>
            <span>ᱥᱟᱱᱛᱟᱲᱤ</span>
          </div>
        </div>
      </div>

      {/* 4. TINY MINIMALIST BOTTOM CORNERS (COPYRIGHT & LEGAL) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-8 border-t border-[#F9F6F0]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F9F6F0]/70 uppercase">
        
        {/* Left: Copyright & Customary Ownership */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} MAATI GHAR SOCIAL ENTERPRISE</span>
          <span>&middot;</span>
          <span>RAMGARH CANTT</span>
        </div>

        {/* Center: Back To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          data-cursor="explore"
          data-cursor-text="TOP"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9F6F0]/10 hover:bg-[#F9F6F0] hover:text-[#C25934] transition-all cursor-pointer font-bold shadow-2xs"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3 h-3" />
        </button>

        {/* Right: Anthropological Registry & GI Tag Notice */}
        <div className="flex items-center gap-2 text-center sm:text-right">
          <span>GI #JH-SOHRAI-2020</span>
          <span>&middot;</span>
          <span>JHARKHAND TRIBAL CRAFT</span>
        </div>

      </div>

    </footer>
  );
}
