"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "./CartContext";
import PaymentButton from "./PaymentButton";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    clearCart,
  } = useCart();

  const generateWhatsAppOrderUrl = () => {
    if (cart.length === 0) return "#";
    let message = "Hello Maati Ghar, I would like to place an order from your website:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.title} (Qty: ${item.quantity}) - ₹${(
        item.product.price * item.quantity
      ).toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal Cart Value: ₹${cartSubtotal.toLocaleString("en-IN")}\n`;
    message += "Please provide payment details (UPI/Bank) and shipping timeline to my address.";
    return `https://wa.me/917260815628?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#C25934]/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#C25934]/15 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C25934]" />
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Shopping Cart ({cartCount})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#C25934]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-sans">
                    Discover handcrafted Sohrai mud paintings, Dokra bell metal, and handloom textiles created by Ramgarh Cantt artisans.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-[#C25934] text-white text-xs font-serif font-bold shadow-xs hover:bg-[#A84724] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#C25934]/15 shadow-2xs flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-18 h-18 rounded-xl object-cover border border-[#C25934]/10 shrink-0 bg-[#EFE9DF]"
                    />
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-[10px] font-mono text-[#C25934] font-bold uppercase truncate">
                        {item.product.categoryLabel}
                      </span>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] truncate">
                        {item.product.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif font-bold text-xs text-[#1A1A1A]">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 border border-[#C25934]/20 rounded-lg p-0.5 bg-[#F9F6F0]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-white rounded text-[#1A1A1A]/70"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold px-1.5 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-white rounded text-[#1A1A1A]/70"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-black/40 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#C25934]/15 bg-white flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A]/70">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#4A6B53]">Direct from Ramgarh Cantt</span>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-2">
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                    Subtotal:
                  </span>
                  <span className="font-serif font-bold text-lg text-[#C25934]">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#4A6B53] font-mono bg-[#4A6B53]/10 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>90% of proceeds go directly to artisan families</span>
                </div>

                {/* WhatsApp Direct Order Button (Preferred by Indian buyers) */}
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#1ebd59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </a>

                {/* Instant Online Payment */}
                <div className="w-full">
                  <PaymentButton
                    amount={cartSubtotal}
                    recipientName="Maati Ghar Social Enterprise"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
