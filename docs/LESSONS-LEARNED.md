# Lecții Învățate - Transilvania Fitness

> **Acest fișier conține probleme rezolvate și informații importante pentru sesiunile viitoare.**
> **Actualizează-l când descoperi ceva important!**

---

## Quick Reference

| Problemă | Solutie | Sectiune |
|----------|---------|----------|
| Seed data imprastiata | Foloseste `seed-data.ts` centralizat | [#1](#1-seed-data-centralizat) |
| Media se reincarca la fiecare seed | `getOrCreateMediaWithStats()` cu retry | [#2](#2-media-reuse-in-r2) |
| MongoDB write conflicts | Retry logic cu exponential backoff | [#3](#3-retry-logic-mongodb) |
| Link field cu reference | Structura corecta pentru seeder | [#4](#4-link-field-reference) |
| Header itemType obligatoriu | `itemType: 'link'` sau `'linkWithSubItems'` | [#5](#5-header-navitems-structure) |
| Footer content types | `'links' | 'text' | 'contact' | 'schedule'` | [#6](#6-footer-column-types) |
| RichText null check | Verifica existenta `root` | [#7](#7-richtext-null-check) |
| Globals clearing specific | Specific data per global, nu generic | [#8](#8-globals-clearing) |
| **Diacritice in campuri logice** | **EVITA diacritice in alt, labels, slug** | [#9](#9-evita-diacritice) |
| **Imagini pentru seed** | **Repo public seed-assets** | [#10](#10-seed-assets-repo) |
| **Promise.all + req = conflict** | **Secvential sau fara req** | [#12](#12-mongodb-transaction-conflicts-cu-promiseall) |

---

## Session 1: Seed System Refactoring (2024-12-01)

### #1 Seed Data Centralizat

**Problemă:** Datele de seed erau împrăștiate în `index.ts` (1337 linii), greu de modificat pentru clienți noi.

**Soluție:** Fișier `seed-data.ts` centralizat cu toate datele configurabile:

```typescript
// src/endpoints/seed/seed-data.ts

// Business data
export const businessData = {
  name: 'Transilvania Fitness',
  tagline: 'Transformă-ți corpul și mintea',
  address: 'Str. Moților nr. 54, Cluj-Napoca',
  phone: '+40 264 123 456',
  email: 'contact@transilvaniagym.ro',
  // ...
}

// Theme
export const themeData = {
  primaryColor: '#f13a11',
  darkColor: '#171819',
  // ...
}

// IMAGE_BASE_URL centralizat
export const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/.../seed/'

// Team members, classes, abonamente - toate într-un singur loc
export const teamMembersData = [...]
export const classesData = [...]
export const abonamentsData = [...]
```

**Beneficii:**
- Un singur fișier de modificat pentru client nou
- `index.ts` redus de la 1337 la ~780 linii
- Configurare clară și documentată

---

### #2 Media Reuse în R2

**Problemă:** La fiecare seed, media se șterge și se reîncarcă - lent și consumă bandwidth.

**Soluție:**
1. **NU șterge media** din collections array
2. Funcția `getOrCreateMediaWithStats()` care:
   - Caută întâi după `alt` text (mai fiabil pentru seed)
   - Fallback la `filename` cu `contains` (pentru fișiere redenumite)
   - Doar dacă nu există, uploadează
   - Returnează statistici (reused/uploaded)

```typescript
// Collections - NU include media!
const collections: CollectionSlug[] = [
  'categories',
  // 'media', // REMOVED - files stay in R2
  'pages',
  'posts',
  // ...
]

// Funcția cu statistici
async function getOrCreateMediaWithStats(
  payload: Payload,
  req: PayloadRequest,
  { filename, url, alt }: { filename: string; url: string; alt: string },
  retryCount = 0,
): Promise<{ media: Media; reused: boolean }> {
  // 1. Caută după alt (cel mai fiabil)
  const existingByAlt = await payload.find({
    collection: 'media',
    req,
    where: { alt: { equals: alt } },
    limit: 1,
  })
  if (existingByAlt.docs.length > 0) {
    return { media: existingByAlt.docs[0], reused: true }
  }

  // 2. Fallback: filename contains (pentru renamed files)
  const baseFilename = filename.replace(/\.[^.]+$/, '')
  const existingByFilename = await payload.find({
    collection: 'media',
    req,
    where: { filename: { contains: baseFilename } },
    limit: 1,
  })
  if (existingByFilename.docs.length > 0) {
    return { media: existingByFilename.docs[0], reused: true }
  }

  // 3. Upload nou
  const fileBuffer = await fetchFileByURL(url)
  const newMedia = await payload.create({
    collection: 'media',
    req,
    data: { alt },
    file: fileBuffer,
  })
  return { media: newMedia, reused: false }
}
```

---

### #3 Retry Logic MongoDB

**Problemă:** `WriteConflict` errors la seed când multe operații rulează în paralel.

**Soluție:** Retry cu exponential backoff:

```typescript
async function getOrCreateMediaWithStats(
  // ...params
  retryCount = 0,
): Promise<{ media: Media; reused: boolean }> {
  const MAX_RETRIES = 3

  try {
    // ... operații media
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('WriteConflict') && retryCount < MAX_RETRIES) {
      payload.logger.info(`  → Write conflict, retrying (${retryCount + 1}/${MAX_RETRIES})...`)
      await sleep(500 * (retryCount + 1)) // Exponential backoff: 500ms, 1000ms, 1500ms
      return getOrCreateMediaWithStats(payload, req, { filename, url, alt }, retryCount + 1)
    }
    throw error
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

---

### #4 Link Field Reference

**Problemă:** Link fields cu `type='reference'` nu funcționează corect în seeder.

**Soluție corectă:**
```typescript
// CORECT - pentru type='reference'
{
  type: 'reference',
  label: 'Text Afișat',
  reference: {
    relationTo: 'pages',      // sau 'clase', 'team-members', etc.
    value: documentId,        // String ID al documentului
  },
}

// GREȘIT - url e ignorat pentru type='reference'
{
  type: 'reference',
  label: 'Text',
  url: '/contact',  // NU funcționează!
}

// CORECT - pentru type='custom'
{
  type: 'custom',
  label: 'Text',
  url: '/contact',
}
```

---

### #5 Header navItems Structure

**Problemă:** Header items fără `itemType` nu funcționează.

**Soluție:** Structura completă pentru header:

```typescript
await payload.updateGlobal({
  slug: 'header',
  data: {
    navItems: [
      // Link simplu
      {
        itemType: 'link',  // OBLIGATORIU!
        link: {
          type: 'custom',
          label: 'Acasă',
          url: '/',
        },
      },
      // Link cu submenu
      {
        itemType: 'linkWithSubItems',
        parentLink: {
          type: 'custom',
          label: 'Clase',
          url: '/clase',
        },
        subItems: [
          {
            link: {
              type: 'reference',
              label: 'Yoga',
              reference: { relationTo: 'clase', value: yogaClassId },
            },
          },
        ],
      },
      // Social media icons
      {
        itemType: 'socialMedia',
        socialPlatforms: ['facebook', 'instagram', 'tiktok'],
      },
    ],
  },
})
```

---

### #6 Footer Column Types

**Problemă:** Footer columns au multiple content types cu structuri diferite.

**Soluție:** Tipuri disponibile și structura lor:

```typescript
// Type: 'links' - array de link-uri
{
  title: 'Linkuri Rapide',
  contentType: 'links',
  links: [
    { link: { type: 'custom', label: 'Despre', url: '/despre' } },
  ],
}

// Type: 'text' - items cu icon și text
{
  title: 'Servicii',
  contentType: 'text',
  textItems: [
    { icon: 'check', text: 'Antrenament Personal' },
  ],
}

// Type: 'contact' - preia automat din BusinessInfo global
{
  title: 'Contact',
  contentType: 'contact',
  // Nu necesită date - se preiau din BusinessInfo
}

// Type: 'schedule' - preia automat din BusinessInfo global
{
  title: 'Program',
  contentType: 'schedule',
  // Nu necesită date - se preiau din BusinessInfo
}
```

---

### #7 RichText Null Check

**Problemă:** `<RichText data={content} />` crapă dacă content e null/undefined.

**Soluție:** Verifică existența `root`:

```typescript
{content &&
  typeof content === 'object' &&
  'root' in content && (
    <div className="prose max-w-none">
      <RichText data={content} />
    </div>
  )}
```

---

### #8 Globals Clearing

**Problemă:** La seed, globals trebuie curățate specific, nu generic.

**Soluție:** Clearing specific per global:

```typescript
await Promise.all([
  payload.updateGlobal({
    slug: 'header',
    data: { navItems: [] },  // Header are navItems
    depth: 0,
    context: { disableRevalidate: true },
  }),
  payload.updateGlobal({
    slug: 'footer',
    data: { companyInfo: {}, columns: [], bottomBar: {} },  // Footer are altă structură
    depth: 0,
    context: { disableRevalidate: true },
  }),
  payload.updateGlobal({
    slug: 'theme',
    data: { primaryColor: '', darkColor: '', lightColor: '', textColor: '', surfaceColor: '' },
    depth: 0,
    context: { disableRevalidate: true },
  }),
  // etc.
])
```

---

## Componente Copiate din Template-2 (Best Practices)

### Structură recomandată pentru proiecte noi:

```bash
# Globals configurabile
src/Theme/           # Culori și teme
src/BusinessInfo/    # Date business (contact, program, social)
src/Header/          # Header cu suport pentru dropdown și social
src/Footer/          # Footer flexibil cu multiple column types
src/Logo/            # Logo text sau imagine

# Componente reutilizabile
src/components/ui/           # ShadCN components
src/components/SocialIcons/  # Iconuri social media
src/components/UniversalCard/ # Card generic pentru orice tip

# Blocks
src/blocks/MapBlock/         # Google Maps embed
src/blocks/ContactInfoBlock/ # Info contact cu iconuri

# Utilities
src/utilities/cardAdapters.ts     # Adapters pentru UniversalCard
src/utilities/getCollectionUrl.ts # URL routing per collection
```

---

## URL Routing pentru Colecții

| Collection | URL Pattern | Exemplu |
|------------|-------------|---------|
| pages | `/{slug}` | `/contact` |
| posts | `/posts/{slug}` | `/posts/yoga-benefits` |
| clase | `/clase/{slug}` | `/clase/yoga-incepatori` |
| team-members | `/team-members/{slug}` | `/team-members/maria-ionescu` |
| abonamente | `/abonamente` (listing) | N/A |

**Fișier central:** `src/utilities/getCollectionUrl.ts`

---

## Environment Variables

```env
# Database
DATABASE_URI=mongodb://...

# Payload
PAYLOAD_SECRET=...

# Storage (Cloudflare R2)
R2_BUCKET=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_ENDPOINT=...

# Optional: Email
RESEND_API_KEY=...
```

---

## Seed Statistics Output

După refactoring, seeder-ul afișează statistici:

```
╔════════════════════════════════════════════════════════════╗
║           TRANSILVANIA FITNESS - SEED DATABASE             ║
╚════════════════════════════════════════════════════════════╝
— Clearing collections and globals...
— Seeding media (reusing existing files from R2)...
  → Reusing existing media (by alt): Post image 1
  → Uploading new media: image-new.webp
...
╔════════════════════════════════════════════════════════════╗
║                    SEED COMPLETE                           ║
╠════════════════════════════════════════════════════════════╣
║  Media reused from R2:       3                            ║
║  Media uploaded to R2:       1                            ║
║  Team members created:       3                            ║
║  Classes created:            3                            ║
║  Abonaments created:         8                            ║
║  Posts created:              3                            ║
║  Pages created:              2                            ║
╚════════════════════════════════════════════════════════════╝
```

---

---

## Session 2: Image Assets & Diacritics (2024-12-01)

### #9 Evita Diacritice

**Problema:** Diacriticele romanesti (ă, â, î, ș, ț) pot cauza probleme in matching/lookup.

**Regula:** NICIODATA diacritice in campuri care afecteaza logica:

```typescript
// ❌ GRESIT - diacritice in alt (afecteaza matching)
{ alt: 'Clasă de yoga în grup - stretching și relaxare' }

// ✅ CORECT - fara diacritice in campuri operative
{ alt: 'Clasa de yoga in grup - stretching si relaxare' }

// ❌ GRESIT - diacritice in labels
labels: { singular: 'Postare', plural: 'Postări' }

// ✅ CORECT
labels: { singular: 'Postare', plural: 'Postari' }
```

**Unde sa EVITI diacritice:**
- `alt` text pentru imagini
- `labels` in Payload collections
- `slug` fields
- `filename` values
- Orice camp folosit pentru filtering/searching

**Unde sunt OK diacritice:**
- Rich text content / descrieri
- Text afisat utilizatorilor
- Body content pentru blog posts

---

### #10 Seed Assets Repo

**Problema:** Repository privat = URL-uri pentru imagini nu functioneaza in seeder.

**Solutia:** Repository public separat pentru seed assets.

```
Repository: https://github.com/MihaiBarascu/seed-assets
Structura:
seed-assets/
├── transilvania-fitness/
│   ├── trainers/
│   │   ├── trainer-male-1.jpg
│   │   ├── trainer-female-1.jpg
│   │   └── trainer-male-2.jpg
│   ├── classes/
│   │   ├── yoga-class-1.jpg
│   │   ├── crossfit-battle-ropes.jpg
│   │   └── ...
│   ├── hero/
│   │   └── gym-barbell-dark.jpg
│   └── blog/
├── [alte-proiecte]/
└── README.md
```

**Configurare in seed-data.ts:**
```typescript
// IMPORTANT: Verifica branch-ul repo-ului (master vs main)
export const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/MihaiBarascu/seed-assets/master/transilvania-fitness/'

export const blogImages = [
  { filename: 'trainers/trainer-male-1.jpg', alt: 'Antrenor masculin fitness' },
  { filename: 'classes/yoga-class-1.jpg', alt: 'Clasa de yoga in grup' },
]
```

**ATENTIE:** Verifica branch-ul default al repo-ului (`master` sau `main`) - 404 daca e gresit!

**Beneficii:**
- Reutilizabil pentru toate proiectele
- Proiectul principal ramane privat
- GitHub raw URLs sunt fiabile
- Version controlled

---

### #11 Unsplash Download Process

**Pentru a descarca imagini de calitate de pe Unsplash:**

1. **Navigheaza** cu Playwright MCP pe unsplash.com/s/photos/[search-term]
2. **Click pe imagine** pentru detalii
3. **Verifica "Download free"** (NU Unsplash+)
4. **Ia photo ID** din URL: `unsplash.com/photos/[PHOTO_ID]`

**Comanda download:**
```bash
curl -L -o [cale-locala].jpg "https://unsplash.com/photos/[PHOTO_ID]/download?force=true"
```

**Verifica descarcarea:**
```bash
ls -la [cale]  # Fisiere calitate: 1-5MB
```

---

### #12 MongoDB Transaction Conflicts cu Promise.all

**Problema:** Eroare `NoSuchTransaction` cand folosesti `Promise.all` cu `req` in operatii paralele.

```
MongoServerError: Given transaction number 11 on session ...
does not match any in-progress transactions.
The active transaction number is 10
```

**Cauza:** MongoDB transactions nu suporta operatii paralele in acelasi session. Cand pasezi `req` la `Promise.all`, toate operatiile incearca sa foloseasca aceeasi tranzactie simultan.

**Solutia:** Ruleaza operatiile secvential SAU elimina `req` daca nu e necesar:

```typescript
// ❌ GRESIT - Conflict de tranzactie
await Promise.all([
  payload.update({ id: post1.id, req, ... }),
  payload.update({ id: post2.id, req, ... }),
  payload.update({ id: post3.id, req, ... }),
])

// ✅ CORECT - Secvential (cu req daca e nevoie)
await payload.update({ id: post1.id, req, ... })
await payload.update({ id: post2.id, req, ... })
await payload.update({ id: post3.id, req, ... })

// ✅ CORECT - Paralel fara req (daca nu e nevoie de tranzactie)
await Promise.all([
  payload.update({ id: post1.id, ... }),
  payload.update({ id: post2.id, ... }),
  payload.update({ id: post3.id, ... }),
])
```

**Cand ai nevoie de `req`:**
- Crearea documentelor principale (posts, pages)
- Operatii care trebuie sa fie atomice

**Cand NU ai nevoie de `req`:**
- Update-uri secundare (related posts, metadata)
- Operatii care pot esua independent

---

## De Adaugat in Sesiuni Viitoare

- [ ] Live Preview configuration
- [ ] Form Builder best practices
- [ ] SEO plugin configuration
- [ ] Image optimization (WebP/AVIF)
- [ ] Deployment checklist
- [x] Seed assets repo pattern
- [x] Diacritics best practices
- [x] MongoDB transaction conflicts
