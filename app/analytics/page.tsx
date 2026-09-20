"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  BarChart3,
  TrendingUp,
  Globe2,
  ShieldCheck,
  IndianRupee,
  Users,
  Layers,
  Sparkles,
  Download,
  Share2,
  Award,
} from "lucide-react";

interface ArtDistribution {
  name: string;
  share: number;
  color: string;
  artworksCount: number;
  totalPledged: string;
}

const ART_DISTRIBUTION: ArtDistribution[] = [
  {
    name: "Sohrai Harvest Mud Frescoes",
    share: 38,
    color: "bg-[#C25934]",
    artworksCount: 24,
    totalPledged: "₹7,00,000",
  },
  {
    name: "Dokra Lost-Wax Bronze Metallurgy",
    share: 32,
    color: "bg-[#D97706]",
    artworksCount: 19,
    totalPledged: "₹5,89,000",
  },
  {
    name: "Khovar Nuptial Comb-Cut Murals",
    share: 20,
    color: "bg-[#8B5CF6]",
    artworksCount: 13,
    totalPledged: "₹3,68,000",
  },
  {
    name: "Santhal Sacred Terracotta & Banam Fiddles",
    share: 10,
    color: "bg-[#10B981]",
    artworksCount: 6,
    totalPledged: "₹1,85,000",
  },
];

export default function AnalyticsPage() {
  const { role, setRole } = useRole();

  // Sync role to admin superintendent
  useEffect(() => {
    if (role !== "admin") {
      setRole("admin");
    }
  }, [role, setRole]);

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C25934]/20 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>SUPERINTENDENT &middot; CULTURAL IMPACT TELEMETRY</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              Platform <span className="italic text-[#C25934]">Analytics &amp; Impact</span>
            </h1>
            <p className="text-sm text-[#1A1A1A]/70 font-sans max-w-2xl mt-2 font-light">
              Real-time telemetry measuring fair-trade capital flows, indigenous sovereignty enforcement, and community corpus fund growth.
            </p>
          </div>

          <button
            onClick={() => alert("Preservation Audit Report downloaded.")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A1A] text-[#F9F6F0] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#C25934] transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Impact Dossier</span>
          </button>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Fair-Trade Distributed</span>
              <IndianRupee className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              ₹18,42,000
            </div>
            <span className="text-[10px] font-mono text-emerald-600 block mt-2">
              95% Direct Artisan Settlement
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Sacred Pledges Signed</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              348
            </div>
            <span className="text-[10px] font-mono text-[#C25934] block mt-2">
              100% Customary Compliance
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Community Corpus Fund</span>
              <Layers className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              ₹92,100
            </div>
            <span className="text-[10px] font-mono text-emerald-600 block mt-2">
              5% Reserved for Village Wells
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Global Explorers</span>
              <Globe2 className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              48,200
            </div>
            <span className="text-[10px] font-mono text-[#1A1A1A]/60 block mt-2">
              Across 42 Sovereign Nations
            </span>
          </div>
        </div>

        {/* Breakdown by Art Form & Customary Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 2 Cols: Art Form Distribution */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-[#1A1A1A] font-medium mb-2">
              Sacred Art Form Capital Distribution
            </h3>
            <p className="text-xs font-mono text-[#1A1A1A]/60 mb-6">
              Breakdown of total direct patron pledges and remuneration across living traditions.
            </p>

            <div className="space-y-6">
              {ART_DISTRIBUTION.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#1A1A1A] font-semibold">{item.name}</span>
                    <span className="text-[#C25934] font-bold">
                      {item.totalPledged} ({item.share}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#F9F6F0] rounded-full overflow-hidden border border-[#C25934]/15">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#1A1A1A]/50 mt-1">
                    <span>{item.artworksCount} Protected Masterpieces</span>
                    <span>Direct Settlement Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1 Col: Tribal Sovereignty Health Status */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] uppercase tracking-wider font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ANTI-EXTRACTION AUDIT</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-medium mb-3">
                Customary Sovereignty Health
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed mb-6">
                All uploaded digital representations are cryptographically bound by the Smart Consent Engine.
              </p>

              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#1A1A1A]/70">
                    AI Web Scraping Blocks
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    100% Blocked
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#1A1A1A]/70">
                    Gram Sabha Endorsement
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#C25934]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#1A1A1A]/70">
                    Village Hamlets Onboarded
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1A1A1A]">
                    14 Hamlets
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#C25934]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#1A1A1A]/50">
                Audit Cycle: 2026 Q3
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 font-semibold">
                <Award className="w-3.5 h-3.5" />
                Grade AAA Sovereign
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
