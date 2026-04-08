import { createContext } from 'react'

export type AdminAuthStatus = 'authenticated' | 'setup' | 'signed_out'

export type AdminAuthResult = {
  message?: string
  success: boolean
}

export type AdminAuthContextValue = {
  adminEmail: string | null
  login: (email: string, password: string) => Promise<AdminAuthResult>
  logout: () => void
  setupAccount: (email: string, password: string) => Promise<AdminAuthResult>
  status: AdminAuthStatus
}

export const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined)
