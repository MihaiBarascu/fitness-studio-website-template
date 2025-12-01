import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePaginiEchipa: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pagini-echipa settings`)

    revalidateTag('global_pagini-echipa')
    revalidatePath('/antrenori', 'page')
  }

  return doc
}
