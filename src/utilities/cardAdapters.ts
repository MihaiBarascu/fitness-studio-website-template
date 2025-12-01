/**
 * Card Adapters
 *
 * Utility functions to convert Payload collection documents
 * to UniversalCard props format.
 */

import type { Post, Antrenor, Clase, Abonamente, Media } from '@/payload-types'
import type { CardType, UniversalCardProps } from '@/components/UniversalCard'

// Difficulty badge color mapping
const difficultyColors: Record<string, 'primary' | 'success' | 'warning' | 'dark'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'primary',
  'all-levels': 'dark',
}

// Difficulty labels in Romanian
const difficultyLabels: Record<string, string> = {
  beginner: 'Începător',
  intermediate: 'Intermediar',
  advanced: 'Avansat',
  'all-levels': 'Toate nivelurile',
}

/**
 * Convert a Post document to UniversalCard props
 */
export function postToCardProps(
  post: Post,
  options?: {
    cardType?: CardType
    showCategories?: boolean
    showAuthor?: boolean
    showDate?: boolean
  },
): UniversalCardProps {
  // Get categories as strings
  const categories = post.categories
    ?.map((cat) => {
      if (typeof cat === 'object' && cat !== null) {
        return cat.title || ''
      }
      return ''
    })
    .filter(Boolean)

  // Get first category for badge
  const firstCategory = categories?.[0]

  // Get author name
  const authorName =
    options?.showAuthor !== false && post.populatedAuthors?.length
      ? post.populatedAuthors[0]?.name
      : undefined

  // Format published date
  const publishedDate =
    options?.showDate !== false && post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('ro-RO', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : undefined

  // Get image
  const image =
    post.heroImage || (post.meta?.image as Media | string | null) || null

  return {
    cardType: options?.cardType || 'blog',
    title: post.title,
    subtitle: authorName,
    description: post.meta?.description || undefined,
    image,
    badge: firstCategory,
    badgeColor: 'primary',
    meta: {
      categories: options?.showCategories ? categories : undefined,
      schedule: publishedDate,
    },
    cta: {
      label: 'Citește articolul',
      href: `/posts/${post.slug}`,
      newTab: false,
    },
  }
}

/**
 * Convert an Antrenor document to UniversalCard props
 */
export function antrenorToCardProps(
  antrenor: Antrenor,
  options?: {
    cardType?: CardType
    showExperience?: boolean
  },
): UniversalCardProps {
  // Get image
  const image = antrenor.featuredImage || null

  // Badge for experience
  const badge =
    options?.showExperience && antrenor.experience
      ? `${antrenor.experience} ani exp.`
      : undefined

  return {
    cardType: options?.cardType || 'team',
    title: antrenor.title,
    subtitle: antrenor.role,
    description: antrenor.excerpt || undefined,
    image,
    badge,
    badgeColor: 'primary',
    cta: {
      label: 'Vezi profil',
      href: `/antrenori/${antrenor.slug}`,
      newTab: false,
    },
  }
}

/**
 * Convert a Clase document to UniversalCard props
 */
export function claseToCardProps(
  clase: Clase,
  options?: {
    cardType?: CardType
    showDifficulty?: boolean
    showScheduleCount?: boolean
  },
): UniversalCardProps {
  // Get trainer name
  const trainerName =
    typeof clase.trainer === 'object' && clase.trainer !== null
      ? clase.trainer.title
      : undefined

  // Get image
  const image = clase.featuredImage || null

  // Get difficulty badge
  const badge =
    options?.showDifficulty !== false && clase.difficulty
      ? difficultyLabels[clase.difficulty] || clase.difficulty
      : undefined

  const badgeColor = clase.difficulty ? difficultyColors[clase.difficulty] : 'primary'

  // Get price (prefer dropIn for card display)
  const price = clase.price?.dropIn
    ? {
        amount: clase.price.dropIn,
        period: '/ședință',
        oldPrice: null,
      }
    : undefined

  // Calculate schedule info
  const scheduleCount = clase.schedule?.length || 0
  const scheduleText =
    options?.showScheduleCount !== false && scheduleCount > 0
      ? `${scheduleCount} zile/săpt.`
      : undefined

  return {
    cardType: options?.cardType || 'class',
    title: clase.title,
    subtitle: trainerName,
    description: clase.description || undefined,
    image,
    price,
    badge,
    badgeColor,
    meta: {
      duration: clase.duration,
      capacity: clase.capacity,
      schedule: scheduleText,
    },
    cta: {
      label: 'Vezi detalii',
      href: `/clase/${clase.slug}`,
      newTab: false,
    },
  }
}

/**
 * Convert an Abonamente document to UniversalCard props
 */
export function abonamenteToCardProps(
  abonament: Abonamente,
  options?: {
    cardType?: CardType
    imagePosition?: 'top' | 'background'
  },
): UniversalCardProps {
  // Determine card type based on abonament type
  const getDefaultCardType = (): CardType => {
    switch (abonament.type) {
      case 'gym':
        return 'pricing'
      case 'spa':
      case 'solar':
      case 'fitness-spa':
      case 'aerobic-spa':
        return 'product'
      default:
        return 'pricing'
    }
  }

  // Get CTA href
  const getCtaHref = (): string => {
    if (!abonament.cta) return '/contact'

    if (abonament.cta.linkType === 'custom' && abonament.cta.url) {
      return abonament.cta.url
    }

    if (abonament.cta.linkType === 'page' && abonament.cta.page) {
      if (typeof abonament.cta.page === 'object' && abonament.cta.page !== null && 'slug' in abonament.cta.page) {
        return `/${abonament.cta.page.slug}`
      }
    }

    return '/contact'
  }

  return {
    cardType: options?.cardType || getDefaultCardType(),
    title: abonament.title,
    subtitle: abonament.subtitle || undefined,
    image: abonament.image as Media | null,
    imagePosition: options?.imagePosition || (abonament.type === 'gym' ? 'background' : 'top'),
    price: abonament.price
      ? {
          amount: abonament.price.amount,
          period: abonament.price.period || '/lună',
          oldPrice: abonament.price.oldPrice || null,
        }
      : undefined,
    features: abonament.features?.map((f) => ({
      text: f.text,
      included: f.included ?? true,
    })),
    badge: abonament.highlighted ? (abonament.highlightLabel || 'Popular') : undefined,
    badgeColor: 'primary',
    highlighted: abonament.highlighted,
    cta: {
      label: abonament.cta?.label || 'Contactează-ne',
      href: getCtaHref(),
      newTab: false,
    },
  }
}

/**
 * Generic adapter that auto-detects collection type
 */
export function collectionToCardProps(
  doc: Post | Antrenor | Clase,
  collectionType: 'posts' | 'antrenori' | 'clase',
  cardType?: CardType,
): UniversalCardProps {
  switch (collectionType) {
    case 'posts':
      return postToCardProps(doc as Post, { cardType })
    case 'antrenori':
      return antrenorToCardProps(doc as Antrenor, { cardType })
    case 'clase':
      return claseToCardProps(doc as Clase, { cardType })
    default:
      // Fallback to simple card
      return {
        cardType: 'simple',
        title: (doc as { title?: string }).title || 'Untitled',
        description: undefined,
      }
  }
}

const cardAdapters = {
  postToCardProps,
  antrenorToCardProps,
  claseToCardProps,
  abonamenteToCardProps,
  collectionToCardProps,
}

export default cardAdapters
