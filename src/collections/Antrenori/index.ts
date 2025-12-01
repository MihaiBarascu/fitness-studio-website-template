import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateAntrenor, revalidateDelete } from './hooks/revalidateAntrenor'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields'

export const Antrenori: CollectionConfig<'antrenori'> = {
  slug: 'antrenori',
  labels: {
    singular: 'Antrenor',
    plural: 'Antrenori',
  },
  typescript: {
    interface: 'Antrenor',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    role: true,
    featuredImage: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'antrenori',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'antrenori',
        req,
      }),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nume',
      required: true,
    },
    slugField(),
    {
      name: 'role',
      type: 'text',
      label: 'Rol / Funcție',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagine principală',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Descriere scurtă',
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Biografie detaliată',
    },
    {
      name: 'experience',
      type: 'number',
      label: 'Ani experiență',
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'specializations',
      type: 'array',
      label: 'Specializări',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Specializare',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter URL',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    // SEO for individual antrenor pages
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'SEO pentru pagina individuala a antrenorului',
      },
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
  ],
  hooks: {
    afterChange: [revalidateAntrenor],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 20,
  },
}
