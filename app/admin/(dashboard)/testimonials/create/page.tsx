'use client'

import { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import ImageUpload from '@/components/admin/image-upload'

import { createClient } from '@/lib/supabase/client'

export default function CreateTestimonialPage() {
  const router = useRouter()
  const supabase = createClient()

  const [customerName, setCustomerName] = useState('')
  const [customerLocation, setCustomerLocation] = useState('')
  const [rating, setRating] = useState('5')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('testimonials')
      .insert({
        customer_name: customerName,
        customer_location: customerLocation || null,
        rating: Number(rating),
        message,
        image: image || null,
        status,
      })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/testimonials')
    router.refresh()
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah Testimonial
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Tambahkan testimoni pelanggan.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Customer Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Customer
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Contoh: Budi Santoso"
            required
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Lokasi
          </label>

          <input
            type="text"
            value={customerLocation}
            onChange={(e) =>
              setCustomerLocation(e.target.value)
            }
            placeholder="Contoh: Purwokerto"
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="5">★★★★★ — 5</option>
            <option value="4">★★★★☆ — 4</option>
            <option value="3">★★★☆☆ — 3</option>
            <option value="2">★★☆☆☆ — 2</option>
            <option value="1">★☆☆☆☆ — 1</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Pesan
          </label>

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows={5}
            placeholder="Tulis testimoni customer..."
            required
            className="mt-2 block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Foto Customer
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="testimonials"
              value={image}
              onChange={setImage}
            />
          </div>
        </div>

        {/* Status */}
        <div>
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

          <p className="mt-1.5 ml-6 text-xs text-gray-500">
            Testimonial aktif akan ditampilkan di website.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 border-t border-gray-200 pt-5">
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
              : 'Simpan Testimonial'}
          </button>
        </div>
      </form>
    </div>
  )
}