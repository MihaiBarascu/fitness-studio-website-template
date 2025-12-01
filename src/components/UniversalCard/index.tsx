'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Check, X, Clock, Users, Calendar } from 'lucide-react'
import type { Media as MediaType } from '@/payload-types'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Card types - all available everywhere
export type CardType =
  | 'pricing'
  | 'product'
  | 'team'
  | 'class'
  | 'offer'
  | 'blog'
  | 'service'
  | 'simple'

export interface UniversalCardProps {
  // Card type
  cardType?: CardType

  // Content
  title: string
  subtitle?: string | null
  description?: string | null

  // Image
  image?: MediaType | string | null
  imagePosition?: 'top' | 'background'

  // Price (available on ALL card types)
  price?: {
    amount: number
    period?: string | null
    oldPrice?: number | null
  } | null

  // Features (available on ALL card types)
  features?: Array<{
    text: string
    included?: boolean | null
  }> | null

  // Badge (available on ALL card types)
  badge?: string | null
  badgeColor?: 'primary' | 'success' | 'warning' | 'dark' | null
  highlighted?: boolean | null

  // CTA Button
  cta?: {
    label: string
    href: string
    newTab?: boolean
  } | null

  // Metadata (for class/service cards)
  meta?: {
    duration?: number | null
    capacity?: number | null
    trainer?: string | null
    categories?: string[] | null
    schedule?: string | null
  } | null

  // Extra
  className?: string
  index?: number
}

// Badge color mapping
const getBadgeColorClass = (color?: string | null) => {
  switch (color) {
    case 'success':
      return 'bg-green-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'dark':
      return 'bg-theme-dark'
    default:
      return 'bg-theme-primary'
  }
}

