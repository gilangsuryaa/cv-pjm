import { supabase } from '@/lib/supabase';

export const acCalculatorToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'calculate_ac_capacity',
    description: 'Menghitung kebutuhan PK AC berdasarkan luas ruangan (panjang x lebar) dan mencarikan produk yang sesuai dari tabel services.',
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

  let recommendedPK = '0.5 PK';
  if (requiredBTU > 18000) recommendedPK = '2 PK';
  else if (requiredBTU > 12000) recommendedPK = '1.5 PK';
  else if (requiredBTU > 9000) recommendedPK = '1 PK';
  else if (requiredBTU > 7000) recommendedPK = '0.75 PK';

  // Cari produk yang sesuai PK-nya di tabel services
  const { data: matchingServices } = await supabase
    .from('services')
    .select('*')
    .ilike('name', `%${recommendedPK.split(' ')[0]}%`);

  return {
    success: true,
    ruangan_m2: area,
    estimasi_btu: requiredBTU,
    rekomendasi_pk: recommendedPK,
    produk_tersedia: matchingServices || [],
  };
}