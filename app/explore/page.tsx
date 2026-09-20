import React from "react";
import HorizontalGallery from "@/components/HorizontalGallery";
import TextMarquee from "@/components/TextMarquee";
import ArtistListHoverReveal from "@/components/ArtistListHoverReveal";
import CulturalMap from "@/components/CulturalMap";
import ArtDetails from "@/components/ArtDetails";

export const metadata = {
  title: "Sohrai Khovar & Dokra Metalcraft | ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ | Mitti Heritage",
  description:
    "Explore authentic Santhali Sohrai Khovar mud murals and Purulia Dokra metalcraft with our Awwwards-winning horizontal gallery and Digital Cultural Pledge Engine.",
};

export default function ExplorePage() {
  return (
    <div className="w-full min-h-screen bg-[#F9F6F0] flex flex-col">
      
      {/* 1. HORIZONTAL STICKY SCROLL SECTION (AWWWARDS EDITORIAL HERO) */}
      <HorizontalGallery />

      {/* 2. INFINITE OUTLINED EDITORIAL TEXT MARQUEE DIVIDER */}
      <TextMarquee />

      {/* 3. TRIBAL ARTISTS ULTRA-PREMIUM HOVER IMAGE REVEAL DIRECTORY */}
      <ArtistListHoverReveal />

      {/* 4. ABSTRACT ANCESTRAL TOPOGRAPHY MAP */}
      <CulturalMap />

      {/* 3. EXTREME NEGATIVE SPACE TRANSITION & DIGITAL PLEDGE ENGINE */}
      <div
        id="pledge-engine"
        className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 flex flex-col gap-12"
      >
        {/* Curatorial Header */}
        <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-8">
          <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.3em] uppercase font-semibold">
            <span>ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ</span>
            <span>&middot;</span>
            <span>SECTION 02: SOVEREIGN DIGITAL PLEDGE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-textPrimary tracking-tight">
            Cultural Lore, Ol Chiki AI Story &amp; Consent Engine
          </h2>

          <p className="text-sm sm:text-base text-textPrimary/75 font-sans max-w-2xl font-light leading-relaxed">
            In accordance with Santhal customary ethics, physical and digital acquisitions are locked until you solemnly accept Muni Devi&apos;s sacred community rules.
          </p>
        </div>

        {/* The Digital Pledge Engine & Cultural Story Details */}
        <ArtDetails />
      </div>

    </div>
  );
}