export const UniversalCard: React.FC<UniversalCardProps> = ({
  cardType = 'simple',
  title,
  subtitle,
  description,
  image,
  imagePosition = 'top',
  price,
  features,
  badge,
  badgeColor,
  highlighted,
  cta,
  meta,
  className,
  index = 0,
}) => {
  // Scroll animation - triggers 100px before element enters viewport
  const { ref, isVisible } = useScrollAnimation({
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  })

  const imageUrl = typeof image === 'object' && image !== null ? image.url : image
  const imageAlt = typeof image === 'object' && image !== null ? image.alt || title : title

  // Common props for internal components
  const commonProps = {
    title,
    subtitle,
    description,
    image: imageUrl,
    imageAlt,
    price,
    features,
    badge,
    badgeColor,
    highlighted,
    cta,
    meta,
    className,
    index,
    isVisible, // Pass visibility state to internal cards
  }

  // Render card based on type, wrapped with scroll animation
  const renderCard = () => {
    switch (cardType) {
      case 'pricing':
        return <PricingCard {...commonProps} imagePosition={imagePosition} />

      case 'product':
        return <ProductCard {...commonProps} />

      case 'team':
        return <TeamCard {...commonProps} />

      case 'class':
        return <ClassCard {...commonProps} />

      case 'offer':
        return <OfferCard {...commonProps} />

      case 'blog':
        return <BlogCard {...commonProps} />

      case 'service':
        return <ServiceCard {...commonProps} />

      case 'simple':
      default:
        return <SimpleCard {...commonProps} />
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {renderCard()}
    </div>
  )
}

// === INTERNAL CARD PROPS ===
interface InternalCardProps {
  title: string
  subtitle?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  imagePosition?: 'top' | 'background'
  price?: UniversalCardProps['price']
  features?: UniversalCardProps['features']
  badge?: string | null
  badgeColor?: string | null
  highlighted?: boolean | null
  cta?: UniversalCardProps['cta']
  meta?: UniversalCardProps['meta']
  className?: string
  index: number
  isVisible?: boolean // For scroll animation
}

// === PRICING CARD ===
// Pentru abonamente GYM - cu gradient header, preț mare, features, CTA
const PricingCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imagePosition = 'background',
  price,
  features,
  badge,
  badgeColor,
  highlighted,
  cta,
  className,
  index: _index,
}) => {
  return (
    <article
      className={cn(
        'universal-card universal-card-pricing relative overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:-translate-y-2',
        'transition-all duration-300 ease-out',
                'flex flex-col h-full',
        highlighted && 'ring-2 ring-theme-primary scale-105',
        className,
      )}
    >
      {/* Header cu imagine background sau gradient */}
      <div className="relative h-48 overflow-hidden">
        {image && imagePosition === 'background' ? (
          <>
            <Image src={image} alt={imageAlt || title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-dark to-black" />
        )}

        {/* Badge */}
        {(badge || highlighted) && (
          <div className="absolute top-4 right-4">
            <span
              className={cn(
                'text-white text-xs font-bold uppercase px-3 py-1 rounded-full',
                getBadgeColorClass(badgeColor),
              )}
            >
              {badge || 'Popular'}
            </span>
          </div>
        )}

        {/* Titlu și subtitlu */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {subtitle && (
            <span className="text-gray-300 text-sm uppercase tracking-wider mb-2">{subtitle}</span>
          )}
          <h3 className="text-white text-2xl font-bold drop-shadow-lg">{title}</h3>
        </div>
      </div>

      {/* Preț */}
      {price && (
        <div className="text-center py-4 border-b border-gray-100">
          <div className="flex items-baseline justify-center gap-2">
            {price.oldPrice && (
              <span className="text-theme-muted line-through text-base">{price.oldPrice}</span>
            )}
            <span className="text-4xl font-bold text-theme-dark">{price.amount}</span>
            <span className="text-theme-muted">RON</span>
            {price.period && <span className="text-theme-muted">{price.period}</span>}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="p-6 space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              {feature.included !== false ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm',
                  feature.included !== false ? 'text-theme-text' : 'text-theme-muted line-through',
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Description */}
      {description && !features?.length && (
        <div className="p-6">
          <p className="text-theme-text text-sm">{description}</p>
        </div>
      )}

      {/* CTA Button */}
      {cta && (
        <div className="p-6 pt-0 mt-auto">
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className={cn(
              'block w-full text-center py-3 px-6 rounded transition-all duration-300',
              highlighted
                ? 'bg-theme-primary text-white hover:bg-theme-primary-hover hover:text-white'
                : 'bg-theme-dark text-white hover:bg-theme-primary hover:text-white',
            )}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </article>
  )
}

// === PRODUCT CARD ===
// Pentru abonamente SPA/Solar - cu imagine sus, badge, preț, CTA
const ProductCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  badge,
  badgeColor,
  highlighted,
  cta,
  className,
  index: _index,
}) => {
  return (
    <article
      className={cn(
        'universal-card universal-card-product overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:-translate-y-2',
        'transition-all duration-300 ease-out',
                highlighted && 'ring-2 ring-theme-primary',
        className,
      )}
    >
      {/* Imagine */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-theme-primary/10 to-theme-dark/10" />
        )}

        {/* Badge */}
        {(badge || highlighted) && (
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'text-white text-xs font-bold uppercase px-3 py-1 rounded-full',
                getBadgeColorClass(badgeColor),
              )}
            >
              {badge || 'Recomandat'}
            </span>
          </div>
        )}

        {/* Preț badge overlay */}
        {price && (
          <div className="absolute bottom-4 right-4 bg-theme-primary text-white px-4 py-2 rounded">
            {price.oldPrice && (
              <span className="text-white/70 line-through text-sm mr-2">{price.oldPrice}</span>
            )}
            <span className="font-bold">{price.amount} RON</span>
            {price.period && <span className="text-sm ml-1">{price.period}</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {subtitle && (
          <span className="text-theme-primary text-sm font-medium uppercase tracking-wider">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-theme-dark mt-1">{title}</h3>

        {description && <p className="text-theme-text text-sm mt-3 line-clamp-2">{description}</p>}

        {/* CTA */}
        {cta && (
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className="inline-block mt-4 text-theme-primary font-medium hover:underline"
          >
            {cta.label} →
          </Link>
        )}
      </div>
    </article>
  )
}

// === TEAM CARD ===
// Pentru Team Members - imagine, nume, rol (compact version)
const TeamCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  badge,
  badgeColor,
  cta,
  className,
  index: _index,
}) => {
  const CardWrapper = cta ? Link : 'div'
  const wrapperProps = cta ? { href: cta.href, target: cta.newTab ? '_blank' : undefined } : {}

  return (
    <article
      className={cn(
        'universal-card universal-card-team overflow-hidden',
                className,
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CardWrapper {...(wrapperProps as any)} className="block group">
        {/* Imagine - compact portrait ratio */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-muted/20 to-theme-dark/20 flex items-center justify-center">
              <span className="text-5xl text-theme-muted opacity-50">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  'text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full',
                  getBadgeColorClass(badgeColor),
                )}
              >
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="team-info text-center py-4 px-3">
          <h3 className="text-lg font-bold text-theme-dark group-hover:text-theme-primary transition-colors">
            {title}
          </h3>
          {subtitle && <span className="text-theme-primary text-base block mt-1">{subtitle}</span>}
          {description && (
            <p className="text-theme-muted text-sm mt-2 line-clamp-2">{description}</p>
          )}
        </div>
      </CardWrapper>
    </article>
  )
}

// === CLASS CARD ===
// Pentru Classes - imagine, titlu, trainer, badge preț
const ClassCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  badge,
  badgeColor,
  cta,
  meta,
  className,
  index: _index,
}) => {
  const CardWrapper = cta ? Link : 'div'
  const wrapperProps = cta ? { href: cta.href, target: cta.newTab ? '_blank' : undefined } : {}

  return (
    <article
      className={cn(
        'universal-card universal-card-class class-thumb',
                'h-full flex flex-col',
        className,
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CardWrapper {...(wrapperProps as any)} className="group h-full flex flex-col">
        {/* Imagine */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg flex-shrink-0">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-primary/10 to-theme-dark/10 flex items-center justify-center">
              <span className="text-4xl">🏋️</span>
            </div>
          )}

          {/* Badge (difficulty) - stânga sus */}
          {badge && (
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  'text-white text-xs font-bold uppercase px-3 py-1 rounded-full',
                  getBadgeColorClass(badgeColor),
                )}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Preț badge - dreapta sus, sub badge-ul de dificultate */}
          {price && (
            <div className="absolute top-4 right-4 bg-theme-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">{price.amount}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="class-info flex-1 flex flex-col">
          <h3>{title}</h3>
          {subtitle && (
            <span className="class-trainer">
              <strong>Trainer</strong> - {subtitle}
            </span>
          )}

          {/* Meta info */}
          {meta && (
            <div className="flex items-center gap-4 mt-2 text-sm text-theme-muted">
              {meta.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meta.duration} min
                </span>
              )}
              {meta.capacity && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Max {meta.capacity}
                </span>
              )}
              {meta.schedule && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {meta.schedule}
                </span>
              )}
            </div>
          )}

          {description && (
            <p className="class-description mt-auto line-clamp-3">{description}</p>
          )}
        </div>
      </CardWrapper>
    </article>
  )
}

// === OFFER CARD ===
// Pentru Oferte/Promo - fără preț obligatoriu, CTA proeminent
const OfferCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  badge,
  badgeColor,
  highlighted,
  cta,
  className,
  index: _index,
}) => {
  return (
    <article
      className={cn(
        'universal-card universal-card-offer relative overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:scale-[1.02]',
        'transition-all duration-300 ease-out',
                highlighted && 'ring-2 ring-theme-primary',
        className,
      )}
    >
      {/* Imagine sau gradient */}
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <>
            <Image src={image} alt={imageAlt || title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-primary to-theme-dark" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'text-xs font-bold uppercase px-3 py-1 rounded-full',
                badgeColor === 'dark'
                  ? 'bg-white text-theme-primary'
                  : 'bg-white text-theme-primary',
              )}
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {subtitle && (
          <span className="text-theme-muted text-sm uppercase tracking-wider">{subtitle}</span>
        )}
        <h3 className="text-xl font-bold text-theme-dark mt-1">{title}</h3>

        {description && <p className="text-theme-text text-sm mt-3">{description}</p>}

        {/* CTA prominent */}
        {cta && (
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className="mt-6 block w-full text-center py-3 px-6 bg-theme-primary text-white rounded font-medium hover:bg-theme-primary-hover transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </article>
  )
}

// === BLOG CARD ===
// Pentru articole blog - imagine, categorii, titlu, descriere
const BlogCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  badge,
  badgeColor,
  cta,
  meta,
  className,
  index: _index,
}) => {
  const CardWrapper = cta ? Link : 'div'
  const wrapperProps = cta ? { href: cta.href, target: cta.newTab ? '_blank' : undefined } : {}

  return (
    <article
      className={cn(
        'universal-card universal-card-blog overflow-hidden rounded-lg',
        'bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1',
        'transition-all duration-300 ease-out',
                className,
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CardWrapper {...(wrapperProps as any)} className="block group">
        {/* Imagine */}
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badge */}
            {badge && (
              <div className="absolute top-4 left-4">
                <span
                  className={cn(
                    'text-white text-xs font-bold uppercase px-3 py-1 rounded-full',
                    getBadgeColorClass(badgeColor),
                  )}
                >
                  {badge}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Categories */}
          {meta?.categories && meta.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {meta.categories.map((cat, i) => (
                <span key={i} className="text-theme-primary text-xs uppercase font-medium">
                  {cat}
                  {i < meta.categories!.length - 1 && ','}
                </span>
              ))}
            </div>
          )}

          {subtitle && !meta?.categories && (
            <span className="text-theme-primary text-sm font-medium uppercase tracking-wider">
              {subtitle}
            </span>
          )}

          <h3 className="text-lg font-bold text-theme-dark mt-1 group-hover:text-theme-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {description && (
            <p className="text-theme-text text-sm mt-2 line-clamp-3">{description}</p>
          )}
        </div>
      </CardWrapper>
    </article>
  )
}

