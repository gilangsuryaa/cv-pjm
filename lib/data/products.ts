import { createClient } from '@/lib/supabase/server'
import { getSignedUrlMap } from '@/lib/supabase/storage'

export type Product = {
  id: number
  name: string
  category: string | null
  brand: string | null
  type: string | null
  pk: number | null
  daya: number | null
  kapasitas: number | null
  price: number | null
  min_room_area: number | null
  max_room_area: number | null
  description: string | null
  stock_status: boolean | null
  created_at: string | null
  images: string[]
}

type ProductRow = Omit<Product, 'images'> & {
  product_images: { id: string; path: string; sort_order: number | null }[] | null
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(id, path, sort_order)')
    .order('created_at', { ascending: false })
    .order('sort_order', {
      referencedTable: 'product_images',
      ascending: true,
    })

  if (error || !data) return []

  const rows = data as unknown as ProductRow[]

  const signedUrls = await getSignedUrlMap(
    supabase,
    'products',
    rows.flatMap((row) => row.product_images?.map((image) => image.path) ?? [])
  )

  return rows.map(({ product_images, ...product }) => ({
    ...product,
    images:
      product_images
        ?.map((image) => signedUrls.get(image.path))
        .filter((url): url is string => Boolean(url)) ?? [],
  }))
}

export function formatRupiah(value: number | null | undefined) {
  if (value === null || value === undefined) return null
  return `Rp ${Number(value).toLocaleString('id-ID')}`
}

// Spesifikasi yang ditampilkan di kartu produk, hanya yang ada isinya.
export function getProductSpecs(product: Product): [string, string][] {
  const specs: [string, string][] = []

  if (product.kapasitas) {
    specs.push(['Kapasitas', `${Number(product.kapasitas).toLocaleString('id-ID')} BTU/h`])
  }

  if (product.pk) {
    specs.push(['PK', `${product.pk} PK`])
  }

  if (product.daya) {
    specs.push(['Daya', `${Number(product.daya).toLocaleString('id-ID')}W`])
  }

  if (product.type) {
    specs.push(['Tipe', product.type])
  }

  if (product.brand) {
    specs.push(['Brand', product.brand])
  }

  if (product.min_room_area !== null && product.max_room_area !== null) {
    specs.push([
      'Luas Ruangan',
      `${product.min_room_area} - ${product.max_room_area} m²`,
    ])
  }

  return specs
}
