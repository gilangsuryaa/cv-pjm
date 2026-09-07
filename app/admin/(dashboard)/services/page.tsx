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
        <h1 className="text-2xl font-semibold text-gray-900">
          Layanan
        </h1>

        <p className="mt-2 text-red-700">
          {error.message}
        </p>
      </div>
    )
  }

  const servicesWithImages = await Promise.all(
    services.map(async (service) => {
      if (!service.image) {
        return {
          ...service,
          imageUrl: null,
        }
      }

      const { data } = await supabase.storage
        .from('services')
        .createSignedUrl(service.image, 60 * 60)

      return {
        ...service,
        imageUrl: data?.signedUrl ?? null,
      }
    })
  )

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
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Nama
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Slug
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Harga
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Gambar
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-right font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {servicesWithImages.map((service) => (
              <tr key={service.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {service.name}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {service.slug}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {service.price
                    ? `Rp ${Number(
                        service.price
                      ).toLocaleString('id-ID')}`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
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

                <td className="px-6 py-4">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">
                      Tidak ada gambar
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
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
        </div>

        {services.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada layanan.
          </div>
        )}
      </div>
    </div>
  )
}