// === SERVICE CARD ===
// Pentru servicii fitness - similar cu class dar cu focus pe preț și trainer
const ServiceCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  badge,
  badgeColor,
  cta,
  meta,
  className,
  index: _index,
}) => {
  const CardWrapper = cta ? Link : 'div'
  const wrapperProps = cta ? { href: cta.href, target: cta.newTab ? '_blank' : undefined } : {}

  return (
    <article
      className={cn(
        'universal-card universal-card-service overflow-hidden rounded-lg',
        'bg-theme-dark text-white',
        'hover:shadow-xl hover:-translate-y-1',
        'transition-all duration-300 ease-out',
                className,
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CardWrapper {...(wrapperProps as any)} className="block group">
        {/* Imagine */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-primary/30 to-theme-dark" />
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  'text-white text-xs font-bold uppercase px-3 py-1 rounded-full',
                  getBadgeColorClass(badgeColor),
                )}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Preț overlay */}
          {price && (
            <div className="absolute bottom-4 right-4 bg-theme-primary text-white px-4 py-2 rounded-full">
              <span className="font-bold">{price.amount} RON</span>
              {price.period && <span className="text-sm ml-1">{price.period}</span>}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 bg-theme-dark">
          <h3 className="text-xl font-bold text-white">{title}</h3>

          {subtitle && (
            <span className="text-theme-primary block mt-1">
              <strong>Trainer</strong> - {subtitle}
            </span>
          )}

          {/* Meta */}
          {meta && (
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
              {meta.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meta.duration} min
                </span>
              )}
              {meta.capacity && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Max {meta.capacity}
                </span>
              )}
            </div>
          )}

          {description && <p className="text-gray-300 text-sm mt-3 line-clamp-2">{description}</p>}
        </div>
      </CardWrapper>
    </article>
  )
}

// === SIMPLE CARD ===
// Minimal - text + buton
const SimpleCard: React.FC<InternalCardProps> = ({
  title,
  subtitle,
  description,
  badge,
  badgeColor,
  cta,
  className,
  index: _index,
}) => {
  return (
    <article
      className={cn(
        'universal-card universal-card-simple p-6 rounded-lg',
        'bg-white shadow hover:shadow-md transition-shadow duration-300',
                className,
      )}
    >
      {/* Badge */}
      {badge && (
        <span
          className={cn(
            'inline-block text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3',
            getBadgeColorClass(badgeColor),
          )}
        >
          {badge}
        </span>
      )}

      {subtitle && (
        <span className="text-theme-primary text-sm font-medium uppercase tracking-wider">
          {subtitle}
        </span>
      )}
      <h3 className="text-lg font-bold text-theme-dark mt-1">{title}</h3>

      {description && <p className="text-theme-text text-sm mt-2">{description}</p>}

      {cta && (
        <Link
          href={cta.href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
          className="inline-block mt-4 text-theme-primary font-medium hover:underline"
        >
          {cta.label} →
        </Link>
      )}
    </article>
  )
}

export default UniversalCard
