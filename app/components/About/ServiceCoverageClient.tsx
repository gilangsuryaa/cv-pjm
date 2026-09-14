"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

export type CoverageBranch = {
  id: string;
  name: string;
  label: string;
  address: string;
  mapUrl: string;
  embedUrl: string;
};

type ServiceCoverageClientProps = {
  companyName: string;
  branches: CoverageBranch[];
};

export default function ServiceCoverageClient({
  companyName,
  branches,
}: ServiceCoverageClientProps) {
  const [activeBranch, setActiveBranch] = useState(branches[0]?.id ?? "");
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  if (branches.length === 0) return null;

  const selectedBranch =
    branches.find((branch) => branch.id === activeBranch) ?? branches[0];

  return (
    <section
      className="animate-fade-in border-t border-[#e5cfc8] bg-white"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-[68px]">
        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-2 md:gap-14">
          {/* LEFT: Jangkauan layanan + kartu cabang */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#d91e05]">
              JANGKAUAN LAYANAN
            </p>

            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#222] sm:text-[36px]">
              Lokasi Kantor Kami
            </h2>

            <p className="mt-5 max-w-[550px] text-[15px] leading-7 text-[#666] sm:text-base">
              Kami melayani kebutuhan pembelian unit AC, instalasi, perawatan,
              dan perbaikan AC, serta kebutuhan sistem kelistrikan untuk
              pelanggan di sekitar lokasi kantor kami.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {branches.map((branch) => {
                const isSelected = selectedBranches.includes(branch.id);

                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => {
                      setActiveBranch(branch.id);
                      setSelectedBranches((current) =>
                        current.includes(branch.id)
                          ? current.filter((id) => id !== branch.id)
                          : [...current, branch.id]
                      );
                    }}
                    className={`w-full border p-5 text-left transition-all sm:p-6 ${
                      isSelected
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

                          {isSelected && (
                            <span className="text-xs font-semibold text-[#0788D1]">
                              &#9679; Dipilih
                            </span>
                          )}
                        </div>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#666]">
                          {branch.address}
                        </p>

                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2.5 inline-block text-sm font-semibold text-[#d91e05] hover:underline"
                        >
                          Buka di Google Maps &rarr;
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
                title={`Lokasi kantor ${companyName} - ${selectedBranch.name}`}
              />
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#666]">
              <MapPin size={15} className="mr-1 inline text-[#d91e05]" />
              {selectedBranch.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
