"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Custom Mural Commission");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Also build a WhatsApp message fallback
    const waText = encodeURIComponent(
      `Hello Maati Ghar,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nInquiry: ${inquiryType}\n\nMessage: ${message}`
    );
    window.open(`https://wa.me/917260815628?text=${waText}`, "_blank");
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F5] text-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-[#C25934]/15 pb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C25934] font-bold">
            CONTACT &bull; संपर्क करें
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            Get in Touch with Maati Ghar
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans max-w-xl">
            For customized wall murals, bulk corporate gifting, international shipments, or atelier visits, reach out to our team in Ramgarh Cantt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Information (Exact from maatighar.com) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#C25934]/20 shadow-2xs flex flex-col gap-5">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Headquarters Atelier
              </h3>

              <div className="flex flex-col gap-4 text-xs font-sans text-[#1A1A1A]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C25934] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#1A1A1A] font-serif">Physical Address</strong>
                    <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand - 829122</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#1A1A1A] font-serif">WhatsApp / Phone</strong>
                    <a
                      href="https://wa.me/917260815628"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C25934] font-bold hover:underline"
                    >
                      +91 72608 15628
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C25934] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#1A1A1A] font-serif">Email Us</strong>
                    <a
                      href="mailto:maatikaghar@gmail.com"
                      className="hover:underline"
                    >
                      maatikaghar@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C25934] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#1A1A1A] font-serif">Visiting Hours</strong>
                    <span>Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/917260815628?text=Hello%20Maati%20Ghar,%20I%20want%20to%20talk%20to%20your%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#1ebd59] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C25934]/20 shadow-2xs">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">
                Send an Inquiry
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans mb-6">
                Fill in the details below. It will automatically connect you directly to our WhatsApp support line.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#4A6B53]/10 border border-[#4A6B53]/30 flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="w-10 h-10 text-[#4A6B53]" />
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 max-w-sm">
                    Thank you. We have also opened WhatsApp with your message details for immediate confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold text-[#1A1A1A]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold text-[#1A1A1A]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold text-[#1A1A1A]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold text-[#1A1A1A]">
                        Inquiry Purpose
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934] cursor-pointer"
                      >
                        <option value="Custom Mural Commission">Custom Wall Mural Commission</option>
                        <option value="Bulk Corporate Order">Bulk / Corporate Gifting</option>
                        <option value="Original Painting Purchase">Original Painting Acquisition</option>
                        <option value="Ramgarh Atelier Visit">Plan Ramgarh Atelier Visit</option>
                        <option value="Artisan Collaboration">Artisan Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-[#1A1A1A]">
                      Message / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify wall dimensions, preferred craft (Sohrai, Dokra, Handloom), or delivery city..."
                      className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-black/10 text-xs font-sans focus:border-[#C25934]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#C25934] text-white font-serif font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#A84724] transition-colors shadow-xs cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Maati Ghar</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
