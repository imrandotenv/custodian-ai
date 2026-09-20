import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CustodianUploadForm from "@/components/CustodianUploadForm";

export const metadata = {
  title: "Add New Art &middot; Custodian Workspace | Mitti Heritage",
  description:
    "Catalog indigenous tribal art with our pioneering Smart Cultural Consent Protocol.",
};

export default function AddArtPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-16 md:pt-36 md:pb-28">
      {/* Back to Workspace Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]/70 hover:text-[#C25934] transition-colors py-2 px-4 rounded-full bg-[#F9F6F0]/80 border border-[#C25934]/20 hover:bg-[#F9F6F0] shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Artisan Dashboard</span>
        </Link>
      </div>

      <CustodianUploadForm />
    </div>
  );
}
