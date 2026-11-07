import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import WhyChoose from "./components/Home/WhyChoose";
import Services from "./components/Home/Services";
import Pricing from "./components/Home/Pricing";
import ServiceAreaLinks from "./components/Home/ServiceAreaLinks";
import CTA from "./components/Home/CTA";
import Footer from "./components/Footer";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getServices, getFaqs } from "@/lib/data/services";
import { BRAND } from "@/lib/seo/site";
import { FaqJsonLd, ServicesJsonLd } from "./components/seo/StructuredData";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings.company_name ?? BRAND;

  const description = `Jasa service AC Cirebon dan Jogja oleh ${companyName}. Melayani cuci AC, isi freon, bongkar pasang, instalasi AC, perawatan AC, dan instalasi listrik. Teknisi berpengalaman dengan garansi pekerjaan.`;

  return {
    title: {
      absolute: `Service AC Cirebon & Jogja Terpercaya | ${companyName}`,
    },
    description,
    alternates: { canonical: "/" },
    openGraph: { title: `Service AC Cirebon & Jogja | ${companyName}`, description, url: "/" },
  };
}

export default async function Home() {
  const [settings, services, faqs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getFaqs(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero companyName={settings.company_name ?? BRAND} />
      <WhyChoose />
      <Services />
      <Pricing />
      <ServiceAreaLinks />
      <CTA />
      <Footer />

      <ServicesJsonLd services={services} settings={settings} />
      <FaqJsonLd faqs={faqs.slice(0, 10)} />
    </main>
  );
}
