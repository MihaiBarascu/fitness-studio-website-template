import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'ro_RO',
  description: 'Transilvania Fitness - Sală de fitness modernă în Cluj-Napoca. Antrenamente personalizate, clase de grup, SPA și wellness.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.webp`,
      width: 1200,
      height: 630,
      alt: 'Transilvania Fitness - Sală de Fitness Cluj-Napoca',
    },
  ],
  siteName: 'Transilvania Fitness',
  title: 'Transilvania Fitness - Sală de Fitness Cluj-Napoca',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
