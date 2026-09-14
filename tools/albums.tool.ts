import { supabase } from '@/lib/supabase/supabase';

export const albumsToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_albums',
    description:
      'Mencari portofolio, album pekerjaan, riwayat proyek, dan dokumentasi hasil kerja dari tabel albums. Dipakai untuk pertanyaan seputar "portofolio", "hasil kerja", "proyek", atau "dokumentasi pengerjaan".',
    parameters: {
      type: 'object',
      properties: {
        searchQuery: {
          type: 'string',
          description:
            'Kata kunci judul, kategori, atau lokasi proyek (contoh: "Instalasi", "RSUD", "Waled", "kantor")',
        },
      },
      required: [],
    },
  },
};

const ALBUM_SELECT =
  'id, title, description, category, location, project_date, album_photos(id)';

type AlbumRow = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  project_date: string | null;
  album_photos: { id: string }[] | null;
};

function toAlbumSummary(row: AlbumRow) {
  return {
    judul: row.title,
    deskripsi: row.description,
    kategori: row.category,
    lokasi: row.location,
    tanggal_proyek: row.project_date,
    jumlah_foto: row.album_photos?.length ?? 0,
    // Supaya chatbot bisa mengarahkan pelanggan ke halaman dokumentasinya.
    halaman: `/album/${row.id}`,
  };
}

export async function handleGetAlbums(args: { searchQuery?: string }) {
  let query = supabase
    .from('albums')
    .select(ALBUM_SELECT)
    .eq('status', true);

  // Kata kunci dicocokkan ke judul, kategori, maupun lokasi proyek.
  if (args.searchQuery) {
    const keyword = `%${args.searchQuery}%`;
    query = query.or(
      `title.ilike.${keyword},category.ilike.${keyword},location.ilike.${keyword}`
    );
  }

  const { data, error } = await query.order('project_date', {
    ascending: false,
    nullsFirst: false,
  });

  if (error) return { success: false, error: error.message };

  const rows = (data ?? []) as unknown as AlbumRow[];

  if (rows.length === 0) {
    const { data: fallback } = await supabase
      .from('albums')
      .select(ALBUM_SELECT)
      .eq('status', true)
      .limit(3);

    return {
      success: true,
      message:
        'Portofolio spesifik tidak ditemukan. Berikut beberapa contoh dokumentasi pengerjaan kami:',
      portofolio: ((fallback ?? []) as unknown as AlbumRow[]).map(
        toAlbumSummary
      ),
    };
  }

  return { success: true, portofolio: rows.map(toAlbumSummary) };
}
