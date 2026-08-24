"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/images/Hero 1.png",
    "/images/Hero(2).png",
    "/images/Hero 3.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt="Layanan CV. Prima Jaya Mandiri"
          fill
          priority={index === 0}
          className={`object-cover object-[center_35%] transition-opacity duration-1000 ${
          index === current ? "opacity-100" : "opacity-0"
        }`}
        />
      ))}

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-[#0F4C75]/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1200px] items-center px-8">
        <div className="max-w-[600px]">
          <h1 className="text-[42px] font-bold leading-[1.15] text-white md:text-[48px]">
            Solusi AC, Listrik &amp;
            <br />
            Elektronik Profesional
          </h1>

          <p className="mt-5 max-w-[520px] text-[14px] leading-7 text-white/90">
            Layanan terpercaya untuk kebutuhan industri dan residensial
            dengan teknisi berpengalaman.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex gap-4">
            <a
              href="#contact"
              className="rounded-lg border border-white bg-transparent px-7 py-3 text-[11px] font-semibold text-white transition hover:bg-white hover:text-[#0F4C75]"
            >
              Konsultasi Sekarang
            </a>

            <a
              href="#services"
              className="rounded-lg border border-white bg-transparent px-7 py-3 text-[11px] font-semibold text-white transition hover:bg-white hover:text-[#0F4C75]"
            >
              Lihat Layanan
            </a>
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