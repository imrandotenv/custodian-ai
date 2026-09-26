"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUp,
  MapPin,
  MessageCircle,
  Mail,
  ShieldCheck,
  Heart,
  Palette,
  Users,
  ShoppingBag,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#1C1917] text-[#F9F6F0] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#C25934]/30 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* 1. TOP NEWSLETTER / WHATSAPP CONNECT BANNER */}
        <div className="p-8 rounded-3xl bg-[#2A2624] border border-[#C25934]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-mono text-[#E5A882] uppercase tracking-wider font-bold">
              Stay Connected With Living Heritage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Support 15 Rural Artisan Families in Jharkhand
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-sans mt-0.5">
              Chat directly with our team in Ramgarh Cantt for bespoke mural commissions, wholesale inquiries, or custom tribal gifts.
            </p>
          </div>

          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20would%20like%20to%20connect%20with%20your%20team%20in%20Ramgarh%20Cantt."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#C25934] text-white font-serif font-bold text-sm shadow-md hover:bg-[#A84724] transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp (+91 72608 15628)</span>
          </a>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER DIRECTORY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          
          {/* Column 1: Brand & Contact Ledger */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C25934] text-white flex items-center justify-center font-serif text-base font-bold">
                मा
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white">
                  Maati Ghar
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#E5A882] uppercase">
                  माटी घर &bull; Ramgarh Cantt
                </span>
              </div>
            </div>

            <p className="text-xs text-white/75 font-sans leading-relaxed">
              A grassroots social enterprise celebrating Jharkhand&apos;s indigenous tribal arts, organic earthen crafts, and rural women Self-Help Groups (SHGs). 100% natural earth pigments, zero toxic chemicals, and direct fair-trade remuneration.
            </p>

            <div className="flex flex-col gap-2 text-xs font-mono text-white/80 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C25934] shrink-0 mt-0.5" />
                <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#C25934] shrink-0" />
                <a
                  href="https://wa.me/917260815628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold text-[#E5A882]"
                >
                  +91 72608 15628
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C25934] shrink-0" />
                <a href="mailto:maatikaghar@gmail.com" className="hover:underline">
                  maatikaghar@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Indigenous Crafts */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E5A882] font-bold">
              Tribal Art Forms
            </span>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Sohrai Mud Painting (Hazaribagh)
            </Link>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Dokra Lost-Wax Metallurgy (Purulia)
            </Link>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Santhali Handloom (Dumka &amp; Pakur)
            </Link>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Santhali Bamboo Craft (Jhargram)
            </Link>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Santhali Needle Embroidery (Malda)
            </Link>
            <Link
              href="/#murals"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Bespoke Architectural Murals
            </Link>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E5A882] font-bold">
              Explore &amp; Portals
            </span>
            <Link
              href="/"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#collection"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Shop Collection (15 Artworks)
            </Link>
            <Link
              href="/#artisans"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Our 15 Living Artisans
            </Link>
            <Link
              href="/#map"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Topography of Living Ateliers
            </Link>
            <Link
              href="/#murals"
              className="text-xs sm:text-sm text-white/80 hover:text-[#E5A882] transition-colors"
            >
              Commission Custom Mural
            </Link>
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm text-[#849A89] hover:underline font-semibold"
            >
              Artisan Custodian Portal &rarr;
            </Link>
          </div>

          {/* Column 4: Principles & GI Protection */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E5A882] font-bold">
              Our Principles
            </span>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#C25934] shrink-0" />
              <span>GI Tag #JH-SOHRAI-2020</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Heart className="w-4 h-4 text-[#C25934] shrink-0" />
              <span>90% Direct Artisan Payout</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Palette className="w-4 h-4 text-[#C25934] shrink-0" />
              <span>100% Earthen Soil Colors</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Users className="w-4 h-4 text-[#C25934] shrink-0" />
              <span>Rural Women SHG Empowerment</span>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-[#2A2624] border border-white/10 text-[11px] text-white/70">
              &ldquo;When you acquire a piece from Maati Ghar, you support an unbroken lineage of forest songs, sacred mud, and sovereign rural self-reliance.&rdquo;
            </div>
          </div>

        </div>

        {/* 3. BOTTOM MINIMALIST COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} MAATI GHAR (माटी घर)</span>
            <span>&bull;</span>
            <span>RAMGARH CANTT, JHARKHAND - 829122</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#C25934] hover:text-white transition-all text-xs font-bold cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
