import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumDetailClient from "./AlbumDetailClient";
import { getAlbum } from "@/lib/data/albums";

type AlbumDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatProjectDate(value: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AlbumDetailPage({
  params,
}: AlbumDetailPageProps) {
  const { id } = await params;
  const albumId = Number(id);

  if (!Number.isInteger(albumId)) notFound();

  const album = await getAlbum(albumId);

  if (!album) notFound();

  const projectDate = formatProjectDate(album.project_date);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#e8eef2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/album"
            className="flex items-center gap-2 text-sm font-semibold text-[#0F4C75] transition hover:text-[#2B8CC4]"
            aria-label="Kembali ke daftar album"
          >
            <span className="text-xl leading-none">&larr;</span>
          </Link>

          <p className="text-sm font-semibold text-[#64748b]">
            Detail Album
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {/* TITLE */}
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#2B8CC4]">
            {album.category ?? "Dokumentasi Pekerjaan"}
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#0F4C75] sm:text-5xl">
            {album.title}
          </h1>

          <p className="mt-3 text-sm text-[#64748b]">
            {[album.location, projectDate].filter(Boolean).join(" · ")}
          </p>
        </div>

        <AlbumDetailClient title={album.title} photos={album.photos} />

        {/* INFORMATION */}
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-[#e4edf2] bg-white p-6 sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#2B8CC4]">
              Tentang Pekerjaan
            </p>

            <h2 className="mb-4 text-2xl font-bold text-[#0F4C75]">
              {album.title}
            </h2>

            <p className="whitespace-pre-line leading-7 text-[#64748b]">
              {album.description ?? "Belum ada keterangan untuk album ini."}
            </p>
          </div>

          <div className="rounded-3xl bg-[#0F4C75] p-6 text-white sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#b8e4f8]">
              Lokasi
            </p>

            <h3 className="text-2xl font-bold">
              {album.location ?? "Tidak dicantumkan"}
            </h3>

            <div className="mt-6 h-px bg-white/20" />

            <p className="mt-5 text-sm leading-6 text-white/75">
              Dokumentasi hasil pekerjaan tim teknisi kami.
            </p>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-8 flex justify-start">
          <Link
            href="/"
            className="rounded-full border border-[#0F4C75] px-6 py-3 text-sm font-semibold text-[#0F4C75] transition hover:bg-[#0F4C75] hover:text-white"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  );
}
