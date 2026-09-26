"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Heart,
  Eye,
  X,
  MessageCircle,
  Share2,
  Info,
  Leaf,
  Layers,
  Flame,
  Award,
} from "lucide-react";

export type CraftCategory =
  | "all"
  | "sohrai-khovar"
  | "paitkar-scrolls"
  | "dhokra-bronze"
  | "ledra-quilts"
  | "terracotta-decor";

export interface MaatiProduct {
  id: string;
  name: string;
  hindiName: string;
  category: CraftCategory;
  categoryLabel: string;
  artisan: string;
  village: string;
  pigments: string[];
  dimensions: string;
  price: number;
  artisanShare: number;
  image: string;
  badge: string;
  description: string;
  story: string;
  inStock: boolean;
}

const PRODUCTS: MaatiProduct[] = [
  {
    id: "sohrai-tree-of-life",
    name: "Sohrai Tree of Life & Forest Deer Plaque",
    hindiName: "सोहराई जीवन वृक्ष एवं वन हरिण पट्टिका",
    category: "sohrai-khovar",
    categoryLabel: "Sohrai Mud Painting",
    artisan: "Muni Devi & Hazaribagh Collective",
    village: "Bhadu, Hazaribagh",
    pigments: ["Dudhi Kaolin Mud", "Charcoal Soot", "Lalmati Clay"],
    dimensions: '24" × 18" Framed Earthen Board',
    price: 4800,
    artisanShare: 4200,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    badge: "GI Tag #JH-SOHRAI-2020",
    description:
      "Hand-etched comb sgraffito portraying pregnant doe, dancing peacocks, and the sacred flowering Mahua tree celebrating the post-harvest Sohrai festival.",
    story:
      "Created using sovereign Dudhi kaolin clay harvested from riverbeds and manganese black clay. Carved with traditional combs and fingers by village matriarchs.",
    inStock: true,
  },
  {
    id: "paitkar-santhal-genesis",
    name: "Paitkar Santhal Genesis Narrative Scroll",
    hindiName: "पैटकर संथाली सृष्टि उत्पत्ति कथा स्क्रॉल",
    category: "paitkar-scrolls",
    categoryLabel: "Paitkar Scroll Art",
    artisan: "Anil Chitrakar & Amadubi Guild",
    village: "Amadubi, East Singhbhum",
    pigments: ["Mahua Bark Brown", "Stone Ochre", "Neem Leaf Green", "Lampblack"],
    dimensions: '36" × 12" Vertical Handmade Scroll',
    price: 6500,
    artisanShare: 5800,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    badge: "Oldest Indian Folk Scroll",
    description:
      "The ancient scroll painting tradition of the Chitrakars, depicting the Santhal creation epic of Pilchu Haram and Pilchu Budhi on natural handmade jute-cotton parchment.",
    story:
      "All colors are 100% organic: extracted from crushed river pebbles, tree bark, wild herbs, and soot bound with natural babool tree gum.",
    inStock: true,
  },
  {
    id: "dhokra-horned-bison",
    name: "Dhokra Lost-Wax Sacred Horned Bison",
    hindiName: "ढोकरा लॉस्ट-वैक्स पवित्र सींग वाला गौर",
    category: "dhokra-bronze",
    categoryLabel: "Dhokra Metallurgy",
    artisan: "Santosh Hemrom & Purulia Foundry Guild",
    village: "Bikna / Purulia Arc",
    pigments: ["Lost-Wax Bronze", "Beeswax Filaments", "Clay Core"],
    dimensions: '9" × 7" × 3.5" Solid Bronze',
    price: 5200,
    artisanShare: 4600,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    badge: "4,000-Yr Metallurgy",
    description:
      "Solid bell-metal bronze sculpture created via the ancient non-ferrous lost-wax casting technique, commemorating forest deities and horned fauna.",
    story:
      "Molded by hand-winding beeswax strands over alluvial river clay cores, encased in earthen kilns and cast with molten reclaimed bronze.",
    inStock: true,
  },
  {
    id: "khovar-bridal-mural",
    name: "Khovar Bridal Chamber Fertility Plaque",
    hindiName: "खोवर विवाह कक्ष उर्वरता भित्ति पट्टिका",
    category: "sohrai-khovar",
    categoryLabel: "Khovar Mud Art",
    artisan: "Parvati Devi & Ramgarh Women SHG",
    village: "Gola, Ramgarh Cantt",
    pigments: ["Lalmati Red Ochre", "Dudhi White Clay", "River Silt"],
    dimensions: '30" × 20" Mud Wall Board',
    price: 5800,
    artisanShare: 5100,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
    badge: "Khovar Wedding Rite",
    description:
      "Traditional bridal chamber blessing art painted during wedding season to invite marital harmony, maternal fertility, and agricultural bounty.",
    story:
      "Derived from 'Kho' (cave) and 'Var' (bridegroom). Features geometric aquatic lotus symbols, sacred fish, and stylized tortoises.",
    inStock: true,
  },
  {
    id: "ledra-vintage-quilt",
    name: "Ledra Hand-Stitched Folk Kantha Quilt",
    hindiName: "लेदरा हाथ की सिलाई वाली लोक रजाई",
    category: "ledra-quilts",
    categoryLabel: "Ledra Textile Art",
    artisan: "Ramgarh Cantt Rural Women Craft Collective",
    village: "Bazar Tand, Ramgarh Cantt",
    pigments: ["Upcycled Organic Cotton", "Turmeric Dye", "Indigo Stitch"],
    dimensions: '60" × 90" Single Reversible Bedspread',
    price: 3900,
    artisanShare: 3450,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
    badge: "Zero-Waste Upcycling",
    description:
      "Multilayered soft vintage cotton fabrics quilted entirely by hand using rhythmic running stitches, geometric chevron borders, and floral talismans.",
    story:
      "Passed through generations of Jharkhand women who repurpose vintage sarees into comforting heirloom quilts, providing self-reliance to rural SHGs.",
    inStock: true,
  },
  {
    id: "jadopatia-creation-scroll",
    name: "Jadopatia Creation Lore Narrative Scroll",
    hindiName: "जादोपटिया संथाली लोक गाथा स्क्रॉल",
    category: "paitkar-scrolls",
    categoryLabel: "Jadopatia Scroll",
    artisan: "Champa Soren & Dumka Jadu Patuas",
    village: "Ranishwar, Dumka",
    pigments: ["Pilimati Ochre", "Tamarind Seed Gum", "Lamp Soot"],
    dimensions: '42" × 14" Traditional Santhal Scroll',
    price: 7200,
    artisanShare: 6400,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    badge: "Santhal Parganas Lore",
    description:
      "Sacred scroll traditionally recited and unrolled by the Jadu Patuas during death rites and harvest festivals, connecting mortals to the spirit realm.",
    story:
      "Created with mineral pigments collected from mountain slopes and crushed leaves, bound with tamarind seed decoction for century-long permanence.",
    inStock: true,
  },
  {
    id: "dhokra-tribal-dancer",
    name: "Dhokra Tribal Harvest Drummer & Flutist",
    hindiName: "ढोकरा मांदर वादक एवं बांसुरी वादक युगल",
    category: "dhokra-bronze",
    categoryLabel: "Dhokra Metallurgy",
    artisan: "Budhram Marandi & Metallurgists",
    village: "Ajodhya Hills / Purulia",
    pigments: ["Bell-Metal Bronze", "Beeswax", "Alluvial Core"],
    dimensions: '11" × 5" × 4" Bronze Figurine',
    price: 4400,
    artisanShare: 3900,
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85",
    badge: "Handmade Bell Metal",
    description:
      "Dynamic twin figurine depicting a Santhali musician beating the sacred Madal drum alongside a flutist leading the Sarhul spring dance.",
    story:
      "Each mold is destroyed during casting, making every single Dhokra piece completely unique and impossible to replicate mechanically.",
    inStock: true,
  },
  {
    id: "terracotta-sohrai-kulhads",
    name: "Hand-Painted Sohrai Terracotta Cups & Planter",
    hindiName: "हाथ से चित्रित सोहराई मिट्टी के कुल्हड़ एवं गमला",
    category: "terracotta-decor",
    categoryLabel: "Terracotta & Lifestyle",
    artisan: "Ramgarh Earthen Pottery Guild",
    village: "Ramgarh Cantt, Jharkhand",
    pigments: ["Kiln-Fired River Mud", "Dudhi Kaolin Paint", "Neem Polish"],
    dimensions: "Set of 4 Kulhads (250ml) + 1 Planter (7-inch)",
    price: 1650,
    artisanShare: 1450,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85",
    badge: "100% Eco Biodegradable",
    description:
      "Wheel-thrown earthen river pottery hand-painted with sacred Sohrai bird and fish motifs using natural white kaolin dudhi mud.",
    story:
      "Brings the fragrance of unglazed Indian earth (Sondhi Khushboo) into contemporary living spaces, supporting potters of Ramgarh Cantt.",
    inStock: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Curations", count: 8 },
  { id: "sohrai-khovar", label: "Sohrai & Khovar", count: 2 },
  { id: "paitkar-scrolls", label: "Paitkar Scrolls", count: 2 },
  { id: "dhokra-bronze", label: "Dhokra Bronze", count: 2 },
  { id: "ledra-quilts", label: "Ledra Quilts", count: 1 },
  { id: "terracotta-decor", label: "Terracotta Decor", count: 1 },
];

const SACRED_PIGMENTS = [
  {
    name: "Lal Mati",
    hindi: "लाल माटी",
    color: "#B84A28",
    description: "Raw red terracotta laterite mud symbolizing fertility, harvest life force, and the womb of mother nature.",
  },
  {
    name: "Dudhi Mati",
    hindi: "दूधी माटी",
    color: "#FAF6EE",
    border: "#C25934",
    textColor: "#1A1A1A",
    description: "Creamy white river kaolin clay scraped with combs to reveal underlying dark mud reliefs.",
  },
  {
    name: "Pili Mati",
    hindi: "पीली माटी",
    color: "#D9822B",
    description: "Sun-dried natural yellow mineral ochre honoring solar energy, ripening paddy, and prosperity.",
  },
  {
    name: "Bhalo Char",
    hindi: "भालो चार",
    color: "#1C1917",
    description: "Riverbed manganese silt and hearth charcoal soot providing the velvety dark foundational coat.",
  },
];

export default function MaatiGharCollection() {
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<MaatiProduct | null>(null);
  const [reservedSuccessId, setReservedSuccessId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenReserve = (product: MaatiProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveModalProduct(product);
  };

  const handleConfirmReservation = (product: MaatiProduct) => {
    setReservedSuccessId(product.id);
    setTimeout(() => {
      setActiveModalProduct(null);
      setReservedSuccessId(null);
    }, 2400);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative select-none">
      
      {/* 1. TOP CURATORIAL HEADER DIRECTLY INSPIRED BY MAATIGHAR.COM */}
      <div className="flex flex-col gap-4 border-b border-[#C25934]/15 pb-10 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C25934] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#C25934] font-bold">
              माटी घर संग्रह &middot; THE MAATI GHAR ATELIER
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#1A1A1A]/70 bg-[#C25934]/10 border border-[#C25934]/20 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C25934]" />
            <span>Ramgarh Cantt &bull; 100% Direct Fair-Trade</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
              Art from the Heart of Jharkhand
            </h2>
            <p className="text-sm sm:text-base text-[#1A1A1A]/75 font-sans max-w-2xl font-light leading-relaxed mt-2">
              Every creation is born from sovereign mud, mineral ochre, and bell-metal brass. Directly empowering rural women Self-Help Groups (SHGs) and indigenous master custodians without commercial middlemen.
            </p>
          </div>

          <a
            href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20am%20interested%20in%20Jharkhand%20tribal%20art%20and%20custom%20murals."
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="explore"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F9F6F0] border border-[#C25934]/30 hover:border-[#C25934] text-xs font-serif font-bold text-[#C25934] hover:bg-[#C25934] hover:text-[#F9F6F0] transition-all shadow-xs shrink-0 cursor-pointer self-start lg:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire on WhatsApp (+91 72608 15628)</span>
          </a>
        </div>
      </div>

      {/* 2. SACRED EARTH MINERALS PALETTE GUIDE BAR */}
      <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-[#C25934]/10 pb-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#C25934]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-bold">
              The 4 Sacred Earth Pigments &bull; चार प्राकृतिक रंग
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest hidden sm:inline">
            Zero Synthetic Chemicals
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SACRED_PIGMENTS.map((pigment) => (
            <div
              key={pigment.name}
              className="p-4 rounded-2xl bg-[#F9F6F0]/80 border border-[#C25934]/15 flex flex-col gap-2 transition-transform hover:-translate-y-0.5 duration-200"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-black/10"
                  style={{
                    backgroundColor: pigment.color,
                    borderColor: pigment.border || "rgba(0,0,0,0.1)",
                  }}
                />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                    {pigment.name}
                  </span>
                  <span className="text-xs font-sans text-[#C25934] font-medium">
                    {pigment.hindi}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#1A1A1A]/70 font-sans leading-relaxed">
                {pigment.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY FILTER NAVIGATION PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CraftCategory)}
              className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-serif font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#C25934] text-[#F9F6F0] shadow-md scale-[1.02]"
                  : "bg-white/80 hover:bg-[#F9F6F0] text-[#1A1A1A]/80 border border-[#C25934]/15 hover:border-[#C25934]/40"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-[#F9F6F0]/20 text-white"
                    : "bg-[#1A1A1A]/5 text-[#1A1A1A]/60"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. PRODUCT CARDS GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => {
            const isLiked = likedIds.includes(product.id);

            return (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleOpenReserve(product)}
                className="group relative rounded-3xl bg-white/85 border border-[#C25934]/20 hover:border-[#C25934]/50 shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Top Image Showcase */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE9DF] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-black/10 transition-colors" />

                  {/* Top Left Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#F9F6F0]/95 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider uppercase text-[#1A1A1A] shadow-xs border border-black/5">
                      {product.badge}
                    </span>
                  </div>

                  {/* Top Right Heart Action */}
                  <button
                    type="button"
                    onClick={(e) => toggleLike(product.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] hover:text-[#C25934] transition-colors shadow-xs"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-[#C25934] text-[#C25934]" : ""
                      }`}
                    />
                  </button>

                  {/* Bottom Artisan Village Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-xl">
                    <span className="font-serif italic truncate max-w-[65%]">
                      {product.artisan}
                    </span>
                    <span className="font-mono text-[#E5A882] text-[9px]">
                      {product.village}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                    <span>{product.categoryLabel}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#C25934] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <span className="text-[11px] font-sans text-[#1A1A1A]/60 italic">
                    {product.hindiName}
                  </span>

                  <p className="text-xs text-[#1A1A1A]/75 font-sans line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pigments Pill Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.pigments.map((p) => (
                      <span
                        key={p}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#C25934]/10 text-[#C25934] font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Fair-Trade Remuneration Footer */}
                <div className="mt-5 pt-3.5 border-t border-[#C25934]/15 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">
                      Fair-Trade Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl font-bold text-[#1A1A1A]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-accent font-semibold">
                      ₹{product.artisanShare.toLocaleString("en-IN")} directly to artisan
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenReserve(product, e)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold group-hover:opacity-95 shadow-xs transition-opacity"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 5. WHY MAATI GHAR? SOCIAL ENTERPRISE PILLARS DIRECTLY FROM MAATIGHAR.COM */}
      <div className="mt-20 pt-12 border-t border-[#C25934]/15">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C25934] font-bold block mb-1">
            OUR SACRED PRINCIPLES &bull; हमारा संकल्प
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Why Maati Ghar &middot; From the Earth, For the Soul
          </h3>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-sans mt-2">
            Rooted in Ramgarh Cantt, Jharkhand, we protect ancient tribal artistic sovereignty from industrial copycats and commercial middlemen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              100% Earthen Soil Pigments
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              No toxic acrylics or synthetic primers. We only use Dudhi kaolin mud, laterite Lalmati, mineral yellow ochre, and hearth soot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Direct Rural Women Remuneration
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              85% to 90% of every acquisition reaches the women Self-Help Groups and family foundries of Ramgarh Cantt, Hazaribagh, and Amadubi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9822B]/15 text-[#D9822B] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              GI-Tagged Cultural Sovereignty
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Protected under Geographical Indication (GI Tag #JH-SOHRAI-2020), ensuring every motif honors sacred ancestral rites.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 border border-[#C25934]/15 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C25934]/10 text-[#C25934] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Custom Murals &amp; Kiln Decor
            </h4>
            <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
              Commission our master women painters for original earthen wall murals, architectural installations, and corporate tribal art spaces.
            </p>
          </div>
        </div>
      </div>

      {/* 6. ARTWORK RESERVATION & INQUIRY MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#F9F6F0] rounded-3xl border border-[#C25934]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#C25934]/15 flex items-start justify-between bg-white/60">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C25934] font-bold">
                    {activeModalProduct.badge} &bull; {activeModalProduct.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-0.5">
                    {activeModalProduct.name}
                  </h3>
                  <span className="text-xs font-sans text-[#1A1A1A]/60 italic">
                    {activeModalProduct.hindiName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 hover:bg-[#C25934] hover:text-[#F9F6F0] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-6">
                {/* Image & Quick Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#1C1A19]">
                    <img
                      src={activeModalProduct.image}
                      alt={activeModalProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Master Artisan
                      </span>
                      <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                        {activeModalProduct.artisan}
                      </span>
                      <span className="text-[#C25934] block text-[11px]">
                        {activeModalProduct.village}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Specifications &amp; Dimensions
                      </span>
                      <span className="font-sans font-semibold text-[#1A1A1A]">
                        {activeModalProduct.dimensions}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 border border-[#C25934]/15">
                      <span className="text-[#1A1A1A]/60 block font-mono text-[10px] uppercase">
                        Organic Natural Pigments
                      </span>
                      <span className="font-sans text-[#1A1A1A] font-medium">
                        {activeModalProduct.pigments.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cultural Lore & Context */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C25934] font-bold">
                    Cultural Lore &amp; Authenticity
                  </span>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-sans leading-relaxed">
                    {activeModalProduct.description}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/70 font-sans italic bg-[#C25934]/5 p-3 rounded-xl border border-[#C25934]/15">
                    &ldquo;{activeModalProduct.story}&rdquo;
                  </p>
                </div>

                {/* Fair-Trade Remuneration Breakdown */}
                <div className="p-4 rounded-2xl bg-white/90 border border-[#C25934]/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60">
                      Transparent Fair-Trade Value
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-mono font-bold">
                      Certified Sovereign Art
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-[#C25934]/10 pt-2">
                    <span className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      ₹{activeModalProduct.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#1A1A1A]/70">
                      Direct Artisan Remuneration:{" "}
                      <strong className="text-[#C25934]">
                        ₹{activeModalProduct.artisanShare.toLocaleString("en-IN")} (
                        {Math.round(
                          (activeModalProduct.artisanShare /
                            activeModalProduct.price) *
                            100
                        )}
                        %)
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-5 sm:p-6 border-t border-[#C25934]/15 bg-white/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20would%20like%20to%20reserve%20or%20inquire%20about:%20${encodeURIComponent(
                    activeModalProduct.name
                  )}%20(ID:%20${activeModalProduct.id})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#C25934]/30 hover:border-[#C25934] text-xs font-serif font-bold text-[#C25934] hover:bg-[#C25934]/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>

                {reservedSuccessId === activeModalProduct.id ? (
                  <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-serif font-bold shadow-md">
                    <Check className="w-4 h-4" />
                    <span>Digital Pledge Recorded!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConfirmReservation(activeModalProduct)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C25934] text-[#F9F6F0] text-xs font-serif font-bold hover:opacity-90 shadow-md transition-opacity cursor-pointer"
                  >
                    <span>Reserve &amp; Initiate Cultural Pledge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
