import { useMemo, useState, type ReactNode } from 'react'
import { cloneSiteContent, defaultSiteContent, mergeSiteContent, type SiteContent } from '../data/site'
import { SiteContentContext } from './site-content-context'

const STORAGE_KEY = 'autoprint-site-content'

function getInitialContent(): SiteContent {
  if (typeof window === 'undefined') {
    return cloneSiteContent(defaultSiteContent)
  }

  const savedContent = window.localStorage.getItem(STORAGE_KEY)

  if (!savedContent) {
    return cloneSiteContent(defaultSiteContent)
  }

  try {
    return mergeSiteContent(JSON.parse(savedContent))
  } catch {
    return cloneSiteContent(defaultSiteContent)
  }
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getInitialContent)

  const saveContent = (nextContent: SiteContent) => {
    const merged = mergeSiteContent(nextContent)
    setContent(merged)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    }
  }

  const resetContent = () => {
    const fallback = cloneSiteContent(defaultSiteContent)
    setContent(fallback)

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const value = useMemo(
    () => ({
      content,
      saveContent,
      resetContent,
    }),
    [content],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}
