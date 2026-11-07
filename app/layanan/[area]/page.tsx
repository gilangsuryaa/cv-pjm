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

  return {
    title,
    description,
    keywords: [
      `service ac ${area.city.toLowerCase()}`,
      `service ac ${area.slug}`,
      `servis ac ${area.city.toLowerCase()}`,
      `cuci ac ${area.city.toLowerCase()}`,
      `isi freon ac ${area.city.toLowerCase()}`,
      `instalasi ac ${area.city.toLowerCase()}`,
      `tukang ac ${area.city.toLowerCase()}`,
      `jual ac ${area.city.toLowerCase()}`,
    ],
    alternates: { canonical: `/layanan/${area.slug}` },
    openGraph: {
      title,
      description,
      url: `/layanan/${area.slug}`,
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
              <h3 className="text-[17px] font-bold text-[#0F4C75]">
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

          <div className="mt-5 flex flex-wrap gap-2.5">
            {area.areas.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCEAF3] bg-[#F5FBFE] px-4 py-2 text-[13px] font-semibold text-[#0788D1]"
              >
                <MapPin size={13} />
                {item}
              </span>
            ))}
          </div>

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
