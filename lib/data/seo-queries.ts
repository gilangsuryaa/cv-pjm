import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { getSignedUrlMap } from '@/lib/supabase/storage'

// Id produk/album saja, tanpa signed URL. Dipakai oleh generateStaticParams
// dan generateMetadata yang berjalan tanpa HTTP request — di konteks itu
// `cookies()` tidak tersedia.
//
// createClient() tetap dipakai sebagai jalur normal. Kalau dipanggil di luar
// request (build time), cookies() melempar, dan kita jatuh ke client anon
// yang tidak butuh cookie sama sekali.
async function withClient<T>(
  run: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<T>
): Promise<T> {
  try {
    return await run(await createClient())
  } catch {
    const fallback = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    )

    return run(fallback as Awaited<ReturnType<typeof createClient>>)
  }
}

export async function getProductIds(): Promise<number[]> {
  return withClient(async (supabase) => {
    const { data, error } = await supabase.from('products').select('id')

    if (error || !data) return []

    return (data as { id: number }[]).map((row) => row.id)
  })
}

export async function getProduct(id: number) {
  return withClient(async (supabase) => {
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
  })
}

export async function getAlbumSummary(id: number) {
  return withClient(async (supabase) => {
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
  })
}
