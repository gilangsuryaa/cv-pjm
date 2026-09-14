import { createClient } from '@/lib/supabase/server'
import { getSignedUrlMap } from '@/lib/supabase/storage'

export type Service = {
  id: number
  name: string
  slug: string | null
  description: string | null
  price: number | null
  image: string | null
  imageUrl: string | null
  status: boolean | null
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', true)
    .order('id', { ascending: true })

  if (error || !data) return []

  const rows = data as Omit<Service, 'imageUrl'>[]

  const signedUrls = await getSignedUrlMap(
    supabase,
    'services',
    rows.map((row) => row.image)
  )

  return rows.map((row) => ({
    ...row,
    imageUrl: row.image ? (signedUrls.get(row.image) ?? null) : null,
  }))
}

export async function getFaqs() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('status', true)
    .order('id', { ascending: true })

  if (error || !data) return []

  return data as { id: number; question: string; answer: string }[]
}
