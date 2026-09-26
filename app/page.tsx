"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Leaf,
  Layers,
  Award,
  MapPin,
  Palette,
  Users,
  ShoppingBag,
  ExternalLink,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";
import MaatiGharCollection from "@/components/MaatiGharCollection";
import CulturalMap from "@/components/CulturalMap";
import { DEMO_ARTISANS, DemoArtisan } from "@/lib/demoData";

const CRAFT_CATEGORIES = [
  {
    title: "Sohrai & Khovar Painting",
    hindi: "सोहराई एवं खोवर भित्ति चित्र",
    description: "Sacred mud comb-cut sgraffito celebrating harvest fertility and bridal blessings.",
    region: "Hazaribagh, Ramgarh & Latehar",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    pigments: "Dudhimati, Manganese & Lalmati",
    count: 5,
    tag: "GI Certified #JH-SOHRAI-2020",
  },
  {
    title: "Dokra Lost-Wax Metallurgy",
    hindi: "ढोकरा धातु शिल्प",
    description: "4,000-year-old non-ferrous bell metal cast over clay cores with beeswax threads.",
    region: "Purulia, Seraikela & Bankura",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    pigments: "Bell Metal Bronze & Beeswax",
    count: 4,
    tag: "Ancient Metallurgy Guild",
  },
  {
    title: "Santhali Handloom Weaves",
    hindi: "संथाली हथकरघा वस्त्र",
    description: "Traditional pit-loom cotton fabrics, Panchi Parhan stoles, and ceremonial sarees.",
    region: "Dumka, Pakur & Godda",
    image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    pigments: "Organic Cotton & Madder Dyes",
    count: 4,
    tag: "Handloom Heritage",
  },
  {
    title: "Santhali Bamboo Craft",
    hindi: "संथाली बांस शिल्प",
    description: "Hand-curved wild bamboo grain baskets, household vessels, and forest lifestyle ware.",
    region: "Jhargram, West Bengal",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85",
    pigments: "Wild Sal Bamboo & Neem Polish",
    count: 1,
    tag: "100% Biodegradable",
  },
  {
    title: "Santhali Embroidery",
    hindi: "संथाली सुई-धागा कशीदाकारी",
    description: "Ancestral needlework narrating forest flowers and birds on handspun cotton fabric.",
    region: "Malda, West Bengal",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    pigments: "Silk Floss & Natural Cotton",
    count: 1,
    tag: "Women SHG Craft",
  },
];

