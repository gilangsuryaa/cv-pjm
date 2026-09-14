import { FaWhatsapp } from "react-icons/fa";
import FadeInSection from "../FadeInSection";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/data/site-settings";

export default async function CTA() {
  const settings = await getSiteSettings();

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsapp,
    `Halo ${companyName}, Saya Mau Konsultasi`
  );

  return (
    <FadeInSection className="bg-[#F3FAFF] py-10 sm:py-12">
      <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8">

        <h2 className="text-[28px] font-bold text-[#0788D1] sm:text-[30px] md:text-[34px]">
          Butuh Solusi Teknis?
        </h2>

        <p className="mx-auto mt-3 max-w-[600px] text-sm leading-6 text-[#555] sm:text-[15px]">
          Jangan biarkan masalah teknis menghambat produktivitas Anda.
          Tim ahli kami siap membantu memberikan solusi terbaik.
        </p>

        <a
          href={whatsappUrl ?? "/contact"}
          target={whatsappUrl ? "_blank" : undefined}
          rel={whatsappUrl ? "noopener noreferrer" : undefined}
          className="mt-6 inline-flex min-w-[220px] items-center justify-center gap-2 bg-[#D91E05] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b91803] sm:min-w-[240px] sm:px-8 sm:py-3.5 sm:text-[15px]"
        >
          <FaWhatsapp size={14} />
          Konsultasikan Sekarang
        </a>

      </div>
    </FadeInSection>
  );
}
