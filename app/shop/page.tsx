"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import {
  MAATIGHAR_PRODUCTS,
  MAATIGHAR_CATEGORIES,
  MaatiProduct,
} from "@/lib/maatiGharProducts";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<MaatiProduct | null>(null);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return MAATIGHAR_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.artisanName &&
          product.artisanName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#FAF9F5] text-[#1A1A1A] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col gap-3 border-b border-[#C25934]/15 pb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-bold">
            MAATI GHAR ATELIER &bull; हस्तशिल्प संग्रह
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            Shop Authentic Handicrafts of Jharkhand
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans max-w-2xl leading-relaxed">
            Every piece is certified authentic, created using 100% natural earth pigments, and ethically sourced with 90% direct remuneration to tribal families.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#C25934]/15 shadow-2xs">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, painting name, or artisan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934] text-[#1A1A1A]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#C25934] shrink-0" />
            <span className="text-xs font-sans text-black/60 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")}
              className="px-3 py-2 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-serif font-bold text-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-serif font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#C25934] text-white shadow-xs"
                : "bg-white border border-[#C25934]/20 text-[#1A1A1A] hover:bg-[#FAF9F5]"
            }`}
          >
            All Products ({MAATIGHAR_PRODUCTS.length})
          </button>

          {MAATIGHAR_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-serif font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#C25934] text-white shadow-xs"
                  : "bg-white border border-[#C25934]/20 text-[#1A1A1A] hover:bg-[#FAF9F5]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-3 bg-white rounded-3xl border border-[#C25934]/15">
            <ShoppingBag className="w-10 h-10 text-[#C25934]/40" />
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              No Crafts Found
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 max-w-sm">
              We couldn&apos;t find any crafts matching your search. Try changing the category or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-[#C25934] text-white text-xs font-serif font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-serif text-sm">Loading Maati Ghar catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
