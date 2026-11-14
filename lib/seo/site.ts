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
//
// `intro` dan `localNote` sengaja ditulis berbeda per wilayah: deskripsi
// layanan di database sama persis untuk Cirebon dan Jogja, jadi tanpa paragraf
// khas ini kedua halaman wilayah berisiko dianggap konten duplikat.
//
// `aliases` memuat sebutan lain untuk wilayah yang sama. Orang mencari "service
// ac jogja" lebih sering daripada "yogyakarta", tetapi dokumen resmi dan
// alamat kantor memakai "Yogyakarta". Keduanya perlu muncul di halaman wilayah
// supaya tidak bergantung pada satu bentuk kata saja.
//
// `districts` dipakai untuk blok jangkauan per kecamatan di halaman wilayah.
export const SERVICE_AREAS = [
  {
    slug: 'cirebon',
    city: 'Cirebon',
    region: 'Jawa Barat',
    office: 'Kantor Pusat',
    aliases: ['Cirebon', 'Kota Cirebon', 'Kabupaten Cirebon'],
    areas: [
      'Kota Cirebon',
      'Kabupaten Cirebon',
      'Kuningan',
      'Indramayu',
      'Majalengka',
    ],
    districts: [
      {
        group: 'Kota Cirebon',
        items: [
          'Harjamukti',
          'Kejaksan',
          'Kesambi',
          'Lemahwungkuk',
          'Pekalipan',
        ],
      },
      {
        group: 'Kabupaten Cirebon',
        items: [
          'Sumber',
          'Plumbon',
          'Losari',
          'Astanajapura',
          'Arjawinangun',
          'Weru',
        ],
      },
    ],
    intro:
      'Cirebon termasuk wilayah berudara panas dan lembap karena berada di pesisir utara Jawa Barat, sehingga AC di rumah maupun tempat usaha nyaris dipakai sepanjang hari. Beban pemakaian yang tinggi itu membuat unit lebih cepat kotor, freon lebih cepat habis, dan kerusakan kompresor lebih sering muncul kalau perawatan ditunda.',
    localNote:
      'Kantor pusat kami berada di Losari, Kabupaten Cirebon, jadi teknisi berangkat dari wilayah Cirebon sendiri, bukan dari luar kota. Untuk panggilan di Kota Cirebon, Sumber, Plumbon, atau Losari, teknisi biasanya bisa datang di hari yang sama. Wilayah Kuningan, Indramayu, dan Majalengka dilayani dengan penjadwalan sehari sebelumnya. Kami juga menerima kontrak perawatan bulanan untuk kantor, ruko, hotel, dan restoran di sepanjang jalur pantura Cirebon.',
  },
  {
    slug: 'jogja',
    city: 'Jogja',
    region: 'Daerah Istimewa Yogyakarta',
    office: 'Kantor Cabang',
    aliases: [
      'Jogja',
      'Yogyakarta',
      'Jogjakarta',
      'Daerah Istimewa Yogyakarta',
      'DIY',
    ],
    areas: [
      'Kota Yogyakarta',
      'Sleman',
      'Bantul',
      'Kulon Progo',
      'Gunungkidul',
    ],
    districts: [
      {
        group: 'Kota Yogyakarta',
        items: [
          'Gondokusuman',
          'Mantrijeron',
          'Umbulharjo',
          'Kotagede',
          'Danurejan',
          'Tegalrejo',
        ],
      },
      {
        group: 'Sleman',
        items: [
          'Gamping',
          'Depok',
          'Mlati',
          'Ngaglik',
          'Kalasan',
          'Tempel',
        ],
      },
      {
        group: 'Bantul',
        items: [
          'Banguntapan',
          'Sewon',
          'Kasihan',
          'Jetis',
          'Pleret',
          'Imogiri',
        ],
      },
    ],
    intro:
      'Jogja punya dua watak pelanggan yang sama-sama kami layani: rumah tinggal di kawasan padat seperti Sleman dan Bantul, serta usaha kecil seperti kafe, kos, dan penginapan yang menuntut AC selalu siap dipakai. Unit yang menyala hampir tanpa jeda membuat filter cepat tertutup debu dan aliran udara melemah, sehingga AC terasa kurang dingin meski kompresor masih bekerja.',
    localNote:
      'Kantor cabang kami berada di Trihanggo, Gamping, Sleman, jadi teknisi service AC Yogyakarta kami berangkat dari Sleman, bukan didatangkan dari luar provinsi. Untuk Kota Yogyakarta, Sleman, dan Bantul, teknisi biasanya bisa datang di hari yang sama. Kulon Progo dan Gunungkidul dilayani dengan penjadwalan sehari sebelumnya, karena jaraknya lebih jauh dari kantor cabang. Banyak pelanggan kami adalah pengelola kos, kafe, dan penginapan di kawasan wisata yang membutuhkan servis di luar jam operasional supaya tamu tidak terganggu; jadwal seperti itu bisa diatur saat konsultasi.',
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
