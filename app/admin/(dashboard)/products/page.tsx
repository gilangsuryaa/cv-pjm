import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteProductButton from './delete-product-button'

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*, product_images(id, path, sort_order)')
    .order('created_at', { ascending: false })
    .order('sort_order', {
      foreignTable: 'product_images',
      ascending: true,
    })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Produk
        </h1>

        <p className="mt-2 text-red-700">
          {error.message}
        </p>
      </div>
    )
  }

  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = product.product_images ?? []
      const cover = images[0]

      if (!cover) {
        return {
          ...product,
          coverUrl: null,
          imageCount: 0,
        }
      }

      const { data } = await supabase.storage
        .from('products')
        .createSignedUrl(cover.path, 60 * 60)

      return {
        ...product,
        coverUrl: data?.signedUrl ?? null,
        imageCount: images.length,
      }
    })
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Produk
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola produk AC dan elektronik.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Produk
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Brand
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Tipe
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                PK
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Daya
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Kapasitas
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Harga
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Area
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Stok
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
            {productsWithImages.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {product.brand || '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {product.type || '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {product.pk
                    ? `${product.pk} PK`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {product.daya
                    ? `${Number(product.daya).toLocaleString('id-ID')}W`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {product.kapasitas
                    ? `${Number(product.kapasitas).toLocaleString('id-ID')} BTU/h`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                  {product.price
                    ? `Rp ${Number(
                        product.price
                      ).toLocaleString('id-ID')}`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {product.min_room_area != null &&
                  product.max_room_area != null
                    ? `${product.min_room_area}–${product.max_room_area} m²`
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.stock_status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {product.stock_status
                      ? 'Tersedia'
                      : 'Tidak tersedia'}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {product.coverUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={product.coverUrl}
                        alt={product.name}
                        className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                      />

                      {product.imageCount > 1 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                          +{product.imageCount - 1}
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
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteProductButton id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {products.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada produk.
          </div>
        )}
      </div>
    </div>
  )
}