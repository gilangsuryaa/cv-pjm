import { supabase } from '@/lib/supabase/supabase';

export const faqsToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_faqs',
    description: 'Mencari jawaban FAQ seputar garansi, jadwal, atau metode pembayaran dari tabel faqs.',
    parameters: {
      type: 'object',
      properties: {
        searchQuery: { type: 'string', description: 'Topik pertanyaan' },
      },
      required: [],
    },
  },
};

export async function handleGetFaqs(args: { searchQuery?: string }) {
  let query = supabase.from('faqs').select('question, answer');
  if (args.searchQuery) {
    query = query.ilike('question', `%${args.searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) return { success: false, error: error.message };
  return { success: true, faqs: data };
}