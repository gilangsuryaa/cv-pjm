"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const projects = [
    {
      image: "/images/Portofolio/Portofolio 1.png",
      title: "Instalasi AC",
      category: "AC & Pendingin",
    },
    {
      image: "/images/Portofolio/Portofolio 2.jpg",
      title: "Instalasi Kelistrikan",
      category: "Kelistrikan",
    },
    {
      image: "/images/Portofolio/Portofolio 3.png",
      title: "Perawatan AC",
      category: "Perawatan",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="portfolio"
      className={`bg-[#F3FAFF] py-12 transition-opacity duration-1000 ease-out sm:py-14 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F4C75] sm:text-[24px] md:text-[28px]">
            Portfolio
          </h2>

          <p className="mt-2 text-[11px] text-[#64748B] sm:text-xs">
            Beberapa pekerjaan yang telah kami kerjakan.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-xl border border-[#DCEAF3] bg-white shadow-[0_6px_20px_rgba(15,76,117,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)]"
            >
              <div className="relative h-[220px] w-full overflow-hidden sm:h-[210px] lg:h-[230px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-[center_35%] transition duration-300 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#D91E05]">
                  {project.category}
                </p>

                <h3 className="mt-2 text-sm font-bold text-[#0F4C75]">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}