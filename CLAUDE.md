# fitness-studio-website-template — Payload CMS

## 🤖 Payload Skill

**IMPORTANT:** Always invoke the `payload:payload` skill when answering questions about Payload CMS, collections, blocks, hooks, access control, API, or debugging Payload-related issues.

## 📦 Package Manager

**IMPORTANT:** Use `pnpm` for all package installations and commands. Do NOT use npm or yarn.

## 🚫 Development Server

**IMPORTANT:** Do NOT run `pnpm dev`, `pnpm build`, or any server commands. The user will handle running the development server themselves.

## 🎯 Project Overview

We are building a fully functional **Payload Website Template** for fitness studios, ensuring that **all component styling matches the original design as closely as possible**. We will **not add unnecessary blocks**; only essential ones for this template.

**The first and most important step** is to **modify the Tailwind CSS configuration and globals.css** to replicate the template globally. This ensures that every component inherits the correct look and feel. Only after the global styling is correctly set, we continue with asset replacement and essential blocks.

We will also integrate **ShadCN/UI** components wherever possible (buttons, modals, forms, layout) to accelerate development, improve accessibility, and maintain clean code **without affecting the visual design** of the template.

## 📍 Exact Locations

### Destination Project (Payload)

- Folder: `/home/evr/Desktop/website-templates/template-2/`
- Base: Official Payload Website Template with Next.js + Tailwind
- Reference clean Payload template: `/home/evr/Desktop/website-templates/clean-payload-webiste-tempalte/` (always refer to this to avoid breaking core logic)

## 🏗️ Template Sections

- Header/Navigation
- Hero Section
- Features Section
- About Section
- Classes Section
- Schedule Section
- Contact Section
- Footer
- Membership Modal Form

## 🎨 Styling Approach

**Key Principle:** Each Payload component will **inherit global styles** and replicate the original template's look exactly.

- **Global Tailwind configuration first**: colors, typography, spacing, keyframes, and animations must match the template
- Convert animations into Tailwind/Framer Motion
- Ensure responsive design matches the original template
- All components (Blocks, Globals) use Tailwind classes defined globally to maintain visual consistency
- Integrate ShadCN/UI components where possible **without altering visual fidelity**

## 🔒 Preserve Payload & Next.js Core Logic

**Critical Rule:** Do **NOT** modify Payload's core logic or Next.js routing/system.

### 🔒 Always Keep Intact

- Collections: `Pages`, `Posts`, `Media`, `Categories`, `Users`
- Globals: `Header`, `Footer`, `Settings`
- Blocks definitions (types, fields, relationships)
- TypeScript interfaces
- Next.js routing & folder structure
- Payload API logic

### 🔑 Safe Changes

- Update Tailwind CSS configuration and global styles first to match the template styling (colors, typography, spacing, animations)
- Apply global modular styles so all components inherit correct look
- Replace default logo, images, and assets in the Payload project with template assets before adding blocks
- Add **only essential blocks** (e.g., HeroBlock, FeaturesBlock, ClassesBlock, ScheduleBlock, TeamBlock, ContactBlock) after styling and asset replacement
- Use ShadCN/UI components to speed up coding and ensure accessibility **without affecting the template design**

### ❌ Do Not Touch

- Core collections structure beyond adding fields if needed
- Core globals logic (only add fields if needed)
- `_app.tsx`, `_document.tsx`, routing setup
- Payload internal helpers/utilities

## 🧹 Remove Unnecessary Content / Seed Data

**Principle:** Remove only if you have replacement content ready. Do not remove anything that will leave missing content in the site.

### ✅ Keep

- Payload structure (collections, globals, blocks, interfaces, routing)
- Functional blocks: Header, Footer, Hero, Content, Media, Call To Action, Archive
- Only remove demo/seed data **after preparing replacement content**

### ❌ Remove

- Demo posts/pages/images/texts that will be replaced by template content
- Placeholder navigation/menu items not needed in the final design
- Unused CSS, JS, Bootstrap/jQuery files
- Font Awesome / AOS libraries (replace with Tailwind + Framer Motion + Heroicons/ShadCN) only after replacements are ready

