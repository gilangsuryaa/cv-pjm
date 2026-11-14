import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  BreadcrumbJsonLd,
  ServicesJsonLd,
} from "../../components/seo/StructuredData";

import { getServices } from "@/lib/data/services";
import {
  buildWhatsappUrl,
  formatPhoneHref,
  getSiteSettings,
} from "@/lib/data/site-settings";
import {
  BRAND,
  OPERATIONAL_CLAIMS,
  SERVICE_AREAS,
  SERVICE_TYPES,
  getServiceArea,
} from "@/lib/seo/site";

type AreaPageProps = {
  params: Promise<{ area: string }>;
};

// Keluhan yang paling sering dilaporkan pelanggan, dipakai halaman wilayah
// supaya orang yang mencari gejala spesifik (AC bocor, tidak dingin) tetap
// mendapat jawaban sebelum menghubungi. Penyebab ditulis sebagai kemungkinan,
// bukan vonis, karena kepastian hanya didapat setelah unit diperiksa.
const COMMON_ISSUES = [
  {
    problem: "AC menyala tapi tidak dingin",
    cause:
      "Paling sering karena freon berkurang akibat kebocoran halus di sambungan pipa, atau filter dan evaporator sudah tertutup debu sehingga udara dingin tidak keluar. Kalau kompresor tetap menyala tapi hembusan hanya hangat, pemeriksaan tekanan freon jadi langkah pertama.",
  },
  {
    problem: "Air menetes dari unit indoor",
    cause:
      "Biasanya jalur pembuangan tersumbat lendir dan debu, atau pipa drainase miring ke arah yang salah. Kalau dibiarkan, air bisa merembes ke plafon dan merusak cat maupun rangka.",
  },
  {
    problem: "AC berisik atau bergetar",
    cause:
      "Bisa berasal dari baut bracket yang longgar, kipas outdoor yang terganjal, atau bearing motor fan yang mulai aus. Suara kasar dari kompresor sendiri perlu diperiksa lebih cepat karena bisa berujung pada penggantian unit.",
  },
  {
    problem: "AC mati sendiri atau sering trip",
    cause:
      "Sering dipicu kapasitor kompresor yang melemah, MCB yang terlalu kecil untuk beban unit, atau kabel yang panas karena ukurannya tidak sesuai. Kelistrikan jadi bagian yang ikut diperiksa, bukan hanya unit AC-nya.",
  },
  {
    problem: "Bau apek saat AC dinyalakan",
    cause:
      "Jamur dan bakteri tumbuh di evaporator serta saluran udara karena kondensasi yang tertahan. Cuci AC dengan penyemprotan antiseptik biasanya cukup, kecuali lapisan jamurnya sudah tebal sehingga perlu chemical cleaning.",
  },
  {
    problem: "Tagihan listrik naik padahal pemakaian sama",
    cause:
      "Evaporator yang kotor memaksa kompresor bekerja lebih lama untuk mencapai suhu yang sama. Setelah dibersihkan dan tekanan freon diperiksa, konsumsi listrik biasanya kembali seperti semula.",
  },
];

