import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteAlbumButton from './delete-album-button'

export default async function AlbumsPage() {
  const supabase = await createClient()

  const { data: albums, error } = await supabase
    .from('albums')
    .select(`*, album_photos ( id )`)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Album
        </h1>

        <p className="mt-2 text-red-700">
          {error.message}
        </p>
      </div>
    )
  }

  const albumsWithImages = await Promise.all(
    (albums ?? []).map(async (album) => {
      const photoCount = album.album_photos?.length ?? 0

      if (!album.cover_image) {
        return {
          ...album,
          coverUrl: '',
          photoCount,
        }
      }

      const { data: signedImage } = await supabase.storage
        .from('albums')
        .createSignedUrl(album.cover_image, 60 * 60)

      return {
        ...album,
        coverUrl: signedImage?.signedUrl ?? '',
        photoCount,
      }
    })
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Album
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Kelola album foto pekerjaan.
          </p>
        </div>

        <Link
          href="/admin/albums/create"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Album
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Judul
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Kategori
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Lokasi
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Tanggal
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-left font-semibold text-gray-700">
                Cover
              </th>

              <th className="whitespace-nowrap px-6 py-3 text-right font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {albumsWithImages.map((album) => (
              <tr key={album.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {album.title}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {album.category || '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {album.location || '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {album.project_date
                    ? new Date(
                        album.project_date
                      ).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '-'}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      album.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {album.status ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {album.coverUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                      />

                      {album.photoCount > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                          {album.photoCount}
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
                    href={`/admin/albums/${album.id}/edit`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteAlbumButton id={album.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {(albums ?? []).length === 0 && (
          <div className="p-8 text-center text-sm text-gray-600">
            Belum ada album.
          </div>
        )}
      </div>
    </div>
  )
}