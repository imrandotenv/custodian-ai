"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Heart,
  Eye,
  X,
  MessageCircle,
  Share2,
  Info,
  Leaf,
  Layers,
  Flame,
  Award,
  MapPin,
  Languages,
} from "lucide-react";
import { DEMO_ARTISANS, DemoArtisan } from "@/lib/demoData";

const CATEGORIES = [
  { id: "all", label: "All Crafts", count: 15 },
  { id: "sohrai-painting", label: "Sohrai Painting", count: 5 },
  { id: "dokra-craft", label: "Dokra Craft", count: 4 },
  { id: "santhali-handloom", label: "Santhali Handloom", count: 4 },
  { id: "bamboo-craft", label: "Bamboo Craft", count: 1 },
  { id: "embroidery", label: "Embroidery", count: 1 },
];

const SACRED_PIGMENTS = [
  {
    name: "Lal Mati",
    hindi: "लाल माटी",
    color: "#B84A28",
    description: "Raw red terracotta laterite mud symbolizing fertility, harvest life force, and the womb of mother nature.",
  },
  {
    name: "Dudhi Mati",
    hindi: "दूधी माटी",
    color: "#FAF6EE",
    border: "#C25934",
    textColor: "#1A1A1A",
    description: "Creamy white river kaolin clay scraped with combs to reveal underlying dark mud reliefs.",
  },
  {
    name: "Pili Mati",
    hindi: "पीली माटी",
    color: "#D9822B",
    description: "Sun-dried natural yellow mineral ochre honoring solar energy, ripening paddy, and prosperity.",
  },
  {
    name: "Bhalo Char",
    hindi: "भालो चार",
    color: "#1C1917",
    description: "Riverbed manganese silt and hearth charcoal soot providing the velvety dark foundational coat.",
  },
];

export default function MaatiGharCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<"all" | "Jharkhand" | "West Bengal">("all");
  const [activeModalProduct, setActiveModalProduct] = useState<DemoArtisan | null>(null);
  const [modalStoryLanguage, setModalStoryLanguage] = useState<"hindi" | "english">("hindi");
  const [reservedSuccessId, setReservedSuccessId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const filteredProducts = DEMO_ARTISANS.filter((item) => {
    const categoryMatches =
      selectedCategory === "all" || item.categoryKey === selectedCategory;
    const stateMatches =
      selectedState === "all" || item.state === selectedState;
    return categoryMatches && stateMatches;
  });

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenReserve = (product: DemoArtisan, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveModalProduct(product);
    setModalStoryLanguage("hindi");
  };

  const handleConfirmReservation = (product: DemoArtisan) => {
    setReservedSuccessId(product.id);
    setTimeout(() => {
      setActiveModalProduct(null);
      setReservedSuccessId(null);
    }, 2400);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative select-none">
      
      {/* 1. TOP CURATORIAL HEADER DIRECTLY INSPIRED BY MAATIGHAR.COM */}
      <div className="flex flex-col gap-4 border-b border-[#C25934]/15 pb-10 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C25934] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#C25934] font-bold">
              माटी घर संग्रह &middot; 15 INDIGENOUS CUSTODIANS
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A]/70 bg-[#C25934]/10 border border-[#C25934]/20 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C25934]" />
            <span>Ramgarh Cantt &bull; 90% Direct Artisan Remuneration</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
              Art from the Heart of Jharkhand &amp; Bengal
            </h2>
            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-sans max-w-2xl font-light leading-relaxed mt-2">
              Browse 15 certified tribal masters across Hazaribagh, Ramgarh, Dumka, Purulia, Seraikela, West Singhbhum, and Bankura. Hand-crafted with authentic mud pigments, pit looms, and lost-wax kilns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            {/* Regional Filter Switcher */}
            <div className="flex items-center gap-1 bg-white/80 p-1 rounded-full border border-[#C25934]/20 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedState("all")}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  selectedState === "all"
                    ? "bg-[#C25934] text-[#F9F6F0] font-bold"
                    : "text-[#1A1A1A]/70 hover:text-[#C25934]"
                }`}
              >
                All Regions ({DEMO_ARTISANS.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedState("Jharkhand")}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  selectedState === "Jharkhand"
                    ? "bg-[#C25934] text-[#F9F6F0] font-bold"
                    : "text-[#1A1A1A]/70 hover:text-[#C25934]"
                }`}
              >
                Jharkhand (10)
              </button>
              <button
                type="button"
                onClick={() => setSelectedState("West Bengal")}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  selectedState === "West Bengal"
                    ? "bg-[#C25934] text-[#F9F6F0] font-bold"
                    : "text-[#1A1A1A]/70 hover:text-[#C25934]"
                }`}
              >
                Bengal (5)
              </button>
            </div>

            <a
              href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20art%20and%20custom%20murals."
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="explore"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F9F6F0] border border-[#C25934]/30 hover:border-[#C25934] text-xs font-serif font-bold text-[#C25934] hover:bg-[#C25934] hover:text-[#F9F6F0] transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. SACRED EARTH MINERALS PALETTE GUIDE BAR */}
      <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-[#C25934]/10 pb-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#C25934]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-bold">
              The 4 Sacred Earth Pigments &bull; चार प्राकृतिक रंग
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest hidden sm:inline">
            Zero Synthetic Acrylics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SACRED_PIGMENTS.map((pigment) => (
            <div
              key={pigment.name}
              className="p-4 rounded-2xl bg-[#F9F6F0]/80 border border-[#C25934]/15 flex flex-col gap-2 transition-transform hover:-translate-y-0.5 duration-200"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-black/10"
                  style={{
                    backgroundColor: pigment.color,
                    borderColor: pigment.border || "rgba(0,0,0,0.1)",
                  }}
                />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                    {pigment.name}
                  </span>
                  <span className="text-xs font-sans text-[#C25934] font-medium">
                    {pigment.hindi}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#1A1A1A]/70 font-sans leading-relaxed">
                {pigment.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY FILTER NAVIGATION PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-serif font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#C25934] text-[#F9F6F0] shadow-md scale-[1.02]"
                  : "bg-white/80 hover:bg-[#F9F6F0] text-[#1A1A1A]/80 border border-[#C25934]/15 hover:border-[#C25934]/40"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-[#F9F6F0]/20 text-white"
                    : "bg-[#1A1A1A]/5 text-[#1A1A1A]/60"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. PRODUCT CARDS GRID (15 ARTISANS) */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch"
      >
        <AnimatePresence>
          {filteredProducts.map((artisan) => {
            const isLiked = likedIds.includes(artisan.id);

            return (
              <motion.article
                key={artisan.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleOpenReserve(artisan)}
                className="group relative rounded-3xl bg-white/85 border border-[#C25934]/20 hover:border-[#C25934]/50 shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Top Image Showcase */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE9DF] mb-4">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-black/10 transition-colors" />

                  {/* Top Left Art Form Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#F9F6F0]/95 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider uppercase text-[#1A1A1A] shadow-xs border border-black/5">
                      {artisan.artForm}
                    </span>
                  </div>

                  {/* Top Right Heart Action */}
                  <button
                    type="button"
                    onClick={(e) => toggleLike(artisan.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] hover:text-[#C25934] transition-colors shadow-xs"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-[#C25934] text-[#C25934]" : ""
                      }`}
                    />
                  </button>

                  {/* Bottom Village Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-xl">
                    <span className="font-serif italic truncate max-w-[60%]">
                      {artisan.name}
                    </span>
                    <span className="font-mono text-[#E5A882] text-[9px] truncate max-w-[40%]">
                      {artisan.villageDistrict}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                    <span>{artisan.olChiki}</span>
                    <span>&bull;</span>
                    <span>{artisan.district}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#C25934] transition-colors leading-snug">
                    {artisan.name} &bull; <span className="font-normal font-sans text-sm">{artisan.hindiName}</span>
                  </h3>

                  {/* Original Story Hindi snippet */}
                  <p className="text-xs text-[#1A1A1A]/80 font-sans line-clamp-2 mt-1 leading-relaxed italic bg-[#F9F6F0]/90 p-2 rounded-xl border border-[#C25934]/10">
                    &ldquo;{artisan.originalStory}&rdquo;
                  </p>

                  {/* Materials Pill Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {artisan.materials.map((m) => (
                      <span
                        key={m}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#C25934]/10 text-[#C25934] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Fair-Trade Remuneration Footer */}
                <div className="mt-5 pt-3.5 border-t border-[#C25934]/15 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">
                      Fair-Trade Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl font-bold text-[#1A1A1A]">
                        ₹{artisan.priceInINR.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-accent font-semibold">
                      ₹{artisan.artisanShareInINR.toLocaleString("en-IN")} (90%) directly to {artisan.name.split(" ")[0]}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenReserve(artisan, e)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold group-hover:opacity-95 shadow-xs transition-opacity"
                  >
                    <span>Read Lore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 5. WHY MAATI GHAR? SOCIAL ENTERPRISE PILLARS */}
      <div className="mt-20 pt-12 border-t border-[#C25934]/15">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C25934] font-bold block mb-1">
            OUR SACRED PRINCIPLES &bull; हमारा संकल्प
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Why Maati Ghar &middot; From the Earth, For the Soul
          </h3>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-sans mt-2">
            Rooted in Ramgarh Cantt, Jharkhand, we protect ancient tribal artistic sovereignty from industrial copycats and commercial middlemen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              100% Earthen Soil Pigments
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              No toxic acrylics or synthetic primers. We only use Dudhi kaolin mud, laterite Lalmati, mineral yellow ochre, and hearth soot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              90% Direct Artisan Remuneration
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              90% of every acquisition directly reaches the rural artisans and women Self-Help Groups across Jharkhand and Bengal.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9822B]/15 text-[#D9822B] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              GI-Tagged Cultural Sovereignty
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Protected under Geographical Indication (GI Tag #JH-SOHRAI-2020), ensuring every motif honors sacred ancestral rites.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Custom Murals &amp; Kiln Decor
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Commission our master women painters for original earthen wall murals, architectural installations, and corporate tribal art spaces.
            </p>
          </div>
        </div>
      </div>

      {/* 6. ARTWORK RESERVATION & INQUIRY MODAL WITH BILINGUAL STORY TOGGLE */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#F9F6F0] rounded-3xl border border-[#C25934]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#C25934]/15 flex items-start justify-between bg-white/60">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                      {activeModalProduct.artForm}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C25934]/10 text-[#C25934]">
                      {activeModalProduct.giTag || "GI Certified"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
                    {activeModalProduct.name} &bull; <span className="font-normal font-sans text-base text-[#C25934]">{activeModalProduct.hindiName}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/70 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C25934]" />
                    <span>{activeModalProduct.villageDistrict} ({activeModalProduct.coordinates.latLong})</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 hover:bg-[#C25934] hover:text-[#F9F6F0] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-6">
                {/* Image & Quick Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#1C1A19]">
                    <img
                      src={activeModalProduct.image}
                      alt={activeModalProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Master Artisan Lineage
                      </span>
                      <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                        {activeModalProduct.name} ({activeModalProduct.olChiki})
                      </span>
                      <span className="text-[#C25934] block text-[11px]">
                        {activeModalProduct.district}, {activeModalProduct.state}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Dimensions &amp; Craft Medium
                      </span>
                      <span className="font-sans font-semibold text-[#1A1A1A]">
                        {activeModalProduct.dimensions}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Natural Muds, Dyes &amp; Minerals
                      </span>
                      <span className="font-sans text-[#1A1A1A] font-medium">
                        {activeModalProduct.materials.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Oral Lore: Bilingual Story Box */}
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/90 border border-[#C25934]/20 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#C25934]/15 pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#C25934] font-bold">
                      Oral Living Memory &bull; मूल लोक गाथा
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setModalStoryLanguage("hindi")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          modalStoryLanguage === "hindi"
                            ? "bg-[#C25934] text-white font-bold"
                            : "bg-[#1A1A1A]/5 text-[#1A1A1A]/70 hover:text-[#C25934]"
                        }`}
                      >
                        Hindi (Original)
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalStoryLanguage("english")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          modalStoryLanguage === "english"
                            ? "bg-[#C25934] text-white font-bold"
                            : "bg-[#1A1A1A]/5 text-[#1A1A1A]/70 hover:text-[#C25934]"
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/85 font-sans leading-relaxed italic pt-1">
                    {modalStoryLanguage === "hindi" ? (
                      <span>&ldquo;{activeModalProduct.originalStory}&rdquo;</span>
                    ) : (
                      <span>&ldquo;{activeModalProduct.englishStory}&rdquo;</span>
                    )}
                  </p>
                </div>

                {/* Fair-Trade Remuneration Breakdown */}
                <div className="p-4 rounded-2xl bg-white/90 border border-[#C25934]/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60">
                      Transparent Fair-Trade Value
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-mono font-bold">
                      Direct Sovereign Payout (90%)
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-[#C25934]/10 pt-2">
                    <span className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      ₹{activeModalProduct.priceInINR.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#1A1A1A]/70">
                      Direct Artisan Remuneration:{" "}
                      <strong className="text-[#C25934]">
                        ₹{activeModalProduct.artisanShareInINR.toLocaleString("en-IN")} (90%)
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-5 sm:p-6 border-t border-[#C25934]/15 bg-white/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20would%20like%20to%20connect%20with%20artisan%20${encodeURIComponent(
                    activeModalProduct.name
                  )}%20from%20${encodeURIComponent(
                    activeModalProduct.villageDistrict
                  )}%20regarding%20${encodeURIComponent(activeModalProduct.artForm)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#C25934]/30 hover:border-[#C25934] text-xs font-serif font-bold text-[#C25934] hover:bg-[#C25934]/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry (+91 72608 15628)</span>
                </a>

                {reservedSuccessId === activeModalProduct.id ? (
                  <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-serif font-bold shadow-md">
                    <Check className="w-4 h-4" />
                    <span>Digital Pledge Recorded!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConfirmReservation(activeModalProduct)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold hover:opacity-90 shadow-md transition-opacity cursor-pointer"
                  >
                    <span>Reserve &amp; Initiate Cultural Pledge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
