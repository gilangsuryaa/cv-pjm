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

    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id)

    if (error) {
      alert(`Gagal menghapus: ${error.message}`)
      setLoading(false)
      return
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