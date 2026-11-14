import { supabase } from '@/lib/supabase/supabase';

export const servicesToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_services',
    description: 'Mengambil daftar layanan, jasa servis AC, instalasi, atau perbaikan dari database.',
    parameters: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Kata kunci nama layanan (misal: cuci ac, pasang ac, perbaikan, listrik). Opsional.',
        },
      },
      required: [],
    },
  },
};

export async function handleGetServices(args?: { keyword?: string }) {
  try {
    let query = supabase.from('services').select('*');

    // Tabel services tidak punya kolom category, jadi pencarian memakai nama layanan.
    if (args?.keyword) {
      query = query.ilike('name', `%${args.keyword}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error Supabase (get_services):', error.message);
      return { success: false, services: [], error: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: true,
        services: [],
        message: 'Layanan tidak ditemukan di database. Arahkan pengguna menghubungi CS via WhatsApp.',
      };
    }

    return {
      success: true,
      services: data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error internal';
    return { success: false, services: [], error: message };
  }
}