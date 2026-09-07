'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteProductButtonProps {
  id: number
}

export default function DeleteProductButton({
  id,
}: DeleteProductButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      'Yakin ingin menghapus produk ini?'
    )

    if (!confirmed) return

    setLoading(true)

    // 1. Ambil semua path gambar produk ini terlebih dahulu
    //    (row product_images akan ikut terhapus lewat cascade,
    //    jadi harus diambil sebelum produk dihapus)
    const { data: productImages, error: fetchError } =
      await supabase
        .from('product_images')
        .select('path')
        .eq('product_id', id)

    if (fetchError) {
      alert(
        `Gagal mengambil data gambar produk: ${fetchError.message}`
      )
      setLoading(false)
      return
    }

    // 2. Hapus data product
    //    (row di product_images ikut terhapus otomatis lewat
    //    "on delete cascade" di database)
    const { error: deleteError } =
      await supabase
        .from('products')
        .delete()
        .eq('id', id)

    if (deleteError) {
      alert(
        `Gagal menghapus produk: ${deleteError.message}`
      )
      setLoading(false)
      return
    }

    // 3. Kalau punya gambar, hapus semuanya dari Storage
    const paths = (productImages ?? []).map(
      (img: { path: string }) => img.path
    )

    if (paths.length > 0) {
      const { error: storageError } =
        await supabase.storage
          .from('products')
          .remove(paths)

      if (storageError) {
        console.error(
          'Gagal menghapus gambar dari Storage:',
          storageError.message
        )

        alert(
          `Produk berhasil dihapus, tetapi gambar gagal dihapus dari Storage: ${storageError.message}`
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