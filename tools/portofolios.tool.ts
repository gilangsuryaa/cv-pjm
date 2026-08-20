import { supabase } from '@/lib/supabase';

export const portofoliosToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_portofolios',
    description: 'Mencari riwayat pengerjaan proyek, contoh hasil kerja, dan foto portofolio dari tabel portofolios.',
    parameters: {
      type: 'object',
      properties: {
        searchQuery: {
          type: 'string',
          description: 'Kata kunci proyek atau jenis pengerjaan (contoh: "Pemasangan Gedung", "Cuci AC Kantor", "Bongkar Pasang")',
        },
      },
      required: [],
    },
  },
};

export async function handleGetPortofolios(args: { searchQuery?: string }) {
  let query = supabase.from('portofolios').select('id, title, description, image, service_id');

  if (args.searchQuery) {
    query = query.ilike('title', `%${args.searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: error.message };

  if (!data || data.length === 0) {
    const { data: fallbackPortofolios } = await supabase.from('portofolios').select('id, title, description').limit(3);
    return {
      success: true,
      message: `Portofolio spesifik tidak ditemukan. Berikut beberapa contoh dokumentasi pengerjaan kami:`,
      portofolios: fallbackPortofolios || [],
    };
  }

  return { success: true, portofolios: data };
}