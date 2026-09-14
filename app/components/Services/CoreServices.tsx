import Image from "next/image";
import { ArrowRight, CheckCircle2, Snowflake, Wrench } from "lucide-react";
import { getServices } from "@/lib/data/services";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/data/site-settings";

// Gambar cadangan kalau layanan di database belum punya gambar sendiri.
const FALLBACK_IMAGES = [
  "/images/Services/services.jpg",
  "/images/Services/services 2.jpg",
  "/images/Services/services 3.jpg",
];

export default async function CoreServices() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";

  function consultLink(serviceName: string) {
    const whatsappUrl = buildWhatsappUrl(
      settings.whatsapp,
      `Halo ${companyName}, Saya Mau Konsultasi ${serviceName}`
    );

    return whatsappUrl
      ? { href: whatsappUrl, external: true }
      : {
          href: `/contact?service=${encodeURIComponent(serviceName)}`,
          external: false,
        };
  }

  const [featured, ...rest] = services;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10">

        {/* Heading */}
        <div className="border-b border-[#e5cfc8] pb-3">
          <h2 className="flex items-center gap-2 text-[22px] font-bold text-[#171717] sm:text-[27px]">
            <Snowflake
              size={17}
              className="shrink-0 text-[#0788D1] sm:h-[18px] sm:w-[18px]"
            />
            Layanan Utama Kami
          </h2>

          <p className="mt-2 max-w-[650px] text-[11px] leading-5 text-[#666] sm:text-[12px]">
            Berbagai solusi untuk kebutuhan AC, kelistrikan, dan elektronik
            dengan pelayanan profesional dan teknisi berpengalaman.
          </p>
        </div>

        {services.length === 0 && (
          <div className="mt-6 border border-dashed border-[#dceaf3] px-6 py-14 text-center">
            <p className="text-[13px] font-semibold text-[#171717]">
              Belum ada layanan yang dipublikasikan
            </p>

            <p className="mt-2 text-[12px] text-[#666]">
              Layanan akan tampil di sini setelah ditambahkan lewat panel admin.
            </p>
          </div>
        )}

        {/* LAYANAN UTAMA */}
        {featured && (
          <div className="mt-3 grid grid-cols-1 border border-[#dceaf3] lg:grid-cols-2">

            {/* Content */}
            <div className="p-5 sm:p-7">
              <span className="inline-flex items-center gap-1 bg-[#eaf6fc] px-2 py-1 text-[10px] font-medium text-[#0788D1]">
                <Snowflake size={11} />
                LAYANAN UNGGULAN
              </span>

              <h3 className="mt-4 text-[20px] font-semibold leading-7 text-[#171717] sm:text-[22px]">
                {featured.name}
              </h3>

              <p className="mt-3 whitespace-pre-line text-[12px] leading-5 text-[#604f4b] sm:text-[13px]">
                {featured.description ??
                  `Layanan ${featured.name} dikerjakan oleh teknisi berpengalaman kami, mulai dari pemeriksaan awal hingga pengujian akhir.`}
              </p>

              <ul className="mt-4 space-y-2 text-[11px] text-[#333] sm:text-[12px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#0788D1]"
                  />
                  <span>Dikerjakan teknisi berpengalaman</span>
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#0788D1]"
                  />
                  <span>Pemeriksaan menyeluruh sebelum pengerjaan</span>
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#0788D1]"
                  />
                  <span>Pengujian akhir setelah pekerjaan selesai</span>
                </li>
              </ul>

              <a
                href={consultLink(featured.name).href}
                target={consultLink(featured.name).external ? "_blank" : undefined}
                rel={
                  consultLink(featured.name).external
                    ? "noopener noreferrer"
                    : undefined
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#D91E05] px-5 py-3 text-[11px] font-semibold text-white transition hover:bg-[#B91803] sm:w-auto"
              >
                Konsultasi {featured.name}
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Image */}
            <div className="relative min-h-[230px] sm:min-h-[300px]">
              <Image
                src={featured.imageUrl ?? FALLBACK_IMAGES[0]}
                alt={`Layanan ${featured.name} ${companyName}`}
                fill
                unoptimized={Boolean(featured.imageUrl)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* LAYANAN LAINNYA */}
        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-2">
            {rest.map((service, index) => (
              <div
                key={service.id}
                className="flex flex-col overflow-hidden border border-[#dceaf3]"
              >
                {/* Image */}
                <div className="relative h-[220px] w-full sm:h-[250px]">
                  <Image
                    src={
                      service.imageUrl ??
                      FALLBACK_IMAGES[(index + 1) % FALLBACK_IMAGES.length]
                    }
                    alt={`Layanan ${service.name} ${companyName}`}
                    fill
                    unoptimized={Boolean(service.imageUrl)}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <span className="inline-flex w-fit items-center gap-1 bg-[#eaf6fc] px-2 py-1 text-[10px] font-medium text-[#0788D1]">
                    <Wrench size={11} />
                    LAYANAN
                  </span>

                  <h3 className="mt-4 text-[19px] font-semibold leading-7 text-[#171717] sm:text-[21px]">
                    {service.name}
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-[12px] leading-5 text-[#604f4b] sm:text-[13px]">
                    {service.description ??
                      `Layanan ${service.name} sesuai kebutuhan rumah, kantor, maupun tempat usaha.`}
                  </p>

                  <a
                    href={consultLink(service.name).href}
                    target={
                      consultLink(service.name).external ? "_blank" : undefined
                    }
                    rel={
                      consultLink(service.name).external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-auto block w-full border border-[#D91E05] px-4 py-3 text-center text-[11px] font-semibold text-[#D91E05] transition hover:bg-[#FFF5F3]"
                  >
                    Konsultasi {service.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
