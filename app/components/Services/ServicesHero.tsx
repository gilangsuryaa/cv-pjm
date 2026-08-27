import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative min-h-[580px] overflow-hidden bg-white sm:min-h-[620px] lg:min-h-[680px]">
      <div className="mx-auto grid min-h-[580px] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-14 sm:min-h-[620px] sm:px-8 sm:py-16 md:grid-cols-2 md:gap-12 lg:min-h-[680px] lg:px-10 lg:py-20">

        {/* Text */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#D91E05] sm:text-[10px]">
            LAYANAN KAMI
          </p>

          <h1 className="mt-2 max-w-[560px] text-3xl font-bold leading-[1.15] text-[#171717] sm:text-[38px] md:text-[44px] lg:text-[48px]">
            Solusi AC, Listrik &amp;
            <br />
            Elektronik Profesional
          </h1>

          <p className="mt-5 max-w-[540px] text-sm leading-6 text-[#5f4d49] sm:text-[15px] sm:leading-7">
            Kami menyediakan berbagai solusi untuk kebutuhan AC, mulai dari
            pembelian unit, instalasi, perawatan, hingga perbaikan. Kami juga
            melayani kebutuhan instalasi listrik dan perbaikan elektronik
            untuk rumah, kantor, maupun kebutuhan usaha.
          </p>

          <p className="mt-4 max-w-[540px] text-[12px] leading-6 text-[#64748B] sm:text-[13px]">
            Didukung teknisi berpengalaman dan pelayanan yang profesional,
            kami berkomitmen memberikan solusi yang sesuai dengan kebutuhan
            pelanggan.
          </p>

          {/* Highlight */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#DCEAF3] bg-[#F5FBFE] px-4 py-2 text-[10px] font-semibold text-[#0788D1] sm:text-[11px]">
              ✓ Spesialis AC
            </span>

            <span className="rounded-full border border-[#DCEAF3] bg-[#F5FBFE] px-4 py-2 text-[10px] font-semibold text-[#0788D1] sm:text-[11px]">
              ✓ Teknisi Berpengalaman
            </span>

            <span className="rounded-full border border-[#DCEAF3] bg-[#F5FBFE] px-4 py-2 text-[10px] font-semibold text-[#0788D1] sm:text-[11px]">
              ✓ Respon Cepat
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-md sm:h-[380px] md:h-[420px] lg:h-[460px]">
          <Image
            src="/images/Services/services-hero.png"
            alt="Layanan AC, listrik, dan elektronik CV Prima Jaya Mandiri"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}