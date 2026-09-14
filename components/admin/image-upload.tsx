'use client'

import { ChangeEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  compressImage,
  formatBytes,
  MAX_SOURCE_BYTES,
} from '@/lib/image/compress'

type ImageUploadProps = {
  bucket: string
  value: string
  previewUrl?: string
  // Dimatikan untuk file yang tidak boleh digambar ulang, misalnya favicon.
  compress?: boolean
  onChange: (path: string) => void
}

export default function ImageUpload({
  bucket,
  value,
  previewUrl,
  compress = true,
  onChange,
}: ImageUploadProps) {
  const supabase = createClient()
  const [localPreview, setLocalPreview] = useState('')

  const [uploading, setUploading] = useState(false)
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  async function handleUpload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0]

    if (!selected) return

    setError('')
    setInfo('')

    if (!selected.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      return
    }

    if (selected.size > MAX_SOURCE_BYTES) {
      setError(
        `Ukuran gambar maksimal ${formatBytes(MAX_SOURCE_BYTES)}.`
      )
      return
    }

    setUploading(true)

    const result = compress
      ? await compressImage(selected)
      : null

    const file = result?.file ?? selected

    setLocalPreview(URL.createObjectURL(file))

    if (result?.compressed) {
      setInfo(
        `Dikompres dari ${formatBytes(result.originalSize)} ke ${formatBytes(
          result.compressedSize
        )}.`
      )
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
      setUploading(false)
      return
    }

    onChange(fileName)
    setUploading(false)
  }

  const imagePreview = localPreview || previewUrl || null

  return (
    <div className="space-y-3">
      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="Preview"
            className="h-40 w-40 rounded-md border border-gray-200 object-cover"
          />
        </div>
      )}

      <label className="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
        {uploading
          ? 'Mengupload...'
          : value
            ? 'Ganti Gambar'
            : 'Pilih Gambar'}

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>

      <p className="text-xs text-gray-500">
        Maksimal {formatBytes(MAX_SOURCE_BYTES)}.
        {compress
          ? ' Gambar otomatis dikecilkan sebelum diupload.'
          : ' Format gambar.'}
      </p>

      {info && (
        <p className="text-sm text-green-700">
          {info}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
