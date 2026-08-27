"use client";

import {
  UserRoundCheck,
  BadgeCheck,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WhyChoose() {
  const features = [
    {
      icon: UserRoundCheck,
      title: "Teknisi Berpengalaman",
      description:
        "Tim ahli dengan jam terbang tinggi di industri.",
    },
    {
      icon: BadgeCheck,
      title: "Pengerjaan Profesional",
      description:
        "Standar operasional sesuai prosedur untuk hasil maksimal.",
    },
    {
      icon: Zap,
      title: "Respon Cepat",
      description:
        "Layanan on-call siap tanggap untuk masalah darurat.",
    },
    {
      icon: ShieldCheck,
      title: "Garansi Pekerjaan",
      description:
        "Jaminan kualitas dengan garansi untuk setiap layanan.",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="about"
      className={`border-b border-[#DCEAF3] bg-[#F8FCFE] py-14 transition-opacity duration-1000 ease-out sm:py-18 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* Heading */}
        <h2 className="text-center text-[22px] font-bold leading-7 text-[#0F4C75] sm:text-[24px] sm:leading-normal">
          Mengapa Memilih CV. Prima Jaya Mandiri?
        </h2>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex h-full min-h-[250px] flex-col rounded-xl border border-[#DCEAF3] bg-white px-6 py-7 transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)] sm:px-7 sm:py-8"
              >
                {/* Icon */}
                <div className="flex h-13 w-13 items-center justify-center rounded-lg bg-[#EAF6FC] sm:h-14 sm:w-14">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className="text-[#0788D1]"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-base font-bold text-[#0F4C75]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[13px] leading-6 text-[#64748B]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}