# Seed System - Transilvania Fitness

> **Ghid complet pentru sistemul de seeding al bazei de date**

---

## Arhitectură

```
src/endpoints/seed/
├── seed-data.ts      # ← CONFIGURARE CLIENT (editezi doar ăsta!)
├── index.ts          # Logică seed (nu modifici pentru client nou)
├── home.ts           # Homepage blocks
├── contact-page.ts   # Contact page
├── contact-form.ts   # Contact form fields
├── service-*.ts      # Service posts (yoga, crossfit, cardio)
├── image-*.ts        # Image metadata
```

---

## Workflow Client Nou

### 1. Editează `seed-data.ts`

```typescript
// ============ BUSINESS DATA ============
export const businessData = {
  name: 'Numele Sălii',           // ← Schimbă
  tagline: 'Sloganul',            // ← Schimbă
  address: 'Adresa completă',     // ← Schimbă
  phone: '+40 xxx xxx xxx',       // ← Schimbă
  email: 'contact@email.ro',      // ← Schimbă
  // ... restul
}

// ============ TEMA ============
export const themeData = {
  primaryColor: '#f13a11',        // ← Culoarea accent
  darkColor: '#171819',           // ← Background dark
  // ...
}

// ============ IMAGINI ============
export const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/USER/REPO/main/...'
// ↑ Schimbă cu repo-ul clientului
```

### 2. Rulează Seed

```bash
# Din admin panel
http://localhost:3000/admin → "Seed your database"

# Sau din terminal
pnpm seed
```

### 3. Verifică Output

```
╔════════════════════════════════════════════════════════════╗
║                    SEED COMPLETE                           ║
╠════════════════════════════════════════════════════════════╣
║  Media reused from R2:       4                            ║
║  Media uploaded to R2:       0                            ║
║  Team members created:       3                            ║
║  Classes created:            3                            ║
║  Abonaments created:         8                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## Structura `seed-data.ts`

### Business Data

```typescript
export const businessData = {
  // Identitate
  name: 'Transilvania Fitness',
  tagline: 'Transformă-ți corpul și mintea',

  // Contact
  address: 'Str. Moților nr. 54, Cluj-Napoca, România',
  phone: '+40 264 123 456',
  email: 'contact@transilvaniagym.ro',
  whatsapp: '+40 264 123 456',

  // Social Media (lasă gol dacă nu există)
  facebook: 'https://facebook.com/...',
  instagram: 'https://instagram.com/...',
  tiktok: 'https://tiktok.com/@...',
  youtube: '',
  linkedin: '',
  twitter: '',

  // Program lucru
  workingHours: [
    { days: 'Luni - Vineri', hours: '07:00 - 22:00' },
    { days: 'Sâmbătă', hours: '08:00 - 20:00' },
    { days: 'Duminică', hours: '09:00 - 18:00' },
  ],

  // Google Maps
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=...',
  googleMapsLink: 'https://goo.gl/maps/...',
}
```

### Theme Data

```typescript
export const themeData = {
  primaryColor: '#f13a11',    // Accent (butoane, link-uri)
  darkColor: '#171819',       // Background dark
  lightColor: '#ffffff',      // Text pe dark
  textColor: '#666262',       // Text secundar
  surfaceColor: '#f9f9f9',    // Card backgrounds
}
```

### Images

```typescript
// Base URL - toate imaginile relative la acest path
export const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/USER/REPO/main/src/endpoints/seed/'

// Blog/post images
export const blogImages = [
  { filename: 'image-post1.webp', alt: 'Post image 1' },
  { filename: 'image-post2.webp', alt: 'Post image 2' },
  { filename: 'image-post3.webp', alt: 'Post image 3' },
]

