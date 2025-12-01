import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields'
import { cardTypeOptions } from '@/blocks/UniversalCard/config'
import { revalidatePaginiEchipa } from './hooks/revalidatePaginiEchipa'

export const PaginiEchipa: GlobalConfig = {
  slug: 'pagini-echipa',
  label: 'Pagini Echipa',
  admin: {
    group: 'Setari',
    description: 'Setari pentru pagina de listare echipa si pagini individuale membri',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePaginiEchipa],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Hero Tab
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Titlu Hero',
              defaultValue: 'Echipa Noastra',
              admin: {
                placeholder: 'Echipa Noastra',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtitlu Hero',
              admin: {
                placeholder: 'Cunoaste antrenorii nostri profesionisti',
              },
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagine Fundal Hero',
            },
          ],
        },
        // Layout Tab
        {
          label: 'Layout',
          fields: [
            {
              name: 'columns',
              type: 'select',
              label: 'Numar coloane carduri',
              defaultValue: '3',
              options: [
                { label: '2 coloane', value: '2' },
                { label: '3 coloane', value: '3' },
                { label: '4 coloane', value: '4' },
              ],
            },
            {
              name: 'cardType',
              type: 'select',
              label: 'Tip Card (UniversalCard)',
              defaultValue: 'team',
              options: cardTypeOptions,
              admin: {
                description: 'Alege stilul cardurilor pentru listarea echipei',
              },
            },
            {
              name: 'showSpecialization',
              type: 'checkbox',
              label: 'Afiseaza specializare pe card',
              defaultValue: true,
            },
          ],
        },
        // SEO Tab - Listing Page
        {
          name: 'meta',
          label: 'SEO Listare',
          description: 'SEO pentru pagina de listare echipa',
          fields: [
            MetaTitleField({
              hasGenerateFn: false,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
          ],
        },
        // Individual Page Settings Tab
        {
          label: 'Pagini Individuale',
          description: 'Setari pentru paginile individuale ale antrenorilor (ex: /antrenori/marius)',
          fields: [
            {
              name: 'individualLayout',
              type: 'select',
              label: 'Stil Layout',
              defaultValue: 'sidebar',
              options: [
                { label: 'Cu sidebar (poza stanga, continut dreapta)', value: 'sidebar' },
                { label: 'Full width (poza sus, continut jos)', value: 'fullwidth' },
                { label: 'Hero cover (poza fundal hero)', value: 'hero-cover' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Sectiuni Vizibile',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'showExperience',
                  type: 'checkbox',
                  label: 'Afiseaza badge experienta',
                  defaultValue: true,
                },
                {
                  name: 'showSpecializations',
                  type: 'checkbox',
                  label: 'Afiseaza sectiune specializari',
                  defaultValue: true,
                },
                {
                  name: 'showContact',
                  type: 'checkbox',
                  label: 'Afiseaza informatii contact',
                  defaultValue: true,
                },
                {
                  name: 'showSocialMedia',
                  type: 'checkbox',
                  label: 'Afiseaza linkuri social media',
                  defaultValue: true,
                },
                {
                  name: 'showCTA',
                  type: 'checkbox',
                  label: 'Afiseaza sectiune CTA (Contacteaza-ne)',
                  defaultValue: true,
                },
                {
                  name: 'showRelatedMembers',
                  type: 'checkbox',
                  label: 'Afiseaza "Restul echipei"',
                  defaultValue: true,
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Texte CTA',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'ctaTitle',
                  type: 'text',
                  label: 'Titlu CTA',
                  defaultValue: 'Vrei sa lucrezi cu {name}?',
                  admin: {
                    description: 'Foloseste {name} pentru prenumele membrului',
                  },
                },
                {
                  name: 'ctaDescription',
                  type: 'textarea',
                  label: 'Descriere CTA',
                  defaultValue: 'Contacteaza-ne pentru a programa o sesiune de antrenament sau pentru mai multe informatii despre serviciile noastre.',
                },
                {
                  name: 'ctaButtonText',
                  type: 'text',
                  label: 'Text Buton Principal',
                  defaultValue: 'Contacteaza-ne',
                },
                {
                  name: 'ctaSecondaryButtonText',
                  type: 'text',
                  label: 'Text Buton Secundar',
                  defaultValue: 'Vezi clasele disponibile',
                },
              ],
            },
            {
              name: 'relatedMembersTitle',
              type: 'text',
              label: 'Titlu sectiune "Restul echipei"',
              defaultValue: 'Restul echipei',
            },
            {
              name: 'relatedMembersCount',
              type: 'number',
              label: 'Cati membri sa afiseze in "Restul echipei"',
              defaultValue: 3,
              min: 1,
              max: 6,
            },
          ],
        },
      ],
    },
  ],
}
