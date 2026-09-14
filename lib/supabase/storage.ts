import type { SupabaseClient } from '@supabase/supabase-js'

// Bucket storage di project ini privat, jadi gambar harus diakses lewat
// signed URL. Halaman publik di-render dinamis, jadi URL selalu dibuat baru
// dan tidak pernah kedaluwarsa saat ditampilkan.
const SIGNED_URL_TTL = 60 * 60

export async function getSignedUrl(
  supabase: SupabaseClient,
  bucket: string,
  path: string | null | undefined
) {
  if (!path) return null

  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_TTL)

  return data?.signedUrl ?? null
}

// Versi batch: 1 request untuk banyak path sekaligus.
export async function getSignedUrlMap(
  supabase: SupabaseClient,
  bucket: string,
  paths: (string | null | undefined)[]
) {
  const unique = [...new Set(paths.filter((path): path is string => Boolean(path)))]
  const urls = new Map<string, string>()

  if (unique.length === 0) return urls

  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrls(unique, SIGNED_URL_TTL)

  data?.forEach((item) => {
    if (item.path && item.signedUrl) {
      urls.set(item.path, item.signedUrl)
    }
  })

  return urls
}
