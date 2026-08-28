import { supabase } from '@/lib/supabase/supabase';

export const productsToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_products',
    description: 'Mencari daftar produk barang elektronik/AC, harga, dan ketersediaan stok dari tabel products Supabase.',
    parameters: {
      type: 'object',
      properties: {
        searchQuery: {
          type: 'string',
          description: 'Kata kunci produk (contoh: "Daikin", "Sharp", "Inverter", "1 PK")',
        },
      },
      required: [],
    },
  },
};

export async function handleGetProducts(args: { searchQuery?: string }) {
  let query = supabase.from('products').select('*');

  if (args.searchQuery) {
    query = query.ilike('name', `%${args.searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: error.message };

  // Fallback jika pencarian spesifik tidak ditemukan
  if (!data || data.length === 0) {
    const { data: fallbackProducts } = await supabase.from('products').select('*').limit(5);
    return {
      success: true,
      message: `Produk dengan kata kunci '${args.searchQuery}' tidak ditemukan. Berikut beberapa daftar produk yang tersedia:`,
      products: fallbackProducts || [],
    };
  }

  return { success: true, products: data };
}