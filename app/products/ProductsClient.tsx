"use client";

import Image from "next/image";
import { ChevronRight, ChevronLeft, ImageOff, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export type ProductCard = {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  price: string | null;
  priceValue: number | null;
  inStock: boolean;
  imageUrl: string | null;
  specs: [string, string][];
  whatsappUrl: string | null;
  createdAt: string | null;
};

type ProductsClientProps = {
  products: ProductCard[];
  categories: string[];
  activeCategory: string | null;
  heading: string;
};

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "featured", label: "Unggulan" },
  { value: "newest", label: "Terbaru" },
  { value: "name-asc", label: "Nama A-Z" },
  { value: "price-asc", label: "Harga Terendah" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function ProductsClient({
  products,
  categories,
  activeCategory,
  heading,
}: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortValue>("featured");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    const filtered = keyword
      ? products.filter((product) =>
          [product.name, product.category, product.description]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(keyword))
        )
      : products;

    const sorted = [...filtered];

    if (sort === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "id"));
    } else if (sort === "price-asc") {
      sorted.sort(
        (a, b) =>
          (a.priceValue ?? Number.POSITIVE_INFINITY) -
          (b.priceValue ?? Number.POSITIVE_INFINITY)
      );
    } else if (sort === "newest") {
      sorted.sort((a, b) =>
        (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
      );
    }

    return sorted;
  }, [products, searchTerm, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-[#e9b9b0] bg-white">
            <h2 className="px-4 pt-4 text-[18px] font-semibold text-[#7f0000] sm:text-[20px]">
              Kategori
            </h2>

            <div className="mt-2 pb-3">
              <a
                href="/products"
                className={
                  activeCategory === null
                    ? "mx-3 flex items-center justify-between border-l-4 border-[#a90000] bg-[#f3f0ef] px-3 py-3 text-[12px] font-semibold text-[#970000] sm:mx-4 sm:text-[14px]"
                    : "flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                }
              >
                <span>SEMUA PRODUK</span>
                <ChevronRight size={14} />
              </a>

              {categories.map((category) => {
                const isActive =
                  activeCategory?.toLowerCase() === category.toLowerCase();

                return (
                  <a
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className={
                      isActive
                        ? "mx-3 flex items-center justify-between border-l-4 border-[#a90000] bg-[#f3f0ef] px-3 py-3 text-[12px] font-semibold text-[#970000] sm:mx-4 sm:text-[14px]"
                        : "flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                    }
                  >
                    <span>{category}</span>
                    <ChevronRight size={14} />
                  </a>
                );
              })}

              {categories.length === 0 && (
                <p className="px-5 py-3 text-[12px] text-[#8b7772] sm:px-6">
                  Belum ada kategori produk.
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div>

          {/* HEADER */}
          <div className="border-b border-[#e4b9b2] pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="text-[26px] font-bold tracking-tight sm:text-[32px]">
                {heading}
              </h1>

              <div className="flex w-full items-center gap-2 text-[12px] sm:w-auto">
                <label
                  htmlFor="product-sort"
                  className="whitespace-nowrap text-[#624b46]"
                >
                  Urutkan berdasarkan:
                </label>

                <select
                  id="product-sort"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortValue);
                    setPage(1);
                  }}
                  className="h-8 w-full border border-[#e2b7b0] bg-white px-2 text-[12px] outline-none sm:w-[181px] sm:text-[13px]"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="mt-5">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7772]"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Cari produk..."
                  className="h-12 w-full border border-[#e2b7b0] bg-white pl-11 pr-11 text-[13px] text-[#292525] outline-none transition focus:border-[#a90000] focus:ring-1 focus:ring-[#a90000] sm:text-[14px]"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b7772] transition hover:text-[#a90000]"
                    aria-label="Hapus pencarian"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {searchTerm && (
                <p className="mt-2 text-[12px] text-[#725b56]">
                  Menampilkan {filteredProducts.length} produk untuk pencarian{" "}
                  <span className="font-semibold">
                    &quot;{searchTerm}&quot;
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* PRODUCT CARDS */}
          {visibleProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex h-full flex-col overflow-hidden border border-[#e5bbb4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* IMAGE */}
                  <div className="relative h-[240px] bg-[#eeeeee] sm:h-[260px] lg:h-[277px]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#b9a5a1]">
                        <ImageOff size={34} strokeWidth={1.5} />
                      </div>
                    )}

                    {product.category && (
                      <span className="absolute left-2 top-2 bg-[#a8d1fa] px-2 py-1 text-[10px] text-[#315b83] sm:text-[12px]">
                        {product.category}
                      </span>
                    )}

                    {!product.inStock && (
                      <span className="absolute right-2 top-2 bg-[#5c5c5c] px-2 py-1 text-[10px] text-white sm:text-[12px]">
                        Stok habis
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-4">

                    <h2 className="text-[14px] font-semibold sm:text-[15px]">
                      {product.name}
                    </h2>

                    <div className="mt-2 h-[84px] overflow-hidden">
                      <p className="text-[12px] leading-5 text-[#654f4a] sm:text-[14px]">
                        {product.description ?? "Belum ada deskripsi produk."}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 border-t border-[#e7c4bf] pt-3">
                      <p className="text-[12px] text-[#8b7772] sm:text-[13px]">
                        {product.price ? "Harga mulai dari" : "Harga"}
                      </p>

                      <p className="mt-1 text-[22px] font-bold text-[#a90000] sm:text-[24px]">
                        {product.price ?? "Hubungi kami"}
                      </p>
                    </div>

                    {/* SPECS */}
                    {product.specs.length > 0 && (
                      <div className="mt-4 border-t border-[#e7c4bf] pt-2">
                        {product.specs.map(([label, value]) => (
                          <div
                            key={label}
                            className="flex justify-between gap-3 text-[11px] leading-5 sm:text-[12px]"
                          >
                            <span className="text-[#654f4a]">{label}</span>

                            <span className="text-right font-medium text-[#222]">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* WHATSAPP */}
                    <a
                      href={product.whatsappUrl ?? "/contact"}
                      target={product.whatsappUrl ? "_blank" : undefined}
                      rel={product.whatsappUrl ? "noopener noreferrer" : undefined}
                      className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 border border-[#d91e05] bg-white px-3 py-2 text-center text-[12px] font-semibold text-[#a00000] transition hover:bg-[#d91e05] hover:text-white sm:text-[14px]"
                    >
                      <FaWhatsapp size={18} className="shrink-0" />
                      <span>Tanyakan via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (

            /* KOSONG / TIDAK DITEMUKAN */
            <div className="mt-8 border border-[#e5bbb4] bg-white px-6 py-16 text-center">
              <Search
                size={42}
                strokeWidth={1.5}
                className="mx-auto text-[#c9b4b0]"
              />

              <h2 className="mt-4 text-[18px] font-semibold text-[#624b46]">
                {products.length === 0
                  ? "Belum ada produk"
                  : "Produk tidak ditemukan"}
              </h2>

              <p className="mt-2 text-[13px] text-[#8b7772]">
                {products.length === 0
                  ? "Produk akan tampil di sini setelah ditambahkan lewat panel admin."
                  : "Coba gunakan kata kunci lain untuk mencari produk."}
              </p>

              {products.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="mt-5 border border-[#a90000] px-5 py-2 text-[13px] font-semibold text-[#a90000] transition hover:bg-[#a90000] hover:text-white"
                >
                  Tampilkan Semua Produk
                </button>
              )}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2 sm:mt-12">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-8 w-8 items-center justify-center border border-[#ead4d0] bg-white text-[#8b7772] disabled:text-[#cdbeba]"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={
                      pageNumber === currentPage
                        ? "h-8 w-8 bg-[#a90000] text-[13px] text-white"
                        : "h-8 w-8 border border-[#e4c5c0] bg-white text-[13px]"
                    }
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="flex h-8 w-8 items-center justify-center border border-[#e4c5c0] bg-white text-[#8b7772] disabled:text-[#cdbeba]"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
