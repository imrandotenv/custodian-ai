import React from "react";
import HorizontalGallery from "@/components/HorizontalGallery";
import TextMarquee from "@/components/TextMarquee";
import MaatiGharCollection from "@/components/MaatiGharCollection";
import ArtistListHoverReveal from "@/components/ArtistListHoverReveal";
import CulturalMap from "@/components/CulturalMap";
import ArtDetails from "@/components/ArtDetails";
import PaymentButton from "@/components/PaymentButton";

export const metadata = {
  title: "Maati Ghar Atelier (माटी घर) | Indigenous Tribal Arts of Jharkhand",
  description:
    "Explore authentic Sohrai Khovar mud murals, Paitkar scrolls, Dokra metalcraft, Ledra quilts, and handcrafted terracotta from Ramgarh Cantt, Jharkhand.",
};

export default function ExplorePage() {
  return (
    <div className="w-full min-h-screen bg-[#F9F6F0] flex flex-col">
      
      {/* 1. HORIZONTAL STICKY SCROLL SECTION (5 INDIGENOUS TRADITIONS) */}
      <HorizontalGallery />

      {/* 2. INFINITE OUTLINED EDITORIAL TEXT MARQUEE DIVIDER */}
      <TextMarquee />

      {/* 3. MAATI GHAR ATELIER & HANDCRAFTED CURATED COLLECTION */}
      <div id="collection">
        <MaatiGharCollection />
      </div>

      {/* 4. TRIBAL ARTISTS ULTRA-PREMIUM HOVER IMAGE REVEAL DIRECTORY */}
      <ArtistListHoverReveal />

      {/* 5. ABSTRACT ANCESTRAL TOPOGRAPHY MAP (CHOTA NAGPUR PLATEAU) */}
      <CulturalMap />

      {/* 6. EXTREME NEGATIVE SPACE TRANSITION & DIGITAL PLEDGE ENGINE */}
      <div
        id="pledge-engine"
        className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 flex flex-col gap-12"
      >
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C25934]/15 pb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-mono text-[11px] tracking-[0.3em] uppercase font-semibold">
              <span>ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ &middot; माटी घर</span>
              <span>&middot;</span>
              <span>SOVEREIGN DIGITAL PLEDGE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-textPrimary tracking-tight">
              Cultural Lore, Natural Soil Story &amp; Consent Engine
            </h2>

            <p className="text-sm sm:text-base text-textPrimary/75 font-sans max-w-2xl font-light leading-relaxed">
              In accordance with Santhal customary ethics and Maati Ghar principles, acquisitions and atelier visits are bound by Muni Devi and our rural women SHG community rules.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="text-[11px] text-textPrimary/60 font-mono uppercase tracking-wider">Direct Fair-Trade Gateway</span>
            <PaymentButton amount={500} recipientName="Muni Devi (Artisan)" />
          </div>
        </div>

        {/* The Digital Pledge Engine & Cultural Story Details */}
        <ArtDetails />
      </div>

    </div>
  );
}
