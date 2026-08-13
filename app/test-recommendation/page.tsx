'use client'

import { useState } from 'react'
import { getACRecommendation } from '@/app/actions/recommendation'

type Product = {
  id: number
  name: string
  brand: string | null
  pk: number | null
  price: number | null
  min_room_area: number | null
  max_room_area: number | null
}

export default function TestRecommendationPage() {
  const [roomArea, setRoomArea] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleRecommend() {
    const area = Number(roomArea)

    if (!Number.isFinite(area) || area <= 0) {
      setMessage('Masukkan luas ruangan yang valid.')
      setProducts([])
      return
    }

    setLoading(true)
    setMessage('')

    const result = await getACRecommendation(area)

    setProducts(result.data)
    setMessage(result.message)

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-900">
          Konsultasi AC
        </h1>

        <p className="mt-2 text-gray-600">
          Masukkan luas ruangan untuk mendapatkan
          rekomendasi AC.
        </p>

        <div className="mt-6 flex gap-3">
          <input
            type="number"
            min="1"
            step="0.1"
            value={roomArea}
            onChange={(e) => setRoomArea(e.target.value)}
            placeholder="Contoh: 15"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
          />

          <button
            onClick={handleRecommend}
            disabled={loading}
            className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-red-700">
            {message}
          </p>
        )}

        {products.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Rekomendasi untuk{' '}
              <strong>{roomArea} m²</strong>:
            </p>

            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h2 className="font-semibold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-1 text-gray-600">
                  {product.brand ?? '-'} ·{' '}
                  {product.pk ?? '-'} PK
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Cocok untuk{' '}
                  {product.min_room_area}–
                  {product.max_room_area} m²
                </p>

                <p className="mt-2 font-medium text-gray-900">
                  Rp{' '}
                  {product.price
                    ? Number(product.price).toLocaleString(
                        'id-ID'
                      )
                    : '-'}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          !message &&
          products.length === 0 &&
          roomArea && (
            <div className="mt-6 rounded-lg border bg-white p-6 text-gray-600">
              Tidak ada produk yang cocok untuk luas
              ruangan tersebut.
            </div>
          )}
      </div>
    </main>
  )
}