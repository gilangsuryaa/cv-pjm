'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  async function logout() {
    setLoading(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Gagal logout:', error.message)
      alert(`Gagal logout: ${error.message}`)
      setLoading(false)
      return
    }

    // Sengaja reload penuh, bukan router.push. Navigasi client menyisakan
    // RSC cache berisi UI admin, sehingga tombol "back" setelah logout masih
    // bisa menampilkannya. Reload penuh membuang cache itu sekaligus
    // memastikan cookie sesi yang dibaca proxy benar-benar sudah bersih.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = '/admin/login'
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  )
}