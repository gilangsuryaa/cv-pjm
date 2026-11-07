# CV Prima Jaya Mandiri

Situs perusahaan CV Prima Jaya Mandiri — penjualan, instalasi, perawatan, dan
perbaikan AC serta kelistrikan. Terdiri dari tiga bagian yang jalan dalam satu
aplikasi Next.js:

- **Situs publik** — beranda, produk, layanan, portofolio, dan kontak.
- **Panel admin** — CRUD untuk seluruh konten situs, dilindungi login.
- **Chatbot CS** — asisten virtual yang menjawab dari data database, bukan
  karangan model.

Seluruh konten katalog diambil dari Supabase. Tidak ada daftar produk, layanan,
album, maupun informasi kontak yang ditulis langsung di kode — semuanya dikelola
lewat panel admin.

## Teknologi

| Bagian | Dipakai |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Database, Auth, Storage | Supabase |
| Chatbot | Google Gemini (`@google/genai`) dengan function calling |

## Menjalankan di lokal

```bash
npm install
```

Buat file `.env.local` di root proyek:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=xxxxxxxx
GEMINI_API_KEY=xxxxxxxx
# Opsional. Default: https://cvprimajayamandiri.com
NEXT_PUBLIC_SITE_URL=https://cvprimajayamandiri.com
```

> `GEMINI_API_KEY` **tidak boleh** diberi prefix `NEXT_PUBLIC_`. Variabel
> berprefix itu ikut dikirim ke browser, dan kunci Gemini akan bocor ke publik.

```bash
npm run dev     # server pengembangan di http://localhost:3000
npm run build   # build produksi
npm start       # menjalankan hasil build
npm run lint    # ESLint
```

## Struktur

```
app/
  page.tsx              beranda
  about|services|products|album|contact|terms|privacy-policy/
  layanan/[area]/       halaman SEO per wilayah (cirebon, jogja)
  sitemap.ts            /sitemap.xml (halaman statis + produk + album)
  components/           komponen situs publik
  components/seo/       JSON-LD: LocalBusiness, Service, Product, FAQ, Breadcrumb
  admin/                panel admin (butuh login)
  api/chat/route.ts     endpoint chatbot
components/
  ChatWidget.tsx        widget chat di situs publik
  admin/                komponen upload gambar
lib/
  seo/site.ts           domain kanonik, area layanan, klaim operasional
  data/                 pengambilan data dari Supabase
  supabase/             client, server, dan helper storage
  image/compress.ts     kompresi gambar saat upload
  auth/require-admin.ts pemeriksaan hak akses admin
tools/                  definisi tool yang dipanggil chatbot
proxy.ts                gerbang autentikasi untuk /admin
```

## Database

Tabel: `products` + `product_images`, `services`, `albums` + `album_photos`,
`faqs`, `site_settings`, `profiles`.

Bucket Storage: `products`, `services`, `albums` (privat, diakses lewat signed
URL) dan `site-settings` (publik, untuk logo dan favicon).

Identitas situs — nama perusahaan, logo, favicon, alamat, telepon, WhatsApp,
email, dan tautan Google Maps — dibaca dari `site_settings`. Mengubahnya di
panel admin langsung mengubah tampilan navbar, footer, halaman kontak, judul
tab, dan jawaban chatbot.

Agar ditemukan lewat pencarian "service ac cirebon", "service ac jogja", dan
sejenisnya, situs ini punya beberapa lapis:

- **Halaman wilayah** di `/layanan/cirebon` dan `/layanan/jogja`. Judul, H1,
  deskripsi, dan teks badan menyebut kota beserta kecamatan sekitarnya.
- **`/sitemap.xml`** dari [`app/sitemap.ts`](app/sitemap.ts). Halaman statis,
  produk, dan album ikut terdaftar otomatis. `/robots.txt` merujuk ke sitemap
  ini, jadi cukup daftarkan sekali di Search Console.
- **Structured data** dari [`app/components/seo/StructuredData.tsx`](app/components/seo/StructuredData.tsx):
  `HVACBusiness` (nama, telepon, dua alamat kantor, jam buka, area layanan),
  `Service` per layanan, `Product` di halaman produk, `FAQPage` di beranda,
  dan `BreadcrumbList` di halaman dalam.
- **Canonical + Open Graph** di tiap halaman, dengan `metadataBase` dari
  `NEXT_PUBLIC_SITE_URL`.

Klaim operasional yang dipakai berulang (jam layanan, garansi, survei gratis)
ada di satu tempat: [`lib/seo/site.ts`](lib/seo/site.ts). Daftar wilayah juga di
sana, jadi menambah kota baru cukup menambah satu entri dan halaman
`/layanan/<slug>` ikut terbuat.

Kalau domain berubah, ubah `NEXT_PUBLIC_SITE_URL` lalu deploy ulang; sitemap,
canonical, dan robots ikut menyesuaikan.

## Panel admin

Ada di `/admin`. Seluruh route di bawahnya dijaga [`proxy.ts`](proxy.ts) yang
berjalan sebelum halaman dirender, sehingga pengunjung tanpa sesi login
dialihkan ke `/admin/login` tanpa pernah menerima UI admin. Pemeriksaan peran
admin dilakukan lagi di dekat sumber data lewat
[`lib/auth/require-admin.ts`](lib/auth/require-admin.ts).

Gambar yang diunggah dikecilkan dulu di browser (maksimal 1600 px, dikonversi ke
WebP) oleh [`lib/image/compress.ts`](lib/image/compress.ts), jadi foto kamera HP
tidak dikirim mentah ke pengunjung. Format vektor, animasi, dan ikon dilewati
apa adanya.

## Chatbot

`POST /api/chat` menerima riwayat percakapan dan menjawab memakai Gemini.
Model hanya boleh menjawab berdasarkan data yang diambil lewat tool di folder
[`tools/`](tools): produk, layanan, FAQ, pengaturan situs, album pekerjaan, dan
kalkulator kapasitas AC berdasarkan luas ruangan.

Satu pertanyaan bisa memicu dua panggilan ke Gemini — satu untuk memilih tool,
satu lagi membawa hasil query database — sehingga responsnya bisa memakan waktu
lebih dari 10 detik. Karena itu route-nya menetapkan `maxDuration = 60`.

## Deploy ke Vercel

1. Import repositori ini di Vercel. Preset Next.js terdeteksi otomatis.
2. Isi ketiga environment variable di atas untuk environment **Production** dan
   **Preview**.
3. Deploy.

Tidak ada konfigurasi Redirect URL yang perlu diatur di Supabase, karena login
admin memakai email dan password (`signInWithPassword`), bukan magic link
maupun OAuth.

## Catatan teknis

Gambar dari Supabase Storage dirender dengan prop `unoptimized`, sehingga
diambil langsung oleh browser tanpa melewati image optimizer Next. Alasannya,
URL-nya ditandatangani dan tokennya berubah setiap render, jadi cache optimizer
tidak pernah kena dan server justru mengunduh serta mengencode ulang gambar yang
sama pada tiap permintaan. Ukuran gambar sudah ditekan saat diunggah.

Logo dan favicon selalu ditimpa ke path yang sama di Storage, jadi URL-nya
diberi penanda versi dari kolom `updated_at` agar browser tidak menampilkan
versi lama dari cache setelah admin menggantinya.
