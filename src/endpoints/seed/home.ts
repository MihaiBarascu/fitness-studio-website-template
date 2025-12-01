import type { Clase, Form, Media, Antrenor } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type HomeArgs = {
  heroImage: Media
  teamMembers: Antrenor[]
  classes: Clase[]
  contactForm: Form
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  teamMembers,
  classes,
  contactForm,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Începe acum',
            url: '#feature',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Află mai mult',
            url: '#about',
          },
        },
      ],
      media: heroImage.id,
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
                  text: 'un mod de a construi un stil de viață sănătos!',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h4',
              version: 1,
            },
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Transformă-ți corpul și mintea',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
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
    layout: [
      {
        blockName: 'Caracteristici Transilvania Gym',
        blockType: 'cta',
        style: 'theme-feature',
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Devino membru astăzi',
              url: '#membership',
            },
          },
        ],
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
                    text: 'Nou la Transilvania Gym?',
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
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Abonamentul tău este GRATUIT până la 2 luni (250 RON pe lună)',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h6',
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
                    text: 'Transformă-ți corpul și mintea la Transilvania Gym. Alătură-te miilor de persoane care au descoperit deja noul mod de a construi un stil de viață sănătos cu echipamentele noastre de ultimă generație și antrenorii noștri experți.',
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
        workingHours: {
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
                    text: 'Program de lucru',
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
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Duminică : Închis',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Luni - Vineri',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
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
                    text: '07:00 - 22:00',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Sâmbătă',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
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
                    text: '06:00 - 16:00',
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
      {
        blockType: 'content',
        backgroundColor: 'light',
        columns: [
          {
            size: 'oneThird',
            textStyle: {
              lineHeight: 'relaxed',
              fontSize: 'lg',
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
                        text: 'Salut, suntem ',
                        version: 1,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 128,
                        mode: 'normal',
                        style: '',
                        text: 'Transilvania',
                        version: 1,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: ' Gym',
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
                        text: 'Echipa noastră de antrenori profesioniști este dedicată să te ajute să îți atingi obiectivele de fitness. Cu experiență vastă și certificări internaționale, suntem aici pentru tine.',
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
          {
            size: 'twoThirds',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'base',
              letterSpacing: 'normal',
              paragraphSpacing: 'normal',
            },
            blocks: [
              {
                blockType: 'previewCards',
                cardType: 'team',
                columns: '2',
                cards: teamMembers.slice(0, 2).map((member) => ({
                  image: member.featuredImage as string,
                  title: member.title,
                  subtitle: member.role || 'Antrenor Fitness',
                  link: {
                    type: 'reference' as const,
                    reference: {
                      relationTo: 'antrenori' as const,
                      value: member.id,
                    },
                  },
                })),
              },
            ],
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            textStyle: {
              lineHeight: 'tight',
              fontSize: 'base',
              letterSpacing: 'wide',
              paragraphSpacing: 'none',
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
                        text: 'Obține un Corp Perfect',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: 'center',
                    indent: 0,
                    tag: 'h6',
                    version: 1,
                  },
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Clasele Noastre de Antrenament',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: 'center',
                    indent: 0,
                    tag: 'h2',
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
                blockType: 'previewCards',
                cardType: 'class',
                columns: '3',
                spacing: {
                  marginTop: 'lg',
                },
                cards: classes.slice(0, 3).map((cls) => ({
                  image: cls.featuredImage as string,
                  title: cls.title,
                  subtitle: typeof cls.trainer === 'object' ? cls.trainer?.title : 'Antrenor',
                  description: cls.description || 'Descoperă beneficiile acestei clase și transformă-ți corpul.',
                  badge: cls.price?.dropIn ? `${cls.price.dropIn} RON` : undefined,
                  link: {
                    type: 'reference' as const,
                    reference: {
                      relationTo: 'clase' as const,
                      value: cls.id,
                    },
                  },
                })),
              },
            ],
          },
        ],
      },
      {
        blockType: 'schedule',
        scheduleType: 'advancedGlobal',
        title: 'Programul Nostru Săptămânal',
        style: 'default',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'lg',
              letterSpacing: 'normal',
              paragraphSpacing: 'lg',
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
                        text: 'Trimite-ne un mesaj',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h2',
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
                blockType: 'formBlock',
                form: typeof contactForm.id === 'string' ? contactForm.id : String(contactForm.id),
                enableIntro: false,
              },
            ],
          },
          {
            size: 'half',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'base',
              letterSpacing: 'normal',
              paragraphSpacing: 'normal',
            },
            blocks: [
              {
                blockType: 'mapBlock',
                mapSource: 'global',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      description:
        'Transformă-ți corpul la Transilvania Gym - Un nou mod de a construi un stil de viață sănătos!',
      image: heroImage.id,
      title: 'Transilvania Gym',
    },
    title: 'Acasă',
  }
}
