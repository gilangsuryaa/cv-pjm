import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import { getSiteAssetUrl, getSiteSettings } from "@/lib/data/site-settings";

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

  const title = settings.company_name ?? "CV. Prima Jaya Mandiri";

  // Kalau favicon belum diatur di site-settings, browser jatuh ke
  // /favicon.ico bawaan yang ada di folder public.
  const faviconUrl = getSiteAssetUrl(settings.favicon, settings.updated_at);

  return {
    title,
    description:
      settings.tagline ??
      settings.description?.split("\n")[0] ??
      "Layanan penjualan, instalasi, dan perawatan AC serta kelistrikan.",
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Chatbot asli (Gemini + tool Supabase) dari /api/chat */}
        <ChatWidget />
      </body>
    </html>
  );
}
