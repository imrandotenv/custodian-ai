"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Star,
  MapPin,
  Sparkles,
  Users,
  Eye,
  Heart,
  Award,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import CulturalMap from "@/components/CulturalMap";
import {
  MAATIGHAR_PRODUCTS,
  MAATIGHAR_CATEGORIES,
  MaatiProduct,
  getProductsByCategory,
} from "@/lib/maatiGharProducts";
import { DEMO_ARTISANS, DemoArtisan } from "@/lib/demoData";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<MaatiProduct | null>(null);
  const [activeStoryArtisan, setActiveStoryArtisan] = useState<DemoArtisan | null>(null);

  // Products by Category
  const handPaintedProducts = getProductsByCategory("hand-painted").slice(0, 4);
  const sohraiProducts = getProductsByCategory("sohrai-paintings").slice(0, 4);
  const paitkarProducts = getProductsByCategory("paitkar-paintings").slice(0, 4);
  const khovarProducts = getProductsByCategory("khovar-paintings").slice(0, 4);
  const jadopatiaProducts = getProductsByCategory("jadopatia-paintings").slice(0, 4);
  const dhokraProducts = getProductsByCategory("dhokra").slice(0, 4);

  return (
    <div className="w-full flex flex-col bg-[#FAF9F5] text-[#1A1A1A]">
      
      {/* 1. HERO SECTION (Faithful to maatighar.com banner & copy) */}
      <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text Column */}
          <div className="flex flex-col gap-5 max-w-2xl text-left">
            
            <div className="flex items-center gap-2 bg-[#F9F6F0] px-3.5 py-1.5 rounded-full border border-[#C25934]/25 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#C25934]">
                Social Enterprise &bull; Ramgarh Cantt, Jharkhand
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
              Discover the essence of Jharkhand&apos;s cultural heritage at{" "}
              <span className="text-[#C25934] italic font-normal">Maati Ghar</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed font-normal">
              Shop authentic handicrafts, explore traditional art forms, and immerse yourself in the beauty of our rich artistic legacy. Handcrafted with 100% natural earth colours and <strong>90% direct remuneration</strong> to our rural indigenous artisan families.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-[#C25934] text-white font-serif font-bold text-xs sm:text-sm shadow-md hover:bg-[#A84724] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Now</span>
              </Link>

              <a
                href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20art."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs sm:text-sm shadow-xs hover:bg-[#1ebd59] transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +91 72608 15628</span>
              </a>

              <Link
                href="/#artisans"
                className="px-5 py-3.5 rounded-xl bg-[#FAF9F5] border border-[#C25934]/30 text-[#1A1A1A] font-serif font-bold text-xs sm:text-sm hover:bg-[#F9F6F0] transition-all"
              >
                Meet 15 Artisans
              </Link>
            </div>

            {/* Quick 4 Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C25934]/15 text-xs">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#C25934]">15</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Living Artisans</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#C25934]">100%</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Natural Soil Clays</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#4A6B53]">90%</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">Direct Payouts</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#1A1A1A]">GI Tag</span>
                <span className="text-[#1A1A1A]/70 font-sans mt-0.5">#JH-SOHRAI-2020</span>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Banner */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-[#C25934]/20 bg-[#EFE9DF]">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85"
                  alt="Sohrai Painting - Peacocks"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#C25934]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25934] font-bold block">
                  Sohrai Mural
                </span>
                <span className="font-serif font-bold text-xs text-[#1A1A1A]">
                  Birsa Murmu &bull; Hazaribagh
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-[#C25934]/20 bg-[#EFE9DF]">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85"
                  alt="Dhokra Lost-Wax Metallurgy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#C25934]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25934] font-bold block">
                  Dhokra Metalcraft
                </span>
                <span className="font-serif font-bold text-xs text-[#1A1A1A]">
                  Ramesh Kisku &bull; Seraikela
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION: HAND-PAINTED PRODUCTS (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Hand-painted Products
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Explore our curated collection of meticulously crafted hand-painted products, each a masterpiece of artistry and tradition. Whether adorning your home or gifting to a loved one, they offer a unique blend of tradition and contemporary elegance.
              </p>
            </div>

            <Link
              href="/shop?category=hand-painted"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {handPaintedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. SECTION: SOHRAI PAINTINGS (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Sohrai Paintings
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Sohrai Painting is a vibrant mural painting tradition predominantly practiced in the quaint villages of Hazaribagh, Jharkhand. During the Sohrai festival, following Diwali, women adorn their mud walls with intricate artworks using natural earth colours.
              </p>
            </div>

            <Link
              href="/shop?category=sohrai-paintings"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sohraiProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECTION: PAITKAR PAINTINGS (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Paitkar Paintings
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Paitkar Painting, a cherished folk art form captivate with their rich narrative tapestries. Crafted by skilled Bengali artists known as &apos;Chitrakars,&apos; these intricate artworks use natural colours and delve into Hindu mythology, tribal rituals, and rural life.
              </p>
            </div>

            <Link
              href="/shop?category=paitkar-paintings"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paitkarProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. SECTION: KHOVAR PAINTINGS (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Khovar Paintings
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Khovar Painting is a cherished mural art folk tradition which beautifully depicts the cultural practice of adorning a wedding room. Women from the community elegantly paint the mud walls of homes during weddings, symbolizing blessings for the newlywed couple.
              </p>
            </div>

            <Link
              href="/shop?category=khovar-paintings"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {khovarProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. SECTION: JADOPATIA PAINTINGS (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Jadopatia (Jadupatua) Paintings
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Jadopatia paintings, prevalent in Jharkhand&apos;s Dumka and Jamtara districts, weave enchanting tales through vibrant hues and intricate designs. Created by Bengali artists known as &ldquo;Chitrakars,&rdquo; these folk artworks delve into Hindu mythology, tribal customs, and timeless legends.
              </p>
            </div>

            <Link
              href="/shop?category=jadopatia-paintings"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jadopatiaProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. SECTION: DHOKRA METAL ART (Exact copy from maatighar.com) */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                Dhokra Metal Art
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Dhokra metal art is a traditional art form from Jharkhand, renowned for its intricate designs and timeless appeal. Each piece is handcrafted using the ancient lost-wax casting technique, resulting in unique, one-of-a-kind items that celebrate the rich cultural heritage of India.
              </p>
            </div>

            <Link
              href="/shop?category=dhokra"
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C25934] hover:underline shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dhokraProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 8. SECTION: THE 15 LIVING ARTISANS (Indigenous Custodians & Oral Memory) */}
      <section id="artisans" className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C25934]/15 pb-5">
            <div className="flex flex-col gap-1 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-bold">
                हमारे 15 शिल्पकार &bull; LIVING CUSTODIANS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                The 15 Master Artisans of Maati Ghar
              </h2>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans leading-relaxed">
                Every piece directly supports sovereign indigenous families in Jharkhand and West Bengal. Click any artisan to read their authentic oral story in Hindi and English.
              </p>
            </div>

            <span className="text-xs font-mono text-[#4A6B53] font-bold bg-[#4A6B53]/10 px-3 py-1 rounded-full">
              90% Direct Pay Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {DEMO_ARTISANS.map((artisan, idx) => (
              <div
                key={artisan.id}
                onClick={() => setActiveStoryArtisan(artisan)}
                className="p-3.5 rounded-2xl bg-white border border-[#C25934]/20 hover:border-[#C25934] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white font-mono text-[9px]">
                      № 0{idx + 1}
                    </span>
                    <span className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-serif font-bold text-[#1A1A1A] truncate text-center">
                      {artisan.villageDistrict}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#C25934] font-bold uppercase truncate">
                      {artisan.artForm}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#1A1A1A] mt-0.5 truncate">
                      {artisan.name} ({artisan.hindiName})
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/75 font-sans italic line-clamp-2 mt-1.5 bg-[#FAF9F5] p-2 rounded-lg border border-[#C25934]/10">
                      &ldquo;{artisan.originalStory}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#C25934]/10 flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#1A1A1A]">
                    ₹{artisan.priceInINR.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#4A6B53]">
                    90% Direct Pay
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. SECTION: BESPOKE ARCHITECTURAL MURALS (Custom Wall Murals) */}
      <section id="murals" className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#C25934] text-[#F9F6F0] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          
          <div className="flex flex-col gap-3.5 max-w-2xl text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F9F6F0]/80 font-bold">
              BESPOKE ARCHITECTURAL MURALS &bull; भित्ति चित्र सेवा
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight">
              Commission Authentic Mud Murals for Your Home, Resort or Office
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#F9F6F0]/90 leading-relaxed font-light">
              Are you an architect, interior designer, or homeowner? Commission our master women painters from Ramgarh and Hazaribagh for bespoke Sohrai &amp; Khovar mud relief murals on physical walls, canvas boards, or terracotta plaques. Created strictly using 100% natural Dudhimati kaolin mud and manganese clay.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20commission%20a%20custom%20Sohrai%20wall%20mural%20for%20my%20space."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-[#C25934] font-serif font-bold text-xs shadow-md hover:bg-[#FAF9F5] transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Discuss Mural on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl border border-white/50 text-white font-serif font-semibold text-xs hover:bg-white/10 transition-colors"
              >
                Send Inquiry Form
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-80 rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-black/20 shrink-0 border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85"
              alt="Custom Tribal Wall Mural in progress"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 10. SECTION: TOPOGRAPHY OF LIVING ATELIERS MAP */}
      <section id="map" className="w-full py-14 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-[#FAF9F5]">
        <CulturalMap />
      </section>

      {/* 11. SECTION: CUSTOMER TESTIMONIALS (Vibhu Malik, France - exact from maatighar.com) */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-[#C25934]/15 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-1 text-[#C25934]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="font-serif text-lg sm:text-xl italic text-[#1A1A1A]/85 max-w-2xl leading-relaxed">
            &ldquo;Authentic Sohrai artwork received safely in France with certificate of authenticity. The natural soil pigments and comb textures have an unmatched organic presence in our living room.&rdquo;
          </p>

          <span className="font-mono text-xs font-bold text-[#C25934] uppercase tracking-wider">
            &mdash; Vibhu Malik, France
          </span>
        </div>
      </section>

      {/* 12. SECTION: VISIT OUR PHYSICAL ATELIER IN RAMGARH CANTT */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#C25934]/20 shadow-2xs">
          
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C25934] font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Physical Center &bull; Ramgarh Cantt, Jharkhand</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Visit Maati Ghar Headquarters in Person
            </h3>
            <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
              Experience the fragrance of natural laterite mud (Sondhi Khushboo), watch rural women artisans paint, and pick handcrafted terracotta pottery directly at our atelier.
            </p>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#1A1A1A]/80 pt-1">
              <span>📍 Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
              <span>📞 WhatsApp: +91 72608 15628 &bull; ✉️ maatikaghar@gmail.com</span>
            </div>
          </div>

          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20planning%20to%20visit%20your%20Ramgarh%20Cantt%20center."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center gap-2 shadow-xs hover:bg-[#1ebd59] transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Plan Your Visit on WhatsApp</span>
          </a>

        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* ARTISAN ORAL STORY MODAL */}
      {activeStoryArtisan && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#C25934]/30 shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between border-b border-[#C25934]/15 pb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                  {activeStoryArtisan.artForm} &bull; {activeStoryArtisan.villageDistrict}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mt-0.5">
                  {activeStoryArtisan.name} ({activeStoryArtisan.hindiName})
                </h3>
                <span className="text-xs font-mono text-[#1A1A1A]/60">
                  Ol Chiki: {activeStoryArtisan.olChiki}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryArtisan(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-[#C25934] hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#C25934]/15 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25934] font-bold">
                  मूल संथाली / हिंदी लोक गाथा (Oral Story)
                </span>
                <p className="text-xs text-[#1A1A1A]/90 font-sans leading-relaxed italic">
                  &ldquo;{activeStoryArtisan.originalStory}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#C25934]/15 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-bold">
                  English Translation &amp; Cultural Lore
                </span>
                <p className="text-xs text-[#1A1A1A]/80 font-sans leading-relaxed">
                  {activeStoryArtisan.englishStory}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <span>Fair-Trade Price: <strong>₹{activeStoryArtisan.priceInINR.toLocaleString("en-IN")}</strong></span>
                <span className="text-[#4A6B53] font-bold">90% Direct Pay</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20acquire%20work%20by%20${encodeURIComponent(
                  activeStoryArtisan.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-serif font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Connect via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
