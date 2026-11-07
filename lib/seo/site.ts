// Konstanta SEO situs: domain kanonik, data area layanan, dan helper
// pembentuk URL absolut. Semua metadata, sitemap, robots, dan structured
// data mengambil acuan dari sini supaya tidak ada dua versi domain.

const DEFAULT_SITE_URL = 'https://cvprimajayamandiri.com'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, '')

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const BRAND = 'CV. Prima Jaya Mandiri'

// Area layanan. Kantor pusat di Cirebon, cabang di Yogyakarta. Dipakai untuk
// halaman per wilayah dan `areaServed` di structured data.
export const SERVICE_AREAS = [
  {
    slug: 'cirebon',
    city: 'Cirebon',
    region: 'Jawa Barat',
    office: 'Kantor Pusat',
    areas: [
      'Kota Cirebon',
      'Kabupaten Cirebon',
      'Kuningan',
      'Indramayu',
      'Majalengka',
    ],
  },
  {
    slug: 'jogja',
    city: 'Jogja',
    region: 'Daerah Istimewa Yogyakarta',    office: 'Kantor Cabang',
    areas: [
      'Kota Yogyakarta',
      'Sleman',
      'Bantul',
      'Kulon Progo',
      'Gunungkidul',
    ],
  },
] as const

export type ServiceArea = (typeof SERVICE_AREAS)[number]

export function getServiceArea(slug: string): ServiceArea | null {
  return SERVICE_AREAS.find((area) => area.slug === slug) ?? null
}

// Layanan yang ditawarkan, dipakai sebagai `serviceType` di structured data
// dan sebagai daftar isi halaman wilayah.
export const SERVICE_TYPES = [
  {
    name: 'Service AC',
    description:
      'Servis AC rumah, kantor, dan usaha: cuci AC, tambah freon, bongkar pasang, serta perbaikan AC tidak dingin, bocor, atau berisik.',
  },
  {
    name: 'Instalasi AC',
    description:
      'Pemasangan AC baru untuk rumah, kantor, ruko, dan gedung, termasuk pipa, bracket, dan uji coba setelah instalasi.',
  },
  {
    name: 'Jual AC',
    description:
      'Penjualan unit AC berbagai merek dan kapasitas, dengan konsultasi PK sesuai luas ruangan.',
  },
  {
    name: 'Perawatan AC',
    description:
      'Perawatan berkala AC untuk menjaga performa pendinginan dan memperpanjang usia unit.',
  },
  {
    name: 'Instalasi Listrik',
    description:
      'Instalasi dan perbaikan kelistrikan rumah, kantor, dan tempat usaha.',
  },
  {
    name: 'Service Elektronik',
    description:
      'Perbaikan peralatan elektronik rumah tangga dan perkantoran.',
  },
]

// Klaim operasional yang dipakai di beberapa halaman sekaligus. Ubah di sini
// kalau operasional berubah, jangan diedit per halaman.
export const OPERATIONAL_CLAIMS = {
  hours: 'Senin–Jumat 08.00–17.00 WIB',
  emergency: 'Layanan darurat di luar jam kerja',
  freeSurvey: 'Survei dan konsultasi gratis',
  warranty: 'Garansi pekerjaan',
}
