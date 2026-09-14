import { createClient } from '@/lib/supabase/server'
import { getSignedUrlMap } from '@/lib/supabase/storage'

export type Album = {
  id: number
  title: string
  description: string | null
  category: string | null
  location: string | null
  project_date: string | null
  coverUrl: string | null
  photos: { url: string; caption: string | null }[]
}

type AlbumRow = {
  id: number
  title: string
  description: string | null
  category: string | null
  location: string | null
  project_date: string | null
  cover_image: string | null
  album_photos:
    | { id: string; image_url: string; caption: string | null; sort_order: number | null }[]
    | null
}

const ALBUM_SELECT =
  'id, title, description, category, location, project_date, cover_image, album_photos(id, image_url, caption, sort_order)'

function mapAlbum(row: AlbumRow, signedUrls: Map<string, string>): Album {
  const photos =
    row.album_photos
      ?.map((photo) => ({
        url: signedUrls.get(photo.image_url) ?? null,
        caption: photo.caption,
      }))
      .filter((photo): photo is { url: string; caption: string | null } =>
        Boolean(photo.url)
      ) ?? []

  const coverUrl = row.cover_image
    ? (signedUrls.get(row.cover_image) ?? null)
    : (photos[0]?.url ?? null)

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    location: row.location,
    project_date: row.project_date,
    coverUrl,
    photos,
  }
}

function collectPaths(rows: AlbumRow[]) {
  return rows.flatMap((row) => [
    row.cover_image,
    ...(row.album_photos?.map((photo) => photo.image_url) ?? []),
  ])
}

export async function getAlbums(options?: {
  limit?: number
  category?: string
}): Promise<Album[]> {
  const supabase = await createClient()

  let query = supabase
    .from('albums')
    .select(ALBUM_SELECT)
    .eq('status', true)
    .order('project_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .order('sort_order', {
      referencedTable: 'album_photos',
      ascending: true,
    })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error || !data) return []

  const rows = data as unknown as AlbumRow[]
  const signedUrls = await getSignedUrlMap(supabase, 'albums', collectPaths(rows))

  return rows.map((row) => mapAlbum(row, signedUrls))
}

export async function getAlbum(id: number): Promise<Album | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select(ALBUM_SELECT)
    .eq('id', id)
    .eq('status', true)
    .order('sort_order', {
      referencedTable: 'album_photos',
      ascending: true,
    })
    .maybeSingle()

  if (error || !data) return null

  const row = data as unknown as AlbumRow
  const signedUrls = await getSignedUrlMap(supabase, 'albums', collectPaths([row]))

  return mapAlbum(row, signedUrls)
}

// Daftar kategori unik untuk filter di halaman /album.
export async function getAlbumCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select('category')
    .eq('status', true)

  if (error || !data) return []

  return [
    ...new Set(
      data
        .map((row) => row.category)
        .filter((category): category is string => Boolean(category))
    ),
  ].sort()
}
