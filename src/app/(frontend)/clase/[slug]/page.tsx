import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import {
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Target,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Clase as ClassType, Antrenor, PaginiClase } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCollectionUrl, getCollectionListUrl } from '@/utilities/getCollectionUrl'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const classes = await payload.find({
    collection: 'clase',
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = classes.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Helper function to get other classes
const getOtherClasses = cache(async (currentId: string, category: string, limit: number = 3) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'clase',
    where: {
      and: [
        { id: { not_equals: currentId } },
        { active: { equals: true } },
        { category: { equals: category } },
      ],
    },
    limit,
    depth: 2,
  })

  return result.docs as ClassType[]
})

export default async function ClassPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const classItem = await queryClassBySlug({ slug: decodedSlug })
  const settings = (await getCachedGlobal('pagini-clase', 1)()) as PaginiClase

  if (!classItem || !classItem.active) {
    notFound()
  }

  // Settings with defaults
  const showSchedule = settings?.showSchedule ?? true
  const showPricing = settings?.showPricing ?? true
  const showTrainer = settings?.showTrainer ?? true
  const showBenefits = settings?.showBenefits ?? true
  const showRequirements = settings?.showRequirements ?? true
  const showRelatedClasses = settings?.showRelatedClasses ?? true
  const relatedClassesCount = settings?.relatedClassesCount ?? 3
  const relatedClassesTitle = settings?.relatedClassesTitle || 'Alte clase similare'
  const ctaButtonText = settings?.ctaButtonText || 'Rezerva acum'

  // Get other classes in same category
  const otherClasses = showRelatedClasses && classItem.category
    ? await getOtherClasses(classItem.id, classItem.category, relatedClassesCount)
    : []

  // Get trainer details
  const trainer = classItem.trainer as Antrenor | null

  // Get the image URL safely
  const imageUrl =
    classItem.featuredImage && typeof classItem.featuredImage === 'object'
      ? classItem.featuredImage.url
      : null

  const difficultyLabels = {
    beginner: 'Începător',
    intermediate: 'Intermediar',
    advanced: 'Avansat',
    'all-levels': 'Toate nivelurile',
  }

  const categoryLabels = {
    cardio: 'Cardio',
    strength: 'Forță',
    flexibility: 'Flexibilitate',
    'mind-body': 'Mind & Body',
    combat: 'Combat',
    dance: 'Dance',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-theme-primary transition-colors">
                Acasă
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <Link href={getCollectionListUrl('clase')} className="hover:text-theme-primary transition-colors">
                Clase
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-theme-dark font-medium">{classItem.title}</li>
          </ol>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {imageUrl ? (
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src={imageUrl}
                    alt={classItem.title || 'Class'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="h-96 lg:h-[500px] bg-gradient-to-br from-theme-primary/20 to-theme-dark/20 flex items-center justify-center">
                  <div className="text-8xl">🏋️‍♀️</div>
                </div>
              )}

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      classItem.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-700'
                        : classItem.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : classItem.difficulty === 'advanced'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {difficultyLabels[classItem.difficulty as keyof typeof difficultyLabels]}
                  </span>
                  <span className="px-4 py-2 bg-theme-primary/10 text-theme-primary rounded-full text-sm font-medium">
                    {categoryLabels[classItem.category as keyof typeof categoryLabels]}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-theme-dark mb-4">
                  {classItem.title}
                </h1>

                {classItem.description && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {classItem.description}
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-theme-dark">
                      {classItem.duration}
                    </p>
                    <p className="text-sm text-gray-600">minute</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-theme-dark">
                      {classItem.capacity}
                    </p>
                    <p className="text-sm text-gray-600">locuri</p>
                  </div>
                  {trainer && (
                    <div className="text-center col-span-2">
                      <Award className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                      <p className="text-lg font-bold text-theme-dark">{trainer.title}</p>
                      <p className="text-sm text-gray-600">Antrenor</p>
                    </div>
                  )}
                </div>

                {/* Rich Text Content */}
                {classItem.content && (
                  <div className="mt-8 prose prose-lg max-w-none prose-headings:text-theme-dark prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-theme-dark prose-a:text-theme-primary hover:prose-a:text-theme-primary/80">
                    <RichText data={classItem.content} />
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            {showBenefits && classItem.benefits && classItem.benefits.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-theme-primary" />
                  <h2 className="text-2xl font-bold text-theme-dark">
                    Beneficii
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {classItem.benefits.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {showRequirements && classItem.requirements && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-yellow-900 mb-3">
                  Echipament necesar / Cerințe
                </h3>
                <p className="text-yellow-800">{classItem.requirements}</p>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Schedule Card */}
            {showSchedule && classItem.schedule && classItem.schedule.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-theme-primary" />
                  <h3 className="text-xl font-bold text-theme-dark">Program</h3>
                </div>
                <div className="space-y-3">
                  {classItem.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium text-theme-dark">
                        {translateDay(item.day)}
                      </span>
                      <span className="text-theme-primary font-bold">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Card */}
            {showPricing && classItem.price && (
              <div className="bg-gradient-to-br from-theme-primary to-theme-primary/90 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Prețuri</h3>
                </div>
                <div className="space-y-4">
                  {classItem.price.dropIn && (
                    <div className="pb-4 border-b border-white/20">
                      <p className="text-sm text-white/80 mb-1">Preț per ședință</p>
                      <p className="text-3xl font-bold">{classItem.price.dropIn} RON</p>
                    </div>
                  )}
                  {classItem.price.monthly && (
                    <div className="pb-4 border-b border-white/20">
                      <p className="text-sm text-white/80 mb-1">Abonament lunar</p>
                      <p className="text-3xl font-bold">{classItem.price.monthly} RON</p>
                    </div>
                  )}
                  {classItem.price.package?.sessions && classItem.price.package?.price && (
                    <div>
                      <p className="text-sm text-white/80 mb-1">
                        Pachet {classItem.price.package.sessions} ședințe
                      </p>
                      <p className="text-3xl font-bold">{classItem.price.package.price} RON</p>
                    </div>
                  )}
                </div>
                <Link
                  href={`/comanda?tip=clasa&optiune=${encodeURIComponent(classItem.title || '')}`}
                  className="mt-6 w-full block text-center bg-white text-theme-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {ctaButtonText}
                </Link>
              </div>
            )}

            {/* Trainer Card */}
            {showTrainer && trainer && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-theme-dark mb-4">Antrenorul tău</h3>
                <Link
                  href={`/antrenori/${trainer.slug}`}
                  className="block group"
                >
                  <div className="flex items-center gap-4">
                    {trainer.featuredImage && typeof trainer.featuredImage === 'object' ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={trainer.featuredImage.url || ''}
                          alt={trainer.title || 'Trainer'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-theme-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-theme-primary">
                          {trainer.title?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-theme-dark group-hover:text-theme-primary transition-colors">
                        {trainer.title}
                      </p>
                      {trainer.role && (
                        <p className="text-sm text-gray-600">{trainer.role}</p>
                      )}
                      {trainer.experience && (
                        <p className="text-xs text-theme-primary mt-1">
                          {trainer.experience}+ ani experiență
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Other Classes Section */}
        {showRelatedClasses && otherClasses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-theme-dark mb-8">
              {relatedClassesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherClasses.map((otherClass) => {
                const otherImageUrl =
                  otherClass.featuredImage && typeof otherClass.featuredImage === 'object'
                    ? otherClass.featuredImage.url
                    : null

                return (
                  <div
                    key={otherClass.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <Link href={getCollectionUrl('clase', otherClass.slug)}>
                      <div className="relative h-48">
                        {otherImageUrl ? (
                          <Image
                            src={otherImageUrl}
                            alt={otherClass.title || 'Class'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-theme-primary/20 to-theme-dark/20 flex items-center justify-center">
                            <div className="text-4xl">🏋️‍♀️</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="font-bold text-xl mb-1">{otherClass.title}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {otherClass.duration} min
                            </span>
                            {otherClass.capacity && (
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {otherClass.capacity}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* View All Classes Button */}
            <div className="text-center mt-8">
              <Link
                href={getCollectionListUrl('clase')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-theme-primary text-white font-bold rounded-lg hover:bg-theme-primary/90 transition-colors"
              >
                Vezi toate clasele
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
  const classItem = await queryClassBySlug({ slug })

  return generateMeta({ doc: classItem })
}

const queryClassBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'clase',
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

function translateDay(day: string): string {
  const days: { [key: string]: string } = {
    monday: 'Luni',
    tuesday: 'Marți',
    wednesday: 'Miercuri',
    thursday: 'Joi',
    friday: 'Vineri',
    saturday: 'Sâmbătă',
    sunday: 'Duminică',
  }
  return days[day] || day
}