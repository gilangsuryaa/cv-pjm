import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    // Gambar dari Supabase Storage dipakai dengan prop `unoptimized`, jadi
    // browser mengambilnya langsung tanpa lewat image optimizer di server.
    // Alasannya: URL-nya ditandatangani dan token-nya berubah tiap render,
    // sehingga cache optimizer tidak pernah kena dan setiap kali render
    // servernya mengunduh + mengencode ulang gambar yang sama. Efek
    // sampingnya, jalur ini juga kebal masalah jaringan sisi server seperti
    // DNS64/NAT64.
    //
    // remotePatterns tetap dipertahankan supaya host-nya terkunci kalau suatu
    // saat optimasi dihidupkan lagi.
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/sign/**",
          },
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
