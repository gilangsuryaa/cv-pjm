import Link from "next/link";
import AlbumGallery from "./AlbumGallery";

export default function AlbumTerbaru() {
  return (
    <section className="border-t border-[#E5EEF3] bg-[#F8FCFE]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
        {/* JUDUL SECTION */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2B8CC4]">
            Portofolio
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#0F4C75] sm:text-3xl">
            Album Pekerjaan Terbaru
          </h2>

          <p className="mx-auto mt-3 max-w-[600px] text-sm leading-6 text-[#64748B]">
            Dokumentasi pekerjaan dan layanan teknis kami di
            lapangan.
          </p>
        </div>

        {/* 3 ALBUM TERBARU */}
        <div className="mt-10">
          <AlbumGallery limit={3} />
        </div>

        {/* TOMBOL */}
        <div className="mt-10 text-center">
          <Link
            href="/album"
            className="inline-flex rounded-lg border border-[#0F4C75] px-7 py-3 text-sm font-semibold text-[#0F4C75] transition hover:bg-[#0F4C75] hover:text-white"
          >
            Lihat Semua Album
          </Link>
        </div>
      </div>
    </section>
  );
}