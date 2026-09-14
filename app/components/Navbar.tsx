import NavbarClient from "./NavbarClient";
import {
  buildWhatsappUrl,
  getSiteAssetUrl,
  getSiteSettings,
} from "@/lib/data/site-settings";

export default async function Navbar() {
  const settings = await getSiteSettings();

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";

  return (
    <NavbarClient
      companyName={companyName}
      tagline={settings.tagline ?? "Layanan Teknik & Pemeliharaan"}
      logoUrl={getSiteAssetUrl(settings.logo) ?? "/images/Logo.png"}
      whatsappUrl={buildWhatsappUrl(
        settings.whatsapp,
        `Halo ${companyName}, Saya Mau Konsultasi`
      )}
    />
  );
}
