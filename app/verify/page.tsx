"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import {
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  Award,
  Search,
  ExternalLink,
  Sparkles,
  MapPin,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ArtisanApplicant {
  id: string;
  name: string;
  hamlet: string;
  region: string;
  artForm: string;
  giTagNumber: string;
  lineageNotes: string;
  status: "VERIFIED" | "PENDING_REVIEW" | "VILLAGE_AUDIT";
  appliedDate: string;
  documentsCount: number;
}

const APPLICANTS: ArtisanApplicant[] = [
  {
    id: "artisan-muni-devi",
    name: "Muni Devi",
    hamlet: "Bhelwara Hamlet",
    region: "Hazaribagh, Jharkhand",
    artForm: "Sohrai Mud Murals",
    giTagNumber: "GI-IN-JH-2020-001",
    lineageNotes: "4th generation master practitioner of harvest ochre earth mural painting. Village Gram Sabha endorsed.",
    status: "VERIFIED",
    appliedDate: "Jan 12, 2026",
    documentsCount: 4,
  },
  {
    id: "artisan-shanti-murmu",
    name: "Shanti Murmu",
    hamlet: "Jorakath Village",
    region: "Hazaribagh, Jharkhand",
    artForm: "Khovar Bridal Nuptial Art",
    giTagNumber: "GI-IN-JH-2020-002",
    lineageNotes: "Elder of the Santhal women's comb-cutting collective. Recognized by Tribal Research Institute.",
    status: "VERIFIED",
    appliedDate: "Feb 04, 2026",
    documentsCount: 3,
  },
  {
    id: "artisan-budhan-karmakar",
    name: "Budhan Karmakar",
    hamlet: "Bikna Artisans Guild",
    region: "Bankura / Purulia, West Bengal",
    artForm: "Dokra Lost-Wax Bronze Metallurgy",
    giTagNumber: "GI-IN-WB-2018-044",
    lineageNotes: "Master furnace smelter and beeswax coil caster. Holds State Master Craftsman medallion.",
    status: "PENDING_REVIEW",
    appliedDate: "Sep 15, 2026",
    documentsCount: 5,
  },
  {
    id: "artisan-subhasis-tudu",
    name: "Subhasis Tudu",
    hamlet: "Dumka Valley",
    region: "Santhal Parganas, Jharkhand",
    artForm: "Traditional Banam Wooden Fiddle Carving",
    giTagNumber: "GI-APPLICATION-2026-89",
    lineageNotes: "Carver of sacred ancestral chordophones from Ghoraneem hardwood. Awaiting Gram Pradhan signature.",
    status: "VILLAGE_AUDIT",
    appliedDate: "Sep 18, 2026",
    documentsCount: 2,
  },
];

export default function VerifyArtisansPage() {
  const { role, setRole } = useRole();
  const [applicants, setApplicants] = useState<ArtisanApplicant[]>(APPLICANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Sync role to admin superintendent
  useEffect(() => {
    if (role !== "admin") {
      setRole("admin");
    }
  }, [role, setRole]);

  const handleApprove = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "VERIFIED" as const } : a))
    );
    setActionSuccess(`GI Seal and Sovereign Custodian Status granted to ${name}.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleRequestAudit = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "VILLAGE_AUDIT" as const } : a))
    );
    setActionSuccess(`Field audit referral dispatched to Gram Sabha for ${name}.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const filteredApplicants = applicants.filter((a) => {
    if (!searchQuery) return true;
    return (
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.artForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.hamlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.giTagNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className="w-full min-h-screen bg-[#F9F6F0] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C25934]/20 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C25934] font-mono text-[11px] tracking-[0.35em] uppercase font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SUPERINTENDENT &middot; PROVENANCE VERIFICATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              Verify Indigenous <span className="italic text-[#C25934]">Artisans</span>
            </h1>
            <p className="text-sm text-[#1A1A1A]/70 font-sans max-w-2xl mt-2 font-light">
              Audit Geographical Indication (GI) credentials, village clan lineage endorsements, and customary protocol compliance to preserve authentic heritage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs uppercase tracking-wider font-semibold border border-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              KYC Protocol Active
            </span>
          </div>
        </div>

        {/* Action Alert Banner */}
        {actionSuccess && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Verification Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Verified Masters
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              {applicants.filter((a) => a.status === "VERIFIED").length}
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              GI Tag Certified
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Pending Audit
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              {applicants.filter((a) => a.status !== "VERIFIED").length}
            </span>
            <span className="text-[10px] font-mono text-amber-600 block mt-1">
              Under Review
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Clan Endorsements
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              100%
            </span>
            <span className="text-[10px] font-mono text-[#C25934] block mt-1">
              Gram Sabha Verified
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#C25934]/15 shadow-2xs">
            <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block mb-1">
              Anti-Piracy Shield
            </span>
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              Zero AI Clones
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">
              Smart Consent Bound
            </span>
          </div>
        </div>

        {/* Verification Queue Table & Search */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#C25934]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl text-[#1A1A1A] font-medium">
                Artisan Registry &amp; Lineage Applications
              </h3>
              <p className="text-xs font-mono text-[#1A1A1A]/50 mt-0.5">
                Review official government GI tag records and village council endorsements.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
              <input
                type="text"
                placeholder="Search artisan or GI tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F9F6F0] border border-[#C25934]/20 text-xs font-sans text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#C25934]"
              />
            </div>
          </div>

          <div className="divide-y divide-[#1A1A1A]/5">
            {filteredApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="p-6 hover:bg-[#F9F6F0]/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C25934]/10 border border-[#C25934]/20 flex items-center justify-center shrink-0 text-[#C25934] font-serif font-bold text-lg">
                    {applicant.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-serif text-lg font-medium text-[#1A1A1A]">
                        {applicant.name}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold ${
                          applicant.status === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : applicant.status === "PENDING_REVIEW"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {applicant.status === "VERIFIED" && (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {applicant.status === "PENDING_REVIEW" && (
                          <Clock className="w-3 h-3" />
                        )}
                        {applicant.status === "VILLAGE_AUDIT" && (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {applicant.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#1A1A1A]/60">
                      <span className="text-[#C25934] font-semibold">
                        {applicant.artForm}
                      </span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {applicant.hamlet}, {applicant.region}
                      </span>
                      <span>&middot;</span>
                      <span className="text-emerald-700 font-semibold">
                        {applicant.giTagNumber}
                      </span>
                    </div>

                    <p className="text-xs text-[#1A1A1A]/70 font-sans mt-2 max-w-2xl leading-relaxed">
                      {applicant.lineageNotes}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                  {applicant.status !== "VERIFIED" ? (
                    <>
                      <button
                        onClick={() => handleApprove(applicant.id, applicant.name)}
                        className="px-4 py-2 rounded-full bg-[#1A1A1A] text-[#F9F6F0] hover:bg-[#C25934] transition-colors text-xs font-mono tracking-wider font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Grant GI Seal</span>
                      </button>
                      <button
                        onClick={() => handleRequestAudit(applicant.id, applicant.name)}
                        className="px-4 py-2 rounded-full bg-[#F9F6F0] border border-[#C25934]/30 text-[#1A1A1A] hover:bg-white transition-colors text-xs font-mono tracking-wider cursor-pointer"
                      >
                        Request Clan Audit
                      </button>
                    </>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Sovereign GI Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
