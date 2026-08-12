import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#FFF8E8]">
      <div className="mx-auto flex min-h-[315px] max-w-[1200px] items-center justify-between gap-12 px-8 py-4">

        {/* Left Content */}
        <div className="flex max-w-[540px] flex-col">
          <h1 className="text-[38px] font-bold leading-[1.15] text-[#0788D1]">
            Solusi AC, Listrik &amp;
            <br />
            Elektronik Profesional
          </h1>

          <p className="mt-5 max-w-[500px] text-[13px] leading-6 text-[#555]">
            Layanan terpercaya untuk kebutuhan industri dan residensial
            dengan teknisi berpengalaman.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href="#contact"
              className="bg-[#D91E05] px-7 py-3 text-[10px] font-semibold text-white transition hover:bg-[#b91803]"
            >
              Konsultasi Sekarang
            </a>

            <a
              href="#services"
              className="border border-[#D91E05] bg-white px-7 py-3 text-[10px] font-semibold text-[#D91E05] transition hover:bg-[#D91E05] hover:text-white"
            >
              Lihat Layanan
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[265px] w-[500px] shrink-0 overflow-hidden">
          <Image
            src="/images/contoh hero.png"
            alt="Teknisi PJM"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}