import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { Award, ChevronRight, Facebook, Instagram, Mail, Phone, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Antrenor, PaginiEchipa } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const antrenori = await payload.find({
    collection: 'antrenori',
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = antrenori.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Helper function to get other antrenori
const getOtherAntrenori = cache(async (currentId: string, limit: number = 3) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'antrenori',
    where: {
      id: { not_equals: currentId },
    },
    limit,
    depth: 2,
  })

  return result.docs as Antrenor[]
})

export default async function AntrenorPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const antrenor = await queryAntrenorBySlug({ slug: decodedSlug })
  const settings = (await getCachedGlobal('pagini-echipa', 1)()) as PaginiEchipa

  if (!antrenor) {
    notFound()
  }

  // Settings with defaults
  const showExperience = settings?.showExperience ?? true
  const showSpecializations = settings?.showSpecializations ?? true
  const showContact = settings?.showContact ?? true
  const showSocialMedia = settings?.showSocialMedia ?? true
  const showCTA = settings?.showCTA ?? true
  const showRelatedMembers = settings?.showRelatedMembers ?? true
  const relatedMembersCount = settings?.relatedMembersCount ?? 3
  const relatedMembersTitle = settings?.relatedMembersTitle || 'Alti antrenori'

  // CTA texts
  const firstName = antrenor.title?.split(' ')[0] || ''
  const ctaTitle = (settings?.ctaTitle || 'Vrei sa lucrezi cu {name}?').replace('{name}', firstName)
  const ctaDescription = settings?.ctaDescription || 'Contacteaza-ne pentru a programa o sesiune de antrenament sau pentru mai multe informatii despre serviciile noastre.'
  const ctaButtonText = settings?.ctaButtonText || 'Contacteaza-ne'
  const ctaSecondaryButtonText = settings?.ctaSecondaryButtonText || 'Vezi clasele disponibile'

  // Get other antrenori for the "Meet the Team" section
  const otherAntrenori = showRelatedMembers ? await getOtherAntrenori(antrenor.id, relatedMembersCount) : []

  // Get the image URL safely
  const imageUrl =
    antrenor.featuredImage && typeof antrenor.featuredImage === 'object'
      ? antrenor.featuredImage.url
      : null

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-theme-primary transition-colors">
                Acasa
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <Link
                href="/antrenori"
                className="hover:text-theme-primary transition-colors"
              >
                Antrenori
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-theme-dark font-medium">{antrenor.title}</li>
          </ol>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Image & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              {imageUrl ? (
                <div className="relative h-96 lg:h-[450px]">
                  <Image
                    src={imageUrl}
                    alt={antrenor.title || 'Antrenor'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="h-96 lg:h-[450px] bg-gradient-to-br from-theme-primary/20 to-theme-dark/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-theme-primary/30">
                    {antrenor.title?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-theme-dark">{antrenor.title}</h2>
                  {antrenor.role && (
                    <p className="text-lg text-theme-primary font-medium mt-1">
                      {antrenor.role}
                    </p>
                  )}
                </div>

                {/* Experience Badge */}
                {showExperience && antrenor.experience && (
                  <div className="flex items-center justify-center gap-3 py-4 border-y border-gray-100">
                    <Award className="w-8 h-8 text-theme-primary" />
                    <div>
                      <p className="text-2xl font-bold text-theme-dark">
                        {antrenor.experience}+
                      </p>
                      <p className="text-sm text-gray-600">Ani experienta</p>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {showContact && antrenor.contact && (
                  <div className="space-y-3">
                    {antrenor.contact.email && (
                      <a
                        href={`mailto:${antrenor.contact.email}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-theme-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm break-all">{antrenor.contact.email}</span>
                      </a>
                    )}
                    {antrenor.contact.phone && (
                      <a
                        href={`tel:${antrenor.contact.phone}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-theme-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{antrenor.contact.phone}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Social Media */}
                {showSocialMedia && antrenor.socialMedia && (
                  <div className="pt-4">
                    <div className="flex justify-center gap-3">
                      {antrenor.socialMedia.facebook && (
                        <a
                          href={antrenor.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-primary/10 hover:bg-theme-primary hover:text-white transition-all"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {antrenor.socialMedia.instagram && (
                        <a
                          href={antrenor.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-primary/10 hover:bg-theme-primary hover:text-white transition-all"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Bio Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {antrenor.excerpt && (
                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {antrenor.excerpt}
                  </p>
                </div>
              )}

              {/* Rich Text Content */}
              {antrenor.content && (
                <div className="prose prose-lg max-w-none prose-headings:text-theme-dark prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-theme-dark prose-a:text-theme-primary hover:prose-a:text-theme-primary/80">
                  <RichText data={antrenor.content} />
                </div>
              )}
            </div>

            {/* Specializations Card */}
            {showSpecializations && antrenor.specializations && antrenor.specializations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-theme-primary" />
                  <h2 className="text-2xl font-bold text-theme-dark">Specializari</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {antrenor.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gradient-to-r from-theme-primary/10 to-transparent text-theme-dark rounded-lg font-medium border border-theme-primary/20 hover:border-theme-primary/40 transition-colors"
                    >
                      {spec.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            {showCTA && (
              <div className="bg-gradient-to-r from-theme-primary to-theme-primary/90 rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {ctaTitle}
                </h3>
                <p className="mb-6 text-white/90">
                  {ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/comanda?tip=antrenor&optiune=${encodeURIComponent(antrenor.title || '')}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-theme-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {ctaButtonText}
                  </Link>
                  <Link
                    href="/clase"
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
                  >
                    {ctaSecondaryButtonText}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Antrenori Section */}
        {showRelatedMembers && otherAntrenori.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-theme-dark mb-8">{relatedMembersTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAntrenori.map((member) => {
                const memberImageUrl =
                  member.featuredImage && typeof member.featuredImage === 'object'
                    ? member.featuredImage.url
                    : null

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <Link href={`/antrenori/${member.slug}`}>
                      <div className="relative h-64">
                        {memberImageUrl ? (
                          <Image
                            src={memberImageUrl}
                            alt={member.title || 'Antrenor'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-theme-primary/20 to-theme-dark/20 flex items-center justify-center">
                            <div className="text-4xl font-bold text-theme-primary/30">
                              {member.title?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="font-bold text-xl mb-1">{member.title}</h3>
                          {member.role && <p className="text-sm text-white/90">{member.role}</p>}
                        </div>
                      </div>
                      {member.specializations && member.specializations.length > 0 && (
                        <div className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {member.specializations.slice(0, 2).map((spec, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-theme-primary/10 text-theme-primary rounded-full"
                              >
                                {spec.name}
                              </span>
                            ))}
                            {member.specializations.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                +{member.specializations.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* View All Antrenori Button */}
            <div className="text-center mt-8">
              <Link
                href="/antrenori"
                className="inline-flex items-center gap-2 px-6 py-3 bg-theme-primary text-white font-bold rounded-lg hover:bg-theme-primary/90 transition-colors"
              >
                Vezi toti antrenorii
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const antrenor = await queryAntrenorBySlug({ slug })

  return generateMeta({ doc: antrenor })
}

const queryAntrenorBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'antrenori',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