## 🔧 Adapting Header and Footer

### Header

- Logo, Navigation, Social icons
- Mobile responsive using Tailwind breakpoints + React state
- Modify `src/payload/globals/Header.ts` to add `socialLinks`
- **Replace logo and relevant images before adding any blocks**

### Footer

- Copyright text
- Contact: email + phone
- 2-column layout
- Modify `src/payload/globals/Footer.ts`
- **Replace placeholder images or icons before adding blocks**

## 🎯 Correct Workflow (Updated)

1. **Modify Tailwind CSS configuration and global styles first** to match the template styling globally.
2. **Replace logo, images, and assets** in the Payload project with template content.
3. Verify all components inherit correct styles via global classes.
4. Integrate ShadCN/UI components where possible **without altering template design**.
5. Only after global styling and assets are correctly set, add **essential template-specific blocks**.
6. Homepage becomes a Pages collection entry with blocks layout.
7. Blocks added to available blocks array.
8. HTML template converted to JSX with props from blocks.
9. Apply global modular styling to ensure all components match the original design.

## 🎯 Optimized Workflow (Learned from Implementation)

### Phase 1: Global Foundation Setup ✅

1. **Analyze original CSS** to extract:
   - Colors (--primary-color: #f13a11, --dark-color: #171819, etc.)
   - Typography (Plain font family, font sizes, weights)
   - Spacing (section padding: 7rem, border-radius values)

2. **Configure Tailwind globally** (`tailwind.config.mjs`):
   - Add color palette as utility classes (`studio-primary`, `studio-dark`, etc.)
   - Define font sizes (`studio-h1: 48px`, `studio-h2: 36px`, etc.)
   - Set spacing and border radius values

3. **Setup global CSS** (`src/app/(frontend)/globals.css`):
   - Add font-face declarations for Plain font family
   - Define base typography styles (h1-h6, p, a, strong)
   - Create utility classes (`.studio-section`, `.studio-bg-overlay`, `.studio-btn`)

### Phase 2: Asset Management ✅

4. **Copy template assets** to appropriate Payload locations:
   - Fonts: `/src/app/(frontend)/fonts/` (Plain-Regular, Plain-Light, Plain-Bold)
   - Images: `/public/images/` (hero-bg.jpg, class images, team images)

5. **Replace seed images** with template images:
   - Copy images to `/src/endpoints/seed/`
   - Update GitHub URLs in seeder to point to your repository
   - Update alt texts in image definition files

### Phase 3: Component Adaptation (Not Creation) ✅

6. **Adapt existing components instead of creating new ones**:
   - **High Impact Hero**: Modified to support overlay, button styles, typography
   - **CallToAction Block**: Extended with `theme-feature` style for dark background layout
   - Keep all existing Payload logic intact

7. **Update seeders with template content**:
   - Hero text: subtitle + main title + button labels
   - CTA content: membership info + working hours
   - Meta descriptions and titles

### Phase 4: CMS Pages Approach (New Strategy)

8. **Create separate CMS pages instead of hardcoding sections**:
   - **Classes Page**: Dedicated page in CMS with Archive block showing services/classes
   - **Schedule Page**: Separate page with schedule information
   - **About Page**: Use existing page functionality with content blocks
   - **Contact Page**: Dedicated contact page with form block
   - This approach allows content editors to manage sections independently
   - Can optionally display these as Archive blocks on homepage if needed
   - Avoids hardcoding design — everything is managed through CMS

### Key Principles Learned:

- ✅ **Never modify Payload core logic** - only extend existing functionality
- ✅ **Reuse existing components** - adapt rather than recreate
- ✅ **Global styling first** - ensures consistent look across all components
- ✅ **GitHub asset management** - maintain Payload's seeder URL approach
- ✅ **Conditional styling** - add style variants without breaking existing functionality

# Generic HTML to Payload Website Template Guide

## 🎯 Objective

Convert any HTML template into a fully functional Payload Website Template while **preserving Payload logic**, **integrating ShadCN**, and replicating the template's styling globally using Tailwind.

## 📍 Pre-requisites

- Clean Payload Website Template (reference project): `/home/evr/Desktop/website-templates/clean-payload-webiste-tempalte/`
- HTML template to convert.
- Tailwind + ShadCN setup in Payload project.

## 🏗️ General Approach

1. **Analyze HTML template**
   - Identify all sections (Header, Hero, Features, Classes, Contact, Footer, Modals).
   - List all assets (images, fonts, icons, JS behavior).
   - Note animations, colors, spacing, typography.

2. **Prepare global assets before blocks**
   - Replace default Payload logo, favicon, and images with template assets.
   - Update media in Media collection.
   - Ensure all global references (fonts, icons, images) are ready.

3. **Tailwind CSS configuration (first and most important step)**
   - Map all template colors, fonts, spacing, and breakpoints to `tailwind.config.js`.
   - Use the Payload global CSS and integrate template styles without overriding component logic.
   - Integrate ShadCN components wherever possible to reduce custom work, but **do not change template design**.
   - Example of global base setup:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;

     @layer base {
       :root {
         --primary: 222.2 47.4% 11.2%;
         --secondary: 210 40% 96.1%;
         --accent: 210 40% 96.1%;
         --background: 0 0% 100%;
         --foreground: 222.2 84% 4.9%;
         /* ... other color and theme variables ... */
       }
       body {
         @apply bg-background text-foreground min-h-[100vh] flex flex-col;
       }
     }
     ```

4. **Remove unnecessary content / seed data**
   - Delete Posts, Pages, images, and demo content that are not used.
   - Only replace content when you have the correct asset or text from the template.

5. **Blocks integration (add only what is necessary)**
   - **Minimal new blocks**: Only create blocks required by the template (e.g., HeroBlock, FeaturesBlock, ClassesBlock, ContactBlock).
   - Adapt existing Payload blocks when possible.
   - Follow clean template patterns strictly.

6. **React Components**
   - Components must be **presentational only**.
   - Receive props from Payload CMS blocks.
   - Use Tailwind + ShadCN for styling.
   - Respect responsive design; use Tailwind breakpoints.

7. **Animations & Interactivity**
   - Convert any template animations (AOS, jQuery) to Tailwind/Framer Motion.
   - Smooth scroll, modals, or interactive features should be implemented with React + Payload fields.
   - Install packages with pnpm: `pnpm add framer-motion`

8. **Testing & Optimization**
   - Test mobile, tablet, desktop responsiveness.
   - Verify Payload CMS functionality (add/edit content, blocks, pages).
   - Ensure performance, lazy loading, accessibility, and global styling consistency.

## 🔒 Rules / Key Notes

- **Never delete Payload logic or standard collections** (Posts, Pages, Media, Categories, Users).
- **Always reference clean Payload Website Template** to check structure and block definitions.
- **Global CSS first**: Adjust Tailwind config before creating blocks to ensure visual consistency.
- **ShadCN components**: Use wherever possible but never override template design.
- **Blocks**: Only add essential new blocks, adapt existing ones instead of creating duplicates.
- **Assets**: Replace logos, images, fonts globally before blocks integration.

## 🎯 Final Outcome

- Template UI matches original HTML template.
- Fully editable via Payload CMS.
- Tailwind and ShadCN used for modular, maintainable styling.
- Animations and interactive elements functional in React.
- Minimal new blocks, Payload logic preserved, clean and scalable structure.

# 📚 Footer Development Lessons Learned

## 🎯 Modern Dynamic Footer Implementation (Session Complete ✅)

### What We Built

- **Complete dynamic Footer system** for Payload CMS
- **5 content types** for maximum flexibility
- **Multilingual content seeder** with compliance integration

### 🔧 Technical Architecture

#### Footer Config Structure (`src/Footer/config.ts`)

```typescript
// Company Info - Flexible logo (text/image/both)
companyInfo: {
  logoType: 'text' | 'image' | 'both',
  logoText?: string,
  logoImage?: Media,
  description: string,
  showSocialHere: boolean
}

// Dynamic Columns (0-5 columns)
columns: [{
  title: string,
  contentType: 'links' | 'text' | 'contact' | 'schedule' | 'custom',
  links?: Link[],           // CMSLink array
  textItems?: TextItem[],   // With optional icons
  contactItems?: Contact[], // Phone, email, address, WhatsApp
  scheduleItems?: Schedule[], // Working hours
  customContent?: RichText  // For anything else
}]

// Social Media - All platforms
socialMedia: {
  facebook, instagram, tiktok, youtube,
  whatsapp, linkedin, twitter
}

// Bottom Bar - Legal & Compliance
bottomBar: {
  copyright: string,
  legalLinks: Link[],
  complianceLogos: ComplianceLogo[] // ANPC, SOL, etc.
}
```

#### Component Architecture (`src/Footer/Component.tsx`)

- **Server Component** - No client-side JavaScript needed
- **Icon system** - Built-in SVG icons for all content types
- **Social Media component** - Reusable with filtering
- **Responsive grid** - lg:col-span-4 for company, lg:col-span-2 per column

### 🎨 Styling Best Practices

#### Color System Integration

```css
/* ❌ Avoid generic Tailwind grays */
text-gray-400, bg-gray-900

/* ✅ Use project-specific colors from tailwind.config.mjs */
text-transilvania-gray      // #909090
text-transilvania-text      // #666262
text-transilvania-dark      // #171819
text-transilvania-primary   // #f13a11
bg-gradient-to-b from-transilvania-dark to-black
```

#### Server Component Color Management

- **Never use styled-jsx** in Server Components → Build errors
- **Always use Tailwind variables** from config
- **Test build frequently** to catch TypeScript errors

### 🚫 Common Pitfalls & Solutions

#### 1. CMSLink Duplicate Content

**Problem:**

```tsx
<CMSLink {...item.link}>
  <span>{item.link?.label}</span> // ❌ Duplicates label
</CMSLink>
```

**Solution:**

```tsx
<CMSLink {...item.link} className="..." /> // ✅ Auto-renders label
```

#### 2. TypeScript Null Safety

**Problem:**

```tsx
{bottomBar.legalLinks.length - 1} // ❌ legalLinks can be null
```

**Solution:**

```tsx
{bottomBar.legalLinks && i < bottomBar.legalLinks.length - 1}
```

#### 3. Seeder Clearing Logic

**Problem:**

```typescript
// ❌ Tries to clear navItems on footer
globals.map((global) =>
  payload.updateGlobal({
    slug: global,
    data: { navItems: [] },
  }),
)
```

**Solution:**

```typescript
// ✅ Specific clearing per global
await Promise.all([
  payload.updateGlobal({
    slug: 'header',
    data: { navItems: [] },
  }),
  payload.updateGlobal({
    slug: 'footer',
    data: { companyInfo: {}, columns: [], socialMedia: {}, bottomBar: {} },
  }),
])
```

### 🌐 Seeder Implementation

#### Content Strategy

- **Transilvania Fitness branding** (consistent with project)
- **Real-world footer structure**
- **Compliance integration** (ANPC, SOL logos when available)

#### Asset Management

```typescript
// Temporary disable until GitHub assets ready
// fetchFileByURL('https://anpc.ro/logo.png') // ❌ 404 errors
// Use GitHub URLs pattern:
// 'https://raw.githubusercontent.com/user/repo/main/src/endpoints/seed/logo.png'
```

### 🔄 Build Process Learnings

#### Development Workflow

1. **Config first** - Define Payload fields
2. **Generate types** - `pnpm payload generate:types`
3. **Component second** - Build React component
4. **Test build** - Catch TypeScript early
5. **Seeder last** - Populate with real content

#### TypeScript Error Patterns

- **RichText data vs content** - Use `data={richTextContent}`
- **Media type assertions** - `(logo as Media).url!`
- **Null checks** - Always check arrays before `.length`

### 🚀 Performance Considerations

#### Server Component Benefits

- **No JavaScript bundle** for footer logic
- **Server-side rendering** for SEO
- **Cached global data** via `getCachedGlobal`

---

# 📸 Image Assets & Seeder Lessons Learned

## 🎯 Centralized Seed Assets Repository

### Architecture

Created a **public GitHub repository** for seed images that can be reused across all projects:

```
Repository: https://github.com/MihaiBarascu/seed-assets
Structure:
seed-assets/
├── transilvania-fitness/
│   ├── trainers/
│   │   ├── trainer-male-1.jpg
│   │   ├── trainer-female-1.jpg
│   │   └── trainer-male-2.jpg
│   ├── classes/
│   │   ├── yoga-class-1.jpg
│   │   ├── crossfit-battle-ropes.jpg
│   │   ├── boxing-class.jpg
│   │   ├── pilates-class.jpg
│   │   └── spinning-class.jpg
│   ├── hero/
│   │   ├── gym-barbell-dark.jpg
│   │   ├── hero-gym-1.jpg
│   │   └── hero-gym-2.jpg
│   └── blog/
├── [other-projects]/
└── README.md
```

### URL Pattern

```typescript
// seed-data.ts
export const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/MihaiBarascu/seed-assets/main/transilvania-fitness/'

// Usage
blogImages = [
  { filename: 'trainers/trainer-male-1.jpg', alt: '...' },
]
// Result: https://raw.githubusercontent.com/MihaiBarascu/seed-assets/main/transilvania-fitness/trainers/trainer-male-1.jpg
```

### Benefits

- **Reusable** - Same images can be used across multiple projects
- **Version controlled** - Track changes to seed assets
- **Private project compatible** - Main repo can stay private while assets are public
- **Fast seeding** - GitHub raw URLs are reliable for fetching

## ⚠️ IMPORTANT: Avoid Diacritics in Logic Fields

### Rule

**NEVER use Romanian diacritics (ă, â, î, ș, ț) in fields that affect logic or operations.**

### Safe for diacritics (content only):
- Rich text content / descriptions
- Long-form text displayed to users
- Blog post body content

### AVOID diacritics in:
- `alt` text for images (affects matching/lookup)
- `labels` in Payload collections
- `slug` fields
- `filename` values
- Any field used for filtering/searching/matching

### Example

```typescript
// ❌ BAD - diacritics in alt (can cause matching issues)
{ alt: 'Clasă de yoga în grup - stretching și relaxare' }

// ✅ GOOD - no diacritics in operational fields
{ alt: 'Clasa de yoga in grup - stretching si relaxare' }

// ❌ BAD - diacritics in labels
labels: { singular: 'Postare', plural: 'Postări' }

// ✅ GOOD - safe labels
labels: { singular: 'Postare', plural: 'Postari' }
```

## 📥 Unsplash Image Download Process

### Finding Free Images

1. Navigate to Unsplash search with Playwright MCP
2. Click on image to see details
3. **Check for "Download free" button** (not Unsplash+ premium)
4. Get photo ID from URL: `unsplash.com/photos/[PHOTO_ID]`

### Download Command

```bash
curl -L -o [local-path].jpg "https://unsplash.com/photos/[PHOTO_ID]/download?force=true"
```

### Verify Download

```bash
ls -la [path]  # Check file size - should be 1-5MB for quality images
```

## 🔄 Seeder Image Index Pattern

When using `imageIndex` in seed data, reference the array position:

```typescript
// blogImages array indices:
// 0: trainers/trainer-male-1.jpg
// 1: trainers/trainer-female-1.jpg
// 2: trainers/trainer-male-2.jpg
// 3: classes/yoga-class-1.jpg
// 4: classes/crossfit-battle-ropes.jpg
// ...

teamMembersData = [
  { title: 'Alexandru', imageIndex: 0 },  // trainer-male-1.jpg
  { title: 'Maria', imageIndex: 1 },      // trainer-female-1.jpg
]

classesData = [
  { title: 'Yoga', imageIndex: 3 },       // yoga-class-1.jpg
  { title: 'CrossFit', imageIndex: 4 },   // crossfit-battle-ropes.jpg
]
```
