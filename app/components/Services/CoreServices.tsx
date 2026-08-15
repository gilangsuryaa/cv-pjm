import Image from "next/image";
import {
  CheckCircle2,
  Cpu,
  Zap,
  Snowflake,
  ArrowRight,
} from "lucide-react";

export default function CoreServices() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-8 py-10">

        {/* Heading */}
        <div className="border-b border-[#e5cfc8] pb-3">
          <h2 className="flex items-center gap-2 text-[27px] font-bold text-[#171717]">
            <Snowflake size={18} className="text-[#8f1710]" />
            Our Core Services
          </h2>
        </div>

        {/* AC */}
        <div className="mt-3 grid grid-cols-2 border border-[#e5cfc8]">

          <div className="p-7">
            <span className="inline-flex items-center gap-1 bg-[#f2efed] px-2 py-1 text-[10px] text-[#604f4b]">
              <Snowflake size={11} />
              HVAC
            </span>

            <h3 className="mt-4 text-[22px] font-semibold text-[#171717]">
              AC Systems & Maintenance
            </h3>

            <p className="mt-3 text-[13px] leading-5 text-[#604f4b]">
              Comprehensive climate control solutions for commercial and
              residential infrastructure. Our certified technicians ensure
              peak efficiency and extended equipment lifespan.
            </p>

            <ul className="mt-4 space-y-2 text-[12px] text-[#333]">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8f1710]" />
                Scheduled Preventative Maintenance
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8f1710]" />
                Precision Diagnostics & Repair
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8f1710]" />
                Industrial & Split-System Installation
              </li>
            </ul>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20AC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#a80f08] px-5 py-3 text-[11px] font-semibold text-white hover:bg-[#8e0d07]"
            >
              Request AC Service
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="relative min-h-[300px]">
            <Image
              src="/images/ac-service.jpeg"
              alt="AC Systems and Maintenance"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Electrical + Electronics */}
        <div className="mt-5 grid grid-cols-2 gap-5">

          {/* Electrical */}
          <div className="border border-[#e5cfc8] p-7">
            <span className="inline-flex items-center gap-1 bg-[#f2efed] px-2 py-1 text-[10px] text-[#604f4b]">
              <Zap size={11} />
              Power
            </span>

            <h3 className="mt-4 text-[21px] font-semibold text-[#171717]">
              Electrical Installation
            </h3>

            <p className="mt-3 text-[13px] leading-5 text-[#604f4b]">
              Robust electrical wiring and panel maintenance engineered
              for safety and uninterrupted operation.
            </p>

            <div className="mt-4 border-t border-[#e5cfc8] pt-3 text-[12px] text-[#333]">
              <p className="border-l-2 border-[#8f1710] pl-2">
                Structural Wiring & Upgrades
              </p>

              <p className="mt-2 border-l-2 border-[#8f1710] pl-2">
                Control Panel Maintenance
              </p>
            </div>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20Instalasi%20Listrik"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block border border-[#8f6c67] px-4 py-3 text-center text-[11px] font-semibold text-[#6d1712] hover:bg-[#faf5f4]"
            >
              Request Electrical Service
            </a>
          </div>

          {/* Electronics */}
          <div className="border border-[#e5cfc8] p-7">
            <span className="inline-flex items-center gap-1 bg-[#f2efed] px-2 py-1 text-[10px] text-[#604f4b]">
              <Cpu size={11} />
              PCB
            </span>

            <h3 className="mt-4 text-[21px] font-semibold text-[#171717]">
              Electronics Services
            </h3>

            <p className="mt-3 text-[13px] leading-5 text-[#604f4b]">
              Component-level diagnostics and repair for specialized
              electronic systems and industrial control boards.
            </p>

            <div className="mt-4 border-t border-[#e5cfc8] pt-3 text-[12px] text-[#333]">
              <p className="border-l-2 border-[#8f1710] pl-2">
                Circuit Board Repair
              </p>

              <p className="mt-2 border-l-2 border-[#8f1710] pl-2">
                Component Troubleshooting
              </p>
            </div>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20Service%20Elektronik"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block border border-[#8f6c67] px-4 py-3 text-center text-[11px] font-semibold text-[#6d1712] hover:bg-[#faf5f4]"
            >
              Request Electronics Repair
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}