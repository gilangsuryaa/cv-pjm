import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getServices } from "@/lib/data/services";
import {
  buildWhatsappUrl,
  formatPhoneHref,
  getSiteAssetUrl,
  getSiteSettings,
} from "@/lib/data/site-settings";
import { getAlbums } from "@/lib/data/albums";
import { SERVICE_TYPES } from "@/lib/seo/site";

const FALLBACK_DESCRIPTION =
  "Jasa service AC, cuci AC, isi freon, instalasi AC, dan perawatan AC untuk rumah, kantor, dan tempat usaha di Cirebon dan Jogja. Kami juga melayani instalasi kelistrikan dan service elektronik.";

// Footer menautkan tiap nama layanan ke /services#<anchor>. Anchor-nya harus
// sama dengan id kartu di app/components/Services/CoreServices.tsx.
function toAnchor(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function Footer() {
  const [settings, services, albums] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAlbums({ limit: 1 }),
  ]);

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";
  const logoUrl = getSiteAssetUrl(settings.logo, settings.updated_at) ?? "/images/Logo.png";
  const phoneHref = formatPhoneHref(settings.phone);
  const whatsappUrl = buildWhatsappUrl(
    settings.whatsapp,
    `Halo ${companyName}, Saya Mau Konsultasi`
  );

  // Deskripsi di site_settings cukup panjang, footer hanya perlu paragraf pertama.
  const description =
    settings.description?.split("\n").find((line) => line.trim().length > 0) ??
    FALLBACK_DESCRIPTION;

  // Layar sempit tidak muat lima kolom, jadi daftar layanan di footer dibatasi
  // supaya tetap terbaca. Daftar lengkap sudah ada di /services.
  const footerServices = services.slice(0, 5);

  // Tautan portofolio hanya berguna kalau albumnya ada. Kalau tabel album
  // kosong, jangan kirim pengunjung ke halaman yang cuma menampilkan
  // "Belum ada album pekerjaan".
  const hasPortfolio = albums.length > 0;

  return (
    <footer className="animate-fade-in border-t border-[#e5cfc8] bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-12">

        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.9fr_0.9fr] lg:gap-10">

          {/* Company */}
          <div className="lg:order-1">
            <div className="flex items-start gap-4">
              <Link href="/" className="shrink-0" aria-label={companyName}>
                <Image
                  src={logoUrl}
                  alt={`Logo ${companyName}`}
                  unoptimized={logoUrl.startsWith("http")}
                  width={84}
                  height={84}
                  className="h-[68px] w-[68px] object-contain sm:h-[76px] sm:w-[76px]"
                />
              </Link>

              <div className="pt-1">
                <Link
                  href="/"
                  className="text-[15px] font-bold text-[#0788D1] hover:text-[#D91E05]"
                >
                  {companyName}
                </Link>

                <p className="mt-3 max-w-[260px] text-[13px] leading-5.5 text-[#666]">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:order-3">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Layanan
            </h3>

            <div className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#666]">
              {footerServices.length > 0 ? (
                footerServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services#${toAnchor(service.name)}`}
                    className="hover:text-[#D91E05]"
                  >
                    {service.name}
                  </Link>
                ))
              ) : (
                SERVICE_TYPES.slice(0, 5).map((service) => (
                  <Link
                    key={service.name}
                    href={`/services#${toAnchor(service.name)}`}
                    className="hover:text-[#D91E05]"
                  >
                    {service.name}
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Area Layanan */}
          <div className="lg:order-4">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Area Layanan
            </h3>

            <div className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#666]">
              <Link href="/layanan/cirebon" className="hover:text-[#D91E05]">
                Service AC Cirebon
              </Link>

              <Link href="/layanan/jogja" className="hover:text-[#D91E05]">
                Service AC Jogja
              </Link>

              <Link href="/services" className="hover:text-[#D91E05]">
                Semua Layanan
              </Link>

              <Link href="/services#service-elektronik" className="hover:text-[#D91E05]">
                Service AC &amp; Elektronik
              </Link>

              <Link href="/services#instalasi-listrik" className="hover:text-[#D91E05]">
                Instalasi Listrik
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:order-4">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Perusahaan
            </h3>

            <div className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#666]">

              <Link href="/about" className="hover:text-[#D91E05]">
                Tentang Kami
              </Link>

              {hasPortfolio && (
                <Link href="/album" className="hover:text-[#D91E05]">
                  Portofolio
                </Link>
              )}

              <Link href="/products" className="hover:text-[#D91E05]">
                Produk
              </Link>

              <Link href="/contact" className="hover:text-[#D91E05]">
                Hubungi Kami
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div className="lg:order-2">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Kontak
            </h3>

            <div className="mt-3.5 flex flex-col gap-2.5 text-[13px] leading-5.5 text-[#666]">

              {/* Kantor Pusat */}
              {settings.address &&
                (settings.maps_url ? (
                  <a
                    href={settings.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 hover:text-[#D91E05]"
                  >
                    <MapPin size={15} className="mt-0.5 shrink-0" />

                    <p className="whitespace-pre-line">
                      <span className="font-semibold text-[#0788D1]">
                        Kantor Pusat
                      </span>
                      <br />
                      {settings.address}
                    </p>
                  </a>
                ) : (
                  <div className="flex gap-2">
                    <MapPin size={15} className="mt-0.5 shrink-0" />

                    <p className="whitespace-pre-line">
                      <span className="font-semibold text-[#0788D1]">
                        Kantor Pusat
                      </span>
                      <br />
                      {settings.address}
                    </p>
                  </div>
                ))}

              {/* Kantor Cabang */}
              {settings.branch && (
                <div className="flex gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0" />

                  <p className="whitespace-pre-line">
                    <span className="font-semibold text-[#0788D1]">
                      Kantor Cabang
                    </span>
                    <br />
                    {settings.branch}
                  </p>
                </div>
              )}

              {/* Telepon */}
              {settings.phone && phoneHref && (
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 hover:text-[#D91E05]"
                >
                  <Phone size={15} />
                  <p>{settings.phone}</p>
                </a>
              )}

              {/* WhatsApp */}
              {settings.whatsapp && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#D91E05]"
                >
                  <FaWhatsapp size={16} />
                  <p>{settings.whatsapp}</p>
                </a>
              )}

              {/* Email */}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 hover:text-[#D91E05]"
                >
                  <Mail size={15} />
                  <p>{settings.email}</p>
                </a>
              )}

            </div>
          </div>
        </div>

      </div>

      <div className="bg-[#123b58]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 text-[11px] text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">

          <p>
            &copy; {new Date().getFullYear()} {companyName}. Hak cipta
            dilindungi.
          </p>

          <div className="flex gap-5">

            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Kebijakan Privasi
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Syarat &amp; Ketentuan
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
}
