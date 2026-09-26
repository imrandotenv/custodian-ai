"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Search,
  Sparkles,
  ShieldCheck,
  Tag,
  MapPin,
  Eye,
  Heart,
  ArrowRight,
  Filter,
  Loader2,
} from "lucide-react";
import HorizontalGallery from "@/components/HorizontalGallery";
import { artworksApi, Artwork, resolveImageUrl } from "@/lib/api";

import { DEMO_ARTISANS } from "@/lib/demoData";

const CATEGORIES = [
  "All Sacred Forms",
  "Sohrai painting",
  "Dokra craft",
  "Santhali Handloom",
  "Santhali Bamboo Craft",
  "Santhali Embroidery",
];

const FALLBACK_ARTWORKS: Partial<Artwork>[] = DEMO_ARTISANS.map((a) => ({
  id: a.id,
  title: `${a.artForm} by ${a.name} (${a.hindiName})`,
  artForm: a.artForm,
  originHamlet: a.villageDistrict,
  artisanName: a.name,
  price: a.priceInINR,
  giTagNumber: a.giTag || "GI Tagged Heritage",
  images: [a.image],
  nativeDescription: `${a.olChiki} &middot; ${a.name}`,
  englishDescription: a.originalStory,
  views: 850,
  pledgeCount: 19,
  consentRules: [
    "No Commercial AI Replication",
    "Customary Attribution Required",
    "90% Direct Remuneration to Clan",
  ],
}));

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Sacred Forms");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadArtworks() {
      setLoading(true);
      try {
        const liveData = await artworksApi.list();
        if (liveData && liveData.length > 0) {
          setArtworks(liveData);
        } else {
          setArtworks(FALLBACK_ARTWORKS as Artwork[]);
        }
      } catch (err) {
        console.warn("Using fallback gallery data due to API error:", err);
        setArtworks(FALLBACK_ARTWORKS as Artwork[]);
      } finally {
        setLoading(false);
      }
    }
    loadArtworks();
  }, []);

  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory =
      selectedCategory === "All Sacred Forms" ||
      art.artForm?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      art.title?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.artForm?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.artisanName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.originHamlet?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] flex flex-col pt-24 md:pt-28">
      {/* Editorial Header */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        <div className="flex flex-col gap-4 border-b border-[#C25934]/20 pb-8">
          <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ &middot; LIVING CULTURAL EXHIBITION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] tracking-tight">
                Global Indigenous <span className="italic text-[#C25934]">Gallery</span>
              </h1>
              <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-sans max-w-2xl font-light leading-relaxed mt-3">
                Curated Santhali Sohrai mud frescoes, Khovar nuptial art, and Purulia Dokra metallurgy protected under sovereign customary consent protocols.
              </p>
            </div>

            <Link
              href="/explore#pledge-engine"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C25934] text-[#F9F6F0] font-mono text-xs tracking-wider uppercase font-semibold hover:bg-[#a64828] transition-all shadow-md self-start md:self-auto group"
            >
              <span>Digital Pledge Protocol</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. HORIZONTAL SCROLLING HERO SHOWCASE */}
      <div className="w-full relative">
        <HorizontalGallery />
      </div>

      {/* 2. FILTERABLE CATALOG & ARCHIVE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-[#F9F6F0] shadow-sm font-semibold"
                    : "bg-[#F9F6F0] text-[#1A1A1A]/70 border border-[#1A1A1A]/10 hover:border-[#C25934]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
            <input
              type="text"
              placeholder="Search by artisan, village, motif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 border border-[#C25934]/20 text-xs font-sans text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#C25934] transition-all"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#C25934]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase text-[#1A1A1A]/60">
              Loading Sovereign Catalog...
            </span>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#C25934]/30 rounded-3xl p-8">
            <Tag className="w-8 h-8 mx-auto text-[#C25934]/60 mb-3" />
            <h3 className="font-serif text-xl text-[#1A1A1A]">No sacred pieces found</h3>
            <p className="text-xs text-[#1A1A1A]/60 font-mono mt-1">
              Try modifying your search query or selecting &quot;All Sacred Forms&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((art) => (
              <motion.article
                key={art.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-white/70 backdrop-blur-sm rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Artwork Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1A1A]/5">
                  <img
                    src={resolveImageUrl(art.images?.[0])}
                    alt={art.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {art.giTagNumber && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md text-[10px] font-mono uppercase text-[#F9F6F0] tracking-wider border border-white/20">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{art.giTagNumber}</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#F9F6F0]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {art.views || 420}
                    </span>
                    <span className="flex items-center gap-1 text-rose-300">
                      <Heart className="w-3 h-3 fill-rose-300/40" /> {art.pledgeCount || 8}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#C25934] uppercase tracking-widest mb-1.5">
                      <span>{art.artForm}</span>
                      {art.originHamlet && (
                        <span className="flex items-center gap-1 text-[#1A1A1A]/50">
                          <MapPin className="w-3 h-3" /> {art.originHamlet}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#C25934] transition-colors line-clamp-1">
                      {art.title}
                    </h3>

                    {art.nativeDescription && (
                      <p className="font-serif italic text-xs text-[#C25934]/90 mt-1">
                        {art.nativeDescription}
                      </p>
                    )}

                    <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 mt-2 leading-relaxed">
                      {art.englishDescription || "Preserved in living memory."}
                    </p>
                  </div>

                  {/* Rules & Price Footer */}
                  <div className="pt-4 border-t border-[#C25934]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 block">
                        Direct Fair-Trade
                      </span>
                      <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                        ₹{art.price ? art.price.toLocaleString("en-IN") : "Inquire"}
                      </span>
                    </div>

                    <Link
                      href="/explore#pledge-engine"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F9F6F0] text-[#1A1A1A] hover:bg-[#C25934] hover:text-[#F9F6F0] border border-[#C25934]/20 text-xs font-mono tracking-wider transition-colors group/btn"
                    >
                      <span>Pledge</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
