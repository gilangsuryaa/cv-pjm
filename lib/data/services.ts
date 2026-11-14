import { getSignedUrlMap } from '@/lib/supabase/storage'
import { CACHE_TAGS, cachedQuery } from '@/lib/data/cached'

type Supabase = Parameters<Parameters<typeof cachedQuery>[2]>[0]

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

async function fetchServices(supabase: Supabase): Promise<Service[]> {
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

export const getServices = cachedQuery(
  ['services'],
  [CACHE_TAGS.services],
  fetchServices
)

async function fetchFaqs(supabase: Supabase) {
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('status', true)
    .order('id', { ascending: true })

  if (error || !data) return []

  return data as { id: number; question: string; answer: string }[]
}

export const getFaqs = cachedQuery(['faqs'], [CACHE_TAGS.faqs], fetchFaqs)
