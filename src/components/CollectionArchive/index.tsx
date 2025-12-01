'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Post, Antrenor, Clase } from '@/payload-types'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import {
  postToCardProps,
  antrenorToCardProps,
  claseToCardProps,
} from '@/utilities/cardAdapters'

export type Props = {
  items?: (Post | Antrenor | Clase)[]
  posts?: Post[] // backwards compatibility
  collectionType?: 'posts' | 'antrenori' | 'clase'
  cardType?: CardType
  columns?: '2' | '3' | '4'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const {
    items,
    posts,
    collectionType = 'posts',
    cardType,
    columns = '3',
  } = props

  // Use items if provided, otherwise fallback to posts for backwards compatibility
  const data = items || posts || []

  // Get grid columns class
  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'lg:grid-cols-2'
      case '4':
        return 'lg:grid-cols-4'
      default:
        return 'lg:grid-cols-3'
    }
  }

  return (
    <div className={cn('container')}>
      <div className={`grid md:grid-cols-2 ${getGridCols()} gap-6`}>
        {data?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            let cardProps

            // Convert to card props based on collection type
            switch (collectionType) {
              case 'antrenori':
                cardProps = antrenorToCardProps(result as Antrenor, {
                  cardType: cardType || 'team',
                  showExperience: true,
                })
                break
              case 'clase':
                cardProps = claseToCardProps(result as Clase, {
                  cardType: cardType || 'class',
                  showDifficulty: true,
                  showScheduleCount: true,
                })
                break
              case 'posts':
              default:
                cardProps = postToCardProps(result as Post, {
                  cardType: cardType || 'blog',
                  showCategories: true,
                })
                break
            }

            return (
              <UniversalCard
                key={(result as { id?: string }).id || index}
                {...cardProps}
                index={index}
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
