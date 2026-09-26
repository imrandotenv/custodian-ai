"use client";

import React from "react";
import { Eye, ShoppingBag, MessageCircle } from "lucide-react";
import { MaatiProduct } from "@/lib/maatiGharProducts";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: MaatiProduct;
  onQuickView: (product: MaatiProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();

  const whatsAppUrl = `https://wa.me/917260815628?text=${encodeURIComponent(
    `Hello Maati Ghar, I want to inquire about purchasing: ${product.title} (Price: ₹${product.price.toLocaleString(
      "en-IN"
    )}).`
  )}`;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#C25934]/15 hover:border-[#C25934]/50 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Product Image Area */}
      <div className="relative w-full aspect-square bg-[#EFE9DF] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Pill Tag */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-mono font-bold text-[#1A1A1A] shadow-xs">
          {product.categoryLabel}
        </span>

        {/* Quick View Button Overlay (appears on desktop hover, visible on mobile) */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 gap-2">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="px-4 py-2 rounded-xl bg-white text-[#1A1A1A] text-xs font-serif font-bold shadow-md hover:bg-[#FAF9F5] transition-all flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5 text-[#C25934]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-1">
          {product.artisanName && (
            <span className="text-[10px] font-mono text-[#C25934] font-semibold truncate">
              {product.artisanName}
            </span>
          )}
          <h4
            onClick={() => onQuickView(product)}
            className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A] line-clamp-2 hover:text-[#C25934] cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h4>
          {product.hindiTitle && (
            <span className="text-[11px] text-[#1A1A1A]/55 font-sans italic truncate">
              {product.hindiTitle}
            </span>
          )}
        </div>

        {/* Price & Actions Row */}
        <div className="pt-2 border-t border-[#C25934]/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#1A1A1A]/50 font-sans uppercase tracking-wider">
              Price
            </span>
            <span className="font-serif text-base font-bold text-[#1A1A1A]">
              ₹{product.price.toLocaleString("en-IN")}.00
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Quick Inquiry */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              title="Inquire on WhatsApp"
              aria-label="Inquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            {/* Add to Cart button */}
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="px-3 py-2 rounded-xl bg-[#C25934] text-white text-xs font-serif font-bold shadow-2xs hover:bg-[#A84724] transition-colors flex items-center gap-1 cursor-pointer"
              title="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
