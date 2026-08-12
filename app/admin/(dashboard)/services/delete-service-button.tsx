'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteServiceButtonProps {
  id: number
}

export default function DeleteServiceButton({
  id,
}: DeleteServiceButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      'Yakin ingin menghapus layanan ini?'
    )

    if (!confirmed) return

    setLoading(true)

    const { error } = await supabase
      .from('services')
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
    >
      {loading ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}