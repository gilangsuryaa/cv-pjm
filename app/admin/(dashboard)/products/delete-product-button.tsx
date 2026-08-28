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

    // 1. Ambil path gambar terlebih dahulu
    const { data: product, error: fetchError } =
      await supabase
        .from('products')
        .select('image')
        .eq('id', id)
        .single()

    if (fetchError) {
      alert(
        `Gagal mengambil data produk: ${fetchError.message}`
      )
      setLoading(false)
      return
    }

    // 2. Hapus data product
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

    // 3. Kalau punya gambar, hapus dari Storage
    if (product?.image) {
      const { error: storageError } =
        await supabase.storage
          .from('products')
          .remove([product.image])

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