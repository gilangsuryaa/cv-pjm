'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'

export default function EditTestimonialPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const id = params.id as string

  const [customerName, setCustomerName] = useState('')
  const [customerLocation, setCustomerLocation] = useState('')
  const [rating, setRating] = useState('5')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [status, setStatus] = useState(true)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getTestimonial() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setCustomerName(data.customer_name ?? '')
      setCustomerLocation(data.customer_location ?? '')
      setRating(data.rating?.toString() ?? '5')
      setMessage(data.message ?? '')
      setStatus(data.status ?? true)

      setImage(data.image ?? '')

      if (data.image) {
        const { data: signedUrlData } =
          await supabase.storage
            .from('testimonials')
            .createSignedUrl(data.image, 60 * 60)

        setImagePreview(
          signedUrlData?.signedUrl ?? ''
        )
      }

      setLoading(false)
    }

    getTestimonial()
  }, [id, supabase])

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setSaving(true)
    setError('')

    // Ambil gambar lama dari database
    const { data: currentTestimonial, error: fetchError } =
      await supabase
        .from('testimonials')
        .select('image')
        .eq('id', id)
        .single()

    if (fetchError) {
      setError(fetchError.message)
      setSaving(false)
      return
    }

    const oldImage = currentTestimonial?.image ?? null

    // Update data testimonial
    const { error: updateError } = await supabase
      .from('testimonials')
      .update({
        customer_name: customerName,
        customer_location: customerLocation || null,
        rating: Number(rating),
        message,
        image: image || null,
        status,
      })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    // Kalau gambar berubah, hapus gambar lama dari Storage
    if (oldImage && oldImage !== image) {
      const { error: removeError } = await supabase.storage
        .from('testimonials')
        .remove([oldImage])

      if (removeError) {
        setError(
          `Data berhasil disimpan, tetapi gambar lama gagal dihapus: ${removeError.message}`
        )
        setSaving(false)
        return
      }
    }

    router.push('/admin/testimonials')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          Memuat data testimonial...
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Testimonial
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Ubah informasi testimonial pelanggan.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Customer Name */}
        <div className="mb-5">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Customer
          </label>

          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            required
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label
            htmlFor="customerLocation"
            className="block text-sm font-medium text-gray-700"
          >
            Lokasi
          </label>

          <input
            id="customerLocation"
            type="text"
            value={customerLocation}
            onChange={(e) =>
              setCustomerLocation(e.target.value)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="5">
              ★★★★★ — 5
            </option>

            <option value="4">
              ★★★★☆ — 4
            </option>

            <option value="3">
              ★★★☆☆ — 3
            </option>

            <option value="2">
              ★★☆☆☆ — 2
            </option>

            <option value="1">
              ★☆☆☆☆ — 1
            </option>
          </select>
        </div>

        {/* Message */}
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Pesan
          </label>

          <textarea
            id="message"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows={5}
            required
            className="mt-2 block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Gambar */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Foto Customer
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="testimonials"
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
              id="status"
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span>Aktifkan testimonial</span>
          </label>

          <p className="ml-6 mt-1.5 text-xs text-gray-500">
            Testimonial aktif akan ditampilkan di website.
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