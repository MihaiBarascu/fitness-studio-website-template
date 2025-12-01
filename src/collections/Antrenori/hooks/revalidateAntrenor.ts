import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Antrenor } from '../../../payload-types'

export const revalidateAntrenor: CollectionAfterChangeHook<Antrenor> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/antrenori/${doc.slug}`

      payload.logger.info(`Revalidating antrenor at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/antrenori')
      revalidateTag('antrenori')
    }

    // If the antrenor was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/antrenori/${previousDoc.slug}`

      payload.logger.info(`Revalidating old antrenor at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/antrenori')
      revalidateTag('antrenori')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Antrenor> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    const path = `/antrenori/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/antrenori')
    revalidateTag('antrenori')
  }

  return doc
}
