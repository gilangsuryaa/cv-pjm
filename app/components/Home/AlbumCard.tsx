import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { Album } from "@/lib/data/albums";

type AlbumCardProps = {
  album: Album;
};

export default function AlbumCard({ album }: AlbumCardProps) {
  // Foto tambahan selain cover, untuk baris thumbnail di bawah foto utama.
  const thumbnails = album.photos
    .filter((photo) => photo.url !== album.coverUrl)
    .slice(0, 3);

  return (
    <Link
      href={`/album/${album.id}`}
      className="group block overflow-hidden rounded-xl border border-[#DCEAF3] bg-white shadow-[0_6px_20px_rgba(15,76,117,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)]"
    >
      {/* FOTO UTAMA */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF4FA]">
        {album.coverUrl ? (
          <Image
            src={album.coverUrl}
            alt={album.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#9BBDD1]">
            <ImageOff size={32} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* THUMBNAIL */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-1 bg-white px-1 pt-1">
          {thumbnails.map((photo, index) => (
            <div
              key={photo.url}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={photo.url}
                alt={photo.caption ?? `${album.title} - foto ${index + 2}`}
                fill
                unoptimized
                sizes="160px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* INFORMASI */}
      <div className="p-5 sm:p-6">
        {album.category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2B8CC4]">
            {album.category}
          </p>
        )}

        <h3 className="mt-2 text-[17px] font-bold text-[#0F4C75]">
          {album.title}
        </h3>

        {album.location && (
          <p className="mt-2 text-sm text-[#64748B]">
            {album.location}
          </p>
        )}
      </div>
    </Link>
  );
}
