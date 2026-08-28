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

    // Ambil data portfolio terlebih dahulu untuk mendapatkan path gambar
    const { data: portfolio, error: fetchError } = await supabase
      .from('portfolios')
      .select('image')
      .eq('id', id)
      .single()

    if (fetchError) {
      alert(`Gagal mengambil data portfolio: ${fetchError.message}`)
      setLoading(false)
      return
    }

    // Hapus row portfolio
    const { error: deleteError } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert(`Gagal menghapus portfolio: ${deleteError.message}`)
      setLoading(false)
      return
    }

    // Kalau portfolio punya gambar, hapus juga dari Storage
    if (portfolio?.image) {
      const { error: storageError } = await supabase.storage
        .from('portfolios')
        .remove([portfolio.image])

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