"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/images/Home/Hero1.png",
    "/images/Home/Hero(2).png",
    "/images/Home/Hero 3.png",
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
      className={`relative min-h-[560px] overflow-hidden transition-opacity duration-1000 ease-out sm:min-h-[600px] lg:min-h-[640px] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      
      {/* Background Images */}
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt="Layanan CV. Prima Jaya Mandiri"
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-[center_35%] transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F4C75]/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1400px] items-center px-5 py-16 sm:min-h-[600px] sm:px-8 lg:min-h-[640px] lg:px-10">
        <div className="max-w-[620px]">

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-white/80 sm:text-xs">
            CV. Prima Jaya Mandiri
          </p>

          <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-[48px] md:text-[54px] lg:text-[58px]">
            Solusi AC, Listrik &amp; Elektronik
          </h1>

          <p className="mt-6 max-w-[600px] text-sm leading-7 text-white/90 sm:text-[15px] md:text-base">
            Melihat kebutuhan Anda, kami menyediakan layanan pembelian unit AC,
            instalasi, perawatan, dan perbaikan AC, serta instalasi dan
            perawatan sistem kelistrikan.
          </p>

          {/* Buttons */}
          <div className="relative z-20 mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="/contact"
              className="w-fit rounded-sm border border-white bg-white/10 px-7 py-3 text-center text-xs font-semibold text-white transition hover:bg-white hover:text-[#0F4C75] sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Konsultasi Sekarang
            </a>

            <a
              href="/services"
              className="w-fit rounded-sm border border-white/80 px-7 py-3 text-center text-xs font-semibold text-white transition hover:bg-white hover:text-[#0F4C75] sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Lihat Layanan
            </a>
          </div>

        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-7">
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