import { createClient } from '@/lib/supabase/server'

export async function recommendAC(roomArea: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lte('min_room_area', roomArea)
    .gte('max_room_area', roomArea)
    .eq('stock_status', true)
    .order('pk', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}