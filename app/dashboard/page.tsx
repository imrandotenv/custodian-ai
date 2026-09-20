"use client";

import React from "react";
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
  ExternalLink,
  Award,
  Sparkles,
} from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";

export default function CustodianDashboard() {
  const { role, setRole } = useRole();

  // Ensure role is local when on dashboard
  React.useEffect(() => {
    if (role !== "local") {
      setRole("local");
    }
  }, [role, setRole]);

  const activeListings = [
    {
      id: "soh-01",
      title: "Sohrai Khovar Mud Painting (Hazaribagh)",
      price: "₹ 18,500",
      status: "Reserved by Ethno Collector",
      statusColor: "text-accent bg-accent/10 border-accent/25",
      views: 218,
      pledges: 47,
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      consentRules: [
        "No flash photography of Jaher Than",
        "Respect Sohrai harvest motifs",
        "Do Not Touch Dudhi Clay",
      ],
    },
    {
      id: "dok-02",
      title: "Bastar & Purulia Dokra Metalcraft",
      price: "₹ 14,200",
      status: "Active on Global Gallery",
      statusColor: "text-[#C25934] bg-[#C25934]/10 border-[#C25934]/25",
      views: 164,
      pledges: 32,
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      consentRules: [
        "Respect ancestral furnace",
        "No mechanical reproduction",
      ],
    },
    {
      id: "soh-03",
      title: "Jaher Than Sacred Sal Grove Ochre Panel",
      price: "₹ 24,000",
      status: "Active on Global Gallery",
      statusColor: "text-[#C25934] bg-[#C25934]/10 border-[#C25934]/25",
      views: 312,
      pledges: 68,
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      consentRules: [
        "No flash photography of Jaher Than",
        "Respect Sohrai harvest motifs",
        "Do Not Touch Pigments",
      ],
    },
  ];

  return (
    <main className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-16 sm:pt-32 sm:pb-24 flex flex-col gap-12 sm:gap-16 overflow-hidden">
      
      {/* Subtle Background Watermark: Ol Chiki (Santhali Script) */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-4 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mono text-[#2C2A29]/[0.035] pointer-events-none select-none tracking-widest -rotate-6 font-bold"
      >
        ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ
      </div>

      {/* Header Profile & Sovereign Status */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C25934]/15 pb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3.5 py-1 rounded-full bg-[#C25934]/10 border border-[#C25934]/25 text-[#C25934] text-[11px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span>ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ</span>
              <span>&middot;</span>
              <span>Master Custodian Portal</span>
            </span>
            <span className="text-[11px] font-mono text-accent font-semibold tracking-wider">
              GI Tag #JH-SOHRAI-2020
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight">
            Muni Devi (Sohrai Artist)
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-sans mt-1 max-w-2xl leading-relaxed">
            Master of Sohrai &amp; Khovar Mud Murals &middot; Hazaribagh, Jharkhand &middot; Dudhi Kaolin Clay &amp; River Manganese
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/add-art"
            data-cursor="explore"
            className="px-6 py-3.5 rounded-2xl bg-[#C25934] text-[#F9F6F0] text-sm font-serif font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Catalog New Sacred Art</span>
          </Link>
          <Link
            href="/explore"
            data-cursor="explore"
            className="px-5 py-3.5 rounded-2xl bg-[#F9F6F0]/80 border border-[#C25934]/20 text-[#1A1A1A] text-sm font-serif font-semibold hover:bg-[#F9F6F0] transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#C25934]" />
            <span>Preview Global Gallery</span>
          </Link>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-primary mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
              Active Relics
            </span>
            <PackageOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-textPrimary">14</span>
            <span className="text-xs text-accent font-semibold block mt-1">3 currently reserved</span>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-accent mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
              Direct Earnings
            </span>
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-textPrimary">₹ 48,250</span>
            <span className="text-xs text-accent font-semibold block mt-1">100% direct to Muni Devi &middot; 0% fee</span>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#C25934] mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
              Signed Consent Pledges
            </span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-textPrimary">219</span>
            <span className="text-xs text-textPrimary/70 block mt-1">Strict digital respect enforced</span>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-3xl border border-[#C25934]/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#849A89] mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-textPrimary/60">
              Sovereignty Status
            </span>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-textPrimary">GI Protected</span>
            <span className="text-xs text-[#E5A882] block mt-1">Santhali Heritage Guardian</span>
          </div>
        </div>
      </section>

      {/* Smart Cultural Consent Monitor tailored to Santhali & Sohrai Tradition */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#849A89]/10 border-2 border-[#849A89]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <motion.div
            animate={{
              scale: [1, 1.025, 1],
              boxShadow: [
                "0 0 0 0 rgba(132, 154, 137, 0)",
                "0 0 0 5px rgba(132, 154, 137, 0.25)",
                "0 0 0 0 rgba(132, 154, 137, 0)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#849A89]/20 border border-[#849A89]/40 text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#849A89] w-fit shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-accent animate-pulse" />
            <span>Active Smart Consent Protocol (USP)</span>
          </motion.div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-textPrimary">
            Your Ancestral Rules Are Legally Enforced
          </h2>
          <p className="text-xs sm:text-sm text-textPrimary/80 font-sans leading-relaxed max-w-2xl">
            Every traveler must complete your interactive Digital Pledge before accessing your studio in Hazaribagh or acquiring Sohrai Khovar paintings. Commercial exploitation and photography violations are legally prevented.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
          <motion.span
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(132, 154, 137, 0)",
                "0 0 0 4px rgba(132, 154, 137, 0.18)",
                "0 0 0 0 rgba(132, 154, 137, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
            className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs"
          >
            <CameraOff className="w-4 h-4 text-[#C25934]" />
            <span>No flash photography of the Jaher Than (Sacred Grove)</span>
          </motion.span>
          <motion.span
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(132, 154, 137, 0)",
                "0 0 0 4px rgba(132, 154, 137, 0.18)",
                "0 0 0 0 rgba(132, 154, 137, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.35 }}
            className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs"
          >
            <VolumeX className="w-4 h-4 text-accent" />
            <span>Respect the Sohrai harvest festival motifs</span>
          </motion.span>
          <motion.span
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(132, 154, 137, 0)",
                "0 0 0 4px rgba(132, 154, 137, 0.18)",
                "0 0 0 0 rgba(132, 154, 137, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
            className="px-4 py-2.5 rounded-2xl bg-white/95 border border-[#849A89]/35 text-xs font-mono font-medium text-textPrimary flex items-center gap-2 shadow-2xs"
          >
            <HandMetal className="w-4 h-4 text-primary" />
            <span>Do Not Touch Dudhi Clay Pigments</span>
          </motion.span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeListings.map((item) => (
            <TiltCard
              key={item.id}
              className="h-full"
              innerClassName="h-full rounded-3xl"
              maxRotation={6}
              perspective={1000}
              maxGlareOpacity={0.18}
            >
              <div className="bg-white/90 rounded-3xl border border-[#C25934]/15 overflow-hidden shadow-sm flex flex-col justify-between h-full">
                <ParallaxImage
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full bg-[#EFE9DF]"
                  parallaxRange={["-10%", "10%"]}
                  scale={1.2}
                  dataCursor="view"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </ParallaxImage>

                <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-textPrimary/50 uppercase">
                        ID: {item.id}
                      </span>
                      <span className="font-serif text-lg font-bold text-textPrimary">
                        {item.price}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-textPrimary leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.consentRules.map((rule) => (
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
                    <span>{item.pledges} Signed Pledges</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

    </main>
  );
}
