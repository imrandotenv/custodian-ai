# ᱢᱤᱛᱛᱤ &middot; MITTI (Custodian AI)
### Sovereign Indian Tribal Heritage Living &bull; Cultural Consent Engine &bull; Ol Chiki AI Storyteller

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## ✦ Overview

**Mitti** (or **Custodian AI**) is a digital sanctuary engineered to return sovereignty to indigenous Indian artisans, centering around the ancient **Santhali traditions** of the Chota Nagpur Plateau and Purulia Arc: **Sohrai Khovar mud sgraffito**, **4,000-year-old lost-wax Dokra metallurgy**, and the **Ol Chiki script**.

Traditional platforms commercialize and dilute tribal culture through middleman exploitation, unauthorized physical replication, and digital misattribution. **Mitti** redefines cultural exchange by enforcing customary tribal law through a **Smart Cultural Consent Protocol**, guaranteeing **100% direct artisan remuneration**, and utilizing AI to preserve indigenous oral memory in its native Ol Chiki tongue.

---

## ✦ Core USPs & Innovation

### 1. 🛡️ Active Smart Cultural Consent Protocol (Customary Law Engine)
- Acquisitions and residency bookings remain cryptographically and procedurally **locked** until a traveler solemnly agrees to the master custodian’s sacred customary rules.
- **Custom Rules Enforced**: Strict prohibition of flash photography inside the sacred *Jaher Than*, respect for harvest motifs, and non-touch protocols for raw kaolin/laterite clay and bronze patinas.
- **Direct Payouts**: 0% platform commission; 100% direct remuneration sent to custodian bank accounts (e.g., Muni Devi, Sohrai Guild).

### 2. 🗣️ Ol Chiki Living Language & AI Accessibility
- **Preserved Oral Archives**: Displays traditional creation stories (such as the primeval dawn of *Thakur Jiu* and the divine swan pair *Has & Hasil*) in native **Ol Chiki script** (`ᱥᱟᱱᱛᱟᱲᱤ`).
- **AI-Powered Dual Translation**: Real-time toggling between authentic Santhali dialect and global English, backed by audio invocation and typographic decoding micro-interactions.
- **Cinematic Focus Mode**: An immersive reading modal (`backdrop-blur-md` overlay, scaled typography, high-contrast Warm Sand palette) for deep cultural focus.

### 3. 🗺️ Topography of Living Ateliers (Abstract Territorial Map)
- Custom-coded minimalist SVG vector map of Jharkhand and West Bengal indigenous plateaus (*Hazaribagh, Purulia Hills, Dumka, Mayurbhanj*).
- **Dual-Wave Sonar Radar Pings**: Pulsing Terracotta concentric waves animate behind village coordinates, making the regional atlas feel alive without relying on commercial map engines like Google Maps or Leaflet.
- Interactive glassmorphic modals display artisan lineage, GI-tag credentials, elevations, and local geological notes.

### 4. 🎭 Dual Gatekeeper Architecture
- A fullscreen split-curtain entryway dividing incoming visitors into:
  - **The Traveler / Tourist**: Guided into high-end curated exhibitions, ethical residencies, and digital pledge flows.
  - **The Master Custodian**: Direct portal to inventory control, digital pledge logs, fair-trade earnings, and rule enforcement monitors.

---

## ✦ Awwwards-Calibrated Editorial UX & Physics

The platform is designed with an earthy, physical, museum-grade aesthetic inspired by tribal mud architecture:

- **3D Mouse Tracking Tilt Cards (`TiltCard.tsx`)**: Physics-based cursor parallax with dynamic specular white glare moving opposite to cursor position.
- **Window Reveal Parallax (`ParallaxImage.tsx`)**: Fluid image zoom and translation driven by Framer Motion and viewport scroll progress.
- **Staggered Word Masking (`RevealText.tsx`)**: Split-word masked entrance using a high-tension cubic bezier `[0.76, 0, 0.24, 1]`.
- **Smart Glassmorphism Header (`Navbar.tsx`)**: Ultra-thin `border-b border-black/5`, `bg-[#F9F6F0]/60` with `backdrop-blur-xl`, featuring auto-hide scroll physics (hides on downscroll, reveals on micro-upscroll).
- **Ol Chiki Cipher Micro-Interaction (`CipherLink.tsx`)**: Nav links rapidly scramble through random Ol Chiki glyphs (`['ᱚ', 'ᱛ', 'ᱜ', 'ᱝ', 'ᱞ', 'ᱟ', 'ᱠ', 'ᱡ', 'ᱢ', 'ᱣ']`) for 300ms on hover before decoding to English.
- **Liquid SVG Curve Transition (`CurveTransition.tsx`)**: Earth-toned liquid path sweeping dynamically across routes.
- **Responsive Dual-Mode Gallery (`HorizontalGallery.tsx`)**:
  - **Desktop ($\ge$ 768px)**: Edge-to-edge 380vh sticky horizontal sliding track.
  - **Mobile (< 768px)**: Seamless vertical card stack with normal touch scrolling.