export default function HomePage() {
  const [activeStoryArtisan, setActiveStoryArtisan] = useState<DemoArtisan | null>(null);

  return (
    <div className="w-full flex flex-col bg-[#F9F6F0] text-[#1A1A1A]">
      
      {/* 1. HERO SECTION (Clean, Minimal, Accessible, maatighar.com Inspired) */}
      <section className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Hero Content */}
          <div className="flex flex-col gap-6 max-w-2xl text-left">
            
            {/* Top pill badge */}
            <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-[#C25934]/25 shadow-xs w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C25934] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#C25934]">
                Social Enterprise &bull; Ramgarh Cantt, Jharkhand
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-[1.08]">
              Authentic Tribal Art, <br />
              <span className="text-[#C25934] italic font-normal">
                From the Earth, For the Soul
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base sm:text-lg text-[#1A1A1A]/80 font-normal leading-relaxed">
              Welcome to <strong>Maati Ghar</strong> (माटी घर). We connect you directly with 15 master indigenous custodians across Jharkhand and West Bengal. Every Sohrai wall mural, Dokra bronze, and Santhali textile is handcrafted with 100% natural mud pigments and guaranteed <strong>90% direct remuneration</strong> to the artisan family.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection"
                className="px-6 py-3.5 rounded-2xl bg-[#C25934] text-[#F9F6F0] font-serif font-bold text-sm shadow-md hover:bg-[#A84724] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop 15 Masterpieces</span>
              </a>

              <a
                href="#artisans"
                className="px-6 py-3.5 rounded-2xl bg-white border border-[#C25934]/30 text-[#1A1A1A] font-serif font-bold text-sm shadow-xs hover:border-[#C25934] hover:bg-[#F9F6F0] transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[#C25934]" />
                <span>Meet Our 15 Artisans</span>
              </a>

              <a
                href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20art."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-[#4A6B53] text-[#F9F6F0] font-serif font-bold text-sm shadow-xs hover:opacity-95 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick 4 Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C25934]/15 text-xs">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#C25934]">15</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Living Artisans</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#C25934]">100%</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Natural Soil Clays</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-accent">90%</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Direct Payouts</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#1A1A1A]">GI Tag</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">#JH-SOHRAI-2020</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative">
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#C25934]/20 bg-[#EFE9DF]">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85"
                  alt="Sohrai Mud Painting by Birsa Murmu"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#C25934]/15 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                  Sohrai Mud Art
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Birsa Murmu &bull; Hazaribagh
                </span>
                <span className="text-xs text-[#1A1A1A]/70 font-sans">
                  Finger-combed Dudhimati clay murals
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#C25934]/20 bg-[#EFE9DF]">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85"
                  alt="Dokra Lost-Wax Bronze by Ramesh Kisku"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#C25934]/15 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                  Dokra Metallurgy
                </span>
                <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Ramesh Kisku &bull; Seraikela
                </span>
                <span className="text-xs text-[#1A1A1A]/70 font-sans">
                  4,000-year lost-wax bell metal
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 5 INDIGENOUS REGIONAL CRAFTS (Clean, Accessible Cards) */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C25934] font-bold block mb-1">
                TRADITIONS &bull; क्षेत्रीय लोक कलाएं
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A]">
                The 5 Indigenous Traditions of Maati Ghar
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans max-w-md">
              Every tradition has been preserved for generations without commercial disruption. Click any craft to view pieces by verified makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CRAFT_CATEGORIES.map((craft) => (
              <div
                key={craft.title}
                className="group p-5 rounded-3xl bg-white border border-[#C25934]/15 hover:border-[#C25934]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={craft.image}
                      alt={craft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-mono font-bold text-[#1A1A1A] shadow-xs">
                      {craft.tag}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-mono">
                      {craft.count} Master Artisan{craft.count > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#C25934] font-semibold">
                      {craft.region}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#C25934] transition-colors">
                      {craft.title}
                    </h3>
                    <span className="text-xs text-[#1A1A1A]/60 font-sans italic">
                      {craft.hindi}
                    </span>
                    <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed mt-1">
                      {craft.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C25934]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#1A1A1A]/60">
                    {craft.pigments}
                  </span>
                  <a
                    href="#collection"
                    className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#C25934] hover:underline"
                  >
                    <span>View Crafts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. THE 15 LIVING ARTISANS SHOWCASE (Quotes, Stories & Lineage) */}
      <section id="artisans" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C25934] font-bold block mb-1">
                OUR SOVEREIGN MASTERS &bull; हमारे 15 शिल्पकार
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A]">
                The 15 Living Artisans of Maati Ghar
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans max-w-md">
              Each piece carries the authentic oral memory of its creator. Click any artisan to read their full story in Hindi and English.
            </p>
          </div>

          {/* Artisans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {DEMO_ARTISANS.map((artisan, idx) => (
              <div
                key={artisan.id}
                onClick={() => setActiveStoryArtisan(artisan)}
                className="p-4 rounded-3xl bg-white border border-[#C25934]/20 hover:border-[#C25934] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white font-mono text-[9px]">
                      № 0{idx + 1}
                    </span>
                    <span className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-serif font-bold text-[#1A1A1A] truncate">
                      {artisan.villageDistrict}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#C25934] font-bold uppercase">
                      {artisan.artForm}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#1A1A1A] mt-0.5">
                      {artisan.name}
                    </h4>
                    <span className="text-xs text-[#1A1A1A]/60 font-sans">
                      {artisan.hindiName} &bull; {artisan.olChiki}
                    </span>

                    {/* Hindi Quote Snippet */}
                    <p className="text-[11px] text-[#1A1A1A]/80 font-sans italic line-clamp-3 mt-2 bg-[#F9F6F0] p-2 rounded-xl border border-[#C25934]/10">
                      &ldquo;{artisan.originalStory}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#C25934]/10 flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#C25934]">
                    ₹{artisan.priceInINR.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-accent font-mono font-semibold">
                    90% Direct Pay
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE COMPLETE MAATI GHAR COLLECTION ATELIER */}
      <div id="collection">
        <MaatiGharCollection />
      </div>

      {/* 5. TOPOGRAPHY OF LIVING ATELIERS (Map of the 12 Districts) */}
      <section id="map" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white/60">
        <CulturalMap />
      </section>

      {/* 6. COMMISSION CUSTOM WALL MURALS (For Homes, Offices, Resorts) */}
      <section id="murals" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#C25934] text-[#F9F6F0] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col gap-4 max-w-2xl text-left">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F9F6F0]/80 font-bold">
              BESPOKE ARCHITECTURAL MURALS &bull; भित्ति चित्र सेवा
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Transform Your Walls with Authentic Tribal Mud Murals
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#F9F6F0]/90 leading-relaxed font-light">
              Are you an architect, interior designer, or homeowner? Commission our master women painters from Ramgarh and Hazaribagh for bespoke Sohrai &amp; Khovar mud relief murals on physical walls, canvas boards, or terracotta plaques. Created strictly using 100% natural Dudhimati kaolin mud and manganese clay.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20commission%20a%20custom%20Sohrai%20wall%20mural%20for%20my%20space."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#F9F6F0] text-[#1C1A19] font-serif font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#C25934]" />
                <span>Discuss Custom Mural on WhatsApp</span>
              </a>

              <a
                href="mailto:maatikaghar@gmail.com"
                className="px-6 py-3.5 rounded-2xl border border-white/40 text-white font-serif font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Email Portfolio Request
              </a>
            </div>
          </div>

          <div className="w-full lg:w-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-[4/3] bg-black/20 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85"
              alt="Custom Tribal Wall Mural in progress"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 7. VISIT OUR PHYSICAL ATELIER IN RAMGARH CANTT */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-white border border-[#C25934]/20 shadow-xs">
          
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C25934] font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Physical Center &bull; Ramgarh Cantt, Jharkhand</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Visit Maati Ghar in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
              Experience the fragrance of natural laterite mud (Sondhi Khushboo), watch rural women artisans paint, and pick handcrafted terracotta pottery directly at our headquarters.
            </p>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#1A1A1A]/80 pt-1">
              <span>📍 Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
              <span>📞 Phone / WhatsApp: +91 72608 15628 &bull; ✉️ maatikaghar@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20planning%20to%20visit%20your%20Ramgarh%20Cantt%20center."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#C25934] text-[#F9F6F0] font-serif font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
            >
              Plan Your Visit via WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* 8. ARTISAN ORAL STORY MODAL (When clicking any artisan in Section 3) */}
      <AnimatePresence>
        {activeStoryArtisan && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-3xl border border-[#C25934]/30 shadow-2xl p-6 sm:p-8 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between border-b border-[#C25934]/15 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                    {activeStoryArtisan.artForm} &bull; {activeStoryArtisan.villageDistrict}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">
                    {activeStoryArtisan.name} ({activeStoryArtisan.hindiName})
                  </h3>
                  <span className="text-xs font-mono text-[#1A1A1A]/60">
                    Ol Chiki: {activeStoryArtisan.olChiki}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStoryArtisan(null)}
                  className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 hover:bg-[#C25934] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/20 flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25934] font-bold">
                    मूल संथाली / हिंदी लोक गाथा (Oral Story)
                  </span>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/90 font-sans leading-relaxed italic">
                    &ldquo;{activeStoryArtisan.originalStory}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#C25934]/15 flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-bold">
                    English Translation &amp; Cultural Lore
                  </span>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-sans leading-relaxed">
                    {activeStoryArtisan.englishStory}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#C25934]/10">
                  <span className="font-mono text-[#1A1A1A]/60">
                    Fair-Trade Price: <strong className="text-[#1A1A1A]">₹{activeStoryArtisan.priceInINR.toLocaleString("en-IN")}</strong>
                  </span>
                  <span className="font-mono text-accent font-bold">
                    90% Direct Artisan Remuneration
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <a
                  href={`https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20work%20by%20${encodeURIComponent(
                    activeStoryArtisan.name
                  )}%20from%20${encodeURIComponent(activeStoryArtisan.villageDistrict)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#C25934] text-white text-xs font-serif font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
