import { createClient } from '@supabase/supabase-js'

export type ContactSubmission = {
  id: string
  name: string
  email: string
  institution: string
  message: string
  created_at: string
}

let client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (client) return client
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase config')
  client = createClient(url, key)
  return client
}

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = getClient()
  const { data, error } = await (supabase as any)
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error('Failed to load submissions')
  return (data ?? []) as ContactSubmission[]
}
