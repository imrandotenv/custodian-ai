# Custodian-AI Backend Sanctuary

> Enterprise-grade REST API backend built for [Custodian-AI](https://github.com/imrandotenv/custodian-ai) — an indigenous heritage preservation & ethical marketplace sanctuary for Santhali murals, Sohrai Khovar mud paintings, and Bastar & Purulia Dokra metalcraft.

---

## 🏛️ Architecture Highlights

- **Framework & Runtime**: Node.js 24 + TypeScript with Express
- **Pattern**: Controller-Service-Repository architecture with Zod schema validation
- **Database & ORM**: Prisma ORM with SQLite for zero-configuration local execution, seamlessly switchable to PostgreSQL (Supabase, Neon, AWS RDS) for production
- **Security Middleware**: Helmet, strict CORS, IP-based rate limiters, bcryptjs password hashing, and JWT token authentication
- **Role-Based Access Control (RBAC)**:
  - `tourist`: Travelers and ethno-collectors who explore, pledge customary consent, and acquire certified works
  - `local`: Master indigenous artisans who catalog works, enforce sacred customary rules, and view 100% direct payouts
  - `admin`: Platform sanctuary elders overseeing GI verification and compliance
- **Cryptographic Provenance**:
  - SHA-256 artifact provenance hashing anchored to the tribal heritage ledger
  - Cryptographic digital pledge signatures certifying travelers agreed to customary rules (e.g., no flash photography in the sacred *Jaher Than*, respect for Sohrai harvest motifs, and non-touch protocols for raw Dudhi clay)
- **AI Cultural Engine**: Pluggable Google Gemini and OpenAI integration with a resilient built-in Santhali / Ol Chiki lore synthesis fallback

---

## 📁 Project Structure

```
custodian-backend/
├── prisma/
│   ├── schema.prisma             # Database schema (User, Artwork, Pledge, Atelier, ChatMessage)
│   └── seed.ts                   # Master artisan, atelier, and artwork seed data
├── src/
│   ├── app.ts                    # Express app configuration & middlewares
│   ├── server.ts                 # Server listener & graceful shutdown
│   ├── config/
│   │   ├── db.ts                 # Prisma singleton instance
│   │   └── env.ts                # Zod-validated environment config
│   ├── controllers/
│   │   ├── ai.controller.ts      # Translation, lore generation, & chat
│   │   ├── artwork.controller.ts # Artifact catalog CRUD
│   │   ├── atelier.controller.ts # Living map territorial coordinates
│   │   ├── auth.controller.ts    # Register, login, logout, me, & profile
│   │   ├── dashboard.controller.ts # Master artisan earnings & stats
│   │   ├── pledge.controller.ts  # Sacred Smart Consent & verification
│   │   └── upload.controller.ts  # Single & multiple image uploads
│   ├── middlewares/
│   │   ├── auth.middleware.ts    # JWT token verification
│   │   ├── errorHandler.middleware.ts # Global error handler
│   │   ├── rateLimiter.middleware.ts  # Security rate limiters
│   │   ├── role.middleware.ts    # RBAC role guards
│   │   ├── upload.middleware.ts  # Multer image upload constraints
│   │   └── validate.middleware.ts# Zod request validator
│   ├── routes/
│   │   ├── ai.routes.ts          # /api/v1/ai
│   │   ├── artwork.routes.ts     # /api/v1/artworks
│   │   ├── atelier.routes.ts     # /api/v1/ateliers
│   │   ├── auth.routes.ts        # /api/v1/auth
│   │   ├── dashboard.routes.ts   # /api/v1/dashboard
│   │   ├── index.ts              # Root API router & /health
│   │   ├── pledge.routes.ts      # /api/v1/pledges
│   │   └── upload.routes.ts      # /api/v1/uploads
│   ├── services/
│   │   ├── ai.service.ts         # Gemini / OpenAI / Cultural fallback engine
│   │   ├── artwork.service.ts    # Artworks business logic & hashing
│   │   ├── atelier.service.ts    # Atelier map queries
│   │   ├── auth.service.ts       # Auth logic & JWT generation
│   │   ├── dashboard.service.ts  # 100% direct remuneration calculations
│   │   └── pledge.service.ts     # Smart consent signature sealing
│   ├── utils/
│   │   ├── apiResponse.ts        # Standardized { success, message, data } helper
│   │   ├── appError.ts           # Typed HTTP exception classes
│   │   ├── crypto.ts             # Provenance & pledge hash generators
│   │   └── jwt.ts                # JWT sign & verify
│   └── validators/
│       ├── ai.validator.ts       # AI Zod schemas
│       ├── artwork.validator.ts  # Artwork Zod schemas
│       ├── auth.validator.ts     # Auth Zod schemas
│       └── pledge.validator.ts   # Pledge Zod schemas
├── frontend-integration/
│   ├── api.ts                    # Drop-in TypeScript client for Next.js
│   └── INTEGRATION_GUIDE.md      # Frontend component wiring instructions
├── uploads/                      # Uploaded artwork imagery
├── .env.example                  # Environment configuration template
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 20+ (Node.js 24 recommended)
- npm 10+

### 2. Installation
```bash
# Navigate to project directory
cd "custodian backend"

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="super-sacred-custodian-sanctuary-secret-key-2026"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
GEMINI_API_KEY=""
OPENAI_API_KEY=""
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE_MB=5
```

### 4. Database Setup & Seeding
```bash
# Push schema to SQLite database (dev.db)
npm run prisma:push

# Seed initial master artisans, living ateliers, and artworks
npm run prisma:seed
```

### 5. Start Development Server
```bash
npm run dev
```
The server will boot at `http://localhost:5000` with hot-reload enabled.

To build and run in production:
```bash
npm run build
npm start
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/v1`

### 1. Authentication (`/api/v1/auth`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new user (`tourist`, `local`, `admin`) |
| `POST` | `/login` | Public | Login and receive a JWT Bearer token |
| `POST` | `/logout` | Bearer | Logout session |
| `GET` | `/me` | Bearer | Retrieve current authenticated user profile |
| `PUT` | `/profile` | Bearer | Update user profile (bio, hamlet, avatar) |

### 2. Artworks (`/api/v1/artworks`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | List cataloged artworks (supports `search`, `artForm`, `region`, `page`, `limit`) |
| `GET` | `/:id` | Public | Get artwork details and increment view count |
| `POST` | `/` | `local` / `admin` | Publish artwork with Smart Consent rules & provenance hash |
| `PUT` | `/:id` | Owner / `admin` | Update artwork listing |
| `DELETE` | `/:id` | Owner / `admin` | Remove artwork from catalog |

### 3. Smart Consent & Digital Pledges (`/api/v1/pledges`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | `tourist` | Solemnly agree to customary rules and generate cryptographic signature |
| `GET` | `/my` | Bearer | Retrieve current traveler's active pledges |
| `GET` | `/artwork/:artworkId` | Owner / `admin` | Master artisan view of all travelers who pledged for this piece |
| `GET` | `/verify/:signature` | Public | Public cryptographic proof verification |

### 4. Living Ateliers Map (`/api/v1/ateliers`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Retrieve coordinates, GI tags, and geological notes for radar pings |
| `GET` | `/:id` | Public | Get details for a specific atelier |

### 5. AI Cultural Engine (`/api/v1/ai`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/translate` | Public | Santhali (Ol Chiki) ↔ English translation preserving sacred nuances |
| `POST` | `/generate-lore` | Public | Generates museum-grade editorial lore from artisan keywords |
| `POST` | `/chat` | Optional Bearer | Conversational sanctuary assistant & ethical guide |

### 6. Master Artisan Dashboard (`/api/v1/dashboard`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/artisan-stats` | `local` / `admin` | 100% direct remuneration calculations, active listings, views, and pledges |

### 7. File Uploads (`/api/v1/uploads`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/single` | `local` / `admin` | Upload single artifact image (JPEG, PNG, WEBP, SVG max 5MB) |
| `POST` | `/multiple` | `local` / `admin` | Upload up to 5 artifact images simultaneously |

---

## 🧪 Testing

Run the automated end-to-end smoke test suite:
```bash
node scratch/test_api.js
```
All 8 test suites run against an ephemeral port and verify every core endpoint in under 1 second.
