"use client";

import { AirVent, Check, Wrench, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Pricing() {
  const packages = [
    {
      title: "Perawatan AC",
      description: "Perawatan dan pengecekan AC secara berkala.",
      service: "Perawatan AC",
      features: [
        "Pembersihan AC",
        "Pengecekan kondisi AC",
        "Pengecekan tekanan freon",
      ],
    },
    {
      title: "Instalasi AC",
      description: "Instalasi AC secara profesional dan sesuai kebutuhan.",
      service: "Instalasi AC",
      features: [
        "Instalasi unit AC",
        "Pemasangan pipa",
        "Pengujian dan pemeriksaan",
      ],
    },
    {
      title: "Kelistrikan",
      description: "Solusi untuk berbagai kebutuhan sistem kelistrikan.",
      service: "Instalasi Listrik",
      features: [
        "Instalasi listrik",
        "Perawatan sistem",
        "Pengecekan sistem",
      ],
    },
  ];

  const packageIcons = {
    "Perawatan AC": AirVent,
    "Instalasi AC": Wrench,
    Kelistrikan: Zap,
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="products"
      className={`bg-[#F8FCFE] py-10 transition-opacity duration-1000 ease-out sm:py-14 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        <div className="text-center">
          <h2 className="text-[28px] font-bold leading-tight text-[#0F4C75] sm:text-[32px]">
            Paket Layanan Kami
          </h2>

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0788D1]" />

          <p className="mx-auto mt-3 text-sm leading-6 text-[#64748B] sm:text-[15px]">
            Pilih layanan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg) => {
            const Icon = packageIcons[pkg.title as keyof typeof packageIcons];

            return (
            <div
              key={pkg.title}
              className="flex h-full min-h-[390px] flex-col rounded-xl border border-[#DCEAF3] bg-white p-6 shadow-[0_6px_20px_rgba(15,76,117,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_12px_28px_rgba(15,76,117,0.12)] sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF6FC] text-[#0788D1]">
                <Icon size={26} strokeWidth={1.8} />
              </div>

              <h3 className="mt-5 text-[18px] font-bold leading-snug text-[#0F4C75]">
                {pkg.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                {pkg.description}
              </p>

              <div className="my-5 border-t border-[#E6F0F5]" />

              <ul className="space-y-3.5">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] leading-5 text-[#64748B]"
                  >
                    <Check
                      size={17}
                      strokeWidth={2.2}
                      className="mt-0.5 shrink-0 text-[#0788D1]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`/contact?service=${encodeURIComponent(pkg.service)}`}
                className="mt-auto block rounded-lg bg-[#0788D1] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#056A9F]"
              >
                Konsultasi →
              </a>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}