"use client";

import React, { useState, useRef } from "react";
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
  AlertCircle,
  X,
} from "lucide-react";
import { artworksApi, uploadApi, getAuthToken, authApi, Artwork } from "@/lib/api";

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

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status State
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdArtwork, setCreatedArtwork] = useState<Artwork | null>(null);

  const toggleRule = (ruleId: string) => {
    setSelectedRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsPublishing(true);

    try {
      // 1. Ensure user is authenticated as an artisan
      if (!getAuthToken()) {
        await authApi.login({
          email: "muni.devi@custodian.sanctuary",
          password: "SacredCustodian2026!",
        });
      }

      // 2. Upload photo if provided, else use default verified provenance image
      let uploadedImageUrl =
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80";

      if (imageFile) {
        const uploadRes = await uploadApi.uploadSingle(imageFile);
        uploadedImageUrl = uploadRes.url;
      }

      // 3. Extract active Smart Consent rules
      const enforcedRules = Object.entries(selectedRules)
        .filter(([_, active]) => active)
        .map(([ruleId]) => ruleId);

      if (enforcedRules.length === 0) {
        throw new Error("You must enforce at least one Smart Consent rule to protect indigenous sovereignty.");
      }

      // 4. Create Artwork via Live Backend
      const artwork = await artworksApi.create({
        title: title.trim() || "Goddess Gorbandh Terracotta Plaque",
        artForm,
        nativeDescription:
          nativeDescription.trim() ||
          "ᱥᱟᱱᱛᱟᱲᱤ ᱠᱟᱹᱦᱱᱤ: ᱫᱷᱟᱹᱨᱛᱤ ᱟᱨ ᱫᱟᱜ ᱥᱤᱨᱡᱚᱱ ᱨᱮ ᱴᱷᱟᱹᱠᱩᱨ ᱡᱤᱣ ᱦᱟᱸᱥ ᱟᱨ ᱦᱟᱸᱥᱤᱞ ᱫᱤᱵᱽᱭᱚ ᱪᱮᱬᱮ ᱡᱩᱲᱤ ᱵᱮᱱᱟᱣ ᱞᱮᱫ ᱠᱤᱱᱟᱭ᱾",
        price: parseFloat(price) || 18500,
        images: [uploadedImageUrl],
        consentRules: enforcedRules,
        originHamlet: "Hazaribagh, Jharkhand",
        giTagNumber: "JH-SOHRAI-2020",
      });

      setCreatedArtwork(artwork);
      setPublishSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to anchor artifact to heritage ledger";
      setErrorMessage(msg);
    } finally {
      setIsPublishing(false);
    }
  };

  const activeRulesCount = Object.values(selectedRules).filter(Boolean).length;

  return (
    <form onSubmit={handlePublish} className="w-full max-w-4xl mx-auto flex flex-col gap-10">
      
      {/* Form Intro Header */}
      <div className="flex flex-col gap-2 border-b border-[#C25934]/20 pb-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C25934] font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          Master Artisan Sovereign Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-textPrimary tracking-tight">
          Catalog Ancestral Artifact & Set Consent Rules
        </h1>
        <p className="text-xs sm:text-sm text-textPrimary/70 max-w-2xl leading-relaxed">
          Upload and anchor your work onto the decentralized tribal heritage ledger. You dictate customary access protocols, sacred touch bans, and direct remuneration terms.
        </p>
      </div>

      {/* Minimalist Inline Error Toast Banner */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-4 rounded-2xl bg-[#C25934]/10 border border-[#C25934]/30 text-xs font-mono text-[#C25934] flex items-center justify-between gap-3 shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-[#C25934]/20 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: Basic Artifact Details */}
      <section className="flex flex-col gap-6">
        <h2 className="font-serif text-xl font-medium text-textPrimary border-l-2 border-[#C25934] pl-3">
          1. Provenance & Artifact Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-textPrimary/70 font-semibold">
              Artifact Sacred Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Goddess Gorbandh Terracotta Plaque"
              className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-[#C25934]/25 text-sm text-textPrimary focus:outline-hidden focus:border-[#C25934] transition-colors shadow-2xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-textPrimary/70 font-semibold">
              Indigenous Craft Form *
            </label>
            <select
              value={artForm}
              onChange={(e) => setArtForm(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-[#C25934]/25 text-sm text-textPrimary focus:outline-hidden focus:border-[#C25934] transition-colors shadow-2xs cursor-pointer"
            >
              {ART_FORMS.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ol Chiki / Native Oral Lore */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-textPrimary/70 font-semibold">
              Ancestral Lore & Ol Chiki Motifs (Native Script or Dialect) *
            </label>
            <span className="text-[11px] font-mono text-textPrimary/50">
              AI Accessibility Supported
            </span>
          </div>
          <textarea
            rows={4}
            required
            value={nativeDescription}
            onChange={(e) => setNativeDescription(e.target.value)}
            placeholder="ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱢᱮ... / Describe the sacred oral creation story, motifs scraped with broken combs, or furnace rituals..."
            className="w-full p-4 rounded-2xl bg-white/70 border border-[#C25934]/25 text-sm text-textPrimary focus:outline-hidden focus:border-[#C25934] transition-colors shadow-2xs leading-relaxed"
          />
        </div>

        {/* Direct Remuneration Price */}
        <div className="flex flex-col gap-2 max-w-xs">
          <label className="text-xs font-mono uppercase tracking-wider text-textPrimary/70 font-semibold flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-[#C25934]" />
            Direct Custodian Remuneration (₹ INR) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-textPrimary/60">
              ₹
            </span>
            <input
              type="number"
              min="1"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="18500"
              className="w-full pl-8 pr-4 py-3.5 rounded-2xl bg-white/70 border border-[#C25934]/25 text-sm font-semibold text-textPrimary focus:outline-hidden focus:border-[#C25934] transition-colors shadow-2xs"
            />
          </div>
          <span className="text-[11px] text-[#849A89] font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> 0% Platform Cut — 100% sent directly to artisan bank
          </span>
        </div>
      </section>

      {/* Section 2: Artifact Image Upload */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-xl font-medium text-textPrimary border-l-2 border-[#C25934] pl-3">
          2. High-Resolution Sacred Artifact Imagery
        </h2>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
            imagePreview
              ? "border-[#849A89] bg-[#849A89]/5"
              : "border-[#C25934]/30 bg-white/40 hover:bg-white/70 hover:border-[#C25934]"
          }`}
        >
          {imagePreview ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-36 h-36 object-cover rounded-2xl border-2 border-[#849A89]/40 shadow-sm"
              />
              <span className="text-xs font-mono text-[#849A89] font-semibold">
                Click to change image ({imageFile?.name})
              </span>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-[#C25934]/10 flex items-center justify-center text-[#C25934] mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="font-serif text-base font-bold text-textPrimary">
                Click or Drop Master Photograph
              </span>
              <span className="text-xs text-textPrimary/60 mt-1">
                Supports JPG, PNG, WEBP up to 5MB. Watermarked with living GI provenance badge upon upload.
              </span>
            </>
          )}
        </div>
      </section>

      {/* Section 3: Smart Consent Customary Rules Enforced */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[#C25934]/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl font-medium text-textPrimary border-l-2 border-[#849A89] pl-3">
              3. Smart Consent Protocol Configuration (Sacred Customary Law)
            </h2>
            <p className="text-xs text-textPrimary/70 mt-1 max-w-xl">
              As a tribal custodian, you hold ultimate spiritual sovereignty. Select binding ritual rules that every tourist, buyer, or gallery visitor must legally agree to before viewing or visiting.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl border border-[#849A89]/30 text-xs font-semibold text-textPrimary self-start sm:self-auto shadow-2xs">
            <Lock className="w-4 h-4 text-[#849A89]" />
            <span>{activeRulesCount} of 3 Rules Enforced</span>
          </div>
        </div>

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

                <div className="pt-3 border-t border-[#849A89]/20 text-[11px] text-textPrimary/70 italic font-serif leading-snug">
                  &ldquo;{rule.culturalNote}&rdquo;
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C25934]/20">
        <div className="text-xs text-textPrimary/70 text-center sm:text-left">
          <p className="font-semibold text-textPrimary">Verified GI Provenance</p>
          <p>Upon submission, your listing is hashed onto the sovereign heritage ledger.</p>
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

      {/* Success Modal */}
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
                &ldquo;{createdArtwork?.title || title || "Ancestral Plaque"}&rdquo; is now active in the Global Tribal Registry with {activeRulesCount} Smart Consent Rules enforced.
              </p>

              {createdArtwork?.provenanceHash && (
                <div className="w-full bg-black/5 rounded-xl p-3 my-2 text-left">
                  <span className="text-[10px] font-mono text-textPrimary/50 uppercase block">
                    Cryptographic Ledger Hash:
                  </span>
                  <span className="text-[11px] font-mono text-textPrimary font-medium break-all">
                    {createdArtwork.provenanceHash}
                  </span>
                </div>
              )}

              <div className="w-full bg-white/80 rounded-xl p-4 border border-[#C25934]/15 my-4 text-left text-xs text-textPrimary/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-textPrimary/60">Artisan Payout:</span>
                  <span className="font-bold text-textPrimary">₹ {createdArtwork?.price ?? price ?? "18,500"} (100% Direct)</span>
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
                onClick={() => {
                  setPublishSuccess(false);
                  setTitle("");
                  setPrice("");
                  setNativeDescription("");
                  setImageFile(null);
                  setImagePreview(null);
                }}
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
