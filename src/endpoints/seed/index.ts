import type { CollectionSlug, File, Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { comandaForm as comandaFormData } from './comanda-form'
import { comanda as comandaPageData } from './comanda-page'
import { home } from './home'
import { serviceCardio } from './service-cardio'
import { serviceCrossfit } from './service-crossfit'
import { serviceYoga } from './service-yoga'

// Import centralized seed data - MODIFY THIS FILE FOR EACH CLIENT
import {
  businessData,
  themeData,
  IMAGE_BASE_URL,
  blogImages,
  heroImages,
  blogCategories,
  teamMembersData,
  classesData,
  abonamentsData,
  scheduleEntries,
  footerData,
  headerNavigation,
  pagesSettings,
} from './seed-data'

// Collections to clear on seed (media is NOT cleared - files stay in R2)
const collections: CollectionSlug[] = [
  'categories',
  // 'media', // REMOVED - don't delete media files from R2
  'pages',
  'posts',
  'antrenori',
  'clase',
  'abonamente',
  'forms',
  'form-submissions',
  'search',
]

// Track seed statistics for final report
interface SeedStats {
  mediaReused: number
  mediaUploaded: number
  teamMembersCreated: number
  classesCreated: number
  abonamentsCreated: number
  postsCreated: number
  pagesCreated: number
  errors: string[]
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Helper function to create Lexical rich text content
 */
const createLexicalContent = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      textFormat: 0,
      children: [
        {
          type: 'text',
          version: 1,
          detail: 0,
          format: 0,
          mode: 'normal' as const,
          style: '',
          text,
        },
      ],
    })),
  },
})

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('╔════════════════════════════════════════════════════════════╗')
  payload.logger.info('║           TRANSILVANIA FITNESS - SEED DATABASE             ║')
  payload.logger.info('║           Configurare din: seed-data.ts                    ║')
  payload.logger.info('╚════════════════════════════════════════════════════════════╝')

  // Initialize statistics
  const stats: SeedStats = {
    mediaReused: 0,
    mediaUploaded: 0,
    teamMembersCreated: 0,
    classesCreated: 0,
    abonamentsCreated: 0,
    postsCreated: 0,
    pagesCreated: 0,
    errors: [],
  }

  // Helper to track media operations
  const trackMediaResult = (result: { reused: boolean }) => {
    if (result.reused) stats.mediaReused++
    else stats.mediaUploaded++
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // Clear globals first
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: { companyInfo: {}, columns: [], bottomBar: {} },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'theme',
      data: { primaryColor: '', darkColor: '', lightColor: '', textColor: '', surfaceColor: '' },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'business-info',
      data: {
        businessName: 'Placeholder',
        tagline: '',
        address: 'Placeholder',
        phone: '',
        email: '',
        whatsapp: '',
        workingHours: [],
        scheduleTitle: '',
        scheduleEntries: [],
        googleMapsEmbed: '',
        googleMapsLink: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        youtube: '',
        linkedin: '',
        twitter: '',
      },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'logo',
      data: { option1: { type: 'text', text: '' }, option2: { type: 'text', text: '' } },
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  // Clear collections (media is NOT cleared - files stay in R2)
  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'demo-author@example.com' } },
  })

  payload.logger.info(`— Seeding media (reusing existing files from R2)...`)

  // Blog/post images - from seed-data.ts
  const blogImageDocs: Media[] = []
  for (const img of blogImages) {
    const result = await getOrCreateMediaWithStats(payload, req, {
      filename: img.filename,
      url: IMAGE_BASE_URL + img.filename,
      alt: img.alt,
    })
    blogImageDocs.push(result.media)
    trackMediaResult(result)
  }
  const [image1Doc, image2Doc, image3Doc] = blogImageDocs

  // Hero images - from seed-data.ts
  payload.logger.info(`— Seeding hero images...`)
  const heroImageDocs: Media[] = []
  for (const img of heroImages) {
    const result = await getOrCreateMediaWithStats(payload, req, {
      filename: img.filename,
      url: IMAGE_BASE_URL + img.filename,
      alt: img.alt,
    })
    heroImageDocs.push(result.media)
    trackMediaResult(result)
  }
  const [imageHomeDoc] = heroImageDocs

  // Create demo author and categories
  const [demoAuthor, categoriesCreated] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    Promise.all(
      blogCategories.map((category) =>
        payload.create({
          collection: 'categories',
          data: {
            title: category,
            slug: category.toLowerCase(),
          },
        }),
      ),
    ),
  ])

  // Find the Classes category
  const classesCategory = categoriesCreated.find((cat) => cat.title === 'Classes')

  payload.logger.info(`— Seeding team members...`)

  // Create team members from seed-data.ts
  const teamMembers = []
  for (const memberData of teamMembersData) {
    try {
      const imageDoc = blogImageDocs[memberData.imageIndex] || image1Doc
      const member = await payload.create({
        collection: 'antrenori',
        req,
        depth: 0,
        data: {
          title: memberData.title,
          slug: memberData.slug,
          role: memberData.role,
          excerpt: memberData.excerpt,
          featuredImage: imageDoc.id,
          experience: memberData.experience,
          specializations: memberData.specializations,
          socialMedia: memberData.socialMedia,
          contact: memberData.contact,
          _status: 'published',
          publishedAt: new Date().toISOString(),
        },
      })
      teamMembers.push(member)
      stats.teamMembersCreated++
      payload.logger.info(`  ✓ Created team member: ${memberData.title}`)
    } catch (error) {
      stats.errors.push(`Team member ${memberData.title}: ${error}`)
      payload.logger.error(`  ✗ Failed to create team member ${memberData.title}: ${error}`)
    }
  }

  payload.logger.info(`— Seeding classes...`)

  // Create classes from seed-data.ts
  const classes = []
  for (const classData of classesData) {
    try {
      const imageDoc = blogImageDocs[classData.imageIndex] || image1Doc
      const trainer = teamMembers[classData.trainerIndex] || teamMembers[0]

      const createdClass = await payload.create({
        collection: 'clase',
        req,
        depth: 0,
        data: {
          title: classData.title,
          slug: classData.slug,
          featuredImage: imageDoc.id,
          description: classData.description,
          category: classData.category,
          difficulty: classData.difficulty,
          duration: classData.duration,
          trainer: trainer?.id,
          capacity: classData.capacity,
          active: true,
          _status: 'published',
          publishedAt: new Date().toISOString(),
          schedule: classData.schedule,
          price: classData.price,
          benefits: classData.benefits,
          requirements: classData.requirements,
          content: createLexicalContent([classData.description]),
        },
      })
      classes.push(createdClass)
      stats.classesCreated++
      payload.logger.info(`  ✓ Created class: ${classData.title}`)
    } catch (error) {
      stats.errors.push(`Class ${classData.title}: ${error}`)
      payload.logger.error(`  ✗ Failed to create class ${classData.title}: ${error}`)
    }
  }

  payload.logger.info(`— Seeding service posts...`)

  // Create service posts
  const yogaData = serviceYoga({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor })
  yogaData.categories = classesCategory ? [classesCategory.id] : []

  const yogaDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: yogaData,
  })
  stats.postsCreated++

  const crossfitData = serviceCrossfit({
    heroImage: image2Doc,
    blockImage: image3Doc,
    author: demoAuthor,
  })
  crossfitData.categories = classesCategory ? [classesCategory.id] : []

  const crossfitDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: crossfitData,
  })
  stats.postsCreated++

  const cardioData = serviceCardio({
    heroImage: image3Doc,
    blockImage: image1Doc,
    author: demoAuthor,
  })
  cardioData.categories = classesCategory ? [classesCategory.id] : []

  const cardioDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: cardioData,
  })
  stats.postsCreated++

  // Update posts with related posts
  await Promise.all([
    payload.update({
      id: yogaDoc.id,
      collection: 'posts',
      data: { relatedPosts: [crossfitDoc.id, cardioDoc.id] },
    }),
    payload.update({
      id: crossfitDoc.id,
      collection: 'posts',
      data: { relatedPosts: [yogaDoc.id, cardioDoc.id] },
    }),
    payload.update({
      id: cardioDoc.id,
      collection: 'posts',
      data: { relatedPosts: [yogaDoc.id, crossfitDoc.id] },
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding comanda form...`)

  const comandaForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: comandaFormData,
  })

  payload.logger.info(`— Seeding abonamente...`)

  // Create abonamente from seed-data.ts
  for (const abonamentData of abonamentsData) {
    try {
      const imageDoc = blogImageDocs[abonamentData.imageIndex] || image1Doc
      await payload.create({
        collection: 'abonamente',
        req,
        depth: 0,
        data: {
          title: abonamentData.title,
          subtitle: abonamentData.subtitle,
          type: abonamentData.type,
          image: imageDoc.id,
          price: abonamentData.price,
          features: abonamentData.features,
          cta: abonamentData.cta,
          highlighted: abonamentData.highlighted,
          highlightLabel: abonamentData.highlightLabel,
          order: abonamentData.order,
          active: true,
        },
      })
      stats.abonamentsCreated++
      payload.logger.info(`  ✓ Created abonament: ${abonamentData.title}`)
    } catch (error) {
      stats.errors.push(`Abonament ${abonamentData.title}: ${error}`)
      payload.logger.error(`  ✗ Failed to create abonament ${abonamentData.title}: ${error}`)
    }
  }

  payload.logger.info(`— Seeding pages...`)

  await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, teamMembers, classes, contactForm }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: comandaPageData({ comandaForm }),
    }),
  ])
  stats.pagesCreated = 3

  payload.logger.info(`— Seeding globals...`)

  // Build footer data structure
  const footerColumns = footerData.columns.map((col) => {
    if (col.contentType === 'links' && 'links' in col) {
      return {
        title: col.title,
        contentType: col.contentType,
        links: col.links.map((l) => ({
          link: { type: 'custom' as const, label: l.label, url: l.url },
        })),
      }
    }
    if (col.contentType === 'text' && 'textItems' in col) {
      return {
        title: col.title,
        contentType: col.contentType,
        textItems: col.textItems,
      }
    }
    return {
      title: col.title,
      contentType: col.contentType,
    }
  })

  await Promise.all([
    // Logo Global
    payload.updateGlobal({
      slug: 'logo',
      data: {
        option1: { type: 'text', text: businessData.name },
        option2: { type: 'text', text: businessData.name },
      },
    }),
    // Header Global
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            itemType: 'link',
            link: { type: 'custom', label: 'Acasă', url: '/' },
          },
          {
            itemType: 'linkWithSubItems',
            parentLink: { type: 'custom', label: headerNavigation.classesDropdown.label, url: headerNavigation.classesDropdown.url },
            subItems: [
              { link: { type: 'custom', label: 'Toate Clasele', url: '/clase' } },
              ...classes.map((c) => ({
                link: {
                  type: 'reference' as const,
                  label: c.title,
                  reference: { relationTo: 'clase' as const, value: c.id },
                },
              })),
            ],
          },
          ...headerNavigation.mainLinks
            .filter((link) => link.url !== '/')
            .map((link) => ({
              itemType: 'link' as const,
              link: { type: 'custom' as const, label: link.label, url: link.url },
            })),
          {
            itemType: 'socialMedia',
            socialPlatforms: [...headerNavigation.socialPlatforms],
          },
        ],
      },
    }),
    // Footer Global
    payload.updateGlobal({
      slug: 'footer',
      data: {
        companyInfo: {
          description: footerData.description,
          showSocialHere: true,
        },
        columns: footerColumns,
        bottomBar: {
          copyright: `© ${new Date().getFullYear()} ${businessData.name}. Toate drepturile rezervate.`,
          legalLinks: footerData.legalLinks.map((l) => ({
            link: { type: 'custom' as const, label: l.label, url: l.url, newTab: l.newTab },
          })),
        },
      },
    }),
    // Theme Global
    payload.updateGlobal({
      slug: 'theme',
      data: themeData,
    }),
    // Business Info Global
    payload.updateGlobal({
      slug: 'business-info',
      data: {
        businessName: businessData.name,
        tagline: businessData.tagline,
        address: businessData.address,
        phone: businessData.phone,
        email: businessData.email,
        whatsapp: businessData.whatsapp,
        workingHours: businessData.workingHours,
        scheduleTitle: 'Orar Săptămânal',
        scheduleEntries: scheduleEntries,
        googleMapsEmbed: businessData.googleMapsEmbed,
        googleMapsLink: businessData.googleMapsLink,
        facebook: businessData.facebook,
        instagram: businessData.instagram,
        tiktok: businessData.tiktok,
        youtube: businessData.youtube,
        linkedin: businessData.linkedin,
        twitter: businessData.twitter,
      },
    }),
    // Pagini Echipa
    payload.updateGlobal({
      slug: 'pagini-echipa',
      data: {
        heroTitle: pagesSettings.echipa.heroTitle,
        heroSubtitle: pagesSettings.echipa.heroSubtitle,
        heroBackground: imageHomeDoc.id,
        columns: pagesSettings.echipa.columns,
        cardType: pagesSettings.echipa.cardType,
        showSpecialization: pagesSettings.echipa.showSpecialization,
        meta: pagesSettings.echipa.meta,
        individualLayout: pagesSettings.echipa.individualLayout,
        showExperience: pagesSettings.echipa.showExperience,
        showSpecializations: pagesSettings.echipa.showSpecializations,
        showContact: pagesSettings.echipa.showContact,
        showSocialMedia: pagesSettings.echipa.showSocialMedia,
        showCTA: pagesSettings.echipa.showCTA,
        showRelatedMembers: pagesSettings.echipa.showRelatedMembers,
        ctaTitle: pagesSettings.echipa.ctaTitle,
        ctaDescription: pagesSettings.echipa.ctaDescription,
        ctaButtonText: pagesSettings.echipa.ctaButtonText,
        ctaSecondaryButtonText: pagesSettings.echipa.ctaSecondaryButtonText,
        relatedMembersTitle: pagesSettings.echipa.relatedMembersTitle,
        relatedMembersCount: pagesSettings.echipa.relatedMembersCount,
      },
    }),
    // Pagini Clase
    payload.updateGlobal({
      slug: 'pagini-clase',
      data: {
        heroTitle: pagesSettings.clase.heroTitle,
        heroSubtitle: pagesSettings.clase.heroSubtitle,
        heroBackground: imageHomeDoc.id,
        showScheduleLink: pagesSettings.clase.showScheduleLink,
        columns: pagesSettings.clase.columns,
        cardType: pagesSettings.clase.cardType,
        meta: pagesSettings.clase.meta,
        individualLayout: pagesSettings.clase.individualLayout,
        showSchedule: pagesSettings.clase.showSchedule,
        showPricing: pagesSettings.clase.showPricing,
        showTrainer: pagesSettings.clase.showTrainer,
        showBenefits: pagesSettings.clase.showBenefits,
        showRequirements: pagesSettings.clase.showRequirements,
        showRelatedClasses: pagesSettings.clase.showRelatedClasses,
        relatedClassesTitle: pagesSettings.clase.relatedClassesTitle,
        relatedClassesCount: pagesSettings.clase.relatedClassesCount,
        ctaButtonText: pagesSettings.clase.ctaButtonText,
      },
    }),
    // Pagini Abonamente
    payload.updateGlobal({
      slug: 'pagini-abonamente',
      data: {
        heroTitle: pagesSettings.abonamente.heroTitle,
        heroSubtitle: pagesSettings.abonamente.heroSubtitle,
        heroBackground: imageHomeDoc.id,
        showFilters: pagesSettings.abonamente.showFilters,
        columns: pagesSettings.abonamente.columns,
        defaultFilter: pagesSettings.abonamente.defaultFilter,
        meta: pagesSettings.abonamente.meta,
      },
    }),
  ])

  // Final summary report
  payload.logger.info('')
  payload.logger.info('╔════════════════════════════════════════════════════════════╗')
  payload.logger.info('║                    SEED COMPLETE                           ║')
  payload.logger.info('╠════════════════════════════════════════════════════════════╣')
  payload.logger.info(`║  Media reused from R2:     ${String(stats.mediaReused).padStart(3)}                            ║`)
  payload.logger.info(`║  Media uploaded to R2:     ${String(stats.mediaUploaded).padStart(3)}                            ║`)
  payload.logger.info(`║  Team members created:     ${String(stats.teamMembersCreated).padStart(3)}                            ║`)
  payload.logger.info(`║  Classes created:          ${String(stats.classesCreated).padStart(3)}                            ║`)
  payload.logger.info(`║  Abonaments created:       ${String(stats.abonamentsCreated).padStart(3)}                            ║`)
  payload.logger.info(`║  Posts created:            ${String(stats.postsCreated).padStart(3)}                            ║`)
  payload.logger.info(`║  Pages created:            ${String(stats.pagesCreated).padStart(3)}                            ║`)
  if (stats.errors.length > 0) {
    payload.logger.info('╠════════════════════════════════════════════════════════════╣')
    payload.logger.info(`║  ERRORS: ${stats.errors.length}                                              ║`)
    stats.errors.forEach((err) => {
      payload.logger.error(`  - ${err}`)
    })
  }
  payload.logger.info('╚════════════════════════════════════════════════════════════╝')
  payload.logger.info('')
  payload.logger.info(`Business: ${businessData.name} - ${businessData.tagline}`)
  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'image/*',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  if (data.byteLength === 0) {
    throw new Error(`Empty response from ${url}`)
  }

  const filename = url.split('/').pop() || `file-${Date.now()}`
  const ext = filename.split('.').pop()?.toLowerCase() || 'jpg'

  // Map extensions to proper MIME types
  const mimeTypes: Record<string, string> = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  }

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: mimeTypes[ext] || `image/${ext}`,
    size: data.byteLength,
  }
}

/**
 * Get existing media by filename/alt, or create new one if not exists
 * Returns both the media and a flag indicating if it was reused (for statistics)
 *
 * Uses alt text for matching first (most reliable for seed data).
 * Falls back to filename contains matching for renamed files.
 *
 * Includes retry logic for MongoDB write conflicts.
 * Passes req for transaction safety (Payload best practice).
 */
async function getOrCreateMediaWithStats(
  payload: Payload,
  req: PayloadRequest,
  {
    filename,
    url,
    alt,
  }: {
    filename: string
    url: string
    alt: string
  },
  retryCount = 0,
): Promise<{ media: Media; reused: boolean }> {
  const MAX_RETRIES = 3

  try {
    // First, try to find by alt text (most reliable for our seed data)
    const existingByAlt = await payload.find({
      collection: 'media',
      req,
      where: {
        alt: {
          equals: alt,
        },
      },
      limit: 1,
    })

    if (existingByAlt.docs.length > 0) {
      const existingMedia = existingByAlt.docs[0] as Media
      payload.logger.info(`  → Reusing existing media (by alt): ${alt}`)
      return { media: existingMedia, reused: true }
    }

    // Fallback: try to find by filename (with 'contains' for renamed files)
    const baseFilename = filename.replace(/\.[^.]+$/, '') // Remove extension
    const existingByFilename = await payload.find({
      collection: 'media',
      req,
      where: {
        filename: {
          contains: baseFilename,
        },
      },
      limit: 1,
    })

    if (existingByFilename.docs.length > 0) {
      const existingMedia = existingByFilename.docs[0] as Media
      payload.logger.info(`  → Reusing existing media (by filename): ${existingMedia.filename}`)
      return { media: existingMedia, reused: true }
    }

    // File doesn't exist, fetch and upload
    payload.logger.info(`  → Uploading new media: ${filename}`)
    const fileBuffer = await fetchFileByURL(url)

    const newMedia = await payload.create({
      collection: 'media',
      req,
      data: {
        alt,
      },
      file: fileBuffer,
    })

    return { media: newMedia as Media, reused: false }
  } catch (error) {
    // Handle MongoDB write conflicts with retry
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('WriteConflict') && retryCount < MAX_RETRIES) {
      payload.logger.info(`  → Write conflict, retrying (${retryCount + 1}/${MAX_RETRIES})...`)
      await sleep(500 * (retryCount + 1)) // Exponential backoff
      return getOrCreateMediaWithStats(payload, req, { filename, url, alt }, retryCount + 1)
    }
    throw error
  }
}
