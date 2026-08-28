'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/image-upload'
import { createClient } from '@/lib/supabase/client'

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function CreateServicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(value: string) {
    setName(value)
    setSlug(generateSlug(value))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('services')
      .insert({
        name,
        slug,
        description: description || null,
        price: price ? Number(price) : null,
        image: image || null,
        status,
      })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/services')
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah Layanan
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Tambahkan layanan baru.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Nama */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Layanan
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Contoh: Service AC"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Slug
          </label>

          <input
            type="text"
            value={slug}
            onChange={(e) =>
              setSlug(generateSlug(e.target.value))
            }
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            URL: /layanan/{slug}
          </p>
        </div>

        {/* Deskripsi */}
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
            placeholder="Deskripsi layanan..."
            className="mt-1 block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Harga */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Harga
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="75000"
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Gambar Layanan
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="services"
              value={image}
              onChange={setImage}
            />
          </div>
        </div>

        {/* Status */}
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            Aktif
          </label>

          <p className="mt-1 ml-6 text-xs text-gray-500">
            Layanan aktif akan tersedia untuk digunakan.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Menyimpan...'
              : 'Simpan Layanan'}
          </button>
        </div>
      </form>
    </div>
  )

}