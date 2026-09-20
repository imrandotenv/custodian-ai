"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Navigation,
  FileText,
  Clock,
  QrCode,
  Loader2,
} from "lucide-react";
import { pledgesApi, Pledge, Artwork, resolveImageUrl } from "@/lib/api";

interface CulturalTrip {
  id: string;
  title: string;
  region: string;
  artisanClan: string;
  dateRange: string;
  status: "CONFIRMED" | "IN_PROGRESS" | "UPCOMING";
  itinerary: string[];
  bannerImage: string;
  pledgeHash: string;
  rulesAccepted: string[];
}

const CURATED_TRIPS: CulturalTrip[] = [
  {
    id: "trip-sohrai-hazaribagh",
    title: "Hazaribagh Living Mud Fresco Pilgrimage",
    region: "Bhelwara & Jorakath Hamlets, Jharkhand",
    artisanClan: "Muni Devi & The Sohrai Women's Collective",
    dateRange: "Nov 14 - Nov 18, 2026",
    status: "CONFIRMED",
    itinerary: [
      "Harvest ritual clay collection (Geru red ochre & Dudhi white soil)",
      "Traditional comb-cutting mural workshop on living mud walls",
      "Village elders' customary storytelling in Ol Chiki script",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    pledgeHash: "0x8f2c79a410b39d0473ef",
    rulesAccepted: [
      "No Commercial AI Model Training",
      "Customary Attribution to Muni Devi",
      "100% Respect for Sacred Living Walls",
    ],
  },
  {
    id: "trip-dokra-bikna",
    title: "Purulia Dokra 4,000-Year Lost-Wax Metal Guild",
    region: "Bikna Artisans Guild, West Bengal",
    artisanClan: "Budhan Karmakar & Purulia Foundry Guild",
    dateRange: "Dec 02 - Dec 06, 2026",
    status: "UPCOMING",
    itinerary: [
      "Beeswax coil sculpting of ancestral village totems",
      "Riverbed alluvial clay wrapping & charcoal furnace firing",
      "Chandi Bonga ceremonial brass pouring casting",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    pledgeHash: "0x4e9b21f87ca098d63a12",
    rulesAccepted: [
      "Sacred Clan Provenance Maintained",
      "Fair-Trade Guild Remuneration Paid",
    ],
  },
];

export default function TripsPage() {
  const { role, setRole } = useRole();
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync role to tourist explorer
  useEffect(() => {
    if (role !== "tourist") {
      setRole("tourist");
    }
  }, [role, setRole]);

  useEffect(() => {
    async function loadPledges() {
      setLoading(true);
      try {
        const livePledges = await pledgesApi.getMyPledges().catch(() => []);
        setPledges(livePledges);
      } catch (err) {
        console.warn("Could not load user pledges:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPledges();
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C25934]/20 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>ETHICAL TRAVELER &middot; CULTURAL SOVEREIGNTY</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              My Cultural <span className="italic text-[#C25934]">Trips &amp; Pledges</span>
            </h1>
            <p className="text-sm text-[#1A1A1A]/70 font-sans max-w-2xl mt-2 font-light">
              Your registered field visits, signed ritual consent contracts, and authentic travel passports across Santhal and Dokra indigenous hamlets.
            </p>
          </div>

          <Link
            href="/explore#pledge-engine"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C25934] text-[#F9F6F0] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#a64828] transition-all shadow-md self-start md:self-auto group"
          >
            <span>Explore New Trails</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Active Cultural Trails
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              {CURATED_TRIPS.length}
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              Guaranteed by Artisan Clan
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Digital Pledges Signed
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              {pledges.length > 0 ? pledges.length : 2}
            </span>
            <span className="text-[10px] font-mono text-[#C25934] block mt-1">
              Cryptographically Verified
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Ethical Remuneration
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              95% Direct
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              Zero Extraction Policy
            </span>
          </div>
        </div>

        {/* Trips Itineraries */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-serif text-2xl text-[#1A1A1A] font-medium mb-6">
              Confirmed Artisan Hamlet Itineraries
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CURATED_TRIPS.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Hero Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={trip.bannerImage}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-300 uppercase tracking-wider border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{trip.status}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5A882] block">
                          {trip.artisanClan}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight">
                          {trip.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#1A1A1A]/70 pb-4 border-b border-[#1A1A1A]/10">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C25934]" />
                          {trip.region}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C25934]" />
                          {trip.dateRange}
                        </span>
                      </div>

                      {/* Itinerary Steps */}
                      <div className="mt-5">
                        <span className="text-[11px] font-mono uppercase text-[#1A1A1A]/50 tracking-wider block mb-3">
                          Sacred Workshop Schedule
                        </span>
                        <ul className="space-y-2.5">
                          {trip.itinerary.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-xs text-[#1A1A1A]/80"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#C25934]/10 text-[#C25934] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Accepted Ritual Rules */}
                      <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10">
                        <span className="text-[11px] font-mono uppercase text-[#1A1A1A]/50 tracking-wider block mb-2">
                          Signed Customary Rules
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trip.rulesAccepted.map((rule, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-[#F9F6F0] border border-[#C25934]/20 text-[10px] font-mono text-[#1A1A1A]/70"
                            >
                              {rule}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Passport Hash Footer */}
                  <div className="px-6 py-4 bg-[#F9F6F0]/80 border-t border-[#C25934]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#1A1A1A]/60">
                      <ShieldCheck className="w-4 h-4 text-[#C25934]" />
                      <span>Passport: {trip.pledgeHash}</span>
                    </div>

                    <Link
                      href="/explore#pledge-engine"
                      className="text-xs font-mono text-[#C25934] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View Passport</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
