import { MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "./ContactForm";
import { getServices } from "@/lib/data/services";
import {
  formatPhoneHref,
  getSiteSettings,
  toWhatsappNumber,
} from "@/lib/data/site-settings";

// Google Maps butuh parameter output=embed supaya bisa dipasang di iframe.
function toEmbedUrl(mapsUrl: string | null) {
  if (!mapsUrl) return null;

  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get("q");

    if (!query) return null;

    return `https://www.google.com/maps?q=${encodeURIComponent(
      query
    )}&z=18&output=embed`;
  } catch {
    return null;
  }
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";
  const phoneHref = formatPhoneHref(settings.phone);
  const embedUrl = toEmbedUrl(settings.maps_url);

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#bfe8f8] bg-white px-5 py-10 text-center sm:px-8 sm:py-14">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0788D1] sm:text-[48px]">
          Konsultasi Teknis
        </h1>

        <p className="mx-auto mt-3 max-w-[650px] text-[14px] leading-6 text-[#654f4a] sm:text-[18px] sm:leading-7">
          Dapatkan dukungan teknis profesional untuk perawatan AC, sistem
          kelistrikan, dan elektronik industri. Hubungi tim kami untuk
          mendapatkan solusi sesuai kebutuhan Anda.
        </p>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[466px_1fr] lg:gap-12">

          {/* BAGIAN KIRI */}
          <div className="space-y-4">
            {/* KANTOR PUSAT */}
            {settings.address && (
              <div className="border border-[#bfe8f8] bg-white p-4">
                <div className="flex gap-4">
                  <div className="flex h-[42px] w-[34px] shrink-0 items-center justify-center bg-[#f1eeee]">
                    <MapPin
                      size={21}
                      fill="#d91e05"
                      className="text-[#d91e05]"
                    />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold text-[#0788D1] sm:text-[20px]">
                      Kantor Pusat
                    </h2>

                    <p className="mt-2 whitespace-pre-line text-[14px] leading-6 text-[#654f4a] sm:text-[16px]">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* KANTOR CABANG */}
            {settings.branch && (
              <div className="border border-[#bfe8f8] bg-white p-4">
                <div className="flex gap-4">
                  <div className="flex h-[42px] w-[34px] shrink-0 items-center justify-center bg-[#f1eeee]">
                    <MapPin
                      size={21}
                      fill="#d91e05"
                      className="text-[#d91e05]"
                    />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold text-[#0788D1] sm:text-[20px]">
                      Kantor Cabang
                    </h2>

                    <p className="mt-2 whitespace-pre-line text-[14px] leading-6 text-[#654f4a] sm:text-[16px]">
                      {settings.branch}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TELEPON */}
            {settings.phone && (
              <div className="border border-[#bfe8f8] bg-white p-4">
                <div className="flex gap-4">
                  <div className="flex h-[42px] w-[34px] shrink-0 items-center justify-center bg-[#f1eeee]">
                    <Phone
                      size={21}
                      fill="#d91e05"
                      className="text-[#d91e05]"
                    />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold text-[#0788D1] sm:text-[20px]">
                      Layanan Telepon
                    </h2>

                    <p className="mt-2 text-[14px] text-[#654f4a] sm:text-[16px]">
                      {phoneHref ? (
                        <a href={phoneHref} className="hover:text-[#d91e05]">
                          {settings.phone}
                        </a>
                      ) : (
                        settings.phone
                      )}
                    </p>

                    <p className="mt-1 text-[12px] text-[#806d68] sm:text-[14px]">
                      Senin&ndash;Jumat, 08.00&ndash;17.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* GOOGLE MAP */}
            {embedUrl && (
              <div className="h-[220px] overflow-hidden border border-[#bfe8f8] sm:h-[255px]">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Lokasi ${companyName}`}
                />
              </div>
            )}
          </div>

          {/* FORM */}
          <Suspense
            fallback={
              <div className="flex min-h-[500px] items-center justify-center border border-[#bfe8f8] bg-white">
                <p className="text-sm text-[#654f4a]">
                  Memuat formulir konsultasi...
                </p>
              </div>
            }
          >
            <ContactForm
              companyName={companyName}
              whatsappNumber={toWhatsappNumber(settings.whatsapp)}
              serviceOptions={services.map((service) => service.name)}
            />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
