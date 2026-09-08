'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'
import AlbumPhotosUpload, {
  AlbumPhoto,
} from '@/components/admin/album-photos-upload'

export default function CreateAlbumPage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [projectDate, setProjectDate] = useState('')
  const [status, setStatus] = useState(true)
  const [coverImage, setCoverImage] = useState('')
  const [photos, setPhotos] = useState<AlbumPhoto[]>([])

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { data: album, error: insertError } = await supabase
      .from('albums')
      .insert({
        title,
        description: description || null,
        cover_image: coverImage || null,
        project_date: projectDate || null,
        location: location || null,
        category: category || null,
        status,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    if (photos.length > 0) {
      const { error: photosError } = await supabase
        .from('album_photos')
        .insert(
          photos.map((photo, index) => ({
            album_id: album.id,
            image_url: photo.path,
            caption: photo.caption || null,
            sort_order: index,
          }))
        )

      if (photosError) {
        setError(photosError.message)
        setSaving(false)
        return
      }
    }

    router.push('/admin/albums')
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah Album
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Tambahkan album foto pekerjaan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Judul */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Judul
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Instalasi AC Gedung ABC"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Kategori & Lokasi */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Kategori
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: Instalasi, Maintenance"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Lokasi
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Purwokerto"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
        </div>

        {/* Tanggal Pengerjaan */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Tanggal Pengerjaan
          </label>

          <input
            type="date"
            value={projectDate}
            onChange={(e) => setProjectDate(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Deskripsi
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Deskripsi album..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gambar Sampul (Cover)
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <ImageUpload
              bucket="albums"
              value={coverImage}
              onChange={setCoverImage}
            />
          </div>
        </div>

        {/* Galeri Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Galeri Foto
          </label>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <AlbumPhotosUpload
              bucket="albums"
              photos={photos}
              onChange={setPhotos}
              maxPhotos={8}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />

            Album aktif (ditampilkan di website)
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
            {saving ? 'Menyimpan...' : 'Simpan Album'}
          </button>
        </div>
      </form>
    </div>
  )
}