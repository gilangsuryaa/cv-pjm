'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/image-upload'
import AlbumPhotosUpload, {
  AlbumPhoto,
} from '@/components/admin/album-photos-upload'

export default function EditAlbumPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const id = params.id as string

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [projectDate, setProjectDate] = useState('')
  const [status, setStatus] = useState(true)
  const [coverImage, setCoverImage] = useState('')
  const [coverPreview, setCoverPreview] = useState('')
  const [photos, setPhotos] = useState<AlbumPhoto[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getAlbum() {
      const { data, error } = await supabase
        .from('albums')
        .select(`
          *,
          album_photos (
            id,
            image_url,
            caption,
            sort_order
          )
        `)
        .eq('id', id)
        .order('sort_order', {
          foreignTable: 'album_photos',
          ascending: true,
        })
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setTitle(data.title ?? '')
      setDescription(data.description ?? '')
      setCategory(data.category ?? '')
      setLocation(data.location ?? '')
      setProjectDate(data.project_date ?? '')
      setStatus(data.status ?? true)
      setCoverImage(data.cover_image ?? '')

      if (data.cover_image) {
        const { data: signedCover } = await supabase.storage
          .from('albums')
          .createSignedUrl(data.cover_image, 60 * 60)

        setCoverPreview(signedCover?.signedUrl ?? '')
      }

      const albumPhotos = data.album_photos ?? []

      const withUrls = await Promise.all(
        albumPhotos.map(
          async (photo: {
            id: string
            image_url: string
            caption: string | null
          }) => {
            const { data: signedData } = await supabase.storage
              .from('albums')
              .createSignedUrl(photo.image_url, 60 * 60)

            return {
              id: photo.id,
              path: photo.image_url,
              url: signedData?.signedUrl ?? '',
              caption: photo.caption ?? '',
            }
          }
        )
      )

      setPhotos(withUrls)
      setLoading(false)
    }

    getAlbum()
  }, [id])

  async function handlePhotoRemoved(photo: AlbumPhoto) {
    if (!photo.id) return

    const { error: deleteError } = await supabase
      .from('album_photos')
      .delete()
      .eq('id', photo.id)

    if (deleteError) {
      console.error(
        'Gagal menghapus data foto:',
        deleteError.message
      )
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('albums')
      .update({
        title,
        description: description || null,
        cover_image: coverImage || null,
        project_date: projectDate || null,
        location: location || null,
        category: category || null,
        status,
      })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    const existingPhotos = photos.filter((photo) => photo.id)
    const newPhotos = photos.filter((photo) => !photo.id)

    // Update caption foto yang sudah ada
    const captionUpdates = await Promise.all(
      existingPhotos.map((photo) =>
        supabase
          .from('album_photos')
          .update({ caption: photo.caption || null })
          .eq('id', photo.id)
      )
    )

    const captionError = captionUpdates.find((r) => r.error)

    if (captionError?.error) {
      setError(captionError.error.message)
      setSaving(false)
      return
    }

    // Foto baru (belum punya id) di-insert sebagai row baru
    if (newPhotos.length > 0) {
      const startOrder = existingPhotos.length

      const { error: photosError } = await supabase
        .from('album_photos')
        .insert(
          newPhotos.map((photo, index) => ({
            album_id: id,
            image_url: photo.path,
            caption: photo.caption || null,
            sort_order: startOrder + index,
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

  if (loading) {
    return <p className="text-gray-600">Memuat data...</p>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Album
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Ubah informasi album.
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
              previewUrl={coverPreview}
              onChange={(path) => {
                setCoverImage(path)
                setCoverPreview('')
              }}
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
              onRemove={handlePhotoRemoved}
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
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}