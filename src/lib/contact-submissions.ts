import { createClient } from '@supabase/supabase-js'

type ContactSubmission = {
  name: string
  email: string
  institution: string
  message: string
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
