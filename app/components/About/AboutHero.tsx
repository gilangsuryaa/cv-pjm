"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutCompany() {
  const images = [
    "/images/about/aboutcompany1.png",
    "/images/about/aboutcompany(2).png",
    "/images/about/aboutcompany3.png",
  ];

  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className={`relative min-h-[580px] overflow-hidden transition-opacity duration-1000 ease-out sm:min-h-[620px] lg:min-h-[680px] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Images */}
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt="CV Prima Jaya Mandiri"
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-[center_40%] transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F4C75]/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[580px] items-center justify-center px-5 py-16 text-center sm:min-h-[620px] sm:px-8 sm:py-0 lg:min-h-[680px] lg:px-10">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-4xl font-bold leading-[1.15] text-white sm:text-[42px] md:text-[52px] lg:text-[56px]">
            Tentang Kami
          </h2>

          {/* Garis dekorasi */}
          <div className="mx-auto mt-5 h-[3px] w-16 bg-[#ffff]" />

          <p className="mx-auto mt-6 max-w-[700px] text-sm leading-7 text-white/90 md:text-[15px]">
            CV. Prima Jaya Mandiri adalah perusahaan yang bergerak di bidang
            pendingin udara dengan fokus utama pada penjualan, instalasi,
            perawatan, dan perbaikan AC untuk kebutuhan rumah tinggal,
            perkantoran, usaha, maupun kebutuhan komersial.
          </p>

          <p className="mx-auto mt-4 max-w-[700px] text-sm leading-7 text-white/90 md:text-[15px]">
            Selain menyediakan berbagai kebutuhan unit AC, kami juga melayani
            instalasi AC serta pekerjaan dan instalasi sistem kelistrikan
            sesuai dengan kebutuhan pelanggan.
          </p>

          <p className="mx-auto mt-4 max-w-[700px] text-sm leading-7 text-white/90 md:text-[15px]">
            Didukung oleh tenaga kerja yang berpengalaman, kami berkomitmen
            memberikan pelayanan yang profesional, tepat waktu, dan
            mengutamakan kualitas serta kepuasan pelanggan.
          </p>

          {/* Keunggulan */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-3 text-[12px] font-medium text-white sm:gap-x-6 sm:text-[13px]">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
              ✓ Tenaga Kerja Berpengalaman
            </span>

            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
              ✓ Pelayanan Cepat dan Profesional
            </span>

            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
              ✓ Mengutamakan Kepuasan Pelanggan
            </span>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-7 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}