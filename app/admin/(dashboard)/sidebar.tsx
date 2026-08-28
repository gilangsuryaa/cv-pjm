'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    label: 'Portofolio',
    href: '/admin/portfolios',
  },
  {
    label: 'Testimoni',
    href: '/admin/testimonials',
  },
  {
    label: 'FAQ',
    href: '/admin/faqs',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white text-gray-900">
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold">
          Admin Panel
        </h2>

        <p className="text-sm text-gray-500">
          Company Dashboard
        </p>
      </div>

      <nav className="space-y-1 p-4">
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
    </aside>
  )
}