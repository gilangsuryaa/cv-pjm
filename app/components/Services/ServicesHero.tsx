import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="border-b border-[#e5cfc8] bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-12 px-8 py-10">
        
        {/* Text */}
        <div>
          <h1 className="max-w-[520px] text-[38px] font-bold leading-[1.15] text-[#171717]">
            Technical Precision.
            <br />
            Industrial Reliability.
          </h1>

          <p className="mt-4 max-w-[500px] text-[15px] leading-6 text-[#5f4d49]">
            Expert maintenance, repair, and installation services for
            critical infrastructure. We deliver uncompromising quality
            for AC systems, electrical networks, and complex electronics.
          </p>
        </div>

        {/* Image */}
        <div className="relative h-[320px]">
          <Image
            src="/images/services-hero.jpeg"
            alt="PJM Technical Services"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}