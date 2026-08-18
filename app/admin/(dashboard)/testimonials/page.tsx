import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteTestimonialButton from './delete-testimonial-button'

export default async function TestimonialsPage() {
  const supabase = await createClient()

  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Testimonials
        </h1>

        <p className="mt-2 text-red-700">
          {error.message}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Testimonials
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola testimoni pelanggan.
          </p>
        </div>

        <Link
          href="/admin/testimonials/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Testimonial
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Customer
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Lokasi
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Rating
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Pesan
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-3 text-right font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {testimonial.customer_name}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {testimonial.customer_location ?? '-'}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {'★'.repeat(testimonial.rating ?? 0)}
                </td>

                <td className="max-w-md px-6 py-4 text-gray-600">
                  <p className="truncate">
                    {testimonial.message ?? '-'}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      testimonial.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {testimonial.status
                      ? 'Aktif'
                      : 'Nonaktif'}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteTestimonialButton id={testimonial.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {testimonials.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada testimonial.
          </div>
        )}
      </div>
    </div>
  )
}