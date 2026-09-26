"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  PackageOpen,
  PlusCircle,
  IndianRupee,
  ShieldCheck,
  BarChart3,
  ChevronDown,
  Check,
  UserCheck,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Menu,
  X,
  Palette,
  Users,
} from "lucide-react";

export type UserRole = "tourist" | "local" | "admin";

export interface NavbarProps {
  role: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

const ROLE_DETAILS: Record<
  UserRole,
  { label: string; badge: string; description: string }
> = {
  tourist: {
    label: "Customer / Explorer",
    badge: "Shopper",
    description: "Discover handcrafted arts & support rural artisans",
  },
  local: {
    label: "Artisan Custodian",
    badge: "Maker / SHG",
    description: "Manage craft listings & view 90% direct payouts",
  },
  admin: {
    label: "Superintendent",
    badge: "Admin",
    description: "Verify artisan KYC & platform metrics",
  },
};

export default function Navbar({ role, onRoleChange }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRoleInfo = ROLE_DETAILS[role];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (newRole: UserRole) => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#C25934]/15 shadow-2xs">
      
      {/* 1. TOP ANNOUNCEMENT BAR (maatighar.com style) */}
      <div className="w-full bg-[#C25934] text-[#F9F6F0] py-1.5 px-4 text-center text-xs font-sans font-medium flex items-center justify-between sm:justify-center gap-4">
        <span className="truncate">
          🌱 100% Natural Earth Colors &bull; Direct from Ramgarh Cantt Artisans &bull; 90% Direct Remuneration
        </span>
        <a
          href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20know%20more%20about%20your%20tribal%20artworks."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 underline text-white font-semibold text-[11px] hover:text-[#FAF6EE]"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp: +91 72608 15628</span>
        </a>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#C25934] text-[#F9F6F0] flex items-center justify-center font-serif text-xl font-bold shadow-xs group-hover:scale-105 transition-transform">
              <span>मा</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#C25934] transition-colors">
                  Maati Ghar
                </span>
                <span className="font-serif text-sm font-normal text-[#C25934]">
                  माटी घर
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1A1A1A]/70">
                From the Earth, For the Soul &bull; Ramgarh Cantt
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link
              href="/"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934]"
            >
              Home
            </Link>
            <Link
              href="/#collection"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934] flex items-center gap-1"
            >
              <ShoppingBag className="w-4 h-4 text-[#C25934]" />
              <span>Shop Collection</span>
            </Link>
            <Link
              href="/#artisans"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934] flex items-center gap-1"
            >
              <Users className="w-4 h-4 text-[#C25934]" />
              <span>Our Artisans</span>
            </Link>
            <Link
              href="/#pigments"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934] flex items-center gap-1"
            >
              <Palette className="w-4 h-4 text-[#C25934]" />
              <span>Earth Pigments</span>
            </Link>
            <Link
              href="/#map"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934] flex items-center gap-1"
            >
              <MapPin className="w-4 h-4 text-[#C25934]" />
              <span>Living Map</span>
            </Link>
            <Link
              href="/#murals"
              className="hover:text-[#C25934] transition-colors py-1 hover:border-b-2 hover:border-[#C25934]"
            >
              Custom Murals
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#C25934] transition-colors py-1 text-accent font-semibold"
            >
              Artisan Portal
            </Link>
          </nav>

          {/* Right Section: WhatsApp Button & Role Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Quick WhatsApp Inquiry Button */}
            <a
              href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20artworks."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold shadow-xs hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {/* Role Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#C25934]/30 hover:border-[#C25934] shadow-xs text-xs font-medium text-[#1A1A1A] transition-all cursor-pointer"
                aria-expanded={dropdownOpen}
                aria-label="Toggle user role menu"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="hidden xl:inline text-[#1A1A1A]/60 text-[11px] uppercase tracking-wider font-semibold">
                  Mode:
                </span>
                <span className="font-semibold text-[#C25934]">
                  {currentRoleInfo.label.split(" ")[0]}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#1A1A1A]/60 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#C25934]/20 shadow-xl p-2 z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-[#C25934]/15 mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C25934]">
                      Select View Mode
                    </p>
                    <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
                      Switch between customer and artisan custodian perspectives.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    {(["tourist", "local", "admin"] as UserRole[]).map((r) => {
                      const isSelected = role === r;
                      const item = ROLE_DETAILS[r];
                      return (
                        <button
                          key={r}
                          onClick={() => handleRoleSelect(r)}
                          className={`w-full flex items-start justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#F9F6F0] border border-[#C25934]/30 shadow-xs"
                              : "hover:bg-[#C25934]/5"
                          }`}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-semibold ${
                                  isSelected ? "text-[#C25934]" : "text-[#1A1A1A]"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/15 text-accent font-medium">
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#1A1A1A]/70 mt-0.5">
                              {item.description}
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl border border-[#C25934]/20 bg-white text-[#1A1A1A] hover:bg-[#F9F6F0] transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* 3. MOBILE RESPONSIVE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#C25934]/15 px-4 pt-3 pb-6 flex flex-col gap-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934]"
          >
            Home
          </Link>
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934] flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#C25934]" />
            <span>Shop Collection (15 Artworks)</span>
          </Link>
          <Link
            href="/#artisans"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934] flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-[#C25934]" />
            <span>Our 15 Artisans</span>
          </Link>
          <Link
            href="/#pigments"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934] flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-[#C25934]" />
            <span>Sacred Earth Pigments</span>
          </Link>
          <Link
            href="/#map"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934] flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C25934]" />
            <span>Topography of Living Ateliers</span>
          </Link>
          <Link
            href="/#murals"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] hover:text-[#C25934]"
          >
            Commission Custom Mural
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-xl text-sm font-semibold text-accent hover:bg-[#F9F6F0]"
          >
            Artisan Custodian Portal &rarr;
          </Link>

          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20artworks."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full py-2.5 rounded-xl bg-[#C25934] text-white text-center text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us: +91 72608 15628</span>
          </a>
        </div>
      )}

    </header>
  );
}
