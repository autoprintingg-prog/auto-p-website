import { useState, type ReactNode } from 'react'
import { AdminAuthContext, type AdminAuthResult, type AdminAuthStatus } from './admin-auth-context'

const CREDENTIALS_KEY = 'autoprint-admin-credentials'
const SESSION_KEY = 'autoprint-admin-session'

type StoredCredentials = {
  email: string
  passwordDigest: string
}

type StoredSession = {
  email: string
  signedInAt: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readStoredCredentials(): StoredCredentials | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(CREDENTIALS_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)

    if (!isRecord(parsed)) {
      return null
    }

    if (typeof parsed.email !== 'string' || typeof parsed.passwordDigest !== 'string') {
      return null
    }

    return {
      email: parsed.email,
      passwordDigest: parsed.passwordDigest,
    }
  } catch {
    return null
  }
}

function readStoredSession(): StoredSession | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)

    if (!isRecord(parsed) || typeof parsed.email !== 'string' || typeof parsed.signedInAt !== 'string') {
      return null
    }

    return {
      email: parsed.email,
      signedInAt: parsed.signedInAt,
    }
  } catch {
    return null
  }
}

function createDigest(password: string) {
  let hash = 5381

  for (let index = 0; index < password.length; index += 1) {
    hash = (hash * 33) ^ password.charCodeAt(index)
  }

  return `djb2-${(hash >>> 0).toString(16)}`
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<StoredCredentials | null>(readStoredCredentials)
  const [session, setSession] = useState<StoredSession | null>(readStoredSession)

  const status: AdminAuthStatus = credentials
    ? session?.email === credentials.email
      ? 'authenticated'
      : 'signed_out'
    : 'setup'

  const persistSession = (email: string) => {
    const nextSession = {
      email,
      signedInAt: new Date().toISOString(),
    }

    setSession(nextSession)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
    }
  }

  const setupAccount = async (email: string, password: string): Promise<AdminAuthResult> => {
    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail || password.trim().length < 6) {
      return {
        success: false,
        message: 'Use a valid email and a password with at least 6 characters.',
      }
    }

    const nextCredentials = {
      email: normalizedEmail,
      passwordDigest: createDigest(password),
    }

    setCredentials(nextCredentials)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(nextCredentials))
    }

    persistSession(normalizedEmail)

    return {
      success: true,
      message: 'Admin account created.',
    }
  }

  const login = async (email: string, password: string): Promise<AdminAuthResult> => {
    if (!credentials) {
      return {
        success: false,
        message: 'Set up the admin account first.',
      }
    }

    const normalizedEmail = normalizeEmail(email)
    const digest = createDigest(password)

    if (normalizedEmail !== credentials.email || digest !== credentials.passwordDigest) {
      return {
        success: false,
        message: 'Incorrect email or password.',
      }
    }

    persistSession(normalizedEmail)

    return {
      success: true,
      message: 'Signed in.',
    }
  }

  const logout = () => {
    setSession(null)

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_KEY)
    }
  }

  const value = {
    adminEmail: session?.email ?? credentials?.email ?? null,
    login,
    logout,
    setupAccount,
    status,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}
