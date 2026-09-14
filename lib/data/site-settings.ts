import { createClient } from '@/lib/supabase/server'

export type SiteSettings = {
  id: number
  company_name: string | null
  tagline: string | null
  description: string | null
  logo: string | null
  favicon: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  address: string | null
  branch: string | null
  maps_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  updated_at: string | null
}

// Dipakai kalau tabel site_settings belum terisi / gagal diambil,
// supaya halaman publik tetap tampil wajar.
export const SITE_SETTINGS_FALLBACK: SiteSettings = {
  id: 0,
  company_name: 'CV. Prima Jaya Mandiri',
  tagline: 'Layanan Teknik & Pemeliharaan',
  description: null,
  logo: null,
  favicon: null,
  phone: null,
  whatsapp: null,
  email: null,
  address: null,
  branch: null,
  maps_url: null,
  instagram_url: null,
  facebook_url: null,
  updated_at: null,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error || !data) {
    return SITE_SETTINGS_FALLBACK
  }

  return data as SiteSettings
}

// "0817 263 597" / "+62 819-4953-2643" -> "6281726359" style nomor wa.me
export function toWhatsappNumber(value: string | null | undefined) {
  if (!value) return null

  const digits = value.replace(/\D/g, '')
  if (!digits) return null

  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`

  return digits
}

export function buildWhatsappUrl(
  value: string | null | undefined,
  message: string
) {
  const number = toWhatsappNumber(value)
  if (!number) return null

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function formatPhoneHref(value: string | null | undefined) {
  if (!value) return null
  return `tel:${value.replace(/[^\d+]/g, '')}`
}

// Bucket "site-settings" bersifat publik, jadi cukup pakai public URL.
//
// Logo dan favicon selalu ditimpa ke path yang sama ("logo" / "favicon"),
// jadi URL-nya tidak berubah saat admin menggantinya dan browser bisa
// terus menyajikan versi lama dari cache. Stempel waktu update dipakai
// sebagai penanda versi supaya URL-nya ikut berubah.
export function getSiteAssetUrl(
  path: string | null | undefined,
  version?: string | null
) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!path || !base) return null

  const url = `${base}/storage/v1/object/public/site-settings/${path}`

  return version ? `${url}?v=${encodeURIComponent(version)}` : url
}
