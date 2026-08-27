"use client";

import Image from "next/image";
import { ChevronRight, ChevronLeft, Bot } from "lucide-react";
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
    name: "Gree Floor Standing 3 PK",
    description:
      "Unit berdiri yang kuat untuk aula besar, ruang server, dan ruang industri.",
    image: "/images/products/gree-standing.png",
    specs: [
      ["Kapasitas", "27.000 BTU/h"],
      ["Daya", "2500W"],
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
            <div className="flex flex-col gap-4 border-b border-[#e4b9b2] pb-3 sm:flex-row sm:items-end sm:justify-between">
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

            {/* PRODUCT CARDS */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="overflow-hidden border border-[#e5bbb4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
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
                  <div className="p-4">
                    <h2 className="text-[14px] font-semibold sm:text-[15px]">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-[12px] leading-5 text-[#654f4a] sm:text-[14px]">
                      {product.description}
                    </p>

                    {/* SPECS */}
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

                    {/* WHATSAPP */}
                    <a
                      href={getWhatsappUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 border border-[#d91e05] bg-white px-3 py-2 text-center text-[12px] font-semibold text-[#a00000] transition hover:bg-[#d91e05] hover:text-white sm:text-[14px]"
                    >
                      <FaWhatsapp size={18} className="shrink-0" />
                      <span>Tanyakan via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}