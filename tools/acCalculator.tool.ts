import { supabase } from '@/lib/supabase/supabase';

export const acCalculatorToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'calculate_ac_capacity',
    description: 'Menghitung kebutuhan PK AC berdasarkan luas ruangan (panjang x lebar) dan mencarikan produk AC yang sesuai dari tabel products.',
    parameters: {
      type: 'object',
      properties: {
        length: { type: 'number', description: 'Panjang ruangan dalam meter' },
        width: { type: 'number', description: 'Lebar ruangan dalam meter' },
      },
      required: ['length', 'width'],
    },
  },
};

export async function handleCalculateAcCapacity(args: { length: number; width: number }) {
  const area = args.length * args.width;
  const requiredBTU = area * 500;

  let recommendedPK = 0.5;
  if (requiredBTU > 18000) recommendedPK = 2;
  else if (requiredBTU > 12000) recommendedPK = 1.5;
  else if (requiredBTU > 9000) recommendedPK = 1;
  else if (requiredBTU > 7000) recommendedPK = 0.75;

  // Produk menyimpan rentang luas ruangan yang disarankan, jadi itu yang
  // dipakai lebih dulu untuk mencari kandidat yang paling pas.
  const { data: byRoomArea } = await supabase
    .from('products')
    .select('*')
    .eq('stock_status', true)
    .lte('min_room_area', area)
    .gte('max_room_area', area);

  let matchingProducts = byRoomArea ?? [];

  // Kalau tidak ada yang cocok berdasarkan luas, jatuhkan ke pencocokan PK.
  if (matchingProducts.length === 0) {
    const { data: byPk } = await supabase
      .from('products')
      .select('*')
      .eq('stock_status', true)
      .eq('pk', recommendedPK);

    matchingProducts = byPk ?? [];
  }

  return {
    success: true,
    ruangan_m2: area,
    estimasi_btu: requiredBTU,
    rekomendasi_pk: `${recommendedPK} PK`,
    produk_tersedia: matchingProducts,
  };
}
