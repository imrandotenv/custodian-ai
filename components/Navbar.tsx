"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
} from "lucide-react";
import CipherLink from "./CipherLink";

export type UserRole = "tourist" | "local" | "admin";

export interface NavbarProps {
  role: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_LINKS: Record<UserRole, NavLinkItem[]> = {
  tourist: [
    { label: "Explore Arts", href: "/explore", icon: Compass },
    { label: "My Cultural Trips", href: "/trips", icon: MapPin },
  ],
  local: [
    { label: "My Listings", href: "/listings", icon: PackageOpen },
    { label: "Add New Art", href: "/add-art", icon: PlusCircle },
    { label: "Earnings", href: "/earnings", icon: IndianRupee },
  ],
  admin: [
    { label: "Verify Artisans", href: "/verify", icon: ShieldCheck },
    { label: "Platform Analytics", href: "/analytics", icon: BarChart3 },
  ],
};

const ROLE_DETAILS: Record<
  UserRole,
  { label: string; badge: string; description: string }
> = {
  tourist: {
    label: "Tourist",
    badge: "Explorer",
    description: "Discover crafts & cultural trails",
  },
  local: {
    label: "Local (Custodian)",
    badge: "Artisan Custodian",
    description: "Manage listings & verify sales",
  },
  admin: {
    label: "Admin",
    badge: "Superintendent",
    description: "Artisan KYC & trust metrics",
  },
};

export default function Navbar({ role, onRoleChange }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  const { scrollY } = useScroll();

  // Smart Scroll (Auto-Hide): Scroll down -> hide (-100%), Scroll up even slightly -> reveal (0%)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;
    lastScrollYRef.current = latest;

    // Always keep header visible at the very top of the page
    if (latest <= 10) {
      setHidden(false);
      return;
    }

    // Never hide header when the role switch dropdown menu is active
    if (dropdownOpen) {
      setHidden(false);
      return;
    }

    if (latest > previous && latest > 50) {
      // User scrolling down past initial threshold
      setHidden(true);
    } else if (latest < previous) {
      // User scrolling up even slightly
      setHidden(false);
    }
  });

  const links = ROLE_LINKS[role] || [];
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
  };

  return (
    <motion.nav
      variants={{
        visible: { y: "0%" },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed top-0 w-full z-[100] bg-[#F9F6F0]/60 backdrop-blur-xl border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Playfair Display serif font */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Handcrafted Terracotta Motif Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#C25934] text-[#F9F6F0] flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#C25934] transition-colors">
                Mitti
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1A1A1A]/70">
                Tribal Heritage
              </span>
            </div>
          </Link>

          {/* Role-Based Links with Framer Motion Hover & Ol Chiki Cipher Decoding Effect */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <div key={link.label} className="relative">
                  <CipherLink
                    href={link.href}
                    icon={Icon}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="relative px-4 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#C25934] transition-colors rounded-2xl inline-flex items-center gap-2 group z-10"
                  >
                    {link.label}
                  </CipherLink>

                  {/* Tactile Warm Sand & Terracotta Hover Pill */}
                  {hoveredIdx === idx && (
                    <motion.div
                      layoutId="navbar-hover-indicator"
                      className="absolute inset-0 rounded-2xl bg-[#C25934]/10 border border-[#C25934]/20 pointer-events-none"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section: RBAC Demo Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              
              {/* Minimalist Switch Role Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F6F0]/80 border border-[#C25934]/25 hover:border-[#C25934]/50 shadow-xs text-xs font-medium text-[#1A1A1A] hover:bg-[#F9F6F0] transition-all cursor-pointer"
                aria-expanded={dropdownOpen}
                aria-label="Toggle role switch demo menu"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="hidden sm:inline text-[#1A1A1A]/60 text-[11px] uppercase tracking-wider font-semibold">
                  Demo RBAC:
                </span>
                <span className="font-semibold text-[#C25934]">
                  {currentRoleInfo.label}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#1A1A1A]/60 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Framer Motion Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-72 rounded-xl bg-[#F9F6F0] border border-[#C25934]/20 shadow-lg p-2 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-2 border-b border-[#C25934]/15 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#C25934]">
                        Switch Active Role (Demo)
                      </p>
                      <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
                        Simulating authentication state for Round 1 judging.
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
                            className={`w-full flex items-start justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#F9F6F0] border border-[#C25934]/30 shadow-xs"
                                : "hover:bg-[#C25934]/5"
                            }`}
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-semibold ${
                                    isSelected
                                      ? "text-[#C25934]"
                                      : "text-[#1A1A1A]"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent font-medium">
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

                    <div className="mt-2 pt-2 border-t border-[#C25934]/10 px-3 py-1 flex items-center gap-1.5 text-[10px] text-[#1A1A1A]/60">
                      <UserCheck className="w-3 h-3 text-accent" />
                      <span>Zero dark mode / Pure terracotta mud theme</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar for Role Links with Ol Chiki Cipher */}
        <div className="flex md:hidden items-center gap-2 py-2.5 border-t border-[#C25934]/10 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <CipherLink
                key={link.label}
                href={link.href}
                icon={Icon}
                className="shrink-0 text-xs font-medium px-4 py-2 rounded-full bg-[#F9F6F0]/80 border border-[#C25934]/15 text-[#1A1A1A] hover:text-[#C25934] active:bg-[#C25934]/10 transition-colors shadow-2xs"
              >
                {link.label}
              </CipherLink>
            );
          })}
        </div>

      </div>
    </motion.nav>
  );
}
