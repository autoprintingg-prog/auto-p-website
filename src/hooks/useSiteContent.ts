import { useContext, useMemo } from 'react'
import { buildSiteContentView } from '../data/site'
import { SiteContentContext } from '../context/site-content-context'

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error('useSiteContent must be used inside SiteContentProvider')
  }

  return useMemo(
    () => ({
      ...buildSiteContentView(context.content),
      content: context.content,
      resetContent: context.resetContent,
      saveContent: context.saveContent,
    }),
    [context],
  )
}
