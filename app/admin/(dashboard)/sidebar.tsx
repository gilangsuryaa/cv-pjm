'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    label: 'Pengaturan Website',
    href: '/admin/site-settings',
  },
  {
    label: 'Layanan',
    href: '/admin/services',
  },
  {
    label: 'Produk',
    href: '/admin/products',
  },
  {
    label: 'Album Pekerjaan',
    href: '/admin/albums',
  },
  {
    label: 'FAQ',
    href: '/admin/faqs',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white text-gray-900">
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold">
          Admin Panel
        </h2>

        <p className="text-sm text-gray-500">
          Company Dashboard
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Jalan keluar ke halaman publik */}
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="shrink-0" />
          Kembali ke Website
        </Link>
      </div>
    </aside>
  )
}
