"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { albums } from "../../components/Home/AlbumGallery";

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();

  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const albumId = Number(params.id);
  const album = albums.find((item) => item.id === albumId);

  if (!album) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6">
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold text-[#0F4C75]">
            Album tidak ditemukan
          </h1>

          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-[#0F4C75] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3a5b]"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  const scrollToPhoto = (index: number) => {
    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const width = gallery.clientWidth;

    gallery.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const index = Math.round(gallery.scrollLeft / gallery.clientWidth);

    setActiveIndex(index);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#e8eef2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-semibold text-[#0F4C75] transition hover:text-[#2B8CC4]"
            aria-label="Keluar dari detail album"
          >
            <span className="text-xl leading-none">←</span>
          </button>

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
            Dokumentasi Pekerjaan
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#0F4C75] sm:text-5xl">
            {album.title}
          </h1>

          <p className="mt-3 text-sm text-[#64748b]">
            {album.location}
          </p>
        </div>

        {/* MAIN GALLERY */}
        <div className="overflow-hidden rounded-3xl border border-[#e4edf2] bg-white shadow-[0_12px_35px_rgba(15,76,117,0.08)]">
          <div
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {album.photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="relative min-w-full snap-center bg-[#edf4f7] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2B8CC4]"
                aria-label={`Buka foto ${index + 1}`}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
                  <Image
                    src={photo}
                    alt={`${album.title} - foto ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 1200px"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* GALLERY FOOTER */}
          <div className="flex items-center justify-between gap-4 border-t border-[#edf1f3] px-5 py-4">
            <p className="text-sm font-medium text-[#64748b]">
              Geser untuk melihat foto lainnya
            </p>

            <p className="shrink-0 text-sm font-bold text-[#0F4C75]">
              {activeIndex + 1} / {album.photos.length}
            </p>
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {album.photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => scrollToPhoto(index)}
              className={`relative overflow-hidden rounded-2xl border-2 bg-white transition ${
                activeIndex === index
                  ? "border-[#2B8CC4] shadow-[0_5px_18px_rgba(43,140,196,0.2)]"
                  : "border-transparent opacity-70 hover:border-[#b9d7e6] hover:opacity-100"
              }`}
              aria-label={`Pilih foto ${index + 1}`}
            >
              <div className="relative aspect-square">
                <Image
                  src={photo}
                  alt={`${album.title} - foto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </button>
          ))}
        </div>

        {/* INFORMATION */}
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-[#e4edf2] bg-white p-6 sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#2B8CC4]">
              Tentang Pekerjaan
            </p>

            <h2 className="mb-4 text-2xl font-bold text-[#0F4C75]">
              {album.title}
            </h2>

            <p className="leading-7 text-[#64748b]">
              {album.description}
            </p>
          </div>

          <div className="rounded-3xl bg-[#0F4C75] p-6 text-white sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#b8e4f8]">
              Lokasi
            </p>

            <h3 className="text-2xl font-bold">{album.location}</h3>

            <div className="mt-6 h-px bg-white/20" />

            <p className="mt-5 text-sm leading-6 text-white/75">
              Dokumentasi hasil pekerjaan tim teknisi kami.
            </p>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-8 flex justify-start">
          <button
            onClick={() => router.push("/")}
            className="rounded-full border border-[#0F4C75] px-6 py-3 text-sm font-semibold text-[#0F4C75] transition hover:bg-[#0F4C75] hover:text-white"
          >
            ← Kembali ke Beranda
          </button>
        </div>
      </section>

      {/* ZOOM MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            aria-label="Tutup foto"
          >
            ×
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedPhoto}
              alt={`${album.title} - foto pilihan`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </main>
  );
}