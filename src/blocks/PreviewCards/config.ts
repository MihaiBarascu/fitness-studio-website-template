import type { Block } from 'payload'

import { spacingField } from '@/fields/spacing'
import { cardTypeOptions } from '@/blocks/UniversalCard/config'

export const PreviewCards: Block = {
  slug: 'previewCards',
  labels: {
    singular: 'Preview Cards',
    plural: 'Preview Cards',
  },
  fields: [
    spacingField,
    {
      name: 'cardType',
      type: 'select',
      label: 'Tip Card (UniversalCard)',
      defaultValue: 'team',
      options: cardTypeOptions,
      admin: {
        description: 'Alege stilul vizual al cardurilor',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Numar coloane',
      defaultValue: '3',
      options: [
        { label: '2 coloane', value: '2' },
        { label: '3 coloane', value: '3' },
        { label: '4 coloane', value: '4' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Carduri',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titlu',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitlu',
          admin: {
            description: 'Ex: "Antrenor Principal" sau "Bella" (numele antrenorului)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descriere',
          admin: {
            description: 'Descriere scurtă a clasei/serviciului',
          },
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          admin: {
            description: 'Ex: "Popular", "Reducere 20%", "Nou"',
          },
        },
        {
          name: 'badgeColor',
          type: 'select',
          label: 'Culoare Badge',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Roșu)', value: 'primary' },
            { label: 'Success (Verde)', value: 'success' },
            { label: 'Warning (Galben)', value: 'warning' },
            { label: 'Dark (Negru)', value: 'dark' },
          ],
          admin: {
            condition: (_, siblingData) => !!siblingData?.badge,
          },
        },
        {
          name: 'price',
          type: 'group',
          label: 'Preț',
          fields: [
            {
              name: 'amount',
              type: 'number',
              label: 'Sumă (RON)',
            },
            {
              name: 'period',
              type: 'text',
              label: 'Perioadă',
              admin: {
                placeholder: '/lună, /ședință',
              },
            },
            {
              name: 'oldPrice',
              type: 'number',
              label: 'Preț Vechi (reducere)',
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Evidențiat (stil special)',
          defaultValue: false,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Tip Link',
              defaultValue: 'reference',
              options: [
                { label: 'Pagină / Colecție', value: 'reference' },
                { label: 'URL Custom', value: 'custom' },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'reference',
              type: 'relationship',
              label: 'Link către',
              relationTo: ['pages', 'antrenori', 'clase'],
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL Custom',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                placeholder: '/contact sau https://example.com',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Deschide în tab nou',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
