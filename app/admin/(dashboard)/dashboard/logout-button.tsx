'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
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

    // Pakai reload penuh (bukan router.push + router.refresh) supaya
    // cookie session yang dibaca middleware benar-benar sinkron
    // sebelum halaman login dirender.
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