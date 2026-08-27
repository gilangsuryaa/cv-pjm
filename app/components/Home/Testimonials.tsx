"use client";

import { useEffect, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Bpk. Budi Santoso",
      role: "Manager Operasional, PT. Maju Jaya",
      text: "Layanan sangat memuaskan! Teknisi datang tepat waktu dan berhasil memperbaiki AC sentral kantor kami yang rusak parah. Sangat direkomendasikan.",
    },
    {
      name: "Ibu Rina Wati",
      role: "Pemilik Pabrik Tekstil",
      text: "Instalasi listrik untuk pabrik baru kami dikerjakan dengan sangat rapi dan sesuai standar keamanan. Tim PJM benar-benar profesional.",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`bg-[#F8FCFE] py-14 transition-opacity duration-1000 ease-out sm:py-18 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold leading-tight text-[#0F4C75] sm:text-[32px]">
            Apa Kata Klien Kami
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex min-h-[250px] flex-col rounded-xl border border-[#DCEAF3] bg-white p-6 shadow-[0_6px_20px_rgba(15,76,117,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)] sm:p-7"
            >
              {/* Stars */}
              <div className="text-base tracking-[2px] text-[#F5B400] sm:text-[17px]">
                ★★★★★
              </div>

              {/* Testimonial */}
              <p className="mt-4 text-sm italic leading-6 text-[#64748B] sm:text-[15px]">
                "{testimonial.text}"
              </p>

              {/* Client */}
              <div className="mt-auto pt-6">
                <p className="text-[15px] font-bold text-[#0F4C75]">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}