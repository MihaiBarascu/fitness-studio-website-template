import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { ThemeStyles } from '@/Theme/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { LocalBusinessJsonLd, WebsiteJsonLd } from '@/components/StructuredData'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { BusinessInfo } from '@/payload-types'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // Fetch business info from CMS for SEO structured data
  const businessInfo = (await getCachedGlobal('business-info', 1)()) as BusinessInfo

  // Parse address (format: "Str. X, City, Country")
  const addressParts = businessInfo?.address?.split(',').map((s) => s.trim()) || []
  const street = addressParts[0] || ''
  const city = addressParts[1] || 'Cluj-Napoca'

  // Build social media array for sameAs
  const sameAs = [
    businessInfo?.facebook,
    businessInfo?.instagram,
    businessInfo?.tiktok,
    businessInfo?.youtube,
    businessInfo?.linkedin,
    businessInfo?.twitter,
  ].filter(Boolean) as string[]

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="ro" suppressHydrationWarning>
      <head>
        <InitTheme />
        <ThemeStyles />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {/* Structured Data for SEO - Dynamic from CMS */}
        <WebsiteJsonLd
          name={businessInfo?.businessName || 'Transilvania Fitness'}
          description={businessInfo?.tagline || 'Sală de fitness modernă în Cluj-Napoca.'}
          searchUrl="/search"
        />
        <LocalBusinessJsonLd
          name={businessInfo?.businessName || 'Transilvania Fitness'}
          description={`${businessInfo?.businessName || 'Transilvania Fitness'} - ${businessInfo?.tagline || 'Sală de fitness modernă'}`}
          address={{
            street,
            city,
            region: 'Cluj',
            postalCode: '400000',
            country: 'RO',
          }}
          phone={businessInfo?.phone || ''}
          email={businessInfo?.email || ''}
          openingHours={businessInfo?.workingHours?.map((wh) => ({
            days: wh.days || '',
            hours: wh.hours || '',
          }))}
          geo={{ latitude: 46.7712, longitude: 23.5884 }}
          sameAs={sameAs}
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@transilvaniagym',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
