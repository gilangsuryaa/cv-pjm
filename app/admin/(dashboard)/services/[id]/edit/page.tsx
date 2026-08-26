'use client'

import { FormEvent, useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

import ImageUpload from '@/components/admin/image-upload'

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function EditServicePage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const id = params.id as string

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [status, setStatus] = useState(true)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getService() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setName(data.name)
      setSlug(data.slug)
      setDescription(data.description ?? '')
      setPrice(data.price?.toString() ?? '')
      setStatus(data.status)
      setImage(data.image ?? '')

      if (data.image) {
        const { data: signedUrlData } =
          await supabase.storage
            .from('services')
            .createSignedUrl(data.image, 60 * 60)

        setImagePreview(
          signedUrlData?.signedUrl ?? ''
        )
      }

      setLoading(false)
    }

    getService()
  }, [id])

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('services')
      .update({
        name,
        slug,
        description: description || null,
        price: price ? Number(price) : null,
        image: image || null,
        status,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/services')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          Memuat data layanan...
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Layanan
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Ubah informasi layanan yang sudah ada.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Nama */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Layanan
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              const value = e.target.value
              setName(value)
              setSlug(generateSlug(value))
            }}
            required
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Slug */}
        <div className="mb-5">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>

          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) =>
              setSlug(generateSlug(e.target.value))
            }
            required
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          <p className="mt-1.5 text-xs text-gray-500">
            URL: /layanan/{slug}
          </p>
        </div>

        {/* Deskripsi */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Deskripsi
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={5}
            className="mt-2 block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Harga */}
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Harga
          </label>

          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            min="0"
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          <p className="mt-1.5 text-xs text-gray-500">
            Masukkan harga dalam Rupiah.
          </p>
        </div>

        {/* Gambar */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Gambar Layanan
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="services"
              value={image}
              previewUrl={imagePreview}
              onChange={(path) => {
                setImage(path)
                setImagePreview('')
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span>Aktif</span>
          </label>

          <p className="mt-1.5 ml-6 text-xs text-gray-500">
            Layanan aktif akan ditampilkan sebagai layanan yang tersedia.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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