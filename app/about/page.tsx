import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import AboutHero from "../components/About/AboutHero";
import VisionMission from "../components/About/VisionMission";
import ServiceCoverage from "../components/About/ServiceCoverage";
import Footer from "../components/Footer";
import { BRAND } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Tentang Kami — Penyedia Jasa Service AC & Kelistrikan",
  description: `Profil ${BRAND}, perusahaan jasa service AC, penjualan AC, instalasi AC, dan instalasi listrik yang melayani wilayah Cirebon dan Jogja beserta sekitarnya.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang Kami — Penyedia Jasa Service AC & Kelistrikan",
    description: `Profil ${BRAND}, penyedia jasa service AC dan instalasi listrik di Cirebon dan Jogja.`,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <VisionMission />
      <ServiceCoverage />
      <Footer />
    </main>
  );
}
