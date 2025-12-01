import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { StaticPageHero } from '@/components/StaticPageHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { PaginiEchipa } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import { antrenorToCardProps } from '@/utilities/cardAdapters'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getCachedGlobal('pagini-echipa', 1)()) as PaginiEchipa

  return {
    title: settings?.meta?.title || 'Antrenori | Transilvania Fitness',
    description: settings?.meta?.description || 'Cunoaste antrenorii profesionisti de la Transilvania Fitness',
    openGraph: settings?.meta?.image && typeof settings.meta.image === 'object' ? {
      images: [{ url: settings.meta.image.url || '' }],
    } : undefined,
  }
}

export default async function AntrenoriPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = parseInt(page)

  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('pagini-echipa', 1)()) as PaginiEchipa

  const antrenori = await payload.find({
    collection: 'antrenori',
    depth: 1,
    limit: 12,
    page: currentPage,
    sort: '-createdAt',
  })

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <StaticPageHero
        title={settings?.heroTitle || 'Antrenori'}
        description={settings?.heroSubtitle || 'Antrenori profesionisti dedicati si pasionati care te vor ghida catre obiectivele tale de fitness'}
        backgroundImage={settings?.heroBackground && typeof settings.heroBackground === 'object' ? settings.heroBackground.url : null}
      />

      {/* Antrenori Grid */}
      <div className="container mt-16">
        {antrenori.docs.length > 0 ? (
          <>
            <div className={`grid gap-6 mb-12 ${
              settings?.columns === '2' ? 'md:grid-cols-2' :
              settings?.columns === '4' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
              'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {antrenori.docs.map((antrenor, index) => {
                const cardType = (settings?.cardType as CardType) || 'team'
                const cardProps = antrenorToCardProps(antrenor, {
                  cardType,
                  showExperience: settings?.showExperience ?? true,
                })
                return (
                  <UniversalCard
                    key={antrenor.id}
                    {...cardProps}
                    index={index}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {antrenori.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  page={antrenori.page || 1}
                  totalPages={antrenori.totalPages}
                />
                <div className="text-center mt-4">
                  <PageRange
                    totalDocs={antrenori.totalDocs || 0}
                    limit={12}
                    currentPage={currentPage}
                    collectionLabels={{
                      plural: 'antrenori',
                      singular: 'antrenor',
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-theme-text">
              Nu există antrenori disponibili momentan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
