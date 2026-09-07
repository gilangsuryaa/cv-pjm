import { supabase } from '@/lib/supabase/supabase';

export const servicesToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_services',
    description: 'Mengambil daftar layanan, jasa servis AC, instalasi, atau perbaikan dari database.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Kategori layanan jika ada (misal: cuci ac, pasang ac, perbaikan, listrik).',
        },
      },
      required: [],
    },
  },
};

export async function handleGetServices(args?: { category?: string }) {
  try {
    let query = supabase.from('services').select('*');

    if (args?.category) {
      query = query.ilike('category', `%${args.category}%`);
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
  } catch (err: any) {
    return { success: false, services: [], error: err?.message || 'Error internal' };
  }
}