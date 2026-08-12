import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteServiceButton from './delete-service-button'

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">
          Layanan
        </h1>

        <p className="mt-2 text-red-600">
          {error.message}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Layanan
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola layanan perusahaan.
          </p>
        </div>

        <Link
          href="/admin/services/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Layanan
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Nama
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Slug
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Harga
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-3 text-right font-medium text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 text-gray-900">
                  {service.name}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {service.slug}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {service.price
                    ? `Rp ${Number(
                        service.price
                      ).toLocaleString('id-ID')}`
                    : '-'}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      service.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {service.status
                      ? 'Aktif'
                      : 'Nonaktif'}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="mr-3 text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteServiceButton
                    id={service.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            Belum ada layanan.
          </div>
        )}
      </div>
    </div>
  )
}