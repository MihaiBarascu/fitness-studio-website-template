'use client'
import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

// Inline spacing classes (client component)
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

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  style,
  workingHours,
  spacing,
}) => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
  const { ref: defaultRef, isVisible: defaultVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })

  const spacingClass = [
    spacing?.marginTop ? marginTopMap[spacing.marginTop] : '',
    spacing?.marginBottom ? marginBottomMap[spacing.marginBottom] : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (style === 'theme-feature') {
    // Original template: ml-lg-auto mr-lg-5 col-lg-5 | mr-lg-auto col-lg-4
    // Uses auto margins to center content with 3rem gap between columns
    return (
      <section className={`py-20 bg-theme-dark ${spacingClass}`}>
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - ml-lg-auto mr-lg-5 col-lg-5 */}
            <div
              ref={leftRef}
              className={cn(
                'flex flex-col justify-center w-full lg:w-5/12 lg:ml-auto lg:mr-12',
                'transition-all duration-700 ease-out',
                leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              {richText && (
                <RichText
                  className="mb-0 [&_h2]:text-white [&_h2]:mb-3 [&_h6]:text-white [&_h6]:mb-4 [&_p]:text-[#666262] [&_p]:text-[18px] [&_p]:leading-[1.5em] [&_p]:font-light"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {(links || []).length > 0 && (
                <div className="mt-3">
                  {links?.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className="custom-btn bg-color flex items-center justify-center w-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - mr-lg-auto col-lg-4 */}
            <div
              ref={rightRef}
              className={cn(
                'w-full lg:w-4/12 lg:mr-auto mt-3 lg:mt-0',
                'transition-all duration-700 ease-out',
                rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="about-working-hours">
                {workingHours && (
                  <RichText
                    className="mb-0 [&_h2]:text-white [&_h2]:mb-4 [&_strong]:text-white [&_strong]:block [&_strong]:opacity-85 [&_strong]:mt-3 first:[&_strong]:mt-0 [&_p]:text-[#666262] [&_p]:text-[18px] [&_p]:leading-[1.5em] [&_p]:font-light [&_p]:mb-0"
                    data={workingHours}
                    enableGutter={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default CTA styling
  return (
    <div className={`container ${spacingClass}`}>
      <div
        ref={defaultRef}
        className={cn(
          'bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center',
          'transition-all duration-700 ease-out',
          defaultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}
      >
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
