"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, MessageCircle, ShieldCheck, MapPin, Check, Sparkles } from "lucide-react";
import { MaatiProduct } from "@/lib/maatiGharProducts";
import { useCart } from "./CartContext";
import PaymentButton from "./PaymentButton";

interface ProductQuickViewModalProps {
  product: MaatiProduct | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsAppUrl = `https://wa.me/917260815628?text=${encodeURIComponent(
    `Hello Maati Ghar, I am interested in purchasing:\n\n*${product.title}*\nPrice: ₹${product.price.toLocaleString(
      "en-IN"
    )}\nCategory: ${product.categoryLabel}\nArtisan: ${
      product.artisanName || "Ramgarh SHG"
    }\n\nPlease share delivery timeline and payment details.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#C25934]/25 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-[#C25934] hover:text-white flex items-center justify-center transition-colors text-[#1A1A1A]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#EFE9DF] relative overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[11px] font-mono font-bold text-[#C25934] shadow-xs">
              {product.categoryLabel}
            </span>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#C25934] font-bold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1 leading-snug">
                  {product.title}
                </h3>
                {product.hindiTitle && (
                  <span className="text-xs text-[#1A1A1A]/60 font-sans italic">
                    {product.hindiTitle}
                  </span>
                )}
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                  ₹{product.price.toLocaleString("en-IN")}.00
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-black/40 line-through font-serif">
                    ₹{product.originalPrice.toLocaleString("en-IN")}.00
                  </span>
                )}
                <span className="text-[11px] font-mono font-semibold text-[#4A6B53] bg-[#4A6B53]/10 px-2 py-0.5 rounded">
                  In Stock
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-sans leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="flex flex-col gap-1.5 text-xs text-[#1A1A1A]/70 pt-2 border-t border-[#C25934]/15">
                {product.dimensions && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#1A1A1A]/50">Dimensions:</span>
                    <span className="font-medium text-[#1A1A1A]">{product.dimensions}</span>
                  </div>
                )}
                {product.artisanName && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#1A1A1A]/50">Artisan / Guild:</span>
                    <span className="font-medium text-[#C25934]">{product.artisanName}</span>
                  </div>
                )}
                {product.artisanLocation && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#1A1A1A]/50">Origin:</span>
                    <span className="font-medium text-[#1A1A1A]">{product.artisanLocation}</span>
                  </div>
                )}
                {product.materials && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#1A1A1A]/50">Materials:</span>
                    <span className="font-medium text-[#1A1A1A] truncate max-w-[200px]">
                      {product.materials.join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Fair-Trade Payout Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF9F5] border border-[#C25934]/20 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#4A6B53] shrink-0" />
                <span className="font-sans text-[#1A1A1A]/80 text-[11px]">
                  <strong>90% Direct Remuneration:</strong> Proceeds support rural indigenous families in Ramgarh &amp; Hazaribagh.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-4 mt-2 border-t border-[#C25934]/15">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-[#C25934] text-white font-serif font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#A84724] transition-colors shadow-xs"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#1ebd59] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Buy on WhatsApp</span>
                </a>
              </div>

              {/* Direct UPI Gateway button */}
              <PaymentButton
                amount={product.price}
                recipientName={`${product.artisanName || "Maati Ghar"} (${product.title.slice(0, 20)}...)`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
