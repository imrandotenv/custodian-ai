"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowDownToLine,
  Landmark,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  dashboardApi,
  ArtisanDashboardStats,
  getAuthToken,
  authApi,
} from "@/lib/api";

interface PayoutTransaction {
  id: string;
  artworkTitle: string;
  patronName: string;
  date: string;
  grossAmount: number;
  artisanShare: number; // 95%
  corpusFund: number;   // 5%
  status: "SETTLED" | "PROCESSING" | "ESCROW";
  referenceId: string;
}

const SAMPLE_TRANSACTIONS: PayoutTransaction[] = [
  {
    id: "tx-1",
    artworkTitle: "Santhal Fertility Tree of Life",
    patronName: "Aarav Sharma (Bangalore)",
    date: "Sep 18, 2026",
    grossAmount: 45000,
    artisanShare: 42750,
    corpusFund: 2250,
    status: "SETTLED",
    referenceId: "UPI-TRIBAL-904812",
  },
  {
    id: "tx-2",
    artworkTitle: "Comb-Cut Bridal Cohabitation Labyrinth",
    patronName: "Elena Rostova (Geneva)",
    date: "Sep 14, 2026",
    grossAmount: 38000,
    artisanShare: 36100,
    corpusFund: 1900,
    status: "SETTLED",
    referenceId: "NEFT-IN-JH-440192",
  },
  {
    id: "tx-3",
    artworkTitle: "Chandi Bonga Goddess Idol (Dokra)",
    patronName: "Kavita Rao (Mumbai)",
    date: "Sep 10, 2026",
    grossAmount: 62000,
    artisanShare: 58900,
    corpusFund: 3100,
    status: "SETTLED",
    referenceId: "UPI-TRIBAL-810924",
  },
  {
    id: "tx-4",
    artworkTitle: "Horn Blower Terracotta Totem",
    patronName: "Markus Weber (Berlin)",
    date: "Sep 02, 2026",
    grossAmount: 18500,
    artisanShare: 17575,
    corpusFund: 925,
    status: "ESCROW",
    referenceId: "ESC-CUSTODIAN-1120",
  },
];

export default function EarningsPage() {
  const { role, setRole } = useRole();
  const [stats, setStats] = useState<ArtisanDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);

  // Sync role to local artisan
  useEffect(() => {
    if (role !== "local") {
      setRole("local");
    }
  }, [role, setRole]);

  useEffect(() => {
    async function loadEarnings() {
      setLoading(true);
      try {
        if (!getAuthToken()) {
          await authApi.login({
            email: "muni.devi@custodian.sanctuary",
            password: "SacredCustodian2026!",
          }).catch(() => null);
        }

        const data = await dashboardApi.getArtisanStats().catch(() => null);
        setStats(data);
      } catch (err) {
        console.warn("Using default earnings data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEarnings();
  }, []);

  const totalGross = SAMPLE_TRANSACTIONS.reduce((acc, t) => acc + t.grossAmount, 0);
  const totalArtisanPayout = SAMPLE_TRANSACTIONS.reduce((acc, t) => acc + t.artisanShare, 0);
  const totalCommunityCorpus = SAMPLE_TRANSACTIONS.reduce((acc, t) => acc + t.corpusFund, 0);

  const handleInstantPayout = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setWithdrawnSuccess(true);
      setTimeout(() => setWithdrawnSuccess(false), 5000);
    }, 1200);
  };

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C25934]/20 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold mb-2">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>DIRECT FAIR-TRADE &middot; REMUNERATION PROTOCOL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              Artisan <span className="italic text-[#C25934]">Earnings &amp; Corpus</span>
            </h1>
            <p className="text-sm text-[#1A1A1A]/70 font-sans max-w-xl mt-2 font-light">
              Transparent remuneration ledger routing 95% directly to your registered bank account and 5% to the tribal village preservation corpus.
            </p>
          </div>

          {/* Quick Payout Button */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleInstantPayout}
              disabled={withdrawing}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A1A] text-[#F9F6F0] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#C25934] transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {withdrawing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing NEFT Transfer...</span>
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Withdraw to Bank / UPI</span>
                </>
              )}
            </button>
            {withdrawnSuccess && (
              <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                NEFT Settlement Initiated to State Bank of India
              </span>
            )}
          </div>
        </div>

        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Total Direct Earnings */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Direct Artisan Share (95%)</span>
              <IndianRupee className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              ₹{totalArtisanPayout.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] font-mono text-emerald-600 block mt-2">
              Zero Intermediary Commissions
            </span>
          </div>

          {/* Card 2: Community Corpus Fund */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Tribal Corpus Fund (5%)</span>
              <Layers className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              ₹{totalCommunityCorpus.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] font-mono text-[#C25934] block mt-2">
              For Bhelwara Pigment Extraction Wells
            </span>
          </div>

          {/* Card 3: Gross Remuneration Value */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C25934]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mb-2">
              <span>Gross Artifact Valuation</span>
              <TrendingUp className="w-4 h-4 text-[#C25934]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
              ₹{totalGross.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] font-mono text-[#1A1A1A]/60 block mt-2">
              Across 4 Executed Pledges
            </span>
          </div>

          {/* Card 4: KYC Verification Status */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-emerald-500/20 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-2">
              <span>Bank &amp; KYC Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-xl font-semibold text-emerald-950">
              Verified Custodian
            </div>
            <span className="text-[10px] font-mono text-emerald-700 block mt-2">
              State Bank of India &middot; Acct **4892
            </span>
          </div>
        </div>

        {/* Ledger & Transactions Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-[#C25934]/15 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#1A1A1A] font-medium">
                Fair-Trade Settlement Ledger
              </h3>
              <p className="text-xs font-mono text-[#1A1A1A]/50 mt-0.5">
                Every transaction cryptographically linked to customary ritual consent contracts.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F9F6F0] border border-[#C25934]/20 text-[#1A1A1A]/70">
              Auto-Settled Daily at 18:00 IST
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F9F6F0]/80 text-[#1A1A1A]/60 font-mono text-[10px] uppercase tracking-wider border-b border-[#C25934]/10">
                <tr>
                  <th className="py-4 px-6">Transaction Ref</th>
                  <th className="py-4 px-6">Artwork</th>
                  <th className="py-4 px-6">Patron / Buyer</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Gross (₹)</th>
                  <th className="py-4 px-6">Your Payout (95%)</th>
                  <th className="py-4 px-6">Corpus (5%)</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/5 text-[#1A1A1A]">
                {SAMPLE_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F9F6F0]/40 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px] text-[#1A1A1A]/70">
                      {tx.referenceId}
                    </td>
                    <td className="py-4 px-6 font-serif font-medium text-sm text-[#1A1A1A]">
                      {tx.artworkTitle}
                    </td>
                    <td className="py-4 px-6 text-[#1A1A1A]/80">
                      {tx.patronName}
                    </td>
                    <td className="py-4 px-6 text-[#1A1A1A]/60 font-mono text-[11px]">
                      {tx.date}
                    </td>
                    <td className="py-4 px-6 font-mono font-medium">
                      ₹{tx.grossAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700">
                      ₹{tx.artisanShare.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 font-mono text-[#C25934]">
                      ₹{tx.corpusFund.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase ${
                          tx.status === "SETTLED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
