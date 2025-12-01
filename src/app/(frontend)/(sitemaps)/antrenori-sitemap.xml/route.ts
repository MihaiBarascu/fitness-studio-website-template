import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getAntrenoriSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://transilvaniafitness.ro'

    const results = await payload.find({
      collection: 'antrenori',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((antrenor) => Boolean(antrenor?.slug))
          .map((antrenor) => ({
            loc: `${SITE_URL}/antrenori/${antrenor?.slug}`,
            lastmod: antrenor.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['antrenori-sitemap'],
  {
    tags: ['antrenori-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getAntrenoriSitemap()

  return getServerSideSitemap(sitemap)
}
