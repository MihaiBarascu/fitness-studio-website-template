import type { CollectionSlug } from 'payload'

/**
 * Centralized URL configuration for all collections
 * Update this single file to change routes across the entire project
 */
export const collectionRoutes: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  posts: '/posts',
  antrenori: '/antrenori',
  clase: '/clase',
  abonamente: '/abonamente',
}

/**
 * Get the URL for a collection item
 * @param collection - The collection slug
 * @param slug - The document slug
 * @returns The full URL path
 */
export const getCollectionUrl = (
  collection: CollectionSlug | string,
  slug: string,
): string => {
  const prefix = collectionRoutes[collection as CollectionSlug]

  // If collection not in map, use collection name as prefix
  if (prefix === undefined) {
    return `/${collection}/${slug}`
  }

  // Pages have no prefix
  if (prefix === '') {
    return `/${slug}`
  }

  return `${prefix}/${slug}`
}

/**
 * Get the listing page URL for a collection
 * @param collection - The collection slug
 * @returns The listing page URL
 */
export const getCollectionListUrl = (collection: CollectionSlug | string): string => {
  const prefix = collectionRoutes[collection as CollectionSlug]

  if (prefix === undefined) {
    return `/${collection}`
  }

  if (prefix === '') {
    return '/'
  }

  return prefix
}
