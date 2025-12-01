import type { Post, Antrenor, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { getSpacingClasses } from '@/fields/spacing'
import type { CardType } from '@/components/UniversalCard'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'posts',
    spacing,
    cardType,
    columns,
  } = props
  const spacingClass = getSpacingClasses(spacing)

  const limit = limitFromProps || 3

  let items: (Post | Antrenor)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    if (relationTo === 'posts') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      })

      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      items = fetchedPosts.docs
    } else if (relationTo === 'antrenori') {
      const fetchedAntrenori = await payload.find({
        collection: 'antrenori',
        depth: 1,
        limit,
        where: {
          status: { equals: 'published' },
        },
        sort: '-createdAt',
      })

      items = fetchedAntrenori.docs
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedItems = selectedDocs.map((item) => {
        if (typeof item.value === 'object') return item.value
      }) as (Post | Antrenor)[]

      items = filteredSelectedItems
    }
  }

  return (
    <div className={`my-16 ${spacingClass}`} id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive
        items={items}
        collectionType={(relationTo || 'posts') as 'posts' | 'antrenori' | 'clase'}
        cardType={cardType as CardType | undefined}
        columns={(columns as '2' | '3' | '4') || '3'}
      />
    </div>
  )
}