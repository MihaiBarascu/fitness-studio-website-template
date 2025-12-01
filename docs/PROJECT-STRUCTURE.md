# Project Structure - Transilvania Fitness

> **Documentație pentru structura proiectului Payload Website Template**

---

## Overview

```
template-2/
├── docs/                    # 📚 Documentație proiect
├── public/                  # Assets statice
├── src/
│   ├── access/             # Access control functions
│   ├── app/                # Next.js App Router
│   ├── blocks/             # Payload Blocks (reusable content)
│   ├── collections/        # Payload Collections
│   ├── components/         # React Components
│   ├── endpoints/          # Custom API endpoints + Seed
│   ├── fields/             # Reusable Payload fields
│   ├── hooks/              # Payload hooks
│   ├── providers/          # React Context providers
│   ├── utilities/          # Helper functions
│   │
│   ├── Header/             # Header Global
│   ├── Footer/             # Footer Global
│   ├── Theme/              # Theme Global
│   ├── Logo/               # Logo Global
│   ├── BusinessInfo/       # Business Info Global
│   ├── PaginiAbonamente/   # Abonamente pages settings
│   ├── PaginiClase/        # Classes pages settings
│   ├── PaginiEchipa/       # Team pages settings
│   │
│   └── payload.config.ts   # Main Payload configuration
├── CLAUDE.md               # Instructions for Claude AI
└── package.json
```

---

## Collections

### Core Collections (Payload Default)

| Collection | Descriere | Route |
|------------|-----------|-------|
| `pages` | Pagini CMS cu blocks | `/{slug}` |
| `posts` | Blog posts | `/posts/{slug}` |
| `media` | Imagini și fișiere | N/A |
| `categories` | Categorii blog | N/A |
| `users` | Utilizatori admin | N/A |

### Custom Collections (Transilvania Fitness)

| Collection | Descriere | Route |
|------------|-----------|-------|
| `team-members` | Membri echipă/antrenori | `/team-members/{slug}` |
| `clase` | Clase fitness | `/clase/{slug}` |
| `abonamente` | Abonamente și prețuri | `/abonamente` (listing) |

---

## Globals

| Global | Descriere | Folosit în |
|--------|-----------|------------|
| `header` | Navigare, CTA, social | Header component |
| `footer` | Columns, legal links | Footer component |
| `theme` | Culori (primary, dark, etc.) | CSS variables |
| `logo` | Logo text sau imagine | Header, Footer |
| `business-info` | Contact, program, social | Footer, Contact page |
| `pagini-echipa` | Settings pentru /team-members | Team listing page |
| `pagini-clase` | Settings pentru /clase | Classes listing page |
| `pagini-abonamente` | Settings pentru /abonamente | Subscriptions page |

---

## Blocks

### Content Blocks

| Block | Descriere |
|-------|-----------|
| `Content` | Rich text content |
| `MediaBlock` | Imagine sau video |
| `Archive` | Lista de posts/clase/etc. |
| `FormBlock` | Formular de contact |
| `CallToAction` | CTA cu buton |

### Custom Blocks

| Block | Descriere |
|-------|-----------|
| `MapBlock` | Google Maps embed |
| `ContactInfoBlock` | Info contact cu iconuri |
| `UniversalCard` | Card generic pentru orice |
| `HighImpactHero` | Hero cu background image |

---

## Frontend Routes

```
src/app/(frontend)/
├── page.tsx                     # Homepage (/)
├── [slug]/page.tsx              # CMS Pages (/{slug})
├── posts/
│   ├── page.tsx                 # Blog listing (/posts)
│   └── [slug]/page.tsx          # Blog post (/posts/{slug})
├── clase/
│   ├── page.tsx                 # Classes listing (/clase)
│   └── [slug]/page.tsx          # Class detail (/clase/{slug})
├── team-members/
│   ├── page.tsx                 # Team listing (/team-members)
│   └── [slug]/page.tsx          # Member detail (/team-members/{slug})
├── abonamente/
│   └── page.tsx                 # Subscriptions (/abonamente)
└── contact/
    └── page.tsx                 # Contact page (/contact)
```

---

## Key Files

### Configuration

| File | Descriere |
|------|-----------|
| `src/payload.config.ts` | Config principal Payload |
| `tailwind.config.mjs` | Configurare Tailwind CSS |
| `src/app/(frontend)/globals.css` | Stiluri globale |

### Seed System

| File | Descriere |
|------|-----------|
| `src/endpoints/seed/seed-data.ts` | **Configurare client** |
| `src/endpoints/seed/index.ts` | Logică seeding |
| `src/endpoints/seed/home.ts` | Homepage blocks |

### Components

| File | Descriere |
|------|-----------|
| `src/Header/Component.tsx` | Header UI |
| `src/Footer/Component.tsx` | Footer UI |
| `src/components/ui/` | ShadCN components |
| `src/components/SocialIcons/` | Social media icons |

---

## Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   seed-data.ts  │────▶│    Seeder       │────▶│    MongoDB      │
│  (configurare)  │     │  (index.ts)     │     │   (database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Components    │◀────│   Payload API   │◀────│    Globals      │
│   (React)       │     │  (local/REST)   │     │  (theme, etc.)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │ Cloudflare R2   │
                                                │   (media)       │
                                                └─────────────────┘
```

---

## Environment Variables

```env
# Required
DATABASE_URI=mongodb://...
PAYLOAD_SECRET=your-secret-key

# Storage (Cloudflare R2)
R2_BUCKET=bucket-name
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_ENDPOINT=https://...r2.cloudflarestorage.com

# Optional
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## Development Commands

```bash
# Start dev server
pnpm dev

# Build
pnpm build

# Type check
pnpm tsc --noEmit

# Generate Payload types
pnpm payload generate:types

# Seed database (terminal)
pnpm seed

# Seed database (admin panel)
# Navigate to /admin and click "Seed your database"
```

---

## Adding New Features

### New Collection

1. Create `src/collections/NewCollection.ts`
2. Add to `payload.config.ts` collections array
3. Run `pnpm payload generate:types`
4. Create frontend routes in `src/app/(frontend)/`

### New Global

1. Create `src/NewGlobal/config.ts`
2. Add to `payload.config.ts` globals array
3. Run `pnpm payload generate:types`
4. Use in components via `getCachedGlobal()`

### New Block

1. Create `src/blocks/NewBlock/config.ts`
2. Create `src/blocks/NewBlock/Component.tsx`
3. Add to Pages collection blocks array
4. Run `pnpm payload generate:types`
