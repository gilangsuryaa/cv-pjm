import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Dua lapis cache untuk query Supabase di halaman publik.
//
// `cache()` dari React hanya menahan hasil selama satu render pass, jadi
// `getSiteSettings()` yang dipanggil layout, generateMetadata, dan page
// tidak menembak database tiga kali dalam satu request. `unstable_cache`
// menyimpannya antar-request supaya request berikutnya tidak menyentuh
// database sama sekali.
//
// Query di dalam cache scope tidak boleh menyentuh `cookies()`, karena
// Next.js melempar error untuk sumber data dinamis di dalam cache scope.
// Semua tabel yang dibaca di sini bersifat publik dan dilindungi RLS untuk
// role anon, jadi cukup pakai client anon tanpa cookie.
//
// Panel admin punya query sendiri, sehingga hasil edit admin tetap langsung
// terlihat di halaman admin (paling lambat 60 detik kemudian di halaman
// publik, atau seketika kalau `revalidateTag` dipanggil dari admin).
export const CACHE_TAGS = {
  siteSettings: 'site-settings',
  services: 'services',
  faqs: 'faqs',
  products: 'products',
  albums: 'albums',
} as const

// Konten katalog jarang berubah dibanding jumlah kunjungan; satu menit sudah
// cukup untuk membuat hampir semua request dilayani dari cache.
const REVALIDATE_SECONDS = 60

// createClient() dari lib/supabase/server butuh cookie, jadi tidak bisa
// dipakai di cache scope. Client anon ini setara untuk tabel publik dan
// tetap memakai RLS.
function anonClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// `signedUrlTtl` dipakai untuk membuang cache lebih awal daripada umur
// signed URL Supabase (1 jam), supaya URL gambar tidak kedaluwarsa saat
// halaman disajikan dari cache.
export function cachedQuery<Result>(
  keyParts: string[],
  tags: string[],
  run: (supabase: ReturnType<typeof anonClient>) => Promise<Result>,
  signedUrlTtl?: number
) {
  const cached = unstable_cache(
    () => run(anonClient()),
    [...keyParts, `v${REVALIDATE_SECONDS}`],
    {
      tags,
      revalidate: signedUrlTtl
        ? Math.min(REVALIDATE_SECONDS, signedUrlTtl)
        : REVALIDATE_SECONDS,
    }
  )

  return cache(cached)
}
