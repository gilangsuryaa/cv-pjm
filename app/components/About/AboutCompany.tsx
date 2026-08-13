import Image from "next/image";

export default function AboutCompany() {
  return (
    <section className="w-full bg-white text-[#333]">
      <div className="mx-auto max-w-[1200px] px-8 py-20">
        <div className="grid grid-cols-2 items-center gap-16">

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-[#0788D1]">
              Siapa Kami
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#666]">
              Kami adalah perusahaan yang bergerak di bidang air conditioning
              specialist yang menyediakan jasa perbaikan, pemasangan dan service
              AC untuk rumah tinggal maupun perkantoran.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#666]">
              Didukung oleh teknisi yang terlatih dan berpengalaman memungkinkan
              kami memberikan pelayanan yang tepat waktu dan profesional, serta
              biaya yang terjangkau.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#666]">
              Kami memahami pentingnya udara yang sehat dan bersih bagi
              kenyamanan pekerjaan dan kehidupan keluarga Anda. Kejujuran,
              kualitas, dan kepuasan pelanggan menjadi komitmen kami dalam
              memberikan pelayanan.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#444]">
              <li>✓ Certified Technical Experts</li>
              <li>✓ Rapid Response Times</li>
              <li>✓ Comprehensive Service Guarantee</li>
            </ul>
          </div>

          {/* Image */}
          <div className="relative h-[350px] w-full overflow-hidden border border-[#e5cfc8]">
            <Image
              src="/images/about-company.jpeg"
              alt="Teknisi CV Prima Jaya Mandiri"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}