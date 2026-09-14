import Link from "next/link";
import AlbumGallery from "../components/Home/AlbumGallery";
import { getAlbumCategories } from "@/lib/data/albums";

type AlbumPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function AlbumPage({ searchParams }: AlbumPageProps) {
  const [{ category }, categories] = await Promise.all([
    searchParams,
    getAlbumCategories(),
  ]);

  const activeCategory =
    categories.find(
      (item) => item.toLowerCase() === category?.trim().toLowerCase()
    ) ?? null;

  return (
    <main className="min-h-screen bg-[#F8FCFE]">
      {/* HEADER HALAMAN */}
      <section className="border-b border-[#E5EEF3] bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2B8CC4]">
            Portofolio
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0F4C75] sm:text-4xl">
            {activeCategory ?? "Semua Proyek"}
          </h1>

          <p className="mt-3 max-w-[600px] text-sm leading-6 text-[#64748B]">
            Lihat dokumentasi pekerjaan instalasi AC, service AC, dan instalasi
            listrik kami.
          </p>
        </div>
      </section>

      {/* FILTER KATEGORI */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-5 pt-10 sm:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Link
              href="/album"
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === null
                  ? "border-[#0F4C75] bg-[#0F4C75] text-white"
                  : "border-[#DCEAF3] bg-white text-[#0F4C75] hover:border-[#2B8CC4]"
              }`}
            >
              Semua Proyek
            </Link>

            {categories.map((item) => (
              <Link
                key={item}
                href={`/album?category=${encodeURIComponent(item)}`}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === item
                    ? "border-[#0F4C75] bg-[#0F4C75] text-white"
                    : "border-[#DCEAF3] bg-white text-[#0F4C75] hover:border-[#2B8CC4]"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* DAFTAR PROYEK */}
      <section className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-12">
        <AlbumGallery category={activeCategory ?? undefined} />
      </section>
    </main>
  );
}
