import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import WhyChoose from "./components/Home/WhyChoose";
import Services from "./components/Home/Services";
import Pricing from "./components/Home/Pricing";
import AlbumTerbaru from "./components/Home/AlbumTerbaru";
import CTA from "./components/Home/CTA";
import Footer from "./components/Footer";
import { getSiteSettings } from "@/lib/data/site-settings";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <main>
      <Navbar />
      <Hero companyName={settings.company_name ?? "CV. Prima Jaya Mandiri"} />
      <WhyChoose />
      <Services />
      <Pricing />
      <AlbumTerbaru />
      <CTA />
      <Footer />
    </main>
  );
}
