"use client";

import Image from "next/image";
import { MessageCircle, ChevronRight, ChevronLeft, Bot } from "lucide-react";
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
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      <section className="mx-auto max-w-[1200px] px-8 py-9">
        <div className="grid grid-cols-[278px_1fr] gap-6">

          {/* SIDEBAR */}
          <aside>

            {/* Category */}
            <div className="border border-[#e9b9b0] bg-white">
              <h2 className="px-4 pt-4 text-[20px] font-semibold text-[#7f0000]">
                Kategori
              </h2>

              <div className="mt-2 pb-3">

                <a
                  href="/products"
                  className="mx-4 flex items-center justify-between border-l-4 border-[#a90000] bg-[#f3f0ef] px-3 py-3 text-[14px] font-semibold text-[#970000]"
                >
                  <span>PENDINGIN RUANGAN</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=kompresor"
                  className="flex items-center justify-between px-6 py-3 text-[14px] text-[#624b46] transition hover:text-[#a90000]"
                >
                  <span>Kompresor</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=panel"
                  className="flex items-center justify-between px-6 py-3 text-[14px] text-[#624b46] transition hover:text-[#a90000]"
                >
                  <span>Panel Listrik</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=kabel"
                  className="flex items-center justify-between px-6 py-3 text-[14px] text-[#624b46] transition hover:text-[#a90000]"
                >
                  <span>Kabel & Instalasi</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="/products?category=sensor"
                  className="flex items-center justify-between px-6 py-3 text-[14px] text-[#624b46] transition hover:text-[#a90000]"
                >
                  <span>Sensor & Relay</span>
                  <ChevronRight size={14} />
                </a>

              </div>
            </div>

            {/* AI Assistance */}
            <div className="mt-8 border border-[#a90000] bg-[#f7f4f3] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[20px] font-semibold leading-7">
                    Butuh Bantuan
                    <br />
                    Memilih?
                  </h3>
                </div>

                <Bot
                  size={48}
                  strokeWidth={1.5}
                  className="text-[#dedada]"
                />
              </div>

              <p className="mt-3 text-[14px] leading-5 text-[#725b56]">
                Asisten AI kami dapat merekomendasikan unit AC yang tepat
                berdasarkan ukuran dan kebutuhan ruangan Anda.
              </p>

              <a
                href={getWhatsappUrl("AC")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 border border-[#a90000] bg-white py-2.5 text-[14px] font-semibold text-[#900000] transition hover:bg-[#a90000] hover:text-white"
              >
                <Bot size={17} />
                Mulai Chat AI
              </a>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div>

            {/* Header */}
            <div className="flex items-end justify-between border-b border-[#e4b9b2] pb-3">
              <h1 className="text-[32px] font-bold tracking-tight">
                Pendingin Ruangan (AC)
              </h1>

              <div className="flex items-center gap-2 text-[12px]">
                <span className="text-[#624b46]">
                  Urutkan berdasarkan:
                </span>

                <select className="h-8 w-[181px] border border-[#e2b7b0] bg-white px-2 text-[13px] outline-none">
                  <option>Unggulan</option>
                  <option>Terbaru</option>
                  <option>Nama A-Z</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="overflow-hidden border border-[#e5bbb4] bg-white"
                >
                  {/* Image */}
                  <div className="relative h-[277px] bg-[#eeeeee]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    <span className="absolute left-2 top-2 bg-[#a8d1fa] px-2 py-1 text-[12px] text-[#315b83]">
                      {product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-[15px] font-semibold">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-[14px] leading-5 text-[#654f4a]">
                      {product.description}
                    </p>

                    {/* Specs */}
                    <div className="mt-4 border-t border-[#e7c4bf] pt-2">
                      {product.specs.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between text-[12px] leading-5"
                        >
                          <span className="text-[#654f4a]">
                            {label}
                          </span>

                          <span className="font-medium text-[#222]">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp */}
                    <a
                      href={getWhatsappUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 border border-[#d91e05] py-2.5 text-[14px] font-semibold text-[#a00000] transition hover:bg-[#d91e05] hover:text-white"
                    >
                      <FaWhatsapp size={17} />
                      Tanyakan via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center border border-[#ead4d0] bg-white text-[#cdbeba]">
                <ChevronLeft size={15} />
              </button>

              <button className="h-8 w-8 bg-[#a90000] text-[13px] text-white">
                1
              </button>

              <button className="h-8 w-8 border border-[#e4c5c0] bg-white text-[13px]">
                2
              </button>

              <button className="h-8 w-8 border border-[#e4c5c0] bg-white text-[13px]">
                3
              </button>

              <button className="flex h-8 w-8 items-center justify-center border border-[#e4c5c0] bg-white">
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