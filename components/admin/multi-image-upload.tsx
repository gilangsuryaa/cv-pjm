'use client'

import { ChangeEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UploadedImage = {
  id?: string // ada isinya kalau row product_images sudah tersimpan di DB
  path: string // path file di Supabase Storage
  url: string // signed URL buat preview
}

type MultiImageUploadProps = {
  bucket: string
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  // dipanggil setelah gambar dihapus dari storage,
  // dipakai parent buat hapus row DB kalau image.id ada
  onRemove?: (image: UploadedImage) => void
  maxImages?: number
}

export default function MultiImageUpload({
  bucket,
  images,
  onChange,
  onRemove,
  maxImages = 8,
}: MultiImageUploadProps) {
  const supabase = createClient()

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (!files || files.length === 0) return

    setError('')

    if (images.length + files.length > maxImages) {
      setError(`Maksimal ${maxImages} gambar per produk.`)
      e.target.value = ''
      return
    }

    setUploading(true)

    const uploaded: UploadedImage[] = []

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
      })
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded])
    }

    setUploading(false)
    e.target.value = ''
  }

  async function handleRemove(image: UploadedImage) {
    onChange(images.filter((img) => img.path !== image.path))

    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove([image.path])

    if (removeError) {
      console.error(
        'Gagal menghapus file di storage:',
        removeError.message
      )
    }

    onRemove?.(image)
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <div key={image.path} className="group relative">
              <img
                src={image.url}
                alt=""
                className="h-24 w-24 rounded-md border border-gray-200 object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemove(image)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white hover:bg-red-700"
                aria-label="Hapus gambar"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <label className="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          {uploading ? 'Mengupload...' : 'Tambah Gambar'}

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
        Maksimal {maxImages} gambar, masing-masing maks. 5 MB. Gambar
        pertama dipakai sebagai thumbnail di daftar produk.
      </p>

      {error && (
        <p className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}