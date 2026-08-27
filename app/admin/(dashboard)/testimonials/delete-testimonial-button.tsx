'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteTestimonialButtonProps {
  id: number
}

export default function DeleteTestimonialButton({
  id,
}: DeleteTestimonialButtonProps) {
  const router = useRouter()

  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      'Yakin ingin menghapus testimonial ini?'
    )

    if (!confirmed) return

    setLoading(true)

    // Ambil path gambar sebelum row dihapus
    const { data: testimonial, error: fetchError } =
      await supabase
        .from('testimonials')
        .select('image')
        .eq('id', id)
        .single()

    if (fetchError) {
      alert(
        `Gagal mengambil data testimonial: ${fetchError.message}`
      )
      setLoading(false)
      return
    }

    const imagePath = testimonial?.image ?? null

    // Hapus row testimonial
    const { error: deleteError } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (deleteError) {
      alert(
        `Gagal menghapus testimonial: ${deleteError.message}`
      )
      setLoading(false)
      return
    }

    // Hapus gambar dari Storage kalau testimonial punya gambar
    if (imagePath) {
      const { error: storageError } =
        await supabase.storage
          .from('testimonials')
          .remove([imagePath])

      if (storageError) {
        alert(
          `Testimonial berhasil dihapus, tetapi gambar gagal dihapus dari Storage: ${storageError.message}`
        )
        setLoading(false)
        router.refresh()
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