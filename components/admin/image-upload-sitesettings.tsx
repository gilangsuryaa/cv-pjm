'use client'

import { ChangeEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type ImageUploadProps = {
  bucket: string
  value: string
  previewUrl?: string
  filePath?: string
  onChange: (path: string) => void
}

export default function ImageUpload({
  bucket,
  value,
  previewUrl,
  filePath,
  onChange,
}: ImageUploadProps) {
  const supabase = createClient()
  const [localPreview, setLocalPreview] = useState('')

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return
    setLocalPreview(URL.createObjectURL(file))

    setError('')
    setUploading(true)

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5 MB.')
      setUploading(false)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      setUploading(false)
      return
    }

    const fileExt = file.name.split('.').pop()
    const fileName = filePath ?? `${crypto.randomUUID()}.${fileExt}`

    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log('USER:', user)

    console.log({
      bucket,
      fileName,
      filePath,
      upsert: !!filePath,
      userId: user?.id,
    })

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: !!filePath
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
        Maksimal 5 MB. Format gambar.
      </p>

      {error && (
        <p className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}