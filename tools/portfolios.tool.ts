import { supabase } from '@/lib/supabase/supabase';

export const portfoliosToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_portfolios',
    description: 'Mencari riwayat pengerjaan proyek, contoh hasil kerja, dan foto portofolio dari tabel portfolios.',
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

const PORTFOLIO_SELECT = 'id, title, description, project_date, service_id';

export async function handleGetPortfolios(args: { searchQuery?: string }) {
  let query = supabase.from('portfolios').select(PORTFOLIO_SELECT);

  if (args.searchQuery) {
    query = query.ilike('title', `%${args.searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: error.message };

  if (!data || data.length === 0) {
    const { data: fallbackPortfolios } = await supabase
      .from('portfolios')
      .select(PORTFOLIO_SELECT)
      .limit(3);

    return {
      success: true,
      message: `Portofolio spesifik tidak ditemukan. Berikut beberapa contoh dokumentasi pengerjaan kami:`,
      portfolios: fallbackPortfolios || [],
    };
  }

  return { success: true, portfolios: data };
}
