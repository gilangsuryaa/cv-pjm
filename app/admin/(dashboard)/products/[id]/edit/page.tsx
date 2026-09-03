'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import MultiImageUpload, {
  UploadedImage,
} from '@/components/admin/multi-image-upload'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const id = params.id as string

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
  const [stockStatus, setStockStatus] = useState(true)
  const [images, setImages] = useState<UploadedImage[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(id, path, sort_order)')
        .eq('id', id)
        .order('sort_order', {
          foreignTable: 'product_images',
          ascending: true,
        })
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
      setDaya(data.daya?.toString() ?? '')
      setKapasitas(data.kapasitas?.toString() ?? '')
      setPrice(data.price?.toString() ?? '')
      setMinRoomArea(data.min_room_area?.toString() ?? '')
      setMaxRoomArea(data.max_room_area?.toString() ?? '')
      setDescription(data.description ?? '')
      setStockStatus(data.stock_status ?? false)

      const productImages = data.product_images ?? []

      const withUrls = await Promise.all(
        productImages.map(async (img: { id: string; path: string }) => {
          const { data: signedData } = await supabase.storage
            .from('products')
            .createSignedUrl(img.path, 60 * 60)

          return {
            id: img.id,
            path: img.path,
            url: signedData?.signedUrl ?? '',
          }
        })
      )

      setImages(withUrls)
      setLoading(false)
    }

    getProduct()
  }, [id])

  async function handleImageRemoved(image: UploadedImage) {
    if (!image.id) return

    const { error: deleteError } = await supabase
      .from('product_images')
      .delete()
      .eq('id', image.id)

    if (deleteError) {
      console.error(
        'Gagal menghapus data gambar:',
        deleteError.message
      )
    }
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('products')
      .update({
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
      })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    // Gambar baru (belum punya id) perlu di-insert sebagai row baru.
    // Gambar lama yang masih ada di array tidak perlu disentuh —
    // yang dihapus sudah ditangani langsung lewat handleImageRemoved.
    const newImages = images.filter((image) => !image.id)

    if (newImages.length > 0) {
      const existingCount = images.length - newImages.length

      const { error: imagesError } = await supabase
        .from('product_images')
        .insert(
          newImages.map((image, index) => ({
            product_id: id,
            path: image.path,
            sort_order: existingCount + index,
          }))
        )

      if (imagesError) {
        setError(imagesError.message)
        setSaving(false)
        return
      }
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
          </div>
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
          <label className="text-sm font-medium text-gray-700">
            Gambar Produk
          </label>

          <div className="mt-1">
            <MultiImageUpload
              bucket="products"
              images={images}
              onChange={setImages}
              onRemove={handleImageRemoved}
            />
          </div>
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