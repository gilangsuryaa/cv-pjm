'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeletePortfolioButtonProps {
  id: number
}

export default function DeletePortfolioButton({
  id,
}: DeletePortfolioButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      'Yakin ingin menghapus portfolio ini?'
    )

    if (!confirmed) return

    setLoading(true)

    // Ambil semua path gambar portfolio ini terlebih dahulu
    // (row portfolio_images akan ikut terhapus lewat cascade,
    // jadi harus diambil sebelum portfolio dihapus)
    const { data: portfolioImages, error: fetchError } = await supabase
      .from('portfolio_images')
      .select('path')
      .eq('portfolio_id', id)

    if (fetchError) {
      alert(`Gagal mengambil data gambar portfolio: ${fetchError.message}`)
      setLoading(false)
      return
    }

    // Hapus row portfolio
    // (row di portfolio_images ikut terhapus otomatis lewat
    // "on delete cascade" di database)
    const { error: deleteError } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert(`Gagal menghapus portfolio: ${deleteError.message}`)
      setLoading(false)
      return
    }

    // Kalau punya gambar, hapus semuanya dari Storage
    const paths = (portfolioImages ?? []).map(
      (img: { path: string }) => img.path
    )

    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('portfolios')
        .remove(paths)

      if (storageError) {
        alert(
          `Portfolio berhasil dihapus, tapi gambar gagal dihapus dari Storage: ${storageError.message}`
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