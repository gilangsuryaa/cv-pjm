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

    // Ambil path gambar sebelum row dihapus
    const { data: service, error: fetchError } =
      await supabase
        .from('services')
        .select('image')
        .eq('id', id)
        .single()

    if (fetchError) {
      alert(`Gagal mengambil data layanan: ${fetchError.message}`)
      setLoading(false)
      return
    }

    // Hapus row dari database
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert(`Gagal menghapus layanan: ${deleteError.message}`)
      setLoading(false)
      return
    }

    // Hapus gambar dari Storage jika ada
    if (service?.image) {
      const { error: storageError } = await supabase.storage
        .from('services')
        .remove([service.image])

      if (storageError) {
        setLoading(false)
        return
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