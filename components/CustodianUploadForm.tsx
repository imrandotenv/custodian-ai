"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CameraOff,
  VolumeX,
  Hand,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Shield,
  IndianRupee,
  Info,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface SmartConsentRule {
  id: "no-photo" | "ritual-silence" | "no-touch";
  title: string;
  description: string;
  culturalNote: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SMART_CONSENT_RULES: SmartConsentRule[] = [
  {
    id: "no-photo",
    title: "No flash photography of the Jaher Than (Sacred Grove)",
    description: "Strict ban on flash photography and optical recording of sacred grove trees and sanctum reliefs.",
    culturalNote: "Ancestral beliefs hold that artificial flash disturbs the sacred Bongas residing in the sacred Sal trees.",
    icon: CameraOff,
  },
  {
    id: "ritual-silence",
    title: "Respect the Sohrai harvest festival motifs",
    description: "Sacred horned bulls, peacock combs, and tree-of-life glyphs must be honored as living prayers.",
    culturalNote: "Motifs are sacredly scraped with broken combs during the harvest to thank cattle and ancestral earth spirits.",
    icon: VolumeX,
  },
  {
    id: "no-touch",
    title: "Do Not Touch Living Dudhi Clay & Mud Minerals",
    description: "Physical contact strictly forbidden to preserve natural unsealed kaolin and manganese earth.",
    culturalNote: "Natural white Dudhi clay and riverbed manganese react irreversibly to body moisture and skin oils.",
    icon: Hand,
  },
];

const ART_FORMS = [
  "Sohrai Khovar Mud Painting (Hazaribagh)",
  "Bastar & Purulia Dokra Metalcraft",
  "Jaher Than Sacred Sal Grove Ochre Panel",
  "Santhal Terracotta Hearth Relief",
  "Purulia Bell-Metal Cast Artifact",
];

export default function CustodianUploadForm() {
  // Form State
  const [title, setTitle] = useState("");
  const [artForm, setArtForm] = useState(ART_FORMS[0]);
  const [nativeDescription, setNativeDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedRules, setSelectedRules] = useState<Record<string, boolean>>({
    "no-photo": true,
    "ritual-silence": false,
    "no-touch": true,
  });

  // UI / Demo State
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const toggleRule = (ruleId: string) => {
    setSelectedRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    // Simulate instant tribal gallery verification & publishing
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
    }, 900);
  };

  const activeRulesCount = Object.values(selectedRules).filter(Boolean).length;

  return (
    <form onSubmit={handlePublish} className="w-full max-w-4xl mx-auto flex flex-col gap-10">
      
      {/* Form Intro Header */}
      <div className="flex flex-col gap-2 border-b border-[#C25934]/20 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            Artisan Custodian Portal
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">
            Direct Fair-Trade
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-textPrimary tracking-tight">
          Catalog Sacred Tribal Creation
        </h1>
        <p className="text-textPrimary/75 text-sm md:text-base leading-relaxed max-w-2xl">
          Register your handcrafted work to the global cultural registry. Every creation includes our
          pioneering <strong>Smart Cultural Consent Protocol</strong> to safeguard indigenous sanctity.
        </p>
      </div>

      {/* Touch-Friendly Card 1: Art Media & Identity */}
      <div className="bg-white/85 rounded-3xl p-8 md:p-10 border border-[#C25934]/15 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#C25934]/10 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-textPrimary">
              1. Art Heritage &amp; Identification
            </h2>
            <p className="text-xs text-textPrimary/70 mt-1">
              General lineage, art form classification, and photographic capture.
            </p>
          </div>
          <span className="text-xs font-mono text-primary font-medium">Step 01 / 03</span>
        </div>

        {/* Large Touch Dropzone for Photo Upload */}
        <div className="w-full border-2 border-dashed border-[#C25934]/30 hover:border-[#C25934]/60 bg-[#F9F6F0]/60 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#C25934]/20 flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform shadow-xs">
            <Upload className="w-7 h-7" />
          </div>
          <p className="font-serif text-lg font-semibold text-textPrimary">
            Tap to photograph or upload artwork
          </p>
          <p className="text-xs text-textPrimary/60 mt-1 max-w-prose leading-relaxed">
            High-resolution capture under natural sunlight recommended. Direct camera capture supported on mobile devices.
          </p>
          <span className="mt-4 text-[11px] font-semibold text-[#C25934] px-4 py-1.5 rounded-full bg-[#C25934]/10">
            JPG, PNG, WebP up to 25MB
          </span>
        </div>

        {/* Art Title Field - Big, tactile touch input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="artTitle" className="text-xs font-bold uppercase tracking-wider text-textPrimary">
            Artwork Title <span className="text-primary">*</span>
          </label>
          <input
            id="artTitle"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Goddess Gorbandh Terracotta Plaque"
            className="w-full text-base md:text-lg font-serif px-5 py-4 rounded-2xl bg-[#F9F6F0]/50 border border-[#C25934]/25 focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-textPrimary/35 text-textPrimary"
          />
        </div>

        {/* Indigenous Craft Classification - Touch Cards */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-textPrimary">
            Select Tribal Art Guild
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ART_FORMS.map((form) => {
              const isSelected = artForm === form;
              return (
                <button
                  key={form}
                  type="button"
                  onClick={() => setArtForm(form)}
                  className={`px-4 py-3.5 rounded-2xl text-left text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? "bg-[#C25934] text-[#F9F6F0] border-[#C25934] shadow-xs font-semibold"
                      : "bg-[#F9F6F0]/40 text-textPrimary border-[#C25934]/20 hover:bg-white"
                  }`}
                >
                  <span>{form}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#F9F6F0]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Touch-Friendly Card 2: Native Story & Pricing */}
      <div className="bg-white/85 rounded-3xl p-8 md:p-10 border border-[#C25934]/15 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#C25934]/10 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-textPrimary">
              2. Folklore &amp; Fair-Trade Valuation
            </h2>
            <p className="text-xs text-textPrimary/70 mt-1">
              Oral folklore behind the piece and direct custodian pricing.
            </p>
          </div>
          <span className="text-xs font-mono text-primary font-medium">Step 02 / 03</span>
        </div>

        {/* Description in Native Language */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nativeDesc" className="text-xs font-bold uppercase tracking-wider text-textPrimary">
              Description &amp; Oral Story (Native Language / Mother Tongue) <span className="text-primary">*</span>
            </label>
            <span className="text-[11px] text-textPrimary/60 italic font-serif">
              Any regional script or Hindi / English
            </span>
          </div>
          <textarea
            id="nativeDesc"
            required
            rows={4}
            value={nativeDescription}
            onChange={(e) => setNativeDescription(e.target.value)}
            placeholder="इस मिट्टी की मूर्ति की कथा हमारे पूर्वजों से जुड़ी है... (Tell the legend, materials, and ceremony during which this was sculpted)"
            className="w-full text-sm md:text-base px-5 py-4 rounded-2xl bg-[#F9F6F0]/50 border border-[#C25934]/25 focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-textPrimary/35 text-textPrimary leading-relaxed"
          />
        </div>

        {/* Fair Price in INR */}
        <div className="flex flex-col gap-2">
          <label htmlFor="artPrice" className="text-xs font-bold uppercase tracking-wider text-textPrimary">
            Artisan Fair Price (INR) <span className="text-primary">*</span>
          </label>
          <div className="relative max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textPrimary/60 font-serif text-lg">
              ₹
            </span>
            <input
              id="artPrice"
              type="number"
              min="100"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="4,800"
              className="w-full text-lg font-serif pl-9 pr-4 py-3.5 rounded-2xl bg-[#F9F6F0]/50 border border-[#C25934]/25 focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-textPrimary/35 text-textPrimary"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-textPrimary/70 mt-1">
            <Info className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>100% of this amount goes straight to your cooperative bank account. Zero middleman cuts.</span>
          </div>
        </div>
      </div>

      {/* THE SMART CONSENT SECTION (OUR USP) - Sage Green Accent (#849A89) */}
      <section className="rounded-3xl p-8 md:p-10 bg-[#849A89]/10 border-2 border-[#849A89]/40 relative overflow-hidden flex flex-col gap-6 shadow-sm">
        
        {/* Subtle Decorative Tribal Watermark Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#849A89]/30 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#849A89]/20 text-[#2C2A29] text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 text-[#849A89]" />
              <span>Proprietary Cultural Feature &middot; USP</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-textPrimary">
              Smart Cultural Consent Protocol
            </h2>
            <p className="text-sm text-textPrimary/80 mt-1 max-w-2xl leading-relaxed">
              As a tribal custodian, you hold ultimate spiritual sovereignty. Select binding ritual rules that
              every tourist, buyer, or gallery visitor must legally agree to before viewing or visiting.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl border border-[#849A89]/30 text-xs font-semibold text-textPrimary self-start sm:self-auto shadow-2xs">
            <Lock className="w-4 h-4 text-[#849A89]" />
            <span>{activeRulesCount} of 3 Rules Enforced</span>
          </div>
        </div>

        {/* Large Touch-Friendly Checkbox Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SMART_CONSENT_RULES.map((rule) => {
            const isChecked = !!selectedRules[rule.id];
            const Icon = rule.icon;

            return (
              <div
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleRule(rule.id);
                  }
                }}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 select-none relative group ${
                  isChecked
                    ? "bg-white border-[#849A89] shadow-xs"
                    : "bg-white/40 border-[#849A89]/20 hover:border-[#849A89]/50"
                }`}
              >
                <div>
                  {/* Header with Icon & Custom Checkbox Design */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-[#849A89] text-[#F9F6F0]"
                          : "bg-[#849A89]/15 text-textPrimary/70 group-hover:bg-[#849A89]/25"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Custom Accessible Checkbox Pill */}
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-[#849A89] border-[#849A89] text-white"
                          : "border-[#849A89]/40 bg-transparent"
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-textPrimary leading-snug">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-textPrimary/80 mt-1.5 leading-relaxed max-w-prose">
                    {rule.description}
                  </p>
                </div>

                {/* Cultural Rationale Note */}
                <div className="pt-3 border-t border-[#849A89]/20 text-[11px] text-textPrimary/70 italic font-serif leading-snug">
                  &ldquo;{rule.culturalNote}&rdquo;
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-textPrimary/80 bg-white/60 p-4 rounded-2xl border border-[#849A89]/30">
          <CheckCircle2 className="w-4 h-4 text-[#849A89] shrink-0" />
          <span>
            Tourists who violate these rules forfeit their access deposit and receive an automatic temporary platform suspension.
          </span>
        </div>
      </section>

      {/* Large Terracotta Submit Button & Confirmation Notice */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C25934]/20">
        <div className="text-xs text-textPrimary/70 text-center sm:text-left">
          <p className="font-semibold text-textPrimary">Verified GI Provenance</p>
          <p>Upon submission, your listing is hashed onto the tribal heritage ledger.</p>
        </div>

        <button
          type="submit"
          disabled={isPublishing}
          className="w-full sm:w-auto min-h-[58px] px-10 py-4 rounded-2xl bg-[#C25934] text-[#F9F6F0] font-serif text-lg font-bold hover:opacity-95 active:scale-[0.99] transition-all border border-[#C25934] shadow-xs flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
        >
          {isPublishing ? (
            <div className="flex items-center gap-2 text-base">
              <span className="w-5 h-5 border-2 border-[#F9F6F0] border-t-transparent rounded-full animate-spin" />
              <span>Verifying Sacred Protocols...</span>
            </div>
          ) : (
            <>
              <span>Publish to Global Gallery</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Success Modal for Demo Judging */}
      <AnimatePresence>
        {publishSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C2A29]/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              className="w-full max-w-md bg-[#F9F6F0] rounded-2xl border-2 border-[#C25934]/30 p-8 shadow-xl flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#849A89]/20 text-[#849A89] flex items-center justify-center mb-4 border border-[#849A89]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#C25934] font-semibold">
                Success &middot; Live on Registry
              </span>
              <h3 className="font-serif text-2xl font-bold text-textPrimary mt-1">
                Artifact Published
              </h3>
              <p className="text-xs text-textPrimary/80 mt-2 leading-relaxed max-w-prose">
                &ldquo;{title || "Goddess Gorbandh Terracotta Plaque"}&rdquo; is now active in the Global Tribal Registry with {activeRulesCount} Smart Consent Rules enforced.
              </p>

              <div className="w-full bg-white/80 rounded-xl p-4 border border-[#C25934]/15 my-5 text-left text-xs text-textPrimary/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-textPrimary/60">Artisan Payout:</span>
                  <span className="font-bold text-textPrimary">₹ {price || "4,800"} (100% Direct)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textPrimary/60">Sacred Consent:</span>
                  <span className="font-bold text-accent">{activeRulesCount} Protocols Enforced</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textPrimary/60">Classification:</span>
                  <span className="font-medium text-textPrimary">{artForm}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPublishSuccess(false)}
                className="w-full py-3.5 rounded-xl bg-[#C25934] text-[#F9F6F0] font-serif font-semibold text-sm hover:opacity-95 transition-opacity cursor-pointer"
              >
                Return to Artisan Workspace
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  );
}
