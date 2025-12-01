'use client'

import type { Media, Page, Antrenor, Clase } from '@/payload-types'
import { getCollectionUrl } from '@/utilities/getCollectionUrl'
import React from 'react'
import { UniversalCard, type CardType, type UniversalCardProps } from '@/components/UniversalCard'

type ReferenceValue = Page | Antrenor | Clase

interface CardLink {
  type?: 'reference' | 'custom' | null
  reference?: {
    relationTo: 'pages' | 'antrenori' | 'clase'
    value: ReferenceValue | string | number
  } | null
  url?: string | null
  newTab?: boolean | null
}

interface Card {
  id?: string
  image: Media | string
  title: string
  subtitle?: string | null
  description?: string | null
  badge?: string | null
  badgeColor?: 'primary' | 'success' | 'warning' | 'dark' | null
  price?: {
    amount?: number | null
    period?: string | null
    oldPrice?: number | null
  } | null
  highlighted?: boolean | null
  link?: CardLink | null
}

interface SpacingConfig {
  marginTop?: string | null
  marginBottom?: string | null
}

interface PreviewCardsProps {
  cardType?: CardType
  columns?: '2' | '3' | '4'
  cards?: Card[]
  spacing?: SpacingConfig | null
  // Legacy support
  style?: 'team' | 'class'
}

// Helper to generate href from link
function getHref(link?: CardLink | null): string | null {
  if (!link) return null

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference

    if (typeof value === 'object' && value !== null && 'slug' in value) {
      return getCollectionUrl(relationTo, value.slug)
    }
  }

  return null
}

// Inline spacing classes (client component)
const marginTopMap: Record<string, string> = {
  none: '',
  xs: 'mt-1',
  sm: 'mt-2',
  md: 'mt-4',
  lg: 'mt-8',
  xl: 'mt-12',
  '2xl': 'mt-16',
  '3xl': 'mt-24',
}
const marginBottomMap: Record<string, string> = {
  none: '',
  xs: 'mb-1',
  sm: 'mb-2',
  md: 'mb-4',
  lg: 'mb-8',
  xl: 'mb-12',
  '2xl': 'mb-16',
  '3xl': 'mb-24',
}

// Get grid columns class
const getGridCols = (columns?: '2' | '3' | '4') => {
  switch (columns) {
    case '2':
      return 'lg:grid-cols-2'
    case '4':
      return 'lg:grid-cols-4'
    default:
      return 'lg:grid-cols-3'
  }
}

export const PreviewCards: React.FC<PreviewCardsProps> = ({
  cardType,
  columns = '3',
  cards,
  spacing,
  style, // Legacy support
}) => {
  const spacingClass = [
    spacing?.marginTop ? marginTopMap[spacing.marginTop] : '',
    spacing?.marginBottom ? marginBottomMap[spacing.marginBottom] : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!cards || cards.length === 0) {
    return null
  }

  // Map legacy style to cardType for backwards compatibility
  const effectiveCardType: CardType = cardType || (style === 'class' ? 'class' : 'team')

  // For team cards, use smaller max-width per item
  const gridItemClass = effectiveCardType === 'team' ? 'max-w-[280px] w-full' : ''
  const gridClass = effectiveCardType === 'team' ? 'justify-items-center' : ''

  return (
    <div className={`container ${spacingClass}`}>
      <div className={`grid md:grid-cols-2 ${getGridCols(columns)} gap-6 ${gridClass}`}>
        {cards.map((card, index) => {
          const href = getHref(card.link)

          // Convert card data to UniversalCard props
          const cardProps: UniversalCardProps = {
            cardType: effectiveCardType,
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            image: typeof card.image === 'object' ? card.image : null,
            badge: card.badge,
            badgeColor: card.badgeColor,
            highlighted: card.highlighted,
            price: card.price?.amount
              ? {
                  amount: card.price.amount,
                  period: card.price.period,
                  oldPrice: card.price.oldPrice,
                }
              : undefined,
            cta: href
              ? {
                  label: 'Vezi detalii',
                  href,
                  newTab: card.link?.newTab || false,
                }
              : undefined,
            index,
          }

          return (
            <div key={card.id || index} className={gridItemClass}>
              <UniversalCard {...cardProps} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
