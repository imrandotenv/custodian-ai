"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/components/RoleContext";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function GatekeeperLanding() {
  const router = useRouter();
  const { setRole } = useRole();
  const [hoveredSide, setHoveredSide] = useState<"traveler" | "custodian" | null>(null);

  const handleSelectTraveler = () => {
    setRole("tourist");
    router.push("/explore");
  };

  const handleSelectCustodian = () => {
    setRole("local");
    router.push("/dashboard");
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col md:flex-row bg-[#141312] select-none">
      
      {/* Top Center Minimalist Brand Emblem */}
      <header className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#F9F6F0] drop-shadow-md">
            Mitti
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C25934]" />
        </div>
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#F9F6F0]/70 font-semibold mt-1">
          Sovereign Tribal Living &middot; Dual Gatekeeper
        </span>
      </header>

      {/* Bottom Center Subtle Footer */}
      <footer className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#F9F6F0]/50 font-medium">
          Indian Tribal Artistry &middot; Est. 2026
        </span>
      </footer>

      {/* LEFT HALF: The Tourist / Traveler (Dokra Metalcraft) */}
      <motion.section
        aria-label="Traveler Entrance"
        onMouseEnter={() => setHoveredSide("traveler")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleSelectTraveler}
        data-cursor="explore"
        initial={false}
        animate={{
          flex:
            hoveredSide === "traveler"
              ? 7
              : hoveredSide === "custodian"
              ? 3
              : 5,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full md:w-auto h-full overflow-hidden cursor-pointer group flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10"
      >
        {/* Background Image: Moody Dokra Metalcraft & Bronze Metallurgy */}
        <motion.img
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=2000&q=85"
          alt="Ancient Dokra Lost-Wax Metalcraft Metallurgy"
          animate={{ scale: hoveredSide === "traveler" ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center select-none brightness-[0.85]"
        />

        {/* Soft, Subtle Dark Gradient Overlay (Zero harsh red/orange, pure readability) */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 pointer-events-none" />

        {/* Content Container strictly constrained to avoid overflow */}
        <div className="relative z-20 w-full h-full flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            {hoveredSide === "traveler" ? (
              /* Expanded State (70% Screen Width) */
              <motion.div
                key="traveler-expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center max-w-xl w-full overflow-hidden pointer-events-none"
              >
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#F9F6F0] font-semibold mb-6 border border-white/20 shadow-lg">
                  ETHICAL LIVING EXPLORATION
                </span>

                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F9F6F0] leading-none mb-6 drop-shadow-2xl">
                  I am a <span className="italic text-[#E5A882]">Traveler</span>
                </h2>

                <p className="font-sans text-sm sm:text-base md:text-lg text-[#F9F6F0]/90 leading-relaxed font-light mb-8 max-w-md">
                  Discover authentic Santhali heritage, participate in sacred ceramic kiln residencies, and pledge digital reverence before acquiring master tribal works.
                </p>

                <MagneticButton
                  onClick={handleSelectTraveler}
                  dataCursor="explore"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F9F6F0] text-[#1C1A19] font-serif font-bold text-sm sm:text-base shadow-2xl hover:scale-105 transition-transform pointer-events-auto cursor-pointer"
                >
                  <span>Enter Cultural Sanctuary</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#C25934]" />
                </MagneticButton>

                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#F9F6F0]/60 mt-4">
                  Click to enter global gallery
                </span>
              </motion.div>
            ) : hoveredSide === "custodian" ? (
              /* Contracted State (30% Width when Custodian is hovered) */
              <motion.div
                key="traveler-contracted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.35, scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center text-center max-w-full px-4 overflow-hidden pointer-events-none"
              >
                <Compass className="w-5 h-5 text-[#F9F6F0]/70 mb-3" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F9F6F0] leading-tight">
                  Traveler
                </h2>
                <span className="text-[10px] font-mono tracking-widest text-[#F9F6F0]/60 mt-3 uppercase">
                  Portal 01
                </span>
              </motion.div>
            ) : (
              /* Idle State (50% Width): Massive, Centered Horizontal Typography */
              <motion.div
                key="traveler-idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center max-w-lg w-full px-4 overflow-hidden pointer-events-none"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Compass className="w-4 h-4 text-[#F9F6F0]/80" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#F9F6F0]/80 font-semibold">
                    PORTAL № 01
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F9F6F0] leading-[1.05] drop-shadow-2xl">
                  I am a <br />
                  <span className="italic font-light text-[#F9F6F0]">Traveler</span>
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#F9F6F0]/75 font-light mt-4 sm:mt-5 max-w-xs sm:max-w-sm line-clamp-2">
                  Discover authentic Santhali heritage &amp; sacred residencies
                </p>

                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#F9F6F0]/50 mt-4 sm:mt-6">
                  Hover to explore &middot; Click to enter
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* RIGHT HALF: The Custodian (Sohrai Mud Painting) */}
      <motion.section
        aria-label="Custodian Entrance"
        onMouseEnter={() => setHoveredSide("custodian")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleSelectCustodian}
        data-cursor="explore"
        initial={false}
        animate={{
          flex:
            hoveredSide === "custodian"
              ? 7
              : hoveredSide === "traveler"
              ? 3
              : 5,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full md:w-auto h-full overflow-hidden cursor-pointer group flex items-center justify-center"
      >
        {/* Background Image: Authentic Sohrai Earthen Mud Mural */}
        <motion.img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=2000&q=85"
          alt="Authentic Sohrai Earthen Mud Mural & Laterite Clay"
          animate={{ scale: hoveredSide === "custodian" ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center select-none brightness-[0.85]"
        />

        {/* Soft, Subtle Dark Gradient Overlay (Zero harsh red/orange, pure readability) */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 pointer-events-none" />

        {/* Content Container strictly constrained to avoid overflow */}
        <div className="relative z-20 w-full h-full flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            {hoveredSide === "custodian" ? (
              /* Expanded State (70% Screen Width) */
              <motion.div
                key="custodian-expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center max-w-xl w-full overflow-hidden pointer-events-none"
              >
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#F9F6F0] font-semibold mb-6 border border-white/20 shadow-lg">
                  SOVEREIGN ARTISAN SANCTUARY
                </span>

                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F9F6F0] leading-none mb-6 drop-shadow-2xl">
                  I am a <span className="italic text-[#E5A882]">Custodian</span>
                </h2>

                <p className="font-sans text-sm sm:text-base md:text-lg text-[#F9F6F0]/90 leading-relaxed font-light mb-8 max-w-md">
                  Share your ancestral art on your own sovereign terms, enforce strict ritual consent protocols, and receive 100% direct bank payouts without commercial middlemen.
                </p>

                <MagneticButton
                  onClick={handleSelectCustodian}
                  dataCursor="explore"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C25934] text-[#F9F6F0] font-serif font-bold text-sm sm:text-base shadow-2xl hover:scale-105 transition-transform border border-white/20 pointer-events-auto cursor-pointer"
                >
                  <span>Enter Artisan Workspace</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F9F6F0]" />
                </MagneticButton>

                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#F9F6F0]/60 mt-4">
                  Click to access creator dashboard
                </span>
              </motion.div>
            ) : hoveredSide === "traveler" ? (
              /* Contracted State (30% Width when Traveler is hovered) */
              <motion.div
                key="custodian-contracted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.35, scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center text-center max-w-full px-4 overflow-hidden pointer-events-none"
              >
                <ShieldCheck className="w-5 h-5 text-[#F9F6F0]/70 mb-3" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F9F6F0] leading-tight">
                  Custodian
                </h2>
                <span className="text-[10px] font-mono tracking-widest text-[#F9F6F0]/60 mt-3 uppercase">
                  Portal 02
                </span>
              </motion.div>
            ) : (
              /* Idle State (50% Width): Massive, Centered Horizontal Typography */
              <motion.div
                key="custodian-idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center max-w-lg w-full px-4 overflow-hidden pointer-events-none"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#F9F6F0]/80" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#F9F6F0]/80 font-semibold">
                    PORTAL № 02
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F9F6F0] leading-[1.05] drop-shadow-2xl">
                  I am a <br />
                  <span className="italic font-light text-[#F9F6F0]">Custodian</span>
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#F9F6F0]/75 font-light mt-4 sm:mt-5 max-w-xs sm:max-w-sm line-clamp-2">
                  Share ancestral art on sovereign terms &amp; direct fair-trade
                </p>

                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#F9F6F0]/50 mt-4 sm:mt-6">
                  Hover to explore &middot; Click to enter
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

    </div>
  );
}
