import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServicesHero from "../components/Services/ServicesHero";
import CoreServices from "../components/Services/CoreServices";
import WhyChooseServices from "../components/Services/WhyChooseServices";
import Footer from "../components/Footer";
import { getServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/site-settings";
import { BRAND, OPERATIONAL_CLAIMS, absoluteUrl } from "@/lib/seo/site";
import {
  BreadcrumbJsonLd,
  ServicesJsonLd,
} from "../components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Layanan Service AC, Instalasi & Service Elektronik",
  description:
    "Layanan service AC, cuci AC, isi freon, bongkar pasang AC, instalasi AC, perawatan AC, service elektronik, dan instalasi listrik untuk Cirebon, Jogja, dan sekitarnya. Teknisi berpengalaman, garansi pekerjaan.",
  keywords: [
    "service ac",
    "service ac cirebon",
    "service ac jogja",
    "cuci ac",
    "isi freon ac",
    "instalasi ac",
    "bongkar pasang ac",
    "service elektronik",
    "instalasi listrik",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Layanan Service AC, Instalasi & Service Elektronik",
    description:
      "Service AC, instalasi AC, perawatan AC, service elektronik, dan instalasi listrik untuk Cirebon dan Jogja.",
    url: "/services",
  },
};

// Rincian per layanan. Nama di sini harus sama dengan nama di tabel `services`
// supaya anchor /services#<anchor> dari footer tetap cocok; rincian dipakai
// sebagai pelengkap, bukan pengganti deskripsi dari database.
const SERVICE_DETAIL = [
  {
    name: "Instalasi AC",
    detail:
      "Pemasangan unit baru untuk rumah, ruko, kantor, dan gedung. Sebelum pemasangan, kami hitung kebutuhan PK berdasarkan luas ruangan, jumlah penghuni, dan sumber panas seperti jendela kaca atau atap tanpa insulasi, karena PK yang terlalu kecil membuat kompresor bekerja terus-menerus dan tagihan listrik ikut naik.",
    points: [
      "Pengukuran titik indoor dan outdoor, termasuk jalur pipa dan pembuangan",
      "Bracket, pipa, kabel, dan vacuum sebelum unit dinyalakan",
      "Uji coba pendinginan dan pengecekan kebocoran setelah pemasangan",
    ],
  },
  {
    name: "Kontrak Service AC",
    detail:
      "Perawatan berkala untuk kantor, ruko, hotel, restoran, dan usaha lain yang punya banyak unit. Jadwal kunjungan disusun di awal kontrak, sehingga tidak perlu menghubungi teknisi satu per satu setiap kali AC mulai kurang dingin, dan biaya transportasi tidak muncul lagi selama masa kontrak.",
    points: [
      "Pemeriksaan dan pembersihan rutin sesuai jadwal yang disepakati",
      "Laporan kondisi tiap unit agar kerusakan terdeteksi lebih awal",
      "Prioritas penanganan kalau ada unit yang tiba-tiba bermasalah",
    ],
  },
  {
    name: "Service AC berkala",
    detail:
      "Cuci AC untuk unit rumah dan usaha yang masih berfungsi normal. Debu yang menumpuk di filter dan evaporator menghambat aliran udara, sehingga AC terasa kurang dingin padahal kompresor masih bekerja dan listrik tetap terpakai penuh. Pembersihan rutin mengembalikan aliran udara dan meringankan kerja kompresor.",
    points: [
      "Pembersihan unit indoor, outdoor, dan jalur pembuangan air",
      "Pengecekan tekanan freon serta kondisi kapasitor dan motor fan",
      "Penyemprotan antiseptik untuk mengurangi bau apek pada hembusan",
    ],
  },
  {
    name: "Perbaikan AC",
    detail:
      "Penanganan AC yang tidak dingin, bocor air, berisik, mati total, atau sering trip. Kami mulai dari pemeriksaan menyeluruh untuk mencari penyebabnya, bukan langsung mengganti komponen, lalu menyampaikan opsi perbaikan beserta biayanya supaya Anda bisa memutuskan sebelum pengerjaan.",
    points: [
      "Diagnosis kebocoran freon, kerusakan kompresor, dan masalah kelistrikan",
      "Perbaikan atau penggantian komponen sesuai temuan",
      "Pengecekan ulang setelah perbaikan untuk memastikan unit stabil",
    ],
  },
  {
    name: "Chemical Cleaning/Overhaul",
    detail:
      "Pembersihan mendalam dengan cairan kimia khusus dan pembongkaran total, untuk AC yang sudah bertahun-tahun tidak diservis atau tidak mempan cuci biasa. Cara ini membuka bagian yang tertutup kerak dan lumut, sehingga pendinginan kembali normal tanpa harus membeli unit baru.",
    points: [
      "Bongkar total evaporator dan blower untuk pembersihan menyeluruh",
      "Perendaman cairan kimia untuk kerak membandel dan jamur",
      "Perakitan ulang, vacuum, dan uji pendinginan sebelum diserahkan",
    ],
  },
  {
    name: "Instalasi Listrik",
    detail:
      "Pemasangan dan perbaikan kelistrikan rumah, kantor, dan tempat usaha, termasuk jalur khusus untuk AC. Beban AC yang besar butuh MCB dan ukuran kabel yang tepat; jalur yang salah ukur membuat kabel panas dan memicu gangguan listrik saat beberapa unit menyala bersamaan.",
    points: [
      "Penambahan jalur dan MCB khusus untuk unit AC",
      "Perbaikan instalasi yang korslet, panas, atau sering jeglek",
      "Pengecekan pembebanan agar aman dipakai bersamaan",
    ],
  },
  {
    name: "Service Elektronik",
    detail:
      "Perbaikan peralatan elektronik rumah tangga dan perkantoran seperti kulkas, mesin cuci, dan dispenser. Sebagian kerusakan elektronik ternyata berakar pada kelistrikan yang tidak stabil, sehingga pemeriksaan mencakup sumber dayanya, bukan hanya bagian yang mati.",
    points: [
      "Pemeriksaan dan perbaikan kulkas, mesin cuci, dan dispenser",
      "Penelusuran penyebab kerusakan sampai ke sumber kelistrikan",
      "Saran penggantian komponen kalau perbaikan tidak lagi ekonomis",
    ],
  },
];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <Navbar />
      <ServicesHero />
      <CoreServices />
      <WhyChooseServices />
      {/* Rincian tiap layanan: apa yang dikerjakan, kapan perlu dipanggil
          teknisi, dan apa yang didapat pelanggan. Kartu di CoreServices hanya
          menampilkan cuplikan; bagian ini yang memberi konteks. */}
      <section className="border-t border-[#e5cfc8] bg-white px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-xl font-bold text-[#0F4C75] sm:text-2xl">
            Apa Saja yang Dikerjakan Teknisi Kami
          </h2>

          <div className="mt-8 flex flex-col gap-8">
            {SERVICE_DETAIL.map((item) => (
              <article key={item.name}>
                <h3 className="text-[17px] font-bold text-[#0F4C75] sm:text-[18px]">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#654f4a]">
                  {item.detail}
                </p>

                <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#64748B]">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#0788D1]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-[#D91E05] pl-4 text-sm leading-6 text-[#654f4a]">
            Semua pekerjaan didahului pemeriksaan kondisi unit, dan biaya
            disampaikan sebelum pengerjaan dimulai. {OPERATIONAL_CLAIMS.freeSurvey}{" "}
            untuk wilayah Cirebon dan Jogja.
          </p>
        </div>
      </section>

      <Footer />

      {/* Daftar area layanan sebagai tautan internal, supaya Google tahu
          halaman mana yang membahas Cirebon dan mana yang Jogja. */}
      <section className="border-t border-[#e5cfc8] bg-[#F8FCFE] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-xl font-bold text-[#0F4C75] sm:text-2xl">
            Area Layanan Service AC
          </h2>

          <p className="mt-2 max-w-[720px] text-sm leading-6 text-[#64748B]">
            {settings.company_name ?? BRAND} melayani service AC dan
            instalasi kelistrikan di dua wilayah operasional:
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={absoluteUrl("/layanan/cirebon")}
              className="rounded-full border border-[#DCEAF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F4C75] transition hover:border-[#2B8CC4] hover:text-[#2B8CC4]"
            >
              Service AC Cirebon
            </a>

            <a
              href={absoluteUrl("/layanan/jogja")}
              className="rounded-full border border-[#DCEAF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F4C75] transition hover:border-[#2B8CC4] hover:text-[#2B8CC4]"
            >
              Service AC Jogja
            </a>
          </div>
        </div>
      </section>

      <ServicesJsonLd services={services} settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Layanan", path: "/services" },
        ]}
      />
    </main>
  );
}
