"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type AlbumPhoto = {
  url: string;
  caption: string | null;
};

type AlbumDetailClientProps = {
  title: string;
  photos: AlbumPhoto[];
};

export default function AlbumDetailClient({
  title,
  photos,
}: AlbumDetailClientProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#e4edf2] bg-white px-6 py-16 text-center">
        <p className="text-sm font-semibold text-[#0F4C75]">
          Belum ada foto di album ini
        </p>

        <p className="mt-2 text-sm text-[#64748b]">
          Foto akan tampil setelah diunggah lewat panel admin.
        </p>
      </div>
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
    <>
      {/* MAIN GALLERY */}
      <div className="overflow-hidden rounded-3xl border border-[#e4edf2] bg-white shadow-[0_12px_35px_rgba(15,76,117,0.08)]">
        <div
          ref={galleryRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {photos.map((photo, index) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setSelectedPhoto(photo.url)}
              className="relative min-w-full snap-center bg-[#edf4f7] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2B8CC4]"
              aria-label={`Buka foto ${index + 1}`}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
                <Image
                  src={photo.url}
                  alt={photo.caption ?? `${title} - foto ${index + 1}`}
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
            {photos[activeIndex]?.caption ?? "Geser untuk melihat foto lainnya"}
          </p>

          <p className="shrink-0 text-sm font-bold text-[#0F4C75]">
            {activeIndex + 1} / {photos.length}
          </p>
        </div>
      </div>

      {/* THUMBNAILS */}
      {photos.length > 1 && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {photos.map((photo, index) => (
            <button
              key={photo.url}
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
                  src={photo.url}
                  alt={photo.caption ?? `${title} - foto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </button>
          ))}
        </div>
      )}

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
            &times;
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedPhoto}
              alt={`${title} - foto pilihan`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
