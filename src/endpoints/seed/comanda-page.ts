import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ComandaArgs = {
  comandaForm: Form
}

export const comanda: (args: ComandaArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  comandaForm,
}) => {
  return {
    slug: 'comanda',
    _status: 'published',
    title: 'Finalizează Comanda',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'content',
        backgroundColor: 'white',
        columns: [
          {
            size: 'twoThirds',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'lg',
              letterSpacing: 'normal',
              paragraphSpacing: 'lg',
            },
            richText: null,
            blocks: [
              {
                blockType: 'formBlock',
                form: typeof comandaForm.id === 'string' ? comandaForm.id : String(comandaForm.id),
                enableIntro: true,
                introContent: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Finalizează Comanda',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        tag: 'h2',
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Completează formularul de mai jos și te vom contacta pentru finalizarea comenzii.',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        textFormat: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
          {
            size: 'oneThird',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'base',
              letterSpacing: 'normal',
              paragraphSpacing: 'normal',
            },
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Ai nevoie de ajutor?',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Dacă ai întrebări despre abonamente sau servicii, ne poți contacta direct.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            blocks: [
              {
                blockType: 'contactInfoBlock',
                source: 'global',
                title: 'Contact Direct',
                showMap: false,
                style: 'compact',
              },
            ],
          },
        ],
      },
    ],
  }
}
