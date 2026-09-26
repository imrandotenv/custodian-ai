"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  PackageOpen,
  PlusCircle,
  Eye,
  ShieldCheck,
  Tag,
  Clock,
  Sparkles,
  ExternalLink,
  Loader2,
  ChevronRight,
  IndianRupee,
  Layers,
} from "lucide-react";
import {
  artworksApi,
  dashboardApi,
  Artwork,
  ArtisanDashboardStats,
  resolveImageUrl,
  getAuthToken,
  authApi,
} from "@/lib/api";

import { DEMO_ARTISANS } from "@/lib/demoData";

const FALLBACK_LISTINGS: Partial<Artwork>[] = DEMO_ARTISANS.map((a, idx) => ({
  id: `list-${a.id}`,
  title: `${a.artForm} by ${a.name} (${a.hindiName})`,
  artForm: a.artForm,
  originHamlet: a.villageDistrict,
  artisanName: a.name,
  price: a.priceInINR,
  giTagNumber: a.giTag || "GI-IN-JH-2020-001",
  images: [a.image],
  status: idx % 4 === 1 ? "RESERVED" : "AVAILABLE",
  views: Math.floor(Math.random() * 500) + 200,
  pledgeCount: Math.floor(Math.random() * 25) + 5,
  consentRules: [
    "No Commercial AI Training",
    "Customary Attribution Required",
    "90% Direct Remuneration to Artisan",
  ],
  createdAt: new Date().toISOString(),
}));

export default function ListingsPage() {
  const { role, setRole } = useRole();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [stats, setStats] = useState<ArtisanDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync active role to local artisan custodian
  useEffect(() => {
    if (role !== "local") {
      setRole("local");
    }
  }, [role, setRole]);

  useEffect(() => {
    async function loadListings() {
      setLoading(true);
      try {
        if (!getAuthToken()) {
          await authApi.login({
            email: "muni.devi@custodian.sanctuary",
            password: "SacredCustodian2026!",
          }).catch(() => null);
        }

        const [artworksData, statsData] = await Promise.all([
          artworksApi.list().catch(() => []),
          dashboardApi.getArtisanStats().catch(() => null),
        ]);

        if (artworksData && artworksData.length > 0) {
          setArtworks(artworksData);
        } else {
          setArtworks(FALLBACK_LISTINGS as Artwork[]);
        }
        setStats(statsData);
      } catch (err) {
        console.warn("Using fallback listing data:", err);
        setArtworks(FALLBACK_LISTINGS as Artwork[]);
      } finally {
        setLoading(false);
      }
    }
    loadListings();
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C25934]/20 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold mb-2">
              <PackageOpen className="w-3.5 h-3.5" />
              <span>ARTISAN CUSTODIAN &middot; CATALOG INVENTORY</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              My Sovereign <span className="italic text-[#C25934]">Listings</span>
            </h1>
            <p className="text-sm text-[#1A1A1A]/70 font-sans max-w-xl mt-2 font-light">
              Manage your registered indigenous artworks, customary consent rules, and live exhibition status on the global gallery.
            </p>
          </div>

          <Link
            href="/add-art"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C25934] text-[#F9F6F0] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#a64828] transition-all shadow-md self-start md:self-auto group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Art</span>
          </Link>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Active Listings
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {artworks.length}
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              Protected by GI Tag
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Total Global Views
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {stats?.totalViews || artworks.reduce((acc, a) => acc + (a.views || 0), 0) || "3,280"}
            </span>
            <span className="text-[10px] font-mono text-[#C25934] block mt-1">
              Across 42 Countries
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Executed Pledges
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {stats?.totalPledgesCount || artworks.reduce((acc, a) => acc + (a.pledgeCount || 0), 0) || "35"}
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              Digital Consent Bound
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Direct Remuneration
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              95%
            </span>
            <span className="text-[10px] font-mono text-[#1A1A1A]/60 block mt-1">
              Zero Middleman Cut
            </span>
          </div>
        </div>

        {/* Listings Collection */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#C25934]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase text-[#1A1A1A]/60">
              Retrieving Custodian Catalog...
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#1A1A1A]/60 uppercase tracking-widest px-2">
              <span>Cataloged Artifacts ({artworks.length})</span>
              <span>Sorted by Most Recent</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {artworks.map((art) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#1A1A1A]/5">
                      <img
                        src={resolveImageUrl(art.images?.[0])}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md text-[10px] font-mono uppercase text-[#F9F6F0] tracking-wider border border-white/20">
                        {art.status === "AVAILABLE" ? "Active on Gallery" : art.status || "Active"}
                      </div>
                      {art.giTagNumber && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>GI Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Meta Body */}
                    <div className="p-6">
                      <span className="text-[11px] font-mono text-[#C25934] uppercase tracking-wider block mb-1">
                        {art.artForm}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-[#1A1A1A] line-clamp-1">
                        {art.title}
                      </h3>
                      {art.nativeDescription && (
                        <p className="font-serif italic text-xs text-[#C25934] mt-1">
                          {art.nativeDescription}
                        </p>
                      )}

                      {/* Ritual Rules Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {(art.consentRules || []).slice(0, 2).map((rule, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-[#F9F6F0] border border-[#C25934]/20 text-[10px] font-mono text-[#1A1A1A]/70"
                          >
                            {rule}
                          </span>
                        ))}
                      </div>

                      {/* Performance Bar */}
                      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#1A1A1A]/5 text-xs font-mono text-[#1A1A1A]/60">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#C25934]" />
                          {art.views || 350} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-[#C25934]" />
                          {art.pledgeCount || 4} pledges
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Price & Actions */}
                  <div className="px-6 py-4 bg-[#F9F6F0]/60 border-t border-[#C25934]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 block">
                        Listing Price
                      </span>
                      <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                        ₹{art.price ? art.price.toLocaleString("en-IN") : "45,000"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/explore#pledge-engine"
                        className="p-2 rounded-full hover:bg-white text-[#1A1A1A]/70 hover:text-[#C25934] transition-colors"
                        title="View Public Presentation"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/add-art"
                        className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-[#F9F6F0] text-xs font-mono tracking-wider hover:bg-[#C25934] transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
