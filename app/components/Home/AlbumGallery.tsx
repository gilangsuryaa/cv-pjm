import AlbumCard, { type Album } from "./AlbumCard";

export const albums: Album[] = [
  {
    id: 1,
    title: "Pemasangan AC di Rumah Bpk. Sidik",
    category: "Instalasi AC",
    location: "Yogyakarta",
    description:
      "Dokumentasi pemasangan AC split di rumah Bpk. Sidik.",
    photos: [
      "/images/album/sidik/album-sidik-1.png",
      "/images/album/sidik/album-sidik-2.png",
      "/images/album/sidik/album-sidik-3.png",
    ],
  },
  {
    id: 2,
    title: "Service AC Rumah Ibu Sari",
    category: "Service AC",
    location: "Cirebon",
    description:
      "Dokumentasi pekerjaan service AC rumah Ibu Sari.",
    photos: [
      "/images/album-sari-1.png",
      "/images/album-sari-2.png",
      "/images/album-sari-3.png",
    ],
  },
  {
    id: 3,
    title: "Perawatan AC Gedung PT. Maju Jaya",
    category: "Maintenance",
    location: "Yogyakarta",
    description:
      "Dokumentasi perawatan AC gedung PT. Maju Jaya.",
    photos: [
      "/images/album-maju-1.jpg",
      "/images/album-maju-2.jpg",
      "/images/album-maju-3.jpg",
    ],
  },
  {
    id: 4,
    title: "Instalasi Listrik Rumah",
    category: "Instalasi Listrik",
    location: "Yogyakarta",
    description:
      "Dokumentasi pekerjaan instalasi listrik rumah.",
    photos: [
      "/images/album/listrik/album-listrik-1.png",
      "/images/album/listrik/album-listrik-2.png",
      "/images/album/listrik/album-listrik-3.png",
    ],
  },
];

type AlbumGalleryProps = {
  limit?: number;
  category?: string;
};

export default function AlbumGallery({
  limit,
  category,
}: AlbumGalleryProps) {
  const filteredAlbums = category
    ? albums.filter((album) => album.category === category)
    : albums;

  const displayedAlbums = limit
    ? filteredAlbums.slice(0, limit)
    : filteredAlbums;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayedAlbums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}