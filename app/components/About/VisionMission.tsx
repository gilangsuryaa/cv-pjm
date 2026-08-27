"use client";

import { Eye, Flag } from "lucide-react";
import { useEffect, useState } from "react";

export default function VisionMission() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`bg-[#f8f7f6] py-12 transition-opacity duration-1000 ease-out sm:py-14 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 sm:px-8 md:grid-cols-[1fr_2fr] lg:px-10">

        {/* Vision */}
        <div className="border border-[#e5d5d0] bg-white p-6 sm:p-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#f8e9e6]">
            <Eye size={20} className="text-[#8b160c]" />
          </div>

          <h2 className="text-xl font-bold text-[#0F4C75] sm:text-[24px]">
            Visi Kami
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#666] sm:text-[15px]">
            Menjadi perusahaan jasa yang terpercaya dengan mengutamakan
            kejujuran, keunggulan dalam kualitas, serta memberikan pelayanan
            terbaik demi kepuasan pelanggan.
          </p>
        </div>

        {/* Mission */}
        <div className="border border-[#e5d5d0] bg-white p-6 sm:p-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#e7f0ff]">
            <Flag size={20} className="text-[#315d91]" />
          </div>

          <h2 className="text-xl font-bold text-[#0F4C75] sm:text-[24px]">
            Misi Kami
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[13px] font-bold text-[#333] sm:text-sm">
                01. Pelayanan Profesional
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-[#666] sm:text-[13px]">
                Memberikan pelayanan yang tepat waktu, profesional, dan
                terjangkau kepada pelanggan.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[13px] font-bold text-[#333] sm:text-sm">
                02. Kualitas
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-[#666] sm:text-[13px]">
                Memberikan pelayanan dengan standar spesifikasi sesuai
                pabrikan dan mengutamakan keunggulan dalam kualitas.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[13px] font-bold text-[#333] sm:text-sm">
                03. Kejujuran
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-[#666] sm:text-[13px]">
                Menjadikan kejujuran sebagai budaya perusahaan dalam
                memberikan jasa kepada pelanggan.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[13px] font-bold text-[#333] sm:text-sm">
                04. Kepuasan Pelanggan
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-[#666] sm:text-[13px]">
                Memberikan pelayanan terbaik dengan menjaga kepercayaan dan
                kepuasan pelanggan sebagai komitmen perusahaan.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}