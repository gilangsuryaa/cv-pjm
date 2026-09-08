'use client'

import { ChangeEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type AlbumPhoto = {
  id?: string // ada isinya kalau row album_photos sudah tersimpan di DB
  path: string // path file di Supabase Storage (disimpan di kolom image_url)
  url: string // signed URL buat preview
  caption: string
}

type AlbumPhotosUploadProps = {
  bucket: string
  photos: AlbumPhoto[]
  onChange: (photos: AlbumPhoto[]) => void
  // dipanggil setelah foto dihapus dari storage,
  // dipakai parent buat hapus row DB kalau photo.id ada
  onRemove?: (photo: AlbumPhoto) => void
  maxPhotos?: number
}

export default function AlbumPhotosUpload({
  bucket,
  photos,
  onChange,
  onRemove,
  maxPhotos = 8,
}: AlbumPhotosUploadProps) {
  const supabase = createClient()

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (!files || files.length === 0) return

    setError('')

    if (photos.length + files.length > maxPhotos) {
      setError(`Maksimal ${maxPhotos} foto per album.`)
      e.target.value = ''
      return
    }

    setUploading(true)

    const uploaded: AlbumPhoto[] = []

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`"${file.name}" melebihi 5 MB, dilewati.`)
        continue
      }

      if (!file.type.startsWith('image/')) {
        setError(`"${file.name}" bukan file gambar, dilewati.`)
        continue
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        setError(uploadError.message)
        continue
      }

      const { data: signedData } = await supabase.storage
        .from(bucket)
        .createSignedUrl(fileName, 60 * 60)

      uploaded.push({
        path: fileName,
        url: signedData?.signedUrl ?? '',
        caption: '',
      })
    }

    if (uploaded.length > 0) {
      onChange([...photos, ...uploaded])
    }

    setUploading(false)
    e.target.value = ''
  }

  async function handleRemove(photo: AlbumPhoto) {
    onChange(photos.filter((p) => p.path !== photo.path))

    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove([photo.path])

    if (removeError) {
      console.error(
        'Gagal menghapus file di storage:',
        removeError.message
      )
    }

    onRemove?.(photo)
  }

  function handleCaptionChange(path: string, caption: string) {
    onChange(
      photos.map((p) => (p.path === path ? { ...p, caption } : p))
    )
  }

  return (
    <div className="space-y-3">
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.path} className="space-y-1">
              <div className="group relative">
                <img
                  src={photo.url}
                  alt=""
                  className="h-24 w-24 rounded-md border border-gray-200 object-cover"
                />

                <button
                  type="button"
                  onClick={() => handleRemove(photo)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white hover:bg-red-700"
                  aria-label="Hapus foto"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                value={photo.caption}
                onChange={(e) =>
                  handleCaptionChange(photo.path, e.target.value)
                }
                placeholder="Caption (opsional)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-900"
              />
            </div>
          ))}
        </div>
      )}

      {photos.length < maxPhotos && (
        <label className="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          {uploading ? 'Mengupload...' : 'Tambah Foto'}

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      <p className="text-xs text-gray-500">
        Maksimal {maxPhotos} foto, masing-masing maks. 5 MB.
      </p>

      {error && (
        <p className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}