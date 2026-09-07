"use client";

import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Bot,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  {
    category: "Split Unit",
    name: "Daikin Inverter 1 PK",
    description:
      "AC dinding efisiensi tinggi yang cocok untuk perumahan dan komersial ringan.",
    image: "/images/products/daikin-inverter.png",
    specs: [
      ["Kapasitas", "9.000 BTU/h"],
      ["Daya", "800W"],
      ["Refrigeran", "R32"],
    ],
  },
  {
    category: "Cassette",
    name: "Panasonic Cassette 2 PK",
    description:
      "Unit plafon yang ideal untuk ruang kantor terbuka dan lingkungan ritel.",
    image: "/images/products/panasonic-cassette.png",
    specs: [
      ["Kapasitas", "18.000 BTU/h"],
      ["Daya", "1650W"],
      ["Fase", "Satu Fase"],
    ],
  },
  {
    category: "Standing",
    name: "Polytron Floor Standing 5 PK",
    description:
      "AC Floor Standing Polytron dengan kapasitas besar yang cocok untuk ruangan luas, area komersial, dan kebutuhan pendinginan skala besar.",
    image: "/images/products/polytron-ac-floor-standing.jpg",
    specs: [
      ["Kapasitas", "42.000 BTU/h"],
      ["Daya", "3700W"],
      ["Refrigeran", "R32"],
      ["Fase", "3-Fase"],
    ],
  },
];

const whatsappNumber = "6281949532643";

function getWhatsappUrl(productName: string) {
  const message = `Halo CV Prima Jaya Mandiri, Saya mau konsultasi mengenai produk ${productName}.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const keyword = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      {/* CONTENT */}
      <section className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[278px_1fr]">

          {/* SIDEBAR */}
          <aside>
            {/* CATEGORY */}
            <div className="border border-[#e9b9b0] bg-white">
              <h2 className="px-4 pt-4 text-[18px] font-semibold text-[#7f0000] sm:text-[20px]">
                Kategori
              </h2>

              <div className="mt-2 pb-3">
                <a
                  href="/products"
                  className="mx-3 flex items-center justify-between border-l-4 border-[#a90000] bg-[#f3f0ef] px-3 py-3 text-[12px] font-semibold text-[#970000] sm:mx-4 sm:text-[14px]"
                >
                  <span>PENDINGIN RUANGAN</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=kompresor"
                  className="flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                >
                  <span>Kompresor</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=panel"
                  className="flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                >
                  <span>Panel Listrik</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=kabel"
                  className="flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                >
                  <span>Kabel & Instalasi</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=sensor"
                  className="flex items-center justify-between px-5 py-3 text-[12px] text-[#624b46] transition hover:text-[#a90000] sm:px-6 sm:text-[14px]"
                >
                  <span>Sensor & Relay</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

            {/* AI ASSISTANCE */}
            <div className="mt-6 border border-[#a90000] bg-[#f7f4f3] p-4 sm:mt-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold leading-6 sm:text-[20px] sm:leading-7">
                    Butuh Bantuan
                    <br />
                    Memilih?
                  </h3>
                </div>

                <Bot
                  size={42}
                  strokeWidth={1.5}
                  className="text-[#dedada] sm:h-12 sm:w-12"
                />
              </div>

              <p className="mt-3 text-[12px] leading-5 text-[#725b56] sm:text-[14px]">
                Asisten AI kami dapat merekomendasikan unit AC yang tepat
                berdasarkan ukuran dan kebutuhan ruangan Anda.
              </p>

              <a
                href={getWhatsappUrl("AC")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 border border-[#a90000] bg-white py-2.5 text-[12px] font-semibold text-[#900000] transition hover:bg-[#a90000] hover:text-white sm:text-[14px]"
              >
                <Bot size={17} />
                Mulai Chat AI
              </a>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div>

            {/* HEADER */}
            <div className="border-b border-[#e4b9b2] pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-[26px] font-bold tracking-tight sm:text-[32px]">
                  Pendingin Ruangan (AC)
                </h1>

                <div className="flex w-full items-center gap-2 text-[12px] sm:w-auto">
                  <span className="whitespace-nowrap text-[#624b46]">
                    Urutkan berdasarkan:
                  </span>

                  <select className="h-8 w-full border border-[#e2b7b0] bg-white px-2 text-[12px] outline-none sm:w-[181px] sm:text-[13px]">
                    <option>Unggulan</option>
                    <option>Terbaru</option>
                    <option>Nama A-Z</option>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari produk..."
                    className="h-12 w-full border border-[#e2b7b0] bg-white pl-11 pr-11 text-[13px] text-[#292525] outline-none transition focus:border-[#a90000] focus:ring-1 focus:ring-[#a90000] sm:text-[14px]"
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
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
                    <span className="font-semibold">"{searchTerm}"</span>
                  </p>
                )}
              </div>
            </div>

            {/* PRODUCT CARDS */}
            {filteredProducts.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex h-full flex-col overflow-hidden border border-[#e5bbb4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[240px] bg-[#eeeeee] sm:h-[260px] lg:h-[277px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <span className="absolute left-2 top-2 bg-[#a8d1fa] px-2 py-1 text-[10px] text-[#315b83] sm:text-[12px]">
                        {product.category}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-4">
                      <h2 className="text-[14px] font-semibold sm:text-[15px]">
                        {product.name}
                      </h2>

                      <p className="mt-1 min-h-[84px] text-[12px] leading-5 text-[#654f4a] sm:text-[14px]">
                        {product.description}
                      </p>

                      {/* SPECS */}
                      <div className="mt-4 min-h-[104px] border-t border-[#e7c4bf] pt-2">
                        {product.specs.map(([label, value]) => (
                          <div
                            key={label}
                            className="flex justify-between gap-3 text-[11px] leading-5 sm:text-[12px]"
                          >
                            <span className="text-[#654f4a]">
                              {label}
                            </span>

                            <span className="text-right font-medium text-[#222]">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* WHATSAPP */}
                      <a
                        href={getWhatsappUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
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
              /* NO SEARCH RESULT */
              <div className="mt-8 border border-[#e5bbb4] bg-white px-6 py-16 text-center">
                <Search
                  size={42}
                  strokeWidth={1.5}
                  className="mx-auto text-[#c9b4b0]"
                />

                <h2 className="mt-4 text-[18px] font-semibold text-[#624b46]">
                  Produk tidak ditemukan
                </h2>

                <p className="mt-2 text-[13px] text-[#8b7772]">
                  Coba gunakan kata kunci lain untuk mencari produk.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-5 border border-[#a90000] px-5 py-2 text-[13px] font-semibold text-[#a90000] transition hover:bg-[#a90000] hover:text-white"
                >
                  Tampilkan Semua Produk
                </button>
              </div>
            )}

            {/* PAGINATION */}
            {!searchTerm && (
              <div className="mt-10 flex justify-center gap-2 sm:mt-12">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center border border-[#ead4d0] bg-white text-[#cdbeba]"
                >
                  <ChevronLeft size={15} />
                </button>

                <button
                  type="button"
                  className="h-8 w-8 bg-[#a90000] text-[13px] text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="h-8 w-8 border border-[#e4c5c0] bg-white text-[13px]"
                >
                  2
                </button>

                <button
                  type="button"
                  className="h-8 w-8 border border-[#e4c5c0] bg-white text-[13px]"
                >
                  3
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center border border-[#e4c5c0] bg-white"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}