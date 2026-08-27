import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeletePortfolioButton from './delete-portfolio-button'

export default async function PortfoliosPage() {
  const supabase = await createClient()

  const { data: portfolios, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      services (
        name
      )
    `)
    .order('id', { ascending: false })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Portfolio
        </h1>

        <p className="mt-2 text-red-700">
          {error.message}
        </p>
      </div>
    )
  }

  const portfoliosWithImages = await Promise.all(
    (portfolios ?? []).map(async (portfolio) => {
      if (!portfolio.image) {
        return {
          ...portfolio,
          imageUrl: '',
        }
      }

      const { data: signedImage } =
        await supabase.storage
          .from('portfolios')
          .createSignedUrl(
            portfolio.image,
            60 * 60
          )

      return {
        ...portfolio,
        imageUrl: signedImage?.signedUrl ?? '',
      }
    })
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Portfolio
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola portfolio pekerjaan.
          </p>
        </div>

        <Link
          href="/admin/portfolios/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Portfolio
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Judul
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Service
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Deskripsi
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Gambar
              </th>

              <th className="px-6 py-3 text-right font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {portfoliosWithImages.map((portfolio) => (
              <tr key={portfolio.id}>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {portfolio.title}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {portfolio.services?.name ?? '-'}
                </td>

                <td className="max-w-md px-6 py-4 text-gray-600">
                  <p className="truncate">
                    {portfolio.description ?? '-'}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {portfolio.imageUrl ? (
                    <img
                      src={portfolio.imageUrl}
                      alt={portfolio.title}
                      className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">
                      Tidak ada gambar
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/portfolios/${portfolio.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeletePortfolioButton id={portfolio.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {portfolios.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada portfolio.
          </div>
        )}
      </div>
    </div>
  )
}