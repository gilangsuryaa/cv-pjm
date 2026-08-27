'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload-sitesettings'

type SiteSettings = {
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
  maps_url: string | null
  instagram_url: string | null
  facebook_url: string | null
}

export default function SiteSettingsPage() {
  const supabase = createClient()

  const [settings, setSettings] =
    useState<SiteSettings | null>(null)

  const [companyName, setCompanyName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [favicon, setFavicon] = useState('')
  const [logoPreview, setLogoPreview] = useState('')
  const [faviconPreview, setFaviconPreview] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [mapsUrl, setMapsUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function getSettings() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setSettings(data)

      setCompanyName(data.company_name ?? '')
      setTagline(data.tagline ?? '')
      setDescription(data.description ?? '')
      setLogo(data.logo ?? '')
      setFavicon(data.favicon ?? '')

      if (data.logo) {
        const { data: logoUrl } = supabase.storage
          .from('site-settings')
          .getPublicUrl(data.logo)
        
        setLogoPreview(logoUrl.publicUrl)
      }

      if (data.favicon) {
        const { data: faviconUrl } = supabase.storage
          .from('site-settings')
          .getPublicUrl(data.favicon)

        setFaviconPreview(faviconUrl.publicUrl)
      }

      setPhone(data.phone ?? '')
      setWhatsapp(data.whatsapp ?? '')
      setEmail(data.email ?? '')
      setAddress(data.address ?? '')
      setMapsUrl(data.maps_url ?? '')
      setInstagramUrl(data.instagram_url ?? '')
      setFacebookUrl(data.facebook_url ?? '')

      setLoading(false)
    }

    getSettings()
  }, [supabase])

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (!settings) return

    setSaving(true)
    setError('')
    setSuccess('')

    const { error } = await supabase
      .from('site_settings')
      .update({
        company_name: companyName || null,
        tagline: tagline || null,
        description: description || null,
        logo: logo || null,
        favicon: favicon || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        email: email || null,
        address: address || null,
        maps_url: mapsUrl || null,
        instagram_url: instagramUrl || null,
        facebook_url: facebookUrl || null,
      })
      .eq('id', settings.id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    setSuccess('Pengaturan berhasil disimpan.')
    setSaving(false)
  }

  if (loading) {
    return (
      <p className="text-gray-600">
        Memuat pengaturan...
      </p>
    )
  }

  if (!settings) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        Data site settings tidak ditemukan.
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Site Settings
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Kelola informasi utama website.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Company */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Informasi Perusahaan
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Perusahaan
              </label>

              <input
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Tagline
              </label>

              <input
                type="text"
                value={tagline}
                onChange={(e) =>
                  setTagline(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Branding
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>

              <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
                <ImageUpload
                  bucket="site-settings"
                  value={logo}
                  previewUrl={logoPreview}
                  filePath="logo"
                  onChange={(path) => {
                    setLogo(path)
                    setLogoPreview(
                      supabase.storage
                        .from('site-settings')
                        .getPublicUrl(path).data.publicUrl
                    )
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Favicon
              </label>

              <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
                <ImageUpload
                  bucket="site-settings"
                  value={favicon}
                  previewUrl={faviconPreview}
                  filePath="favicon"
                  onChange={(path) => {
                    setFavicon(path)
                    setFaviconPreview(
                      supabase.storage
                        .from('site-settings')
                        .getPublicUrl(path).data.publicUrl
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Kontak
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Telepon
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                WhatsApp
              </label>

              <input
                type="text"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Alamat
              </label>

              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Sosial Media & Maps
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Maps URL
              </label>

              <input
                type="url"
                value={mapsUrl}
                onChange={(e) =>
                  setMapsUrl(e.target.value)
                }
                placeholder="https://maps.google.com/..."
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Instagram URL
              </label>

              <input
                type="url"
                value={instagramUrl}
                onChange={(e) =>
                  setInstagramUrl(e.target.value)
                }
                placeholder="https://instagram.com/..."
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Facebook URL
              </label>

              <input
                type="url"
                value={facebookUrl}
                onChange={(e) =>
                  setFacebookUrl(e.target.value)
                }
                placeholder="https://facebook.com/..."
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Submit */}
        <div className="border-t border-gray-200 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving
              ? 'Menyimpan...'
              : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}