import AlbumCard from "./AlbumCard";
import { getAlbums } from "@/lib/data/albums";

type AlbumGalleryProps = {
  limit?: number;
  category?: string;
};

export default async function AlbumGallery({
  limit,
  category,
}: AlbumGalleryProps) {
  const albums = await getAlbums({ limit, category });

  if (albums.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#DCEAF3] bg-white px-6 py-14 text-center">
        <p className="text-sm font-semibold text-[#0F4C75]">
          Belum ada album pekerjaan
        </p>

        <p className="mt-2 text-sm text-[#64748B]">
          Dokumentasi pekerjaan akan tampil di sini setelah ditambahkan lewat
          panel admin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
