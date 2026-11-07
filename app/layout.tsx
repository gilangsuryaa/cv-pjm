import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import {
  getSiteAssetUrl,
  getSiteSettings,
} from "@/lib/data/site-settings";
import { BRAND, SITE_URL } from "@/lib/seo/site";
import { LocalBusinessJsonLd } from "./components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const companyName = settings.company_name ?? BRAND;

  // Judul tab mengikuti kata kunci pencarian utama, bukan sekadar nama
  // perusahaan. Halaman lain memakai template "… | <nama perusahaan>".
  const title = `Service AC Cirebon & Jogja Terpercaya | ${companyName}`;

  const description =
    settings.description?.split("\n").find((line) => line.trim().length > 0) ??
    "Jasa service AC, instalasi AC, penjualan AC, perawatan AC, dan instalasi listrik untuk Cirebon, Jogja, dan sekitarnya. Teknisi berpengalaman, garansi pekerjaan, survei gratis.";

  // Kalau favicon belum diatur di site-settings, browser jatuh ke
  // /favicon.ico bawaan yang ada di folder public.
  const faviconUrl = getSiteAssetUrl(settings.favicon, settings.updated_at);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${companyName}`,
    },
    description,
    keywords: [
      "service ac",
      "service ac cirebon",
      "service ac jogja",
      "tukang service ac",
      "servis ac",
      "cuci ac",
      "isi freon ac",
      "instalasi ac",
      "pasang ac",
      "bongkar pasang ac",
      "perawatan ac",
      "jual ac cirebon",
      "jual ac jogja",
      "service elektronik",
      "instalasi listrik",
      companyName,
    ],
    applicationName: companyName,
    authors: [{ name: companyName }],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: companyName,
      title,
      description,
      url: "/",
      images: [
        {
          url: "/images/Home/Hero3.jpg",
          width: 1600,
          height: 900,
          alt: `Teknisi service AC ${companyName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/Home/Hero3.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness dirangkai di root; structured data lain dirangkai di
  // halaman masing-masing.
  const settings = await getSiteSettings();

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Chatbot asli (Gemini + tool Supabase) dari /api/chat */}
        <ChatWidget />

        <LocalBusinessJsonLd settings={settings} />
      </body>
    </html>
  );
}
