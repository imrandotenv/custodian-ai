"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  PackageOpen,
  PlusCircle,
  IndianRupee,
  ShieldCheck,
  CameraOff,
  VolumeX,
  HandMetal,
  Award,
  Sparkles,
  Loader2,
} from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";
import {
  dashboardApi,
  artworksApi,
  ArtisanDashboardStats,
  Artwork,
  resolveImageUrl,
  getAuthToken,
  authApi,
} from "@/lib/api";

import { DEMO_ARTISANS } from "@/lib/demoData";

export default function CustodianDashboard() {
  const { role, setRole } = useRole();
  const [stats, setStats] = useState<ArtisanDashboardStats | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure role is local when on dashboard
  useEffect(() => {
    if (role !== "local") {
      setRole("local");
    }
  }, [role, setRole]);

  // Fetch live dashboard metrics and artwork listings
  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);
      try {
        // Auto-authenticate as master artisan if not already logged in
        if (!getAuthToken()) {
          await authApi
            .login({
              email: "muni.devi@custodian.sanctuary",
              password: "SacredCustodian2026!",
            })
            .catch(() => null);
        }

        const [statsData, artworksData] = await Promise.all([
          dashboardApi.getArtisanStats().catch(() => null),
          artworksApi.list().catch(() => []),
        ]);

        if (statsData) setStats(statsData);
        if (artworksData && artworksData.length > 0) {
          setArtworks(artworksData);
        } else {
          setArtworks(
            DEMO_ARTISANS.map((a, idx) => ({
              id: a.id,
              title: `${a.artForm} by ${a.name}`,
              artForm: a.artForm,
              nativeDescription: a.olChiki,
              englishDescription: a.originalStory,
              price: a.priceInINR,
              images: [a.image],
              status: idx === 0 ? "RESERVED" : "AVAILABLE",
              views: 450 + idx * 30,
              pledgeCount: 8 + idx * 2,
              consentRules: [
                "Respect village traditions",
                "No flash photography in sacred grove",
                "90% direct remuneration to artisan",
              ],
              provenanceHash: `0x${a.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8)}`,
              originHamlet: a.villageDistrict,
              artisanName: a.name,
              custodianId: a.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }))
          );
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load dashboard data";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
      
      {/* Editorial Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C25934]/20 pb-8 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-semibold">
              Master Artisan Command Center &middot; Hazaribagh Guild
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-textPrimary tracking-tight">
            Muni Devi&apos;s Sovereign Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-textPrimary/70 max-w-xl leading-relaxed">
            Direct custodian oversight over ritual Khovar mud murals, active visitor consent enforcement, and 100% fair-trade remuneration.
          </p>
        </div>

        <Link
          href="/add-art"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#C25934] text-[#F9F6F0] font-serif text-sm font-semibold hover:opacity-95 transition-all shadow-xs cursor-pointer w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Catalog New Artifact</span>
        </Link>
      </section>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-textPrimary/60">
          <Loader2 className="w-8 h-8 animate-spin text-[#C25934]" />
          <span className="font-serif text-base">Retrieving sovereign tribal ledger...</span>
        </div>
      ) : (
        <>
          {/* Key Metric Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {/* Card 1: Direct Remuneration */}
            <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/15 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#C25934] mb-4">
                <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
                  Direct Remuneration
                </span>
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-textPrimary">
                  ₹ {stats?.directRemunerationPotential?.toLocaleString() ?? "56,700"}
                </span>
                <span className="text-xs text-[#849A89] block mt-1 font-medium">
                  {stats?.commissionRate ?? "100% Direct to Artisan (0% Cut)"}
                </span>
              </div>
            </div>

            {/* Card 2: Active Inventory */}
            <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#E5A882] mb-4">
                <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
                  Active Inventory
                </span>
                <PackageOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-textPrimary">
                  {stats?.activeListingsCount ?? artworks.length} Pieces
                </span>
                <span className="text-xs text-textPrimary/70 block mt-1">
                  Anchored with GI Provenance
                </span>
              </div>
            </div>

            {/* Card 3: Signed Pledges */}
            <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#849A89] mb-4">
                <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
                  Signed Pledges
                </span>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-textPrimary">
                  {stats?.totalPledgesCount ?? 79}
                </span>
                <span className="text-xs text-textPrimary/70 block mt-1">
                  Strict customary respect enforced
                </span>
              </div>
            </div>

            {/* Card 4: Sovereignty Status */}
            <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#849A89] mb-4">
                <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
                  Sovereignty Status
                </span>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-textPrimary">GI Protected</span>
                <span className="text-xs text-[#E5A882] block mt-1 font-mono">
                  #JH-SOHRAI-2020 Guardian
                </span>
              </div>
            </div>
          </section>

          {/* Smart Cultural Consent Monitor */}
          <section className="p-8 sm:p-10 rounded-3xl bg-[#849A89]/10 border-2 border-[#849A89]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#849A89]/20 border border-[#849A89]/40 text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#849A89] w-fit shadow-xs">
                <ShieldCheck className="w-4 h-4 text-accent animate-pulse" />
                <span>Active Smart Consent Protocol</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-textPrimary">
                Your Ancestral Rules Are Legally Enforced
              </h2>
              <p className="text-xs sm:text-sm text-textPrimary/80 font-sans leading-relaxed max-w-2xl">
                Every traveler must complete your interactive Digital Pledge before accessing your studio in Hazaribagh or acquiring Sohrai Khovar paintings. Commercial exploitation and photography violations are legally prevented.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <span className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs">
                <CameraOff className="w-4 h-4 text-[#C25934]" />
                <span>No flash photography of the Jaher Than</span>
              </span>
              <span className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs">
                <VolumeX className="w-4 h-4 text-accent" />
                <span>Respect the Sohrai harvest motifs</span>
              </span>
              <span className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs">
                <HandMetal className="w-4 h-4 text-primary" />
                <span>Do Not Touch Dudhi Clay Pigments</span>
              </span>
            </div>
          </section>

          {/* Current Catalog Listings */}
          <section className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-semibold block">
                  Active Inventory
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-textPrimary tracking-tight">
                  Muni Devi&apos;s Showcased Ancestral Pieces
                </h2>
              </div>
              <Link
                href="/add-art"
                className="text-xs font-serif font-bold text-[#C25934] hover:underline flex items-center gap-1"
              >
                + Add Another Artifact
              </Link>
            </div>

            {artworks.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/60 border border-[#C25934]/15">
                <p className="font-serif text-lg text-textPrimary/70">No artifacts cataloged yet.</p>
                <Link href="/add-art" className="text-xs font-serif text-[#C25934] underline mt-2 block">
                  Catalog your first masterpiece
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {artworks.map((item) => {
                  const imageSrc = resolveImageUrl(item.images?.[0]);
                  const statusLabel =
                    item.status === "AVAILABLE"
                      ? "Active on Global Gallery"
                      : "Reserved by Ethno Collector";
                  const statusColor =
                    item.status === "AVAILABLE"
                      ? "text-[#C25934] bg-[#C25934]/10 border-[#C25934]/25"
                      : "text-accent bg-accent/10 border-accent/25";

                  return (
                    <TiltCard
                      key={item.id}
                      className="h-full"
                      innerClassName="h-full rounded-3xl"
                      maxRotation={6}
                      perspective={1000}
                      maxGlareOpacity={0.18}
                    >
                      <div className="bg-white/90 rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-xs flex flex-col justify-between h-full">
                        <ParallaxImage
                          src={imageSrc}
                          alt={item.title}
                          className="h-56 w-full bg-[#EFE9DF]"
                          parallaxRange={["-10%", "10%"]}
                          scale={1.2}
                          dataCursor="view"
                        >
                          <div className="absolute top-4 left-4 z-10">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border ${statusColor}`}
                            >
                              {statusLabel}
                            </span>
                          </div>
                        </ParallaxImage>

                        <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono text-textPrimary/50 uppercase">
                                ID: {item.id.slice(-6)}
                              </span>
                              <span className="font-serif text-lg font-bold text-textPrimary">
                                ₹ {item.price.toLocaleString()}
                              </span>
                            </div>

                            <h3 className="font-serif text-xl font-normal text-textPrimary leading-snug">
                              {item.title}
                            </h3>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.consentRules?.map((rule) => (
                                <span
                                  key={rule}
                                  className="px-2.5 py-0.5 rounded-full bg-[#F9F6F0] border border-[#C25934]/15 text-[10px] font-mono text-textPrimary/70"
                                >
                                  {rule}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-textPrimary/60 border-t border-[#C25934]/10 pt-3 mt-3 font-mono">
                            <span>{item.views} Views</span>
                            <span>{item.pledgeCount} Signed Pledges</span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
