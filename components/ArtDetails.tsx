"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Check,
  Heart,
  Share2,
  UserCheck,
} from "lucide-react";
import CulturalStoryView from "./CulturalStoryView";
import SmartConsent from "./SmartConsent";
import ParallaxImage from "./ParallaxImage";
import TiltCard from "./TiltCard";
import RevealText from "./RevealText";
import { artworksApi, resolveImageUrl, Artwork } from "@/lib/api";

export default function ArtDetails() {
  const [featuredArtwork, setFeaturedArtwork] = useState<Artwork | null>(null);
  const [companionArtwork, setCompanionArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadArtworks() {
      try {
        const list = await artworksApi.list();
        if (mounted && list && list.length > 0) {
          setFeaturedArtwork(list[0]);
          if (list.length > 1) {
            setCompanionArtwork(list[1]);
          }
        }
      } catch (err) {
        console.warn("Using curated default heritage artwork details:", err);
      }
    }
    loadArtworks();
    return () => {
      mounted = false;
    };
  }, []);

  const artworkTitle = featuredArtwork?.title || "Sohrai Khovar Mud Painting (Hazaribagh)";
  const artisanName =
    featuredArtwork?.artisanName ||
    featuredArtwork?.custodian?.name ||
    "Muni Devi (Sohrai Artist)";
  const originHamlet =
    featuredArtwork?.originHamlet ||
    featuredArtwork?.custodian?.hamlet ||
    "Hazaribagh, Jharkhand";
  const giTag = featuredArtwork?.giTagNumber || "GI Tag #JH-SOHRAI-2020";
  const artworkPrice = featuredArtwork
    ? `₹ ${featuredArtwork.price.toLocaleString("en-IN")}`
    : "₹ 18,500";
  const primaryImage =
    featuredArtwork?.images && featuredArtwork.images.length > 0
      ? resolveImageUrl(featuredArtwork.images[0])
      : "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85";
  const englishLore =
    featuredArtwork?.englishDescription ||
    "In Hazaribagh, the ancient forested plateau of Jharkhand, Sohrai Khovar is celebrated by tribal women painters. Black manganese-rich mud from the sacred riverbed is applied as the base coat. Once dry, creamy white Dudhi Mati kaolin clay is brushed across. While still wet, master artists like Muni Devi use four fingers, porcupine quills, and broken combs to carve sacred geometric birds, pregnant cows, and forest Sal trees into the wall reliefs.";
  const shortNote = featuredArtwork?.englishDescription
    ? featuredArtwork.englishDescription.slice(0, 160) +
      (featuredArtwork.englishDescription.length > 160 ? "..." : "")
    : "Layered with black manganese earth, coated with white Dudhi kaolin clay, and scraped by hand using broken combs to celebrate the post-harvest Sohrai festival.";

  // Companion Dokra tradition
  const compTitle = companionArtwork?.title || "Bastar & Purulia Dokra Metalcraft";
  const compImage =
    companionArtwork?.images && companionArtwork.images.length > 0
      ? resolveImageUrl(companionArtwork.images[0])
      : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80";
  const compDesc =
    companionArtwork?.englishDescription ||
    "Hand-wound beeswax threads over clay cores, cast in bell-metal bronze honoring the sacred horned bison and hunting spirits of the Purulia hills.";

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col gap-12 overflow-hidden">
      {/* Subtle Background Watermark: Ol Chiki (Santhali Script) meaning 'Santhali Culture' */}
      <div
        aria-hidden="true"
        className="absolute top-12 right-0 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mono text-[#2C2A29]/[0.035] pointer-events-none select-none tracking-widest -rotate-6 font-bold"
      >
        ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ
      </div>

      {/* Breadcrumb & Authentic Heritage Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C25934]/15 pb-4 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-primary font-semibold">
              ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ
            </span>
            <span className="text-xs text-textPrimary/40">&middot;</span>
            <span className="text-xs text-textPrimary/70 font-sans">
              {originHamlet} &middot; Indigenous Arc
            </span>
          </div>
          <span className="text-xs text-textPrimary/60">
            Jharkhand &amp; West Bengal &middot; Living Sovereign Archive
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold flex items-center gap-1 border border-accent/30 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            {giTag}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#C25934]/10 text-primary font-semibold border border-[#C25934]/20 font-serif">
            100% Custodian Remuneration
          </span>
        </div>
      </div>

      {/* Main Art Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        {/* Left Column: Artwork Presentation & Anthropological Lore */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Handcrafted Visual Container: Sohrai Khovar Mud Painting with 3D Tilt & Window Reveal Parallax */}
          <TiltCard
            className="w-full"
            innerClassName="rounded-3xl"
            maxRotation={6}
            perspective={1000}
            maxGlareOpacity={0.22}
          >
            <div className="relative rounded-3xl bg-white/85 border border-[#C25934]/20 p-8 md:p-10 shadow-sm overflow-hidden flex flex-col gap-6">
              {/* Santhali Folk Art Canvas with Smooth Parallax */}
              <ParallaxImage
                src={primaryImage}
                alt={`${artworkTitle} by ${artisanName}`}
                className="aspect-[4/3] w-full rounded-2xl border border-[#C25934]/25 shadow-inner"
                parallaxRange={["-10%", "10%"]}
                scale={1.2}
                dataCursor="view"
              >
                {/* Subtle Dark Earthen Overlay */}
                <div className="absolute inset-0 bg-[#1C1A19]/30 pointer-events-none" />

                {/* Subtle Tribal Geometric Border Motif */}
                <div className="absolute inset-3 border border-dashed border-white/25 rounded-xl pointer-events-none" />

                {/* Verified Artisan Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#C25934]/20 text-xs flex items-center gap-1.5 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-textPrimary font-semibold">{artisanName}</span>
                  <span className="text-textPrimary/60">&middot; {originHamlet}</span>
                </div>

                {/* Top Provenance Badge */}
                <div className="absolute top-4 right-4 bg-[#F9F6F0]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C25934]/20 text-[10px] font-mono tracking-wider text-[#C25934] font-bold shadow-2xs">
                  {giTag}
                </div>
              </ParallaxImage>

              {/* Artwork Metadata Header below image */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-accent font-semibold">
                    ᱥᱚᱦᱨᱟᱭ ᱠᱷᱳᱵᱟᱨ
                  </span>
                  <span className="text-textPrimary/40">&middot;</span>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-primary font-bold">
                    GI Tagged Heritage
                  </span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-textPrimary leading-tight">
                  {artworkTitle}
                </h2>

                <p className="text-xs text-textPrimary/75 max-w-prose font-sans leading-relaxed">
                  {shortNote}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#C25934]/10 text-xs text-textPrimary/70">
                <span className="italic font-serif">Original Certified Wall Plaque &middot; Single Cast Edition</span>
                <div className="flex items-center gap-3">
                  <button type="button" className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                    <Heart className="w-4 h-4" />
                    <span>Favorite</span>
                  </button>
                  <button type="button" className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Allied Exhibition Companion: Bastar & Purulia Dokra Metalcraft with 3D Tilt & Parallax */}
          <TiltCard
            className="w-full"
            innerClassName="rounded-3xl"
            maxRotation={5}
            perspective={1000}
            maxGlareOpacity={0.18}
          >
            <div className="p-6 rounded-3xl bg-white/80 border border-[#C25934]/15 shadow-xs flex flex-col sm:flex-row items-center gap-5">
              <ParallaxImage
                src={compImage}
                alt={`${compTitle} Lost-Wax Metallurgy`}
                className="w-full sm:w-36 h-28 rounded-2xl bg-[#1C1A19] shrink-0"
                parallaxRange={["-10%", "10%"]}
                scale={1.2}
                dataCursor="view"
              >
                <span className="absolute bottom-2 left-2 text-[9px] font-mono uppercase px-2 py-0.5 rounded-md bg-black/60 text-white font-bold">
                  Dokra
                </span>
              </ParallaxImage>
              <div className="flex flex-col gap-1.5 text-left w-full">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-semibold">
                    Companion Tradition
                  </span>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    4,000-Yr Lost-Wax Casting
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-textPrimary">
                  {compTitle}
                </h3>
                <p className="text-xs text-textPrimary/75 font-sans leading-relaxed max-w-prose">
                  {compDesc}
                </p>
              </div>
            </div>
          </TiltCard>

          {/* AI-Powered Living Language Accessibility Feature */}
          <CulturalStoryView
            originalText={featuredArtwork?.nativeDescription}
            englishTranslatedText={featuredArtwork?.englishDescription}
            artisanName={artisanName}
            originHamlet={originHamlet}
            artForm={featuredArtwork?.artForm || "Sohrai Khovar Mud Painting"}
            originalLanguageLabel="Original Santhali (Ol Chiki)"
            translatedLanguageLabel="Global English"
          />

          {/* Anthropological & Cultural Story Card */}
          <div className="bg-white/85 rounded-3xl p-8 md:p-10 border border-[#C25934]/15 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#C25934]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-semibold block">
                  ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮᱨᱣᱟ &middot; LIVING TRADITIONS
                </span>
                <h3 className="font-serif text-2xl font-bold text-textPrimary mt-0.5">
                  The Sacred Lore &amp; Lineage
                </h3>
              </div>
            </div>

            <RevealText
              text={englishLore}
              className="text-sm md:text-base text-textPrimary/85 leading-relaxed font-sans max-w-2xl"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 text-xs">
                <span className="text-textPrimary/60 block font-mono">Technique:</span>
                <span className="font-semibold text-textPrimary text-sm mt-0.5 block font-serif">Comb-Cut Sgraffito</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 text-xs">
                <span className="text-textPrimary/60 block font-mono">Minerals:</span>
                <span className="font-semibold text-textPrimary text-sm mt-0.5 block font-serif">Dudhi Clay &amp; Manganese</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 text-xs">
                <span className="text-textPrimary/60 block font-mono">Occasion:</span>
                <span className="font-semibold text-textPrimary text-sm mt-0.5 block font-serif">Winter Harvest (Sohrai)</span>
              </div>
            </div>

            {/* Custodian Heritage Statement */}
            <div className="p-5 rounded-2xl bg-[#849A89]/10 border border-[#849A89]/30 flex items-start gap-3 mt-2">
              <UserCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-textPrimary font-mono">
                  {artisanName}&apos;s Living Ethics Statement
                </p>
                <RevealText
                  text="“When visitors view our sacred walls, they are looking into our prayers to our cows and the Jaher Than grove. We welcome all ethical travelers to cherish this heritage, provided they respect our living customs.”"
                  className="text-xs sm:text-sm text-textPrimary/80 mt-1.5 leading-relaxed italic font-serif"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Summary & The Core USP: SmartConsent Component */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-24">
          {/* Pricing & Acquisition Summary Card */}
          <div className="bg-white/95 rounded-3xl p-8 border border-[#C25934]/20 shadow-sm flex flex-col gap-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-textPrimary/60 uppercase tracking-wider block font-mono">
                  Fair-Trade Cultural Acquisition
                </span>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-textPrimary">
                    {artworkPrice}
                  </span>
                  <span className="text-xs text-textPrimary/60">/ complete artwork + workshop residency</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent font-mono">
                1 Piece Available
              </span>
            </div>

            <div className="text-xs text-textPrimary/75 border-t border-[#C25934]/10 pt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Includes guided {originHamlet} studio immersion</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>100% direct remuneration to {artisanName}</span>
              </div>
            </div>
          </div>

          {/* THE CORE USP COMPONENT: SmartConsent */}
          <SmartConsent
            artworkId={featuredArtwork?.id}
            artisanName={artisanName}
            originHamlet={originHamlet}
            artTitle={artworkTitle}
          />
        </div>
      </div>
    </div>
  );
}
