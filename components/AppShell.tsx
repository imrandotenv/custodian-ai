"use client";

import React from "react";
import { RoleProvider, useRole } from "./RoleContext";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import SmoothScroll from "./SmoothScroll";
import AmbientAudio from "./AmbientAudio";
import ScrollProgress from "./ScrollProgress";
import Footer from "./Footer";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useRole();

  return (
    <div className="flex flex-col min-h-screen relative bg-[#FAF9F5] text-[#1A1A1A]">
      <ScrollProgress />
      <SmoothScroll />
      <Navbar role={role} onRoleChange={setRole} />
      <main className="flex-1 w-full">{children}</main>
      <CartDrawer />
      <AmbientAudio />
      <Footer />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider initialRole="tourist">
      <CartProvider>
        <ShellInner>{children}</ShellInner>
      </CartProvider>
    </RoleProvider>
  );
}
