# fitness-studio-website-template

A fully functional **Payload CMS website template** for gyms, fitness studios, and wellness businesses. Built with Next.js App Router, Tailwind CSS, and shadcn/ui.

## Overview

A production-ready Payload CMS website template tailored for fitness studios. It preserves all Payload core logic while providing a clean, customizable design through global Tailwind configuration.

## Tech Stack

- [Payload CMS](https://payloadcms.com) — headless CMS and backend
- [Next.js App Router](https://nextjs.org) — frontend framework
- [TypeScript](https://www.typescriptlang.org) — type safety throughout
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com) — accessible UI components
- [PostgreSQL](https://www.postgresql.org) — database

## Features

- Pre-configured Payload collections: Pages, Posts, Media, Categories, Users
- Globals: Header (with navigation and social links), Footer (dynamic multi-column layout)
- Layout builder with blocks: Hero, Content, Media, Call To Action, Archive
- Draft preview and live preview
- On-demand revalidation via Next.js
- SEO plugin integration
- Search plugin integration
- Redirects plugin
- Scheduled publishing with jobs queue
- Authentication and access control
- Dark mode support

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (required — do not use npm or yarn)
- PostgreSQL database

### Setup

1. Clone the repository:

   ```bash
   git clone <repo-url> my-project
   cd my-project
   ```

2. Copy the environment variables:

   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` file with your database connection string and other required variables.

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

Follow the on-screen instructions to create your first admin user.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   └── (frontend)/       # Public-facing frontend
├── blocks/               # Payload layout blocks (Hero, CTA, etc.)
├── collections/          # Payload collections (Pages, Posts, Media, etc.)
├── globals/              # Payload globals (Header, Footer)
├── endpoints/            # Custom API endpoints and seed scripts
└── payload.config.ts     # Main Payload configuration
```

## Collections

- **Users** — Admin users with access to the Payload admin panel
- **Pages** — Layout-builder enabled pages with draft support
- **Posts** — Blog posts and news articles with draft support
- **Media** — Images, videos, and other file uploads with focal point support
- **Categories** — Taxonomy for grouping posts (supports nesting)

## Globals

- **Header** — Navigation links and social media icons
- **Footer** — Multi-column layout with links, contact info, schedule, and compliance logos

## Access Control

- `users` — Can access the admin panel and create or edit all content
- `posts` — Published posts are publicly accessible; create/update/delete requires authentication
- `pages` — Published pages are publicly accessible; create/update/delete requires authentication

## Database

This template uses PostgreSQL. For local development, the adapter runs with `push: true` by default, so schema changes are applied automatically without migrations.

### Running Migrations

Create a migration after schema changes:

```bash
pnpm payload migrate:create
```

Apply pending migrations:

```bash
pnpm payload migrate
```

## Seeding the Database

To populate the database with demo content, click the **Seed Database** link in the Payload admin panel.

> **Warning:** Seeding is destructive. It will drop and recreate your database with fresh demo data. Only run this on a new or disposable database.

Demo credentials created by the seeder:

- **Email:** `demo-author@payloadcms.com`
- **Password:** `password`

## Docker

You can also run the project with Docker:

1. Ensure your `.env` file is configured (Docker Compose will use it automatically)
2. Run:

   ```bash
   docker-compose up
   ```

3. Open [http://localhost:3000](http://localhost:3000) and create your admin user

## Production Build

1. Build the application:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   pnpm start
   ```

## Deploying to Vercel

Install the Vercel Postgres adapter:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
})
```

For file storage, use the Vercel Blob adapter:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
```

## Self-Hosting

You can deploy this app on any platform that supports Node.js or Next.js, such as a VPS, DigitalOcean App Platform, or Coolify. See the [Payload deployment docs](https://payloadcms.com/docs/production/deployment) for full details.

## Questions and Support

- [Payload Discord](https://discord.com/invite/payload)
- [GitHub Discussions](https://github.com/payloadcms/payload/discussions)
