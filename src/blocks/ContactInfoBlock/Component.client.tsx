'use client'
import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface ContactInfoClientProps {
  title?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  showMap?: boolean | null
  mapUrl?: string | null
  mapHeight?: number | null
  style?: 'default' | 'compact' | 'card' | null
  spacing?: {
    marginTop?: string | null
    marginBottom?: string | null
  } | null
}

// Icons
const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

// Margin maps
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

export const ContactInfoClient: React.FC<ContactInfoClientProps> = ({
  title,
  address,
  phone,
  email,
  showMap = true,
  mapUrl,
  mapHeight = 250,
  style = 'default',
  spacing,
}) => {
  const { ref, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })

  // Get spacing classes
  const spacingClass = [
    spacing?.marginTop ? marginTopMap[spacing.marginTop] : '',
    spacing?.marginBottom ? marginBottomMap[spacing.marginBottom] : '',
  ]
    .filter(Boolean)
    .join(' ')

  // No data
  if (!address && !phone && !email) {
    return null
  }

  // Render title with last word colored
  const renderTitle = (text: string) => {
    const words = text.split(' ')
    return words.map((word, i) =>
      i === words.length - 1 ? (
        <span key={i} className="text-theme-primary">
          {word}
        </span>
      ) : (
        <span key={i}>{word} </span>
      ),
    )
  }

  const animationClasses = cn(
    'transition-all duration-700 ease-out',
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
  )

  // Card style
  if (style === 'card') {
    return (
      <div
        ref={ref}
        className={cn(`contact-info-card bg-white rounded-lg shadow-lg p-6 ${spacingClass}`, animationClasses)}
      >
        {title && <h3 className="text-xl font-bold text-theme-dark mb-4">{renderTitle(title)}</h3>}

        <div className="space-y-3">
          {address && (
            <div className="flex items-start gap-3 text-theme-text">
              <span className="text-theme-primary mt-0.5">
                <MapPinIcon />
              </span>
              <span className="text-[15px]">{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3 text-theme-text">
              <span className="text-theme-primary">
                <PhoneIcon />
              </span>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-[15px] hover:text-theme-primary transition-colors"
              >
                {phone}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3 text-theme-text">
              <span className="text-theme-primary">
                <EmailIcon />
              </span>
              <a
                href={`mailto:${email}`}
                className="text-[15px] hover:text-theme-primary transition-colors"
              >
                {email}
              </a>
            </div>
          )}
        </div>

        {showMap && mapUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height={mapHeight || 250}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    )
  }

  // Compact style (inline)
  if (style === 'compact') {
    return (
      <div
        ref={ref}
        className={cn(`contact-info-compact ${spacingClass}`, animationClasses)}
      >
        {title && <h3 className="text-lg font-bold text-theme-dark mb-3">{renderTitle(title)}</h3>}

        <div className="flex flex-wrap gap-4 text-theme-text text-[15px]">
          {address && (
            <div className="flex items-center gap-2">
              <span className="text-theme-primary">
                <MapPinIcon />
              </span>
              <span>{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-2">
              <span className="text-theme-primary">
                <PhoneIcon />
              </span>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="hover:text-theme-primary transition-colors"
              >
                {phone}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-2">
              <span className="text-theme-primary">
                <EmailIcon />
              </span>
              <a
                href={`mailto:${email}`}
                className="hover:text-theme-primary transition-colors"
              >
                {email}
              </a>
            </div>
          )}
        </div>

        {showMap && mapUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height={mapHeight || 250}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    )
  }

  // Default style
  return (
    <div
      ref={ref}
      className={cn(`contact-info ${spacingClass}`, animationClasses)}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-theme-dark mb-6">{renderTitle(title)}</h2>
      )}

      <div className="space-y-4">
        {address && (
          <div
            className={cn(
              'flex items-start gap-3 text-theme-text',
              'transition-all duration-500 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="text-theme-primary mt-1">
              <MapPinIcon />
            </span>
            <p className="text-[18px] leading-relaxed">{address}</p>
          </div>
        )}

        {phone && (
          <div
            className={cn(
              'flex items-center gap-3 text-theme-text',
              'transition-all duration-500 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-theme-primary">
              <PhoneIcon />
            </span>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-[18px] hover:text-theme-primary transition-colors"
            >
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div
            className={cn(
              'flex items-center gap-3 text-theme-text',
              'transition-all duration-500 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="text-theme-primary">
              <EmailIcon />
            </span>
            <a
              href={`mailto:${email}`}
              className="text-[18px] hover:text-theme-primary transition-colors"
            >
              {email}
            </a>
          </div>
        )}
      </div>

      {showMap && mapUrl && (
        <div
          className={cn(
            'mt-6 rounded-lg overflow-hidden',
            'transition-all duration-500 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <iframe
            src={mapUrl}
            width="100%"
            height={mapHeight || 250}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  )
}
