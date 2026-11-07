import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ServicesHero from "../components/Services/ServicesHero";
import CoreServices from "../components/Services/CoreServices";
import WhyChooseServices from "../components/Services/WhyChooseServices";
import Footer from "../components/Footer";
import { getServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/site-settings";
import { BRAND, absoluteUrl } from "@/lib/seo/site";
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
