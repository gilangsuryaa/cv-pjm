import { supabase } from '@/lib/supabase/supabase';

export const siteSettingsToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'get_site_settings',
    description: 'Mengambil informasi kontak resmi toko (WhatsApp, Telepon, Alamat, Email, Sosial Media) dari tabel site_settings.',
    parameters: { type: 'object', properties: {}, required: [] },
  },
};

export async function handleGetSiteSettings() {
  const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
  if (error) return { success: false, error: error.message };
  return { success: true, site_info: data };
}