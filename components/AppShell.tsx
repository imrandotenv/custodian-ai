"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RoleProvider, useRole } from "./RoleContext";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import AmbientAudio from "./AmbientAudio";
import ScrollProgress from "./ScrollProgress";
import Footer from "./Footer";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useRole();
  const pathname = usePathname();
  const isGatekeeper = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Global Fixed Full-Screen Organic SVG Noise/Grain Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.03] mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <Preloader />
      <CustomCursor />
      <AmbientAudio />
      {!isGatekeeper && <ScrollProgress />}
      <SmoothScroll />
      {!isGatekeeper && <Navbar role={role} onRoleChange={setRole} />}
      <div className="flex-1">{children}</div>
      {!isGatekeeper && <Footer />}
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider initialRole="tourist">
      <ShellInner>{children}</ShellInner>
    </RoleProvider>
  );
}
