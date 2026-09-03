'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'

export default function CreateProductPage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [pk, setPk] = useState('')
  const [daya, setDaya] = useState('')
  const [kapasitas, setKapasitas] = useState('')
  const [price, setPrice] = useState('')
  const [minRoomArea, setMinRoomArea] = useState('')
  const [maxRoomArea, setMaxRoomArea] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [stockStatus, setStockStatus] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('products')
      .insert({
        name,
        brand: brand || null,
        type: type || null,
        pk: pk ? Number(pk) : null,
        daya: daya ? Number(daya) : null,
        kapasitas: kapasitas ? Number(kapasitas) : null,
        price: price ? Number(price) : null,
        min_room_area: minRoomArea
          ? Number(minRoomArea)
          : null,
        max_room_area: maxRoomArea
          ? Number(maxRoomArea)
          : null,
        description: description || null,
        stock_status: stockStatus,
        image: image || null,
      })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah Produk
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Tambahkan produk AC atau elektronik.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Nama */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Produk
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Daikin FTKC 1 PK"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Brand
          </label>

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Daikin"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Tipe
          </label>

          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Split Wall"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* PK */}
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
            placeholder="1"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />

          <p className="mt-1 text-xs text-gray-500">
            Contoh: 0.5, 1, 1.5, 2
          </p>
        </div>

        {/* Daya & Kapasitas (BTU/h) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Daya (Watt)
            </label>

            <input
              type="number"
              step="1"
              min="0"
              value={daya}
              onChange={(e) => setDaya(e.target.value)}
              placeholder="900"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />

            <p className="mt-1 text-xs text-gray-500">
              Contoh: 900 (akan tampil sebagai 900W)
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Kapasitas (BTU/h)
            </label>

            <input
              type="number"
              step="1"
              min="0"
              value={kapasitas}
              onChange={(e) => setKapasitas(e.target.value)}
              placeholder="9000"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />

            <p className="mt-1 text-xs text-gray-500">
              Contoh: 9000 (akan tampil sebagai 9.000 BTU/h)
            </p>
          </div>
        </div>

        {/* Harga */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Harga
          </label>

          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="4500000"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Room Area */}
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
              onChange={(e) =>
                setMinRoomArea(e.target.value)
              }
              placeholder="Min. 10 m²"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />

            <input
              type="number"
              step="0.1"
              min="0"
              value={maxRoomArea}
              onChange={(e) =>
                setMaxRoomArea(e.target.value)
              }
              placeholder="Max. 18 m²"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Digunakan sebagai salah satu dasar rekomendasi
            chatbot.
          </p>
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
            placeholder="Deskripsi produk..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Gambar Produk
          </label>

          <div className="mt-1">
            <ImageUpload
              bucket="products"
              value={image}
              onChange={setImage}
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={stockStatus}
              onChange={(e) =>
                setStockStatus(e.target.checked)
              }
            />

            Produk tersedia
          </label>
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
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </div>
  )
}