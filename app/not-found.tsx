import Link from "next/link";

// Sengaja tidak mengambil data dari Supabase. Halaman ini justru paling
// dibutuhkan saat ada yang bermasalah, jadi tampilannya tidak boleh
// bergantung pada database.
export default function NotFound() {
  const links = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Produk" },
    { href: "/services", label: "Layanan" },
    { href: "/album", label: "Portofolio" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8FCFE] px-5 py-16 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#2B8CC4]">
        Error 404
      </p>

      <h1 className="mt-4 text-[64px] font-bold leading-none text-[#0F4C75] sm:text-[88px]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-[#0F4C75] sm:text-3xl">
        Halaman tidak ditemukan
      </h2>

      <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#64748B] sm:text-[15px]">
        Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau
        alamatnya salah ketik.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-[#0788D1] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#056A9F]"
      >
        Kembali ke Beranda
      </Link>

      <div className="mt-10 w-full max-w-[520px] border-t border-[#DCEAF3] pt-6">
        <p className="text-[13px] text-[#64748B]">
          Atau langsung menuju halaman lain:
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#DCEAF3] bg-white px-4 py-2 text-[13px] font-medium text-[#0F4C75] transition hover:border-[#2B8CC4] hover:text-[#2B8CC4]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
