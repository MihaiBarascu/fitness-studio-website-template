'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState, useMemo, Suspense } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

interface SpacingConfig {
  marginTop?: string | null
  marginBottom?: string | null
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  nested?: boolean
  spacing?: SpacingConfig | null
}

/**
 * Construiește valorile implicite pentru câmpurile formularului
 * Extrage defaultValue din fiecare câmp (dacă există)
 */
const buildFieldDefaults = (
  formFields: FormFieldBlock[] | undefined
): Record<string, string> => {
  const defaults: Record<string, string> = {}
  if (!formFields) return defaults

  formFields.forEach((field) => {
    if ('name' in field && field.name) {
      // Extrage defaultValue din câmp sau string gol
      if ('defaultValue' in field && field.defaultValue) {
        defaults[field.name] = String(field.defaultValue)
      } else {
        defaults[field.name] = ''
      }
    }
  })

  return defaults
}

/**
 * URL Prefill: Citește parametrii din URL și returnează default values pentru form
 * Funcționează automat - dacă URL are ?name=John&email=test@mail.com,
 * câmpurile cu acele names vor fi pre-completate
 */
const getUrlDefaults = (
  searchParams: URLSearchParams,
  formFields: FormFieldBlock[] | undefined
): Record<string, string> => {
  const defaults: Record<string, string> = {}
  if (!formFields) return defaults

  formFields.forEach((field) => {
    if ('name' in field && field.name) {
      const urlValue = searchParams.get(field.name)
      if (urlValue) {
        defaults[field.name] = urlValue
      }
    }
  })

  return defaults
}

// Inner component that uses useSearchParams (needs Suspense boundary)
const FormBlockInner: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    nested = false,
    spacing,
  } = props

  // Spacing classes (inline since this is a client component)
  const marginTopMap: Record<string, string> = {
    none: '', xs: 'mt-1', sm: 'mt-2', md: 'mt-4', lg: 'mt-8', xl: 'mt-12', '2xl': 'mt-16', '3xl': 'mt-24',
  }
  const marginBottomMap: Record<string, string> = {
    none: '', xs: 'mb-1', sm: 'mb-2', md: 'mb-4', lg: 'mb-8', xl: 'mb-12', '2xl': 'mb-16', '3xl': 'mb-24',
  }
  const spacingClass = [
    spacing?.marginTop ? marginTopMap[spacing.marginTop] : '',
    spacing?.marginBottom ? marginBottomMap[spacing.marginBottom] : '',
  ].filter(Boolean).join(' ')

  // URL Prefill: citește parametrii din URL și aplică-i ca default values
  const searchParams = useSearchParams()

  // Construiește default values: mai întâi din câmpuri, apoi override cu URL params
  const fieldDefaults = useMemo(
    () => buildFieldDefaults(formFromProps?.fields),
    [formFromProps?.fields]
  )
  const urlDefaults = useMemo(
    () => getUrlDefaults(searchParams, formFromProps?.fields),
    [searchParams, formFromProps?.fields]
  )

  const formMethods = useForm({
    defaultValues: {
      ...fieldDefaults,  // Valorile implicite din definițiile câmpurilor
      ...urlDefaults,    // Override cu valorile din URL (dacă există)
    },
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Record<string, string>) => {
      const submitForm = async () => {
        setError(undefined)
        setIsLoading(true) // Loading imediat la click

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  // When nested inside another block (like Content), skip the container wrapper
  const Wrapper = nested
    ? ({ children }: { children: React.ReactNode }) => <div className={spacingClass}>{children}</div>
    : ({ children }: { children: React.ReactNode }) => (
      <div className={`container ${spacingClass}`}>{children}</div>
    )

  return (
    <Wrapper>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}

      <div className={nested ? '' : 'lg:max-w-[48rem] mx-auto'}>
      <div className="theme-form-style p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button
                form={formID}
                type="submit"
                variant="default"
                disabled={isLoading}
                className="min-w-[140px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Se trimite...
                  </span>
                ) : (
                  submitButtonLabel
                )}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
      </div>
    </Wrapper>
  )
}

// Fallback component for Suspense
const FormBlockFallback: React.FC = () => (
  <div className="container">
    <div className="lg:max-w-[48rem] mx-auto">
      <div className="theme-form-style p-4 lg:p-6 border border-border rounded-[0.8rem] animate-pulse">
        <div className="h-10 bg-muted rounded mb-4" />
        <div className="h-10 bg-muted rounded mb-4" />
        <div className="h-10 bg-muted rounded mb-4" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>
    </div>
  </div>
)

// Main export wrapped in Suspense (required for useSearchParams in Next.js 15)
export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  return (
    <Suspense fallback={<FormBlockFallback />}>
      <FormBlockInner {...props} />
    </Suspense>
  )
}
