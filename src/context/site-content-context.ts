import { createContext } from 'react'
import type { SiteContent } from '../data/site'

export type SiteContentContextValue = {
  content: SiteContent
  resetContent: () => void
  saveContent: (nextContent: SiteContent) => void
}

export const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined)
