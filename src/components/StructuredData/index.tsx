import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

interface LocalBusinessProps {
  name: string
  description: string
  address: {
    street: string
    city: string
    region?: string
    postalCode?: string
    country: string
  }
  phone: string
  email: string
  openingHours?: Array<{
    days: string
    hours: string
  }>
  image?: string
  priceRange?: string
  geo?: {
    latitude: number
    longitude: number
  }
  sameAs?: string[]
}

/**
 * LocalBusiness JSON-LD structured data for gyms and fitness centers
 * Helps Google understand and display rich results for the business
 */
export const LocalBusinessJsonLd: React.FC<LocalBusinessProps> = ({
  name,
  description,
  address,
  phone,
  email,
  openingHours,
  image,
  priceRange = '$$',
  geo,
  sameAs = [],
}) => {
  const siteUrl = getServerSideURL()

  // Convert opening hours to schema.org format
  const formatOpeningHours = () => {
    if (!openingHours) return undefined

    return openingHours.map((oh) => {
      // Parse days like "Luni - Vineri" or "Sâmbătă"
      const daysMap: Record<string, string> = {
        luni: 'Mo',
        marti: 'Tu',
        marți: 'Tu',
        miercuri: 'We',
        joi: 'Th',
        vineri: 'Fr',
        sambata: 'Sa',
        sâmbătă: 'Sa',
        duminica: 'Su',
        duminică: 'Su',
      }

      // Simple format: "Mo-Fr 07:00-22:00"
      const days = oh.days.toLowerCase()
      let daySpec = ''

      if (days.includes('-')) {
        const [start, end] = days.split('-').map((d) => d.trim())
        const startDay = Object.entries(daysMap).find(([key]) => start.includes(key))?.[1] || ''
        const endDay = Object.entries(daysMap).find(([key]) => end.includes(key))?.[1] || ''
        daySpec = `${startDay}-${endDay}`
      } else {
        daySpec = Object.entries(daysMap).find(([key]) => days.includes(key))?.[1] || ''
      }

      return `${daySpec} ${oh.hours.replace(' - ', '-')}`
    })
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation', 'HealthClub'],
    '@id': `${siteUrl}/#organization`,
    name,
    description,
    url: siteUrl,
    telephone: phone,
    email,
    priceRange,
    image: image || `${siteUrl}/og-image.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region || 'Cluj',
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    ...(openingHours && {
      openingHours: formatOpeningHours(),
    }),
    ...(sameAs.length > 0 && { sameAs }),
    // Additional fitness-specific properties
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Sală de Fitness', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Clase de Grup', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Antrenor Personal', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'SPA', value: true },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * BreadcrumbList JSON-LD for navigation
 */
export const BreadcrumbJsonLd: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const siteUrl = getServerSideURL()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface WebsiteProps {
  name: string
  description: string
  searchUrl?: string
}

/**
 * Website JSON-LD with optional sitelinks search box
 */
export const WebsiteJsonLd: React.FC<WebsiteProps> = ({ name, description, searchUrl }) => {
  const siteUrl = getServerSideURL()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url: siteUrl,
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}${searchUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface ServiceProps {
  name: string
  description: string
  provider: string
  areaServed?: string
  price?: {
    amount: number
    currency: string
  }
}

/**
 * Service JSON-LD for fitness classes and subscriptions
 */
export const ServiceJsonLd: React.FC<ServiceProps> = ({
  name,
  description,
  provider,
  areaServed = 'Cluj-Napoca, Romania',
  price,
}) => {
  const siteUrl = getServerSideURL()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: provider,
      url: siteUrl,
    },
    areaServed,
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price.amount,
        priceCurrency: price.currency,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
