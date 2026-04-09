import { createClient } from '@supabase/supabase-js'

type ContactSubmission = {
  name: string
  email: string
  institution: string
  message: string
}

export type ContactSubmissionRecord = ContactSubmission & {
  id: string
  submittedAt: string | null
}

let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Missing Supabase configuration.')
  }

  supabaseClient = createClient(url, anonKey)
  return supabaseClient
}

export async function submitContactSubmission(values: ContactSubmission) {
  const supabase = getSupabaseClient()

  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    institution: values.institution.trim(),
    message: values.message.trim(),
  }

  const { error } = await (supabase as any).from('contact_submissions').insert(payload)

  if (error) {
    throw new Error('Unable to submit inquiry right now.')
  }
}

function parseSubmissionRow(row: Record<string, unknown>, index: number): ContactSubmissionRecord {
  const id =
    typeof row.id === 'string'
      ? row.id
      : typeof row.id === 'number'
        ? String(row.id)
        : `entry-${index}`

  return {
    id,
    name: typeof row.name === 'string' ? row.name : 'Unknown',
    email: typeof row.email === 'string' ? row.email : 'Unknown',
    institution: typeof row.institution === 'string' ? row.institution : '',
    message: typeof row.message === 'string' ? row.message : '',
    submittedAt:
      typeof row.submitted_at === 'string'
        ? row.submitted_at
        : typeof row.created_at === 'string'
          ? row.created_at
          : null,
  }
}

export async function fetchContactSubmissions(limit = 50): Promise<ContactSubmissionRecord[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await (supabase as any).from('contact_submissions').select('*').limit(limit)

  if (error) {
    throw new Error('Unable to load submissions right now.')
  }

  if (!Array.isArray(data)) {
    return []
  }

  return data
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row, index) => parseSubmissionRow(row, index))
    .sort((a, b) => {
      const aTime = a.submittedAt ? new Date(a.submittedAt).getTime() : 0
      const bTime = b.submittedAt ? new Date(b.submittedAt).getTime() : 0
      return bTime - aTime
    })
}
