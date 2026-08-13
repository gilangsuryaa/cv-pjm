import Image from "next/image";

export default function Team() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-[9px] font-bold uppercase tracking-wide text-[#d91e05]">
            TIM KAMI
          </p>

          <h2 className="mt-2 text-[22px] font-bold text-[#222]">
            Orang-Orang di Balik PJM
          </h2>

          <p className="mt-2 text-[11px] text-[#666]">
            Didukung oleh tim yang berkomitmen memberikan layanan terbaik
            untuk pelanggan.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-3 gap-6">

          {/* Hajar */}
          <div className="overflow-hidden rounded-md border border-[#e5cfc8] bg-white">
            <div className="flex justify-center">
              <Image
                src="/images/team-hajar.png"
                alt="Hajar Assyifa"
                width={220}
                height={160}
                className="h-[160px] w-[220px] object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-[14px] font-bold text-[#d91e05]">
                Hajar Assyifa
              </h3>

              <p className="mt-1 text-[10px] font-medium text-[#333]">
                COO Project
              </p>

              <p className="mt-2 text-[10px] leading-4 text-[#666]">
                Memimpin perusahaan dan memastikan kualitas layanan serta
                kepuasan pelanggan.
              </p>
            </div>
          </div>

          {/* Gilang */}
          <div className="overflow-hidden rounded-md border border-[#e5cfc8] bg-white">
            <div className="flex justify-center">
              <Image
                src="/images/team-gilang.png"
                alt="Gilang Surya"
                width={220}
                height={160}
                className="h-[160px] w-[220px] object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-[14px] font-bold text-[#d91e05]">
                Gilang Surya
              </h3>

              <p className="mt-1 text-[10px] font-medium text-[#333]">
                CFO Project
              </p>

              <p className="mt-2 text-[10px] leading-4 text-[#666]">
                Memastikan pekerjaan teknis dilakukan secara profesional
                dan sesuai standar.
              </p>
            </div>
          </div>

          {/* Firman */}
          <div className="overflow-hidden rounded-md border border-[#e5cfc8] bg-white">
            <div className="flex justify-center">
              <Image
                src="/images/team-firman.png"
                alt="Firman Noor"
                width={220}
                height={160}
                className="h-[160px] w-[220px] object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-[14px] font-bold text-[#d91e05]">
                Firman Noor
              </h3>

              <p className="mt-1 text-[10px] font-medium text-[#333]">
                CEO Project
              </p>

              <p className="mt-2 text-[10px] leading-4 text-[#666]">
                Mengelola komunikasi dan membantu kebutuhan pelanggan.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}