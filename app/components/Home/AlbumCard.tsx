import Image from "next/image";
import Link from "next/link";

export type Album = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  photos: string[];
};

type AlbumCardProps = {
  album: Album;
};

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link
      href={`/album/${album.id}`}
      className="group block overflow-hidden rounded-xl border border-[#DCEAF3] bg-white shadow-[0_6px_20px_rgba(15,76,117,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)]"
    >
      {/* FOTO UTAMA */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF4FA]">
        <Image
          src={album.photos[0]}
          alt={album.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* THUMBNAIL */}
      <div className="grid grid-cols-3 gap-1 bg-white px-1 pt-1">
        {album.photos.slice(1, 4).map((photo, index) => (
          <div
            key={photo}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={photo}
              alt={`${album.title} - foto ${index + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* INFORMASI */}
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2B8CC4]">
          {album.category}
        </p>

        <h3 className="mt-2 text-[17px] font-bold text-[#0F4C75]">
          {album.title}
        </h3>

        <p className="mt-2 text-sm text-[#64748B]">
          {album.location}
        </p>
      </div>
    </Link>
  );
}