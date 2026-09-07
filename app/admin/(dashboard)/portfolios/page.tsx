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
      ),
      portfolio_images (
        id,
        path,
        sort_order
      )
    `)
    .order('id', { ascending: false })
    .order('sort_order', {
      foreignTable: 'portfolio_images',
      ascending: true,
    })

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
      const images = portfolio.portfolio_images ?? []
      const cover = images[0]

      if (!cover) {
        return {
          ...portfolio,
          coverUrl: '',
          imageCount: 0,
        }
      }

      const { data: signedImage } =
        await supabase.storage
          .from('portfolios')
          .createSignedUrl(cover.path, 60 * 60)

      return {
        ...portfolio,
        coverUrl: signedImage?.signedUrl ?? '',
        imageCount: images.length,
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
        <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Judul
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Service
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Tanggal Pengerjaan
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Deskripsi
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
            {portfoliosWithImages.map((portfolio) => (
              <tr key={portfolio.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {portfolio.title}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {portfolio.services?.name ?? '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {portfolio.project_date
                    ? new Date(
                        portfolio.project_date
                      ).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '-'}
                </td>

                <td className="max-w-md px-6 py-4 text-gray-600">
                  <p className="truncate">
                    {portfolio.description ?? '-'}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {portfolio.coverUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={portfolio.coverUrl}
                        alt={portfolio.title}
                        className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                      />

                      {portfolio.imageCount > 1 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                          +{portfolio.imageCount - 1}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Tidak ada gambar
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
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
        </div>

        {portfolios.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada portfolio.
          </div>
        )}
      </div>
    </div>
  )
}