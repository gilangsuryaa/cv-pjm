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
export function getSiteAssetUrl(path: string | null | undefined) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!path || !base) return null

  return `${base}/storage/v1/object/public/site-settings/${path}`
}
