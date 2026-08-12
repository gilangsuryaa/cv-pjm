'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const id = params.id as string

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [pk, setPk] = useState('')
  const [price, setPrice] = useState('')
  const [minRoomArea, setMinRoomArea] = useState('')
  const [maxRoomArea, setMaxRoomArea] = useState('')
  const [description, setDescription] = useState('')
  const [stockStatus, setStockStatus] = useState(true)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setName(data.name ?? '')
      setBrand(data.brand ?? '')
      setType(data.type ?? '')
      setPk(data.pk?.toString() ?? '')
      setPrice(data.price?.toString() ?? '')
      setMinRoomArea(data.min_room_area?.toString() ?? '')
      setMaxRoomArea(data.max_room_area?.toString() ?? '')
      setDescription(data.description ?? '')
      setStockStatus(data.stock_status ?? false)

      setLoading(false)
    }

    getProduct()
  }, [id])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('products')
      .update({
        name,
        brand: brand || null,
        type: type || null,
        pk: pk ? Number(pk) : null,
        price: price ? Number(price) : null,
        min_room_area: minRoomArea
          ? Number(minRoomArea)
          : null,
        max_room_area: maxRoomArea
          ? Number(maxRoomArea)
          : null,
        description: description || null,
        stock_status: stockStatus,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  if (loading) {
    return <p className="text-gray-600">Memuat data...</p>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Produk
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Ubah informasi produk.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Produk
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Brand
          </label>

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Tipe
          </label>

          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Kapasitas (PK)
          </label>

          <input
            type="number"
            step="0.5"
            min="0"
            value={pk}
            onChange={(e) => setPk(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Harga
          </label>

          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Rekomendasi Luas Ruangan
          </label>

          <div className="mt-1 grid grid-cols-2 gap-3">
            <input
              type="number"
              step="0.1"
              min="0"
              value={minRoomArea}
              onChange={(e) => setMinRoomArea(e.target.value)}
              placeholder="Min. m²"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />

            <input
              type="number"
              step="0.1"
              min="0"
              value={maxRoomArea}
              onChange={(e) => setMaxRoomArea(e.target.value)}
              placeholder="Max. m²"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Deskripsi
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={stockStatus}
              onChange={(e) => setStockStatus(e.target.checked)}
            />

            Produk tersedia
          </label>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}