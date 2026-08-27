'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'

type Service = {
  id: number
  name: string
}

export default function CreatePortfolioPage() {
  const router = useRouter()
  const supabase = createClient()

  const [services, setServices] = useState<Service[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [image, setImage] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getServices() {
      const { data, error } = await supabase
        .from('services')
        .select('id, name')
        .eq('status', true)
        .order('name')

      if (error) {
        setError(error.message)
      } else {
        setServices(data ?? [])
      }

      setLoading(false)
    }

    getServices()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!serviceId) {
      setError('Pilih service terlebih dahulu.')
      return
    }

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('portfolios')
      .insert({
        title,
        description: description || null,
        service_id: Number(serviceId),
        image: image || null,
      })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/portfolios')
    router.refresh()
  }

  if (loading) {
    return (
      <p className="text-gray-600">
        Memuat data...
      </p>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah Portfolio
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Tambahkan portfolio pekerjaan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Judul
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Instalasi AC Kantor"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Service */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Service
          </label>

          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          >
            <option value="">
              Pilih service
            </option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
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
            placeholder="Deskripsi pekerjaan..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gambar Portfolio
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="portfolios"
              value={image}
              onChange={setImage}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Portfolio'}
          </button>
        </div>
      </form>
    </div>
  )
}