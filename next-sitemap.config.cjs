const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://transilvaniafitness.ro'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/api/*',
    '/next/*',
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/antrenori-sitemap.xml',
    '/clase-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/next/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/antrenori-sitemap.xml`,
      `${SITE_URL}/clase-sitemap.xml`,
    ],
  },
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = []

    // Static pages with higher priority
    result.push({
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/abonamente',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/clase',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/antrenori',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/contact',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })

    result.push({
      loc: '/comanda',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })

    return result
  },
}