// Hero images
export const heroImages = [
  { filename: 'image-hero1.webp', alt: 'Hero image' },
]
```

### Team Members

```typescript
export const teamMembersData = [
  {
    title: 'Alexandru Popescu',
    slug: 'alexandru-popescu',
    role: 'Antrenor Principal & Fondator',
    excerpt: 'Cu peste 15 ani de experiență...',
    imageIndex: 0,  // Index în blogImages array
    experience: 15,
    specializations: [
      { name: 'Culturism' },
      { name: 'Powerlifting' },
    ],
    socialMedia: {
      instagram: 'https://instagram.com/...',
      facebook: 'https://facebook.com/...',
    },
    contact: {
      email: 'alexandru@sala.ro',
      phone: '+40 722 333 444',
    },
  },
  // ... alți membri
]
```

### Classes

```typescript
export const classesData = [
  {
    title: 'Yoga pentru Începători',
    slug: 'yoga-incepatori',
    imageIndex: 0,
    description: 'Clasă de yoga perfectă pentru...',
    category: 'mind-body',     // 'mind-body' | 'strength' | 'cardio' | 'flexibility'
    difficulty: 'beginner',    // 'beginner' | 'intermediate' | 'advanced'
    duration: 60,              // minute
    trainerIndex: 1,           // Index în teamMembersData
    capacity: 20,
    schedule: [
      { day: 'monday', time: '18:00' },
      { day: 'wednesday', time: '18:00' },
    ],
    price: {
      dropIn: 50,
      monthly: 350,
      package: { sessions: 10, price: 400 },  // opțional
    },
    benefits: [
      { benefit: 'Îmbunătățește flexibilitatea' },
      { benefit: 'Reduce stresul' },
    ],
    requirements: 'Saltea de yoga, prosop, sticlă de apă',
  },
]
```

### Abonamente

```typescript
export const abonamentsData = [
  {
    title: 'Premium',
    subtitle: 'Cel mai popular',
    type: 'gym',  // 'gym' | 'spa' | 'solar' | 'fitness-spa'
    imageIndex: 1,
    price: {
      amount: 250,
      period: '/lună',
      oldPrice: 300,  // opțional - pentru reduceri
    },
    features: [
      { text: 'Acces nelimitat la sală', included: true },
      { text: 'Antrenor personal', included: false },
    ],
    cta: {
      label: 'Alege Premium',
      linkType: 'custom',
      url: '/contact',
    },
    highlighted: true,
    highlightLabel: 'Popular',  // doar dacă highlighted: true
    order: 2,
  },
]
```

### Footer Data

```typescript
export const footerData = {
  description: 'Descrierea companiei pentru footer...',
  columns: [
    {
      title: 'Linkuri Rapide',
      contentType: 'links',
      links: [
        { label: 'Despre Noi', url: '/despre' },
        { label: 'Clase', url: '/clase' },
      ],
    },
    {
      title: 'Servicii',
      contentType: 'text',
      textItems: [
        { icon: 'check', text: 'Antrenament Personal' },
      ],
    },
    { title: 'Contact', contentType: 'contact' },
    { title: 'Program', contentType: 'schedule' },
  ],
  legalLinks: [
    { label: 'Confidențialitate', url: '/confidentialitate' },
    { label: 'ANPC', url: 'https://anpc.ro/', newTab: true },
  ],
}
```

### Header Navigation

```typescript
export const headerNavigation = {
  mainLinks: [
    { label: 'Acasă', url: '/', type: 'custom' },
    { label: 'Abonamente', url: '/abonamente', type: 'custom' },
    { label: 'Echipa', url: '/team-members', type: 'custom' },
    { label: 'Contact', url: '/contact', type: 'custom' },
  ],
  classesDropdown: {
    label: 'Clase',
    url: '/clase',
    // subItems populat automat din classesData
  },
  socialPlatforms: ['facebook', 'instagram', 'tiktok'],
}
```

---

## Media Management

### Cum funcționează

1. **Media NU se șterge** la reseed - fișierele rămân în R2
2. Seeder-ul caută întâi media existentă:
   - După `alt` text (primar)
   - După `filename` contains (fallback)
3. Doar dacă nu există, uploadează

### Statistici

```
Media reused from R2:       4    ← Fișiere deja existente
Media uploaded to R2:       1    ← Fișiere noi uploadate
```

### Retry Logic

Dacă apare `WriteConflict` (MongoDB), seeder-ul reîncearcă automat:
- Max 3 încercări
- Exponential backoff: 500ms → 1000ms → 1500ms

---

## Troubleshooting

### "Media not found" după seed

**Cauză:** `alt` text s-a schimbat în seed-data.ts dar fișierul existent are alt vechi.

**Soluție:**
1. Șterge manual media din admin panel
2. Rulează seed din nou

### "WriteConflict" persistent

**Cauză:** Prea multe operații paralele pe MongoDB.

**Soluție:** Seed-ul are retry logic built-in, dar dacă persistă:
1. Șterge baza de date
2. Rulează `pnpm seed` din terminal (nu din admin)

### Imagini noi nu apar

**Cauză:** URL-urile imaginilor nu sunt accesibile.

**Soluție:**
1. Verifică `IMAGE_BASE_URL` în seed-data.ts
2. Asigură-te că imaginile sunt pe GitHub/CDN public
3. Testează URL-urile manual în browser

---

## Best Practices

1. **Editează doar `seed-data.ts`** pentru clienți noi
2. **Păstrează `alt` text consistent** - e folosit pentru identificare
3. **Folosește `imageIndex`** pentru a reutiliza imagini
4. **Testează local** înainte de deploy
5. **Verifică statisticile** după seed pentru a confirma că media e refolosită
