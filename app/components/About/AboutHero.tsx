import AboutHeroClient from "./AboutHeroClient";
import { getSiteSettings } from "@/lib/data/site-settings";

const FALLBACK_PARAGRAPHS = [
  "CV. Prima Jaya Mandiri adalah perusahaan yang bergerak di bidang pendingin udara dengan fokus utama pada penjualan, instalasi, perawatan, dan perbaikan AC untuk kebutuhan rumah tinggal, perkantoran, usaha, maupun kebutuhan komersial.",
  "Selain menyediakan berbagai kebutuhan unit AC, kami juga melayani instalasi AC serta pekerjaan dan instalasi sistem kelistrikan sesuai dengan kebutuhan pelanggan.",
  "Didukung oleh tenaga kerja yang berpengalaman, kami berkomitmen memberikan pelayanan yang profesional, tepat waktu, dan mengutamakan kualitas serta kepuasan pelanggan.",
];

export default async function AboutHero() {
  const settings = await getSiteSettings();

  const paragraphs =
    settings.description
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  return (
    <AboutHeroClient
      companyName={settings.company_name ?? "CV. Prima Jaya Mandiri"}
      paragraphs={paragraphs.length > 0 ? paragraphs : FALLBACK_PARAGRAPHS}
    />
  );
}