// Hanya dua wilayah yang punya halaman, jadi tautan lain tidak perlu
// ditawarkan ke crawler.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);

  if (!area) return {};

  const settings = await getSiteSettings();
  const companyName = settings.company_name ?? BRAND;

  const title = `Service AC ${area.city} — Cuci AC, Isi Freon & Instalasi`;

  const description = `Jasa service AC ${area.city} dari ${companyName}. Melayani cuci AC, isi freon, perbaikan AC tidak dingin, bongkar pasang, instalasi AC baru, dan perawatan AC di ${area.areas.join(", ")}.`;

  // Varian kata kunci: orang mencari "service ac jogja", dokumen resmi menulis
  // "yogyakarta". Keduanya dimasukkan supaya halaman tidak bergantung pada
  // satu bentuk kata saja.
  const keywordVariants = area.aliases.flatMap((alias) => {
    const lower = alias.toLowerCase();

    return [
      `service ac ${lower}`,
      `servis ac ${lower}`,
      `cuci ac ${lower}`,
      `isi freon ac ${lower}`,
      `instalasi ac ${lower}`,
      `tukang ac ${lower}`,
      `jual ac ${lower}`,
      `service ac panggilan ${lower}`,
    ];
  });

  return {
    title,
    description,
    keywords: [...new Set(keywordVariants)],
    alternates: { canonical: `/layanan/${area.slug}` },
    openGraph: {
      title,
      description,
      url: `/layanan/${area.slug}`,
      images: [
        {
          url: "/images/Home/hero-3.webp",
          width: 1600,
          height: 900,
          alt: `Teknisi service AC ${area.city}`,
        },
      ],
    },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);

  if (!area) notFound();

  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const companyName = settings.company_name ?? BRAND;
  const phoneHref = formatPhoneHref(settings.phone);
  const street = area.slug === "cirebon" ? settings.address : settings.branch;

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsapp,
    `Halo ${companyName}, saya mau service AC di ${area.city}.`
  );

  // Layanan dari database; kalau kosong, jatuh ke daftar layanan statis supaya
  // halaman wilayah tetap punya isi yang bisa dibaca mesin pencari. Nama
  // berbahasa Inggris tetap memakai kata kunci wilayah, bukan bahasa mesin.
  const isEnglishName = (name: string) => /[A-Za-z]/.test(name);

  // Anchor dipakai tautan langsung dari footer (/services#nama-layanan) supaya
  // pengunjung mendarat di kartu yang dimaksud, bukan di puncak halaman.
  const toAnchor = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const serviceList =
    services.length > 0
      ? services.map((service) => ({
          name: service.name,
          heading: isEnglishName(service.name)
            ? `Jasa ${service.name} di ${area.city}`
            : `${service.name} ${area.city}`,
          description: service.description,
        }))
      : SERVICE_TYPES.map((service) => ({
          name: service.name,
          heading: `${service.name} ${area.city}`,
          description: service.description,
        }));

  const otherArea = SERVICE_AREAS.find((item) => item.slug !== area.slug);

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#bfe8f8] bg-white px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#D91E05]">
            JANGKAUAN LAYANAN
          </p>

          <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0788D1] sm:text-[46px]">
            Service AC {area.city}
          </h1>

          <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-[#654f4a] sm:text-[17px]">
            {companyName} melayani jasa service AC, cuci AC, isi freon, bongkar
            pasang, instalasi AC baru, perawatan AC, serta instalasi listrik
            untuk wilayah {area.region} dan sekitarnya. Tim teknisi berpengalaman
            siap datang ke rumah, kantor, ruko, maupun tempat usaha Anda.
          </p>

          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#654f4a] sm:text-[15px]">
            {area.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#D91E05] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b91803]"
              >
                <FaWhatsapp size={16} />
                Konsultasi Service AC {area.city}
              </a>
            )}

            <a
              href={phoneHref ?? "/contact"}
              className="inline-flex items-center justify-center gap-2 border border-[#0F4C75] px-7 py-3 text-sm font-semibold text-[#0F4C75] transition hover:bg-[#0F4C75] hover:text-white"
            >
              <Phone size={16} />
              {settings.phone ?? "Hubungi Kami"}
            </a>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
        <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-3xl">
          Layanan Service AC dan Kelistrikan di {area.city}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {serviceList.map((service) => (
            <div
              key={service.name}
              className="border border-[#DCEAF3] bg-white p-5 sm:p-6"
            >
              <h3
                id={toAnchor(service.name)}
                className="scroll-mt-20 text-[17px] font-bold text-[#0F4C75]"
              >
                {service.heading}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                {service.description ??
                  `Layanan ${service.name} oleh teknisi berpengalaman kami di ${area.city} dan sekitarnya.`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AREA JANGKAUAN */}
      <section className="border-y border-[#e5cfc8] bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-3xl">
            Area Jangkauan di {area.city} dan Sekitarnya
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#64748B]">
            Kami melayani panggilan service AC ke seluruh area berikut:
          </p>

          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#654f4a]">
            {area.localNote}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {area.aliases.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCEAF3] bg-[#F5FBFE] px-4 py-2 text-[13px] font-semibold text-[#0788D1]"
              >
                <MapPin size={13} />
                {item}
              </span>
            ))}
          </div>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#64748B]">
            Area yang kami jangkau: {area.areas.join(", ")}.
          </p>

          {street && (
            <p className="mt-6 whitespace-pre-line text-sm leading-6 text-[#654f4a]">
              <span className="font-semibold text-[#0788D1]">
                {area.office}:
              </span>
              <br />
              {street}
            </p>
          )}
        </div>
      </section>

      {/* JANGKAUAN KECAMATAN */}
      <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
        <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-3xl">
          Wilayah Kecamatan yang Dilayani
        </h2>

        <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#654f4a]">
          Panggilan service AC {area.city} kami terima sampai ke kecamatan
          berikut, bukan hanya pusat kota. Sebutkan kecamatan dan patokan
          alamatnya saat menghubungi kami supaya teknisi bisa memperkirakan
          waktu datang.
        </p>

        <div className="mt-7 flex flex-col gap-6">
          {area.districts.map((district) => (
            <div key={district.group}>
              <h3 className="text-[15px] font-bold text-[#0F4C75]">
                {district.group}
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#64748B]">
                {district.items.join(" \u00b7 ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MASALAH UMUM */}
      <section className="border-t border-[#e5cfc8] bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-3xl">
            Keluhan AC yang Sering Kami Tangani di {area.city}
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-7 text-[#654f4a]">
            Sebelum menghubungi teknisi, keluhan di bawah ini bisa dipakai
            sebagai patokan awal. Penyebab pastinya tetap ditentukan setelah
            unit diperiksa langsung.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {COMMON_ISSUES.map((issue) => (
              <div key={issue.problem}>
                <h3 className="text-[15px] font-bold text-[#0F4C75]">
                  {issue.problem}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                  {issue.cause}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-[#654f4a]">
            Untuk masalah yang tidak ada di daftar, tanyakan langsung lewat
            WhatsApp beserta merek dan PK unitnya. Sebagian besar keluhan bisa
            diperkirakan sejak percakapan awal, sehingga teknisi datang dengan
            persiapan yang tepat.
          </p>
        </div>
      </section>

      {/* KENAPA KAMI */}
      <section className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8">
        <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-3xl">
          Kenapa Pilih Kami untuk Service AC di {area.city}?
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Teknisi berpengalaman dan bekerja sesuai prosedur",
            OPERATIONAL_CLAIMS.warranty,
            OPERATIONAL_CLAIMS.freeSurvey,
            OPERATIONAL_CLAIMS.emergency,
            "Harga transparan, diinformasikan sebelum pengerjaan",
            "Melayani rumah, kantor, ruko, dan tempat usaha",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-6 text-[#333]"
            >
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-[#0788D1]"
              />
              {item}
            </li>
          ))}
        </ul>

        {otherArea && (
          <p className="mt-8 text-sm text-[#64748B]">
            Di luar wilayah ini? Kami juga melayani{" "}
            <Link
              href={`/layanan/${otherArea.slug}`}
              className="font-semibold text-[#D91E05] hover:underline"
            >
              service AC {otherArea.city}
            </Link>
            .
          </p>
        )}
      </section>

      <Footer />

      <ServicesJsonLd services={serviceList} settings={settings} area={area} />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Layanan", path: "/services" },
          { name: `Service AC ${area.city}`, path: `/layanan/${area.slug}` },
        ]}
      />
    </main>
  );
}
