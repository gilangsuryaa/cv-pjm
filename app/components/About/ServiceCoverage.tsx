"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const branches = [
  {
    id: "cirebon",
    name: "Cirebon",
    label: "Kantor Pusat",
    address: "Cirebon, Jawa Barat, Indonesia",
    mapUrl:
      "https://www.google.com/maps/place/6%C2%B050'46.7%22S+108%C2%B048'35.2%22E/@-6.8457873,108.8089594,19z/data=!4m4!3m3!8m2!3d-6.8463066!4d108.8097641?hl=id",
    embedUrl:
      "https://www.google.com/maps?q=-6.8463066,108.8097641&z=18&output=embed",
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    label: "Cabang",
    address:
      "Dusun Bedog RT 03, Trihanggo, Gamping, Sleman, Yogyakarta",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dusun+Bedog+RT+03+Trihanggo+Gamping+Sleman+Yogyakarta",
    embedUrl:
      "https://www.google.com/maps?q=Dusun+Bedog+RT+03+Trihanggo+Gamping+Sleman+Yogyakarta&z=16&output=embed",
  },
];

export default function ServiceCoverage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBranch, setActiveBranch] = useState("cirebon");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const selectedBranch =
    branches.find((branch) => branch.id === activeBranch) ?? branches[0];

  return (
    <section
      className={`border-t border-[#e5cfc8] bg-white transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-[68px]">
        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-2 md:gap-14">
          {/* LEFT: Jangkauan layanan + kartu cabang */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#d91e05]">
              JANGKAUAN LAYANAN
            </p>

            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#222] sm:text-[36px]">
              Melayani Cirebon &amp; Yogyakarta
            </h2>

            <p className="mt-5 max-w-[550px] text-[15px] leading-7 text-[#666] sm:text-base">
              Kami melayani kebutuhan pembelian unit AC, instalasi, perawatan,
              dan perbaikan AC, serta kebutuhan sistem kelistrikan untuk
              pelanggan di wilayah Cirebon, Yogyakarta, dan sekitarnya.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {branches.map((branch) => {
                const isActive = activeBranch === branch.id;

                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setActiveBranch(branch.id)}
                    className={`w-full border p-5 text-left transition-all sm:p-6 ${
                      isActive
                        ? "border-[#0788D1] bg-[#f8fcff] shadow-sm"
                        : "border-[#e5cfc8] bg-[#fafafa] hover:border-[#0788D1]"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <MapPin
                        size={21}
                        className="mt-0.5 shrink-0 text-[#d91e05]"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#0788D1]">
                              {branch.label}
                            </p>

                            <h3 className="mt-1 text-[18px] font-bold text-[#222]">
                              {branch.name}
                            </h3>
                          </div>

                          <span
                            className={`text-xs font-semibold ${
                              isActive
                                ? "text-[#0788D1]"
                                : "text-[#999]"
                            }`}
                          >
                            {isActive ? "● Dipilih" : "Lihat lokasi →"}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-[#666]">
                          {branch.address}
                        </p>

                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2.5 inline-block text-sm font-semibold text-[#d91e05] hover:underline"
                        >
                          Buka di Google Maps →
                        </a>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Peta sesuai cabang yang dipilih */}
          <div>
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[2px] text-[#0788D1]">
              LOKASI KANTOR
            </p>

            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[#222]">
                {selectedBranch.name}
              </h3>

              <span className="text-sm text-[#666]">
                {selectedBranch.label}
              </span>
            </div>

            <div className="overflow-hidden rounded-sm border border-[#dceff7]">
              <iframe
                key={selectedBranch.id}
                src={selectedBranch.embedUrl}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={`Lokasi kantor CV Prima Jaya Mandiri - ${selectedBranch.name}`}
              />
            </div>

            <p className="mt-3 text-sm leading-6 text-[#666]">
              <MapPin size={15} className="mr-1 inline text-[#d91e05]" />
              {selectedBranch.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}