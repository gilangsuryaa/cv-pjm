import { createClient } from '@/lib/supabase/server'

export default async function TestSupabase() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')

  return (
    <pre>
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
  )
}