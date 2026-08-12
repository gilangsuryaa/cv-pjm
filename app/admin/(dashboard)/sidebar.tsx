'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
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
    <aside>
      <div>
        <h2>Admin Panel</h2>
      </div>

      <nav>
        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '10px',
                marginBottom: '5px',
                background: isActive ? '#eee' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}