import { supabase } from '@/lib/supabase';

export const servicesToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_services',
    description: 'Mencari daftar produk AC, layanan cuci/pasang, dan harga resmi dari tabel services Supabase.',
    parameters: {
      type: 'object',
      properties: {
        searchQuery: {
          type: 'string',
          description: 'Kata kunci produk/layanan (contoh: "Daikin", "Sharp", "Cuci AC", "0.5 PK")',
        },
      },
      required: [],
    },
  },
};

export async function handleGetServices(args: { searchQuery?: string }) {
  let query = supabase.from('services').select('*');

  // Jika pengguna memberikan kata kunci pencarian
  if (args.searchQuery) {
    query = query.ilike('name', `%${args.searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: error.message };

  // Jika pencarian spesifik tidak ketemu, ambilkan 5 produk teratas sebagai fallback
  if (!data || data.length === 0) {
    const { data: allServices } = await supabase.from('services').select('*').limit(5);
    return {
      success: true,
      message: `Produk dengan kata kunci '${args.searchQuery}' tidak ditemukan. Berikut beberapa pilihan yang tersedia:`,
      services: allServices || [],
    };
  }

  return { success: true, services: data };
}