- **Touch-Device Cursor Suppression (`CustomCursor.tsx`)**: Hardware-accelerated trailing spring dot that automatically disables on touch/coarse pointers (`@media (pointer: coarse)` and runtime detection) with `z-[9999]` strict layering on desktop.

---

## ✦ Color Palette & Theme System

| Color | Hex | Role | Cultural Symbolism |
| :--- | :--- | :--- | :--- |
| **Terracotta** | `#C25934` | Primary Accent | Sacred earthenware kilns, Chota Nagpur laterite mud |
| **Warm Sand** | `#F9F6F0` | Canvas Background | Kaolin clay (*Dudhi Mati*), unbleached handmade paper |
| **Charcoal** | `#1A1A1A` | Typography & Contrast | Manganese river mud, ancestral hearth soot |
| **Sage Green** | `#849A89` | Consent & Living Lore | Sacred Sal tree leaves (*Shorea robusta*) |
| **Copper Glow**| `#E5A882` | Secondary Highlights | Dokra bell-metal bronze and beeswax patina |

---

## ✦ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Bundler & Compiler**: Turbopack & React 19
- **Typography**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Inter](https://fonts.google.com/specimen/Inter)
- **Animation & Micro-interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis Scroll](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✦ Project Structure

```
p1/
├── app/
│   ├── add-art/             # Custodian inventory cataloging portal
│   ├── dashboard/           # Master Artisan command center (Muni Devi portal)
│   ├── explore/             # Exhibition hall, Living Map, and Pledge Engine
│   ├── globals.css          # Noise texture, custom scrollbars, typography
│   ├── layout.tsx           # Global Root layout & font orchestration
│   ├── page.tsx             # Dual Gatekeeper split landing experience
│   └── template.tsx         # Liquid SVG transition wrapper
├── components/
│   ├── AmbientAudio.tsx     # Ambient atmospheric ritual audio toggle
│   ├── AppShell.tsx         # Unified shell with noise overlay & Lenis scroll
│   ├── ArtDetails.tsx       # Artwork showcase, 3D tilt canvas, & lore view
│   ├── ArtistListHoverReveal.tsx # Hover reveal directory with mobile fallback
│   ├── CipherLink.tsx       # Ol Chiki decoding typography micro-interaction
│   ├── CulturalMap.tsx      # Stylized SVG territorial map with radar pings
│   ├── CulturalStoryView.tsx # Ol Chiki story translation & Focus Mode
│   ├── CurveTransition.tsx  # Dynamic liquid curve route transitions
│   ├── CustodianUploadForm.tsx # Sovereign art cataloging with consent rules
│   ├── CustomCursor.tsx     # High-stiffness spring cursor (z-[9999], touch-safe)
│   ├── Footer.tsx           # Massive editorial 'MITTI' centerpiece footer
│   ├── HorizontalGallery.tsx# Responsive horizontal/vertical sticky gallery
│   ├── MagneticButton.tsx   # Physics-based magnetic attraction buttons
│   ├── Navbar.tsx           # Smart auto-hide glassmorphism header
│   ├── ParallaxImage.tsx    # Scroll-bound image canvas parallax
│   ├── Preloader.tsx        # Initial editorial museum entrance preloader
│   ├── RevealText.tsx       # Split-word staggered masking reveal
│   ├── RoleContext.tsx      # Dual-role state management (Traveler / Custodian)
│   ├── ScrollProgress.tsx   # Circular SVG scroll meter with dynamic percentage
│   ├── SmartConsent.tsx     # Customary consent protocol with pulsing badges
│   ├── SmoothScroll.tsx     # Lenis smooth scrolling orchestrator
│   ├── TextMarquee.tsx      # Infinite outlined typography banner
│   └── TiltCard.tsx         # 3D mouse tracking tilt with physical glare
└── tailwind.config.ts       # Design system tokens and earthen color palette
```

---

## ✦ Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/imrandotenv/custodian-ai.git

# Navigate into project directory
cd custodian-ai

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Next.js development server with Turbopack
npm run dev
```

Visit `http://localhost:3000` to experience the sanctuary.

### Production Build

```bash
# Compile and optimize for production
npm run build

# Start production server
npm start
```

---

## ✦ Sovereign Intellectual Property Notice

All Santhali mural iconography, Sohrai Khovar techniques, and Dokra lost-wax casting details documented in this archive remain the sovereign cultural patrimony of the indigenous communities of Jharkhand, Odisha, and West Bengal. Certified under **GI Tag #JH-SOHRAI-2020**.
