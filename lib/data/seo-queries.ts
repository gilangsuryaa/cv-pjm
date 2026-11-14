import { getSignedUrlMap } from '@/lib/supabase/storage'
import { CACHE_TAGS, cachedQuery } from '@/lib/data/cached'

// Query ringan untuk metadata dan generateStaticParams. Client Supabase
// disediakan oleh cachedQuery() (anon, tanpa cookie), jadi modul ini aman
// dipanggil di dalam cache scope.

export async function getProductIds(): Promise<number[]> {
  const cached = cachedQuery(
    ['product-ids'],
    [CACHE_TAGS.products],
    async (supabase) => {
      const { data, error } = await supabase.from('products').select('id')

      if (error || !data) return []

      return (data as { id: number }[]).map((row) => row.id)
    }
  )

  return cached()
}

export async function getProduct(id: number) {
  const cached = cachedQuery(
    ['product', String(id)],
    [CACHE_TAGS.products],
    async (supabase) => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(id, path, sort_order)')
        .eq('id', id)
        .maybeSingle()

      if (error || !data) return null

      const row = data as {
        id: number
        name: string
        brand: string | null
        price: number | null
        description: string | null
        stock_status: boolean | null
        product_images: { path: string; sort_order: number | null }[] | null
      }

      const signedUrls = await getSignedUrlMap(
        supabase,
        'products',
        row.product_images?.map((image) => image.path) ?? []
      )

      const images = (row.product_images ?? [])
        .slice()
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((image) => signedUrls.get(image.path))
        .filter((url): url is string => Boolean(url))

      return {
        id: row.id,
        name: row.name,
        brand: row.brand,
        price: row.price,
        description: row.description,
        inStock: row.stock_status !== false,
        image: images[0] ?? null,
      }
    }
  )

  return cached()
}

export async function getAlbumSummary(id: number) {
  const cached = cachedQuery(
    ['album-summary', String(id)],
    [CACHE_TAGS.albums],
    async (supabase) => {
      const { data, error } = await supabase
        .from('albums')
        .select('id, title, description, location, cover_image')
        .eq('id', id)
        .eq('status', true)
        .maybeSingle()

      if (error || !data) return null

      return data as {
        id: number
        title: string
        description: string | null
        location: string | null
        cover_image: string | null
      }
    }
  )

  return cached()
}
