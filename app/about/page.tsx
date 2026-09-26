"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  MapPin,
  Leaf,
  Users,
  Award,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF9F5] text-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C25934] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#C25934]" />
            <span>OUR STORY &bull; हमारी कहानी</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight">
            About Maati Ghar (माटी घर)
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/80 font-sans leading-relaxed">
            Preserving Jharkhand&apos;s ancient earthen heritage, sacred mural lore, and dignified livelihoods for rural tribal women.
          </p>
        </div>

        {/* Founder & Enterprise Profile */}
        <div className="p-8 rounded-3xl bg-white border border-[#C25934]/20 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-2xl bg-[#C25934] text-white flex items-center justify-center font-serif text-5xl font-bold shrink-0 shadow-md">
            मा
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
              RAMGARH CANTT SOCIAL ENTERPRISE
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Maati Ghar Arts and Crafts
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-sans leading-relaxed">
              Maati Ghar is a brand of <strong>Maati Ghar Arts and Crafts</strong>, a social enterprise founded by <strong>Virendra Kumar</strong> based in <strong>Ramgarh Cantt, Jharkhand</strong>. Our mission is to bridge ancient tribal wisdom with the modern world while providing fair economic independence to rural women artisans.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#C25934]/15 shadow-2xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              100% Natural Earth
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Every painting is created exclusively using unprocessed mineral soils: Dudhimati white kaolin, riverbed black manganese, and Lalmati red geru. Zero chemical acrylics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#C25934]/15 shadow-2xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A6B53]/10 text-[#4A6B53] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              90% Direct Pay
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Eliminating middlemen and exploitative traders. Over 90% of craft sale proceeds go straight into the bank accounts of our 15 rural artisan families.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#C25934]/15 shadow-2xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              GI Tag Protection
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Certified under Geographic Indication (GI) #JH-SOHRAI-2020. Guarding against unauthorized generative AI cloning and commercial mass copying.
            </p>
          </div>
        </div>

        {/* Detailed Traditions We Revive */}
        <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-[#C25934]/20">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            The Heritage Art Forms We Protect
          </h2>

          <div className="flex flex-col gap-6 divide-y divide-black/5 text-xs sm:text-sm text-[#1A1A1A]/80">
            <div className="pt-4 flex flex-col gap-1.5">
              <h4 className="font-serif text-base font-bold text-[#C25934]">
                1. Sohrai Mud Fresco Art (Hazaribagh &amp; Ramgarh)
              </h4>
              <p className="leading-relaxed">
                Practiced by matriarchal women during the post-harvest festival following Diwali. White kaolin mud is applied over wet dark earth and carved using finger combs to depict cattle, tigers, peacocks, and banyan trees.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-1.5">
              <h4 className="font-serif text-base font-bold text-[#C25934]">
                2. Khovar Bridal Chamber Painting
              </h4>
              <p className="leading-relaxed">
                Painted inside the wedding room of the bride and groom. Comb-scratched sgraffito patterns invoke fertility blessings, conjugal fidelity, and harmony with nature.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-1.5">
              <h4 className="font-serif text-base font-bold text-[#C25934]">
                3. Paitkar Folk Scrolls (Amadubi Village)
              </h4>
              <p className="leading-relaxed">
                One of India&apos;s oldest surviving scroll painting traditions. Chitrakars paint on handmade jute parchment with stone ochres and neem juice, narrating Santhal creation epics.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-1.5">
              <h4 className="font-serif text-base font-bold text-[#C25934]">
                4. Jadopatia (Jadupatua) Paintings (Dumka &amp; Jamtara)
              </h4>
              <p className="leading-relaxed">
                Sacred ritual scrolls chanted by wandering Santhal bards during community ceremonies, depicting the afterworld, festivals, and forest deities.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-1.5">
              <h4 className="font-serif text-base font-bold text-[#C25934]">
                5. Dhokra Lost-Wax Metallurgy (Purulia &amp; Seraikela)
              </h4>
              <p className="leading-relaxed">
                4,000-year-old non-ferrous bell metal metallurgy cast over clay cores using hand-wound pure beeswax filaments and fired in primitive charcoal pits.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-3xl bg-[#FAF6EE] border border-[#C25934]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Have questions or want to collaborate?
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans">
              Chat directly with founder Virendra Kumar and the Ramgarh Cantt team.
            </p>
          </div>

          <a
            href="https://wa.me/917260815628?text=Hello%20Virendra%20ji,%20I%20would%20like%20to%20learn%20more%20about%20Maati%20Ghar."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center gap-2 shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us (+91 72608 15628)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
