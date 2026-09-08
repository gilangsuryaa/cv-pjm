'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteAlbumButtonProps {
  id: number
}

export default function DeleteAlbumButton({
  id,
}: DeleteAlbumButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      'Yakin ingin menghapus album ini?'
    )

    if (!confirmed) return

    setLoading(true)

    // Ambil cover_image dulu (dari row albums)
    const { data: album, error: fetchAlbumError } = await supabase
      .from('albums')
      .select('cover_image')
      .eq('id', id)
      .single()

    if (fetchAlbumError) {
      alert(`Gagal mengambil data album: ${fetchAlbumError.message}`)
      setLoading(false)
      return
    }

    // Ambil semua path foto galeri sebelum album (dan row
    // album_photos-nya) dihapus lewat cascade
    const { data: albumPhotos, error: fetchPhotosError } = await supabase
      .from('album_photos')
      .select('image_url')
      .eq('album_id', id)

    if (fetchPhotosError) {
      alert(
        `Gagal mengambil data foto album: ${fetchPhotosError.message}`
      )
      setLoading(false)
      return
    }

    // Hapus row album
    // (row di album_photos ikut terhapus otomatis lewat
    // "on delete cascade" di database)
    const { error: deleteError } = await supabase
      .from('albums')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert(`Gagal menghapus album: ${deleteError.message}`)
      setLoading(false)
      return
    }

    // Hapus semua file terkait dari Storage (cover + galeri)
    const paths = [
      ...(album?.cover_image ? [album.cover_image] : []),
      ...(albumPhotos ?? []).map(
        (photo: { image_url: string }) => photo.image_url
      ),
    ]

    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('albums')
        .remove(paths)

      if (storageError) {
        alert(
          `Album berhasil dihapus, tetapi ada gambar yang gagal dihapus dari Storage: ${storageError.message}`
        )
      }
    }

    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="ml-3 text-sm font-medium text-red-700 hover:text-red-900 hover:underline disabled:opacity-50"
    >
      {loading ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}