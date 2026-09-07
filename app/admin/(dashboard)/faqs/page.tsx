import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteFaqButton from './delete-faq-button'

export default async function FaqsPage() {
  const supabase = await createClient()

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          FAQs
        </h1>

        <p className="mt-2 text-red-700">
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
            FAQs
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola pertanyaan dan jawaban yang sering ditanyakan pelanggan.
          </p>
        </div>

        <Link
          href="/admin/faqs/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah FAQ
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Pertanyaan
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Jawaban
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
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="max-w-sm px-6 py-4 font-medium text-gray-900">
                  <p className="truncate">
                    {faq.question}
                  </p>
                </td>

                <td className="max-w-md px-6 py-4 text-gray-600">
                  <p className="truncate">
                    {faq.answer}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      faq.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {faq.status ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/faqs/${faq.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteFaqButton id={faq.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {faqs.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada FAQ.
          </div>
        )}
      </div>
    </div>
  )
}