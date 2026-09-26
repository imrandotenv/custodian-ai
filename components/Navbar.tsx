"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Search,
  Users,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useCart } from "./CartContext";
import { MAATIGHAR_CATEGORIES } from "@/lib/maatiGharProducts";

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
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [paintingsMenuOpen, setPaintingsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const paintingsDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(target)) {
        setShopMenuOpen(false);
      }
      if (
        paintingsDropdownRef.current &&
        !paintingsDropdownRef.current.contains(target)
      ) {
        setPaintingsMenuOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(target)) {
        setAboutMenuOpen(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopMenuOpen(false);
    setPaintingsMenuOpen(false);
    setAboutMenuOpen(false);
  }, [pathname]);

  const handleRoleSelect = (newRole: UserRole) => {
    if (onRoleChange) onRoleChange(newRole);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const currentRoleInfo = ROLE_DETAILS[role];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#C25934]/15 shadow-2xs select-none">
      {/* 1. TOP ANNOUNCEMENT BANNER (Exact text from maatighar.com) */}
      <div className="w-full bg-[#C25934] text-[#F9F6F0] py-1.5 px-4 text-center text-xs font-sans font-medium flex items-center justify-between sm:justify-center gap-4">
        <span className="truncate">
          For customized, bulk, and international orders, please contact us via WhatsApp on{" "}
          <strong className="underline">+91-7260815628</strong> or Email at{" "}
          <strong className="underline">maatikaghar@gmail.com</strong>
        </span>
        <a
          href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20place%20a%20bulk%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-white bg-black/15 px-2.5 py-0.5 rounded-full hover:bg-black/25 transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* 2. MAIN BRAND HEADER & NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-6">
        
        {/* Brand Logo & Tagline (Exact maatighar.com style) */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-[#C25934] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs group-hover:scale-105 transition-transform">
            मा
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">
              Maati Ghar
            </span>
            <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#C25934] uppercase font-semibold">
              Authentic &bull; Traditional &bull; Artisanal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-sans font-medium text-[#1A1A1A]/85">
          <Link
            href="/"
            className={`hover:text-[#C25934] transition-colors py-1 ${
              pathname === "/" ? "text-[#C25934] font-bold" : ""
            }`}
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div ref={shopDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setShopMenuOpen(!shopMenuOpen)}
              className="flex items-center gap-1 hover:text-[#C25934] transition-colors py-1 cursor-pointer"
            >
              <span>Shop</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {shopMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-[#C25934]/20 shadow-xl p-2 z-50 flex flex-col gap-1">
                <Link
                  href="/shop"
                  onClick={() => setShopMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors font-semibold"
                >
                  All Products
                </Link>
                <div className="h-[1px] bg-black/5 my-1" />
                {MAATIGHAR_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.key}
                    href={cat.link}
                    onClick={() => setShopMenuOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors text-[#1A1A1A]/80"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Paintings Dropdown */}
          <div ref={paintingsDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setPaintingsMenuOpen(!paintingsMenuOpen)}
              className="flex items-center gap-1 hover:text-[#C25934] transition-colors py-1 cursor-pointer"
            >
              <span>Paintings</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {paintingsMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-[#C25934]/20 shadow-xl p-2 z-50 flex flex-col gap-1">
                <Link
                  href="/shop?category=sohrai-paintings"
                  onClick={() => setPaintingsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Sohrai Paintings
                </Link>
                <Link
                  href="/shop?category=khovar-paintings"
                  onClick={() => setPaintingsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Khovar Paintings
                </Link>
                <Link
                  href="/shop?category=paitkar-paintings"
                  onClick={() => setPaintingsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Paitkar Paintings
                </Link>
                <Link
                  href="/shop?category=jadopatia-paintings"
                  onClick={() => setPaintingsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Jadopatia Paintings
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/shop?category=hand-painted"
            className="hover:text-[#C25934] transition-colors py-1"
          >
            Hand-painted Products
          </Link>

          <Link
            href="/shop?category=dhokra"
            className="hover:text-[#C25934] transition-colors py-1"
          >
            Dhokra Metal Art
          </Link>

          <Link
            href="/shop?category=ledra-textile"
            className="hover:text-[#C25934] transition-colors py-1"
          >
            Ledra Textile Art
          </Link>

          {/* About Dropdown */}
          <div ref={aboutDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
              className="flex items-center gap-1 hover:text-[#C25934] transition-colors py-1 cursor-pointer"
            >
              <span>About</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {aboutDropdownRef && aboutMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-[#C25934]/20 shadow-xl p-2 z-50 flex flex-col gap-1">
                <Link
                  href="/about"
                  onClick={() => setAboutMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors font-semibold"
                >
                  About Maati Ghar
                </Link>
                <Link
                  href="/#artisans"
                  onClick={() => setAboutMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Our 15 Living Artisans
                </Link>
                <Link
                  href="/#map"
                  onClick={() => setAboutMenuOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs hover:bg-[#F9F6F0] hover:text-[#C25934] transition-colors"
                >
                  Topography of Ateliers
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`hover:text-[#C25934] transition-colors py-1 ${
              pathname === "/contact" ? "text-[#C25934] font-bold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions: Role Switcher, Cart, WhatsApp & Mobile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher Dropdown (Custodian AI feature) */}
          <div ref={roleDropdownRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C25934]/25 text-xs font-mono font-medium hover:border-[#C25934] transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#4A6B53]" />
              <span className="text-[#1A1A1A] font-semibold">{currentRoleInfo.badge}</span>
              <ChevronDown className="w-3 h-3 text-[#1A1A1A]/60" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#C25934]/20 shadow-xl p-2 z-50 flex flex-col gap-1">
                {(["tourist", "local", "admin"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`p-2.5 rounded-xl text-left flex flex-col transition-colors cursor-pointer ${
                      role === r
                        ? "bg-[#C25934]/10 border border-[#C25934]/30"
                        : "hover:bg-[#F9F6F0]"
                    }`}
                  >
                    <span className="font-serif font-bold text-xs text-[#1A1A1A]">
                      {ROLE_DETAILS[r].label}
                    </span>
                    <span className="text-[10px] text-[#1A1A1A]/60 font-sans">
                      {ROLE_DETAILS[r].description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20art."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs hover:bg-[#1ebd59] transition-colors shadow-2xs"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Cart Icon with Real-Time Counter */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-[#C25934]/25 hover:border-[#C25934] transition-colors text-[#1A1A1A] cursor-pointer flex items-center gap-1.5"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#C25934]" />
            <span className="text-xs font-serif font-bold hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#C25934] text-white text-[10px] font-mono font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#C25934]/25 hover:border-[#C25934] transition-colors text-[#1A1A1A] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* 3. MOBILE RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-[#C25934]/20 p-5 flex flex-col gap-4 shadow-xl">
          <nav className="flex flex-col gap-2 text-sm font-sans">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] font-bold text-[#C25934]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0]"
            >
              Shop All Products
            </Link>
            <Link
              href="/shop?category=hand-painted"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Hand-painted Products
            </Link>
            <Link
              href="/shop?category=sohrai-paintings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Sohrai Paintings
            </Link>
            <Link
              href="/shop?category=khovar-paintings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Khovar Paintings
            </Link>
            <Link
              href="/shop?category=paitkar-paintings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Paitkar Paintings
            </Link>
            <Link
              href="/shop?category=jadopatia-paintings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Jadopatia Paintings
            </Link>
            <Link
              href="/shop?category=dhokra"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Dhokra Metal Art
            </Link>
            <Link
              href="/shop?category=ledra-textile"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0] pl-6 text-xs text-[#1A1A1A]/80"
            >
              &bull; Ledra Textile Art
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0]"
            >
              About Maati Ghar
            </Link>
            <Link
              href="/#artisans"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0]"
            >
              Our 15 Artisans
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-[#F9F6F0]"
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#C25934]/15 flex flex-col gap-2">
            <a
              href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20visiting%20from%20mobile."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct (+91 72608 15628)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
