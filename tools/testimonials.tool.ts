import { supabase } from '@/lib/supabase';

export const testimonialsToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_testimonials',
    description: 'Mengambil daftar ulasan, rating, dan testimoni kepuasan pelanggan dari tabel testimonial.',
    parameters: {
      type: 'object',
      properties: {
        minRating: {
          type: 'number',
          description: 'Batas minimal rating yang dicari (contoh: 4 atau 5)',
        },
      },
      required: [],
    },
  },
};

export async function handleGetTestimonials(args: { minRating?: number }) {
  let query = supabase
    .from('testimonial')
    .select('id, customer_name, customer_location, rating, message, status');

  if (args.minRating) {
    query = query.gte('rating', args.minRating);
  }

  // Mengurutkan berdasarkan rating tertinggi dan membatasi 5 review teratas
  const { data, error } = await query.order('rating', { ascending: false }).limit(5);

  if (error) return { success: false, error: error.message };

  return { success: true, testimonials: data || [] };
}