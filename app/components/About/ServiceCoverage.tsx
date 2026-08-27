"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function ServiceCoverage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`border-t border-[#e5cfc8] bg-white transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-[68px]">
        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#d91e05]">
              JANGKAUAN LAYANAN
            </p>

            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#222] sm:text-[36px]">
              Melayani Cirebon &amp; Sekitarnya
            </h2>

            <p className="mt-5 max-w-[550px] text-[15px] leading-7 text-[#666] sm:text-base">
              Kami melayani kebutuhan pembelian unit AC, instalasi, perawatan,
              dan perbaikan AC, serta kebutuhan sistem kelistrikan untuk
              pelanggan di wilayah Cirebon dan sekitarnya.
            </p>

            <div className="mt-6 border border-[#e5cfc8] bg-[#fafafa] p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <MapPin
                  size={21}
                  className="mt-0.5 shrink-0 text-[#d91e05]"
                />

                <div>
                  <h3 className="text-[15px] font-bold text-[#0788D1]">
                    Lokasi Kami
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[#666]">
                    Cirebon, Jawa Barat, Indonesia
                  </p>

                  <a
                    href="https://www.google.com/maps/place/6%C2%B050'46.7%22S+108%C2%B048'35.2%22E/@-6.8457873,108.8089594,19z/data=!4m4!3m3!8m2!3d-6.8463066!4d108.8097641?hl=id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-block text-sm font-semibold text-[#d91e05] hover:underline"
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-[#0788D1]">
              LOKASI KANTOR
            </p>

            <div className="overflow-hidden rounded-sm border border-[#dceff7]">
            <iframe
              src="https://www.google.com/maps?q=-6.8463066,108.8097641&z=18&output=embed"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi CV Prima Jaya Mandiri"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}