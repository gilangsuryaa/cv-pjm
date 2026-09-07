import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './logout-button'

export default async function DashboardPage() {
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

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Kelola konten dan informasi website dari sini.
        </p>
      </div>

      {/* Welcome Card */}
      <div className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Selamat datang, {profile.name}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Kamu login sebagai administrator.
        </p>

        {/* Profile Info */}
        <div className="mt-5 rounded-md bg-gray-50 p-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-sm text-gray-600">
              Nama
            </span>

            <span className="text-sm font-medium text-gray-900">
              {profile.name}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-gray-600">
              Role
            </span>

            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              {profile.role}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}