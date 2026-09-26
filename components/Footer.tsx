"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Mail,
  ShieldCheck,
  Heart,
  ArrowUp,
  Phone,
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
        
        {/* 1. TOP ANNOUNCEMENT / WHATSAPP BANNER */}
        <div className="p-8 rounded-3xl bg-[#2A2624] border border-[#C25934]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-mono text-[#E5A882] uppercase tracking-wider font-bold">
              Customized, Bulk &amp; International Orders
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Connect Directly with Maati Ghar Atelier
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-sans mt-0.5">
              Contact us for bespoke wall murals, handloom custom orders, or corporate handicraft gifting directly from Ramgarh Cantt.
            </p>
          </div>

          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20would%20like%20to%20connect%20with%20your%20team%20in%20Ramgarh%20Cantt."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-serif font-bold text-sm shadow-md hover:bg-[#1ebd59] transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: +91 72608 15628</span>
          </a>
        </div>

        {/* 2. MAIN 4-COLUMN FOOTER DIRECTORY (Exact maatighar.com categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          
          {/* Column 1: Brand & Enterprise Profile */}
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
                  Authentic &bull; Traditional &bull; Artisanal
                </span>
              </div>
            </div>

            <p className="text-xs text-white/75 font-sans leading-relaxed">
              Maati Ghar is a brand of <strong>Maati Ghar Arts and Crafts</strong>, a social enterprise by Virendra Kumar based in Ramgarh Cantt, Jharkhand. Dedicated to preserving authentic Sohrai, Khovar, Paitkar, and Jadopatia paintings alongside handcrafted tribal lifestyle goods.
            </p>

            <div className="flex flex-col gap-2 text-xs font-mono text-white/80 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C25934] shrink-0 mt-0.5" />
                <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C25934] shrink-0" />
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

          {/* Column 2: Traditional Paintings */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Traditional Paintings
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-sans text-white/70">
              <li>
                <Link
                  href="/shop?category=sohrai-paintings"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Sohrai Paintings of Jharkhand
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=khovar-paintings"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Khovar Bridal Murals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=paitkar-paintings"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Paitkar Ancient Scroll Art
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=jadopatia-paintings"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Jadopatia (Jadupatua) Paintings
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=sohrai-paintings"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Exclusive Sohrai Murals (Putli Ganju)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Handicrafts & Policy */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Handicrafts &amp; Store
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-sans text-white/70">
              <li>
                <Link
                  href="/shop?category=hand-painted"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Hand-painted Home Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=dhokra"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Dhokra Metal Art (Lost-Wax)
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=ledra-textile"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Ledra Textile Art of Jharkhand
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  About Maati Ghar
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#E5A882] transition-colors"
                >
                  Custom Murals &amp; Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Ethics */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Our Sovereign Pledge
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-sans text-white/70">
              <li className="flex items-center gap-1.5 text-white/90 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A882]" />
                <span>90% Direct Artisan Remuneration</span>
              </li>
              <li className="flex items-center gap-1.5 text-white/90 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A882]" />
                <span>100% Natural Earth Clays &amp; Ochres</span>
              </li>
              <li className="flex items-center gap-1.5 text-white/90 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A882]" />
                <span>GI Certified #JH-SOHRAI-2020</span>
              </li>
              <li className="flex items-center gap-1.5 text-white/90 font-medium">
                <Heart className="w-3.5 h-3.5 text-[#E5A882]" />
                <span>Women SHG Economic Empowerment</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3. COPYRIGHT & LEGAL BOTTOM STRIP */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans">
          <span>&copy; 2026 Maati Ghar Arts and Crafts. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[11px] font-mono text-[#E5A882]">
            <span>Ramgarh Cantt &bull; Hazaribagh &bull; Dumka &bull; Purulia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
