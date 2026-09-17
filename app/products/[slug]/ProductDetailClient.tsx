"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Settings,
  ClipboardCheck,
  MessageCircle,
  ArrowRight,
  ImageOff,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export type ProductDetail = {
  id: number;
  name: string;
  category: string | null;
  brand: string | null;
  type: string | null;
  pk: number | null;
  daya: number | null;
  kapasitas: number | null;
  price: number | null;
  min_room_area: number | null;
  max_room_area: number | null;
  description: string | null;
  stock_status: boolean | null;
  created_at: string | null;
  images: string[];
};

type ProductDetailClientProps = {
  product: ProductDetail;
  recommendations: ProductDetail[];
  whatsappUrl: string | null;
};

function formatIDR(value: number | null) {
  if (value === null) return "Hubungi kami";

  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

function formatCapacity(value: number | null) {
  if (value === null) return null;

  return `${Number(value).toLocaleString("id-ID")} BTU/h`;
}

function formatPower(value: number | null) {
  if (value === null) return null;

  return `${Number(value).toLocaleString("id-ID")} Watt`;
}

function formatRoomArea(
  min: number | null,
  max: number | null
) {
  if (min === null || max === null) return null;

  return `${min} - ${max} m²`;
}

function getWhatsappMessage(productName: string) {
  return `Halo CV Prima Jaya Mandiri, Saya mau konsultasi mengenai produk ${productName}.`;
}

export default function ProductDetailClient({
  product,
  recommendations,
  whatsappUrl,
}: ProductDetailClientProps) {
  const images = product.images.length > 0 ? product.images : [];

  const [selectedImage, setSelectedImage] = useState(
    images[0] ?? null
  );

  const specs = [
    ["Brand", product.brand],
    ["Tipe", product.type],
    ["Kapasitas", formatCapacity(product.kapasitas)],
    ["Besaran PK", product.pk ? `${product.pk} PK` : null],
    ["Konsumsi Daya", formatPower(product.daya)],
    [
      "Rekomendasi Luas Ruangan",
      formatRoomArea(
        product.min_room_area,
        product.max_room_area
      ),
    ],
  ].filter(
    (item): item is [string, string] =>
      Boolean(item[1])
  );

  const stockAvailable = product.stock_status !== false;

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      {/* BREADCRUMB */}
      <div className="border-b border-[#eadbd7] bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 px-5 py-3 text-[10px] text-[#746763] sm:px-8 sm:text-[11px]">
          <Link
            href="/"
            className="hover:text-[#a90000]"
          >
            Home
          </Link>

          <ChevronRight size={12} />

          <Link
            href="/products"
            className="hover:text-[#a90000]"
          >
            Produk
          </Link>

          {product.category && (
            <>
              <ChevronRight size={12} />

              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="hover:text-[#a90000]"
              >
                {product.category}
              </Link>
            </>
          )}

          <ChevronRight size={12} />

          <span className="font-medium text-[#292525]">
            {product.name}
          </span>
        </div>
      </div>

      {/* MAIN DETAIL */}
      <section className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <div className="rounded-xl border border-[#eadbd7] bg-white p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7">
            {/* LEFT - GALLERY */}
            <div className="min-w-0">
              <div className="grid grid-cols-[58px_1fr] gap-3 sm:grid-cols-[68px_1fr] sm:gap-4">
                {/* THUMBNAILS */}
                <div className="flex flex-col gap-2">
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setSelectedImage(image)
                        }
                        className={`relative h-[55px] w-[58px] overflow-hidden rounded-md border bg-white transition sm:h-[62px] sm:w-[68px] ${
                          selectedImage === image
                            ? "border-2 border-[#e32323]"
                            : "border-[#eadbd7] hover:border-[#e32323]"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          unoptimized
                          className="object-contain p-1"
                          sizes="68px"
                        />
                      </button>
                    ))
                  ) : (
                    <div className="flex h-[62px] w-[68px] items-center justify-center rounded-md border border-[#eadbd7] bg-[#fafafa] text-[#b8aaa7]">
                      <ImageOff size={18} />
                    </div>
                  )}
                </div>

                {/* MAIN IMAGE */}
                <div className="overflow-hidden rounded-xl border border-[#eee1de] bg-[#fafafa]">
                  <div className="relative h-[330px] sm:h-[390px] lg:h-[430px]">
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt={product.name}
                        fill
                        priority
                        unoptimized
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#b8aaa7]">
                        <ImageOff
                          size={54}
                          strokeWidth={1.3}
                        />
                      </div>
                    )}

                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                      <span className="w-fit rounded bg-[#bd1017] px-3 py-1.5 text-[9px] font-bold text-white sm:text-[10px]">
                        PRODUK RESMI
                      </span>

                      {stockAvailable && (
                        <span className="w-fit rounded bg-[#242c38] px-3 py-1.5 text-[9px] font-medium text-white sm:text-[10px]">
                          Stok Siap
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eee1de] px-4 py-3 text-[9px] sm:text-[10px]">
                    <span className="flex items-center gap-1 text-[#6d8177]">
                      <CheckCircle2
                        size={12}
                        className={
                          stockAvailable
                            ? "text-[#35ad71]"
                            : "text-[#999]"
                        }
                      />

                      {stockAvailable
                        ? "Stok Distributor Siap Kirim"
                        : "Stok Sedang Habis"}
                    </span>

                    <span className="text-[#9da3aa]">
                      ID Produk: {product.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - PRODUCT INFO */}
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {product.category && (
                  <span className="rounded bg-[#ffe7e5] px-2.5 py-1 text-[9px] font-semibold text-[#e32323]">
                    {product.category}
                  </span>
                )}

                {product.brand && (
                  <span className="rounded bg-[#dcf8e7] px-2.5 py-1 text-[9px] font-semibold text-[#3b9661]">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-[#172033] sm:text-[28px] lg:text-[30px]">
                {product.name}
              </h1>

              {product.type && (
                <p className="mt-1 text-[11px] text-[#d91e05] sm:text-[12px]">
                  Tipe Produk: {product.type}
                </p>
              )}

              {/* PRICE */}
              <div className="mt-4 rounded-xl border border-[#f2d0cc] bg-[#fff9f8] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded bg-[#ffe1de] px-2.5 py-1 text-[9px] font-bold text-[#e32323]">
                    HARGA PRODUK
                  </span>

                  <span
                    className={`rounded px-2.5 py-1 text-[9px] font-semibold ${
                      stockAvailable
                        ? "bg-[#dcf8e7] text-[#328658]"
                        : "bg-[#eeeeee] text-[#777]"
                    }`}
                  >
                    {stockAvailable
                      ? "Tersedia"
                      : "Stok Habis"}
                  </span>
                </div>

                <div className="mt-3 flex items-end gap-1">
                  <span className="text-[26px] font-bold tracking-tight text-[#182033] sm:text-[29px]">
                    {formatIDR(product.price)}
                  </span>

                  {product.price !== null && (
                    <span className="mb-1 text-[10px] text-[#777]">
                      / unit
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[9px] leading-4 text-[#8b7d79]">
                  Harga dapat menyesuaikan jumlah pengadaan,
                  kebutuhan proyek, dan spesifikasi pekerjaan.
                </p>
              </div>

              {/* SPECS */}
              {specs.length > 0 && (
                <div className="mt-4">
                  {specs.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 border-b border-[#eee5e2] py-2.5 text-[10px] sm:text-[11px]"
                    >
                      <span className="text-[#8a8583]">
                        {label}
                      </span>

                      <span className="text-right font-semibold text-[#4a4a4a]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* DESCRIPTION */}
              {product.description && (
                <div className="mt-4">
                  <h2 className="text-[12px] font-bold text-[#182033]">
                    Deskripsi Produk
                  </h2>

                  <p className="mt-1 text-[10px] leading-5 text-[#746763] sm:text-[11px]">
                    {product.description}
                  </p>
                </div>
              )}

              {/* WHATSAPP */}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#e32323] px-4 py-3 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#c91919]"
                >
                  <FaWhatsapp size={17} />
                  Tanyakan via WhatsApp
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#e32323] px-4 py-3 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#c91919]"
                >
                  <MessageCircle size={17} />
                  Hubungi Kami
                </Link>
              )}

              {/* TRUST */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="flex min-h-[58px] flex-col items-center justify-center rounded-md border border-[#eee1de] bg-white px-2 text-center">
                  <ShieldCheck
                    size={15}
                    className="mb-1 text-[#e32323]"
                  />
                  <span className="text-[8px] font-semibold leading-3 text-[#555]">
                    Teknisi Berpengalaman
                  </span>
                </div>

                <div className="flex min-h-[58px] flex-col items-center justify-center rounded-md border border-[#eee1de] bg-white px-2 text-center">
                  <Settings
                    size={15}
                    className="mb-1 text-[#e32323]"
                  />
                  <span className="text-[8px] font-semibold leading-3 text-[#555]">
                    Pemasangan Standar
                  </span>
                </div>

                <div className="flex min-h-[58px] flex-col items-center justify-center rounded-md border border-[#eee1de] bg-white px-2 text-center">
                  <ClipboardCheck
                    size={15}
                    className="mb-1 text-[#e32323]"
                  />
                  <span className="text-[8px] font-semibold leading-3 text-[#555]">
                    Garansi Pekerjaan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-[#182033] sm:text-[20px]">
                Produk Lainnya
              </h2>

              <p className="mt-1 text-[9px] text-[#8a8583] sm:text-[10px]">
                Produk lain yang tersedia di katalog
                CV. Prima Jaya Mandiri
              </p>
            </div>

            <Link
              href="/products"
              className="flex items-center gap-1 text-[10px] font-semibold text-[#d91e05]"
            >
              Lihat Semua Produk
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-[#eadbd7] bg-white transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* IMAGE */}
                <div className="relative h-[150px] bg-[#f7f7f7] sm:h-[165px]">
                  {item.images[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#b8aaa7]">
                      <ImageOff size={34} />
                    </div>
                  )}

                  {item.category && (
                    <span className="absolute left-3 top-3 rounded bg-[#dcecff] px-2 py-1 text-[8px] font-semibold text-[#4a76ad]">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="text-[12px] font-bold text-[#202838] sm:text-[13px]">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[14px] font-bold text-[#202838]">
                    {formatIDR(item.price)}

                    {item.price !== null && (
                      <span className="ml-1 text-[9px] font-normal text-[#888]">
                        / unit
                      </span>
                    )}
                  </p>

                  <p className="mt-1 min-h-[43px] text-[9px] leading-4 text-[#807672] sm:text-[10px]">
                    {item.description ??
                      "Belum ada deskripsi produk."}
                  </p>

                  <Link
                    href={`/products/${item.id}`}
                    className="mt-4 flex min-h-9 w-full items-center justify-center rounded border border-[#e32323] text-[9px] font-semibold text-[#d91e05] transition hover:bg-[#e32323] hover:text-white"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONSULTATION */}
      <section className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-xl border border-[#cde2fa] bg-[#eef7ff] px-7 py-7 sm:px-9 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded bg-[#ffe2de] px-2 py-1 text-[8px] font-bold tracking-wide text-[#e32323]">
              KONSULTASI CEPAT
            </span>

            <h2 className="mt-2 text-[22px] font-bold text-[#182033] sm:text-[24px]">
              Butuh Solusi Teknis?
            </h2>

            <p className="mt-1 max-w-[600px] text-[10px] leading-5 text-[#777] sm:text-[11px]">
              Tim CV. Prima Jaya Mandiri siap membantu
              memberikan solusi sesuai kebutuhan Anda.
            </p>
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl.replace(
                /text=[^&]*/,
                `text=${encodeURIComponent(
                  getWhatsappMessage(
                    "produk dan solusi teknis"
                  )
                )}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#e32323] px-6 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#c91919]"
            >
              <FaWhatsapp size={15} />
              Konsultasikan Sekarang
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#e32323] px-6 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#c91919]"
            >
              <MessageCircle size={15} />
              Konsultasikan Sekarang
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}