import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Pemeriksaan sesungguhnya, dipanggil di dekat sumber data seperti anjuran
// dokumentasi Next. proxy.ts sudah menyaring pengunjung yang belum login,
// tapi cek di sini yang memastikan penggunanya benar-benar admin, dan tetap
// berlaku meski suatu saat matcher di proxy berubah.
export async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/admin/login')
  }

  return { supabase, user, profile }
}
