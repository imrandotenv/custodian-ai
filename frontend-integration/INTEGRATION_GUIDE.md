# Custodian-AI Frontend Integration Guide

This guide walks you through connecting your Next.js frontend (`custodian-ai`) to the newly built backend.

---

## 1. Environment Variable

In your frontend project root (`custodian-ai/.env.local`), add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 2. Drop In the API Client

Copy `frontend-integration/api.ts` into your frontend project:

```bash
# From the backend directory:
cp frontend-integration/api.ts ../custodian-ai/src/lib/api.ts
# (or wherever your frontend utility folder is located)
```

---

## 3. Hooking Up Core Frontend Components

### A. Custodian Upload Form (`components/CustodianUploadForm.tsx`)

Replace the simulated `setTimeout` in `handlePublish` with real API calls:

```tsx
import { artworksApi, uploadApi } from "@/lib/api";

// Inside CustodianUploadForm:
const [imageFile, setImageFile] = useState<File | null>(null);

const handlePublish = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsPublishing(true);

  try {
    let imageUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80";
    
    // If a physical file was selected, upload it first:
    if (imageFile) {
      const uploadRes = await uploadApi.uploadSingle(imageFile);
      imageUrl = `http://localhost:5000${uploadRes.url}`;
    }

    // Convert active consent rules to an array of rule IDs
    const enforcedRules = Object.entries(selectedRules)
      .filter(([_, active]) => active)
      .map(([ruleId]) => ruleId);

    const createdArtwork = await artworksApi.create({
      title,
      artForm,
      nativeDescription,
      price: parseFloat(price) || 0,
      images: [imageUrl],
      consentRules: enforcedRules,
    });

    console.log("Anchored on registry:", createdArtwork.provenanceHash);
    setPublishSuccess(true);
  } catch (err: any) {
    alert(`Failed to publish artifact: ${err.message}`);
  } finally {
    setIsPublishing(false);
  }
};
```

---

### B. Master Artisan Dashboard (`app/dashboard/page.tsx`)

Fetch live stats and active listings from the backend:

```tsx
import { useEffect, useState } from "react";
import { dashboardApi, artworksApi, ArtisanDashboardStats, Artwork } from "@/lib/api";

export default function CustodianDashboard() {
  const [stats, setStats] = useState<ArtisanDashboardStats | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, artworksData] = await Promise.all([
          dashboardApi.getArtisanStats(),
          artworksApi.list(),
        ]);
        setStats(statsData);
        setArtworks(artworksData);
      } catch (err) {
        console.error("Could not fetch artisan stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  // Use stats.directRemunerationPotential, stats.activeListingsCount, artworks...
}
```

---

### C. Cultural Lore & Ol Chiki Translation (`components/CulturalStoryView.tsx`)

Connect real-time translation & AI lore synthesis:

```tsx
import { aiApi } from "@/lib/api";

const handleTranslate = async () => {
  try {
    const result = await aiApi.translate(
      originalText,
      "santhali",
      "english"
    );
    setEnglishTranslation(result.translatedText);
  } catch (err) {
    console.error("Translation error:", err);
  }
};
```

---

### D. Smart Consent & Digital Pledge Flow (`components/SmartConsent.tsx` or `app/explore/page.tsx`)

When a traveler pledges to customary rules before acquiring or visiting:

```tsx
import { pledgesApi } from "@/lib/api";

const handlePledge = async (artworkId: string, acceptedRules: string[]) => {
  try {
    const pledge = await pledgesApi.create({
      artworkId,
      acceptedRules,
      depositAmount: 1500,
    });

    console.log("Pledge Cryptographic Proof:", pledge.digitalSignature);
    alert(`Customary Consent Sealed! Signature: ${pledge.digitalSignature.substring(0, 16)}...`);
  } catch (err: any) {
    alert(`Could not seal pledge: ${err.message}`);
  }
};
```

---

## 4. Default Seeded Accounts for Testing

The database comes pre-seeded with:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Master Artisan (`local`)** | `muni.devi@custodian.sanctuary` | `SacredCustodian2026!` | Sohrai Khovar Master, Hazaribagh |
| **Master Artisan (`local`)** | `somra.hembrom@custodian.sanctuary` | `SacredCustodian2026!` | Dokra Lost-Wax Master, Purulia |
| **Traveler (`tourist`)** | `traveler@example.com` | `SacredCustodian2026!` | Ethno Collector |
| **Sanctuary Admin (`admin`)** | `admin@custodian.sanctuary` | `SacredCustodian2026!` | Registry Overseer |
