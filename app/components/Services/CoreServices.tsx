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
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10">

        {/* Heading */}
        <div className="border-b border-[#e5cfc8] pb-3">
          <h2 className="flex items-center gap-2 text-[22px] font-bold text-[#171717] sm:text-[27px]">
            <Snowflake
              size={17}
              className="shrink-0 text-[#0788D1] sm:h-[18px] sm:w-[18px]"
            />
            Layanan Utama Kami
          </h2>

          <p className="mt-2 max-w-[650px] text-[11px] leading-5 text-[#666] sm:text-[12px]">
            Berbagai solusi untuk kebutuhan AC, kelistrikan, dan elektronik
            dengan pelayanan profesional dan teknisi berpengalaman.
          </p>
        </div>

        {/* AC */}
        <div className="mt-3 grid grid-cols-1 border border-[#dceaf3] lg:grid-cols-2">

          {/* Content */}
          <div className="p-5 sm:p-7">
            <span className="inline-flex items-center gap-1 bg-[#eaf6fc] px-2 py-1 text-[10px] font-medium text-[#0788D1]">
              <Snowflake size={11} />
              AC &amp; REFRIGERASI
            </span>

            <h3 className="mt-4 text-[20px] font-semibold leading-7 text-[#171717] sm:text-[22px]">
              Solusi AC Lengkap
            </h3>

            <p className="mt-3 text-[12px] leading-5 text-[#604f4b] sm:text-[13px]">
              Melayani kebutuhan AC mulai dari pembelian unit, pemasangan,
              perawatan, hingga perbaikan untuk rumah, kantor, dan kebutuhan
              usaha.
            </p>

            <ul className="mt-4 space-y-2 text-[11px] text-[#333] sm:text-[12px]">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-[#0788D1]"
                />
                <span>Pembelian &amp; Pengadaan Unit AC</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-[#0788D1]"
                />
                <span>Instalasi &amp; Pemasangan AC</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-[#0788D1]"
                />
                <span>Service, Perawatan &amp; Perbaikan AC</span>
              </li>
            </ul>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20AC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#D91E05] px-5 py-3 text-[11px] font-semibold text-white transition hover:bg-[#B91803] sm:w-auto"
            >
              Konsultasi AC
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Image */}
          <div className="relative min-h-[230px] sm:min-h-[300px]">
            <Image
              src="/images/Services/solusi ac lengkap.png"
              alt="Layanan service dan instalasi AC CV Prima Jaya Mandiri"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Electrical + Electronics */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-2">

          {/* Electrical */}
          <div className="border border-[#dceaf3] p-5 sm:p-7">
            <span className="inline-flex items-center gap-1 bg-[#eaf6fc] px-2 py-1 text-[10px] font-medium text-[#0788D1]">
              <Zap size={11} />
              KELISTRIKAN
            </span>

            <h3 className="mt-4 text-[19px] font-semibold leading-7 text-[#171717] sm:text-[21px]">
              Instalasi &amp; Perawatan Listrik
            </h3>

            <p className="mt-3 text-[12px] leading-5 text-[#604f4b] sm:text-[13px]">
              Solusi untuk kebutuhan instalasi, perawatan, dan pengecekan
              sistem kelistrikan agar tetap aman dan berfungsi dengan baik.
            </p>

            <div className="mt-4 border-t border-[#dceaf3] pt-3 text-[11px] text-[#333] sm:text-[12px]">
              <p className="border-l-2 border-[#D91E05] pl-2">
                Instalasi &amp; Penambahan Jalur Listrik
              </p>

              <p className="mt-2 border-l-2 border-[#D91E05] pl-2">
                Pengecekan &amp; Perawatan Sistem Kelistrikan
              </p>
            </div>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20Instalasi%20Listrik"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full border border-[#D91E05] px-4 py-3 text-center text-[11px] font-semibold text-[#D91E05] transition hover:bg-[#FFF5F3]"
            >
              Konsultasi Kelistrikan
            </a>
          </div>

          {/* Electronics */}
          <div className="border border-[#dceaf3] p-5 sm:p-7">
            <span className="inline-flex items-center gap-1 bg-[#eaf6fc] px-2 py-1 text-[10px] font-medium text-[#0788D1]">
              <Cpu size={11} />
              ELEKTRONIK
            </span>

            <h3 className="mt-4 text-[19px] font-semibold leading-7 text-[#171717] sm:text-[21px]">
              Service &amp; Perbaikan Elektronik
            </h3>

            <p className="mt-3 text-[12px] leading-5 text-[#604f4b] sm:text-[13px]">
              Membantu pengecekan dan perbaikan berbagai perangkat elektronik
              sesuai dengan jenis kerusakan dan kebutuhan pelanggan.
            </p>

            <div className="mt-4 border-t border-[#dceaf3] pt-3 text-[11px] text-[#333] sm:text-[12px]">
              <p className="border-l-2 border-[#D91E05] pl-2">
                Pemeriksaan &amp; Diagnosa Kerusakan
              </p>

              <p className="mt-2 border-l-2 border-[#D91E05] pl-2">
                Service &amp; Perbaikan Komponen
              </p>
            </div>

            <a
              href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi%20Service%20Elektronik"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full border border-[#D91E05] px-4 py-3 text-center text-[11px] font-semibold text-[#D91E05] transition hover:bg-[#FFF5F3]"
            >
              Konsultasi Elektronik
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}