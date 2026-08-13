import { Eye, Flag } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="bg-[#f8f7f6] py-14">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_2fr] gap-6 px-8">

        {/* Vision */}
        <div className="border border-[#e5d5d0] bg-white p-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#f8e9e6]">
            <Eye size={20} className="text-[#8b160c]" />
          </div>

          <h2 className="text-[20px] font-semibold text-[#0788D1]">
            Our Vision
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-[#666]">
            Menjadi perusahaan jasa yang terpercaya dengan mengutamakan
            kejujuran, keunggulan dalam kualitas, serta memberikan pelayanan
            terbaik demi kepuasan pelanggan.
          </p>
        </div>

        {/* Mission */}
        <div className="border border-[#e5d5d0] bg-white p-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#e7f0ff]">
            <Flag size={20} className="text-[#315d91]" />
          </div>

          <h2 className="text-[20px] font-semibold text-[#0788D1]">
            Our Mission
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[11px] font-bold text-[#333]">
                01. Pelayanan Profesional
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-[#666]">
                Memberikan pelayanan yang tepat waktu, profesional, dan
                terjangkau kepada pelanggan.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[11px] font-bold text-[#333]">
                02. Kualitas
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-[#666]">
                Memberikan pelayanan dengan standar spesifikasi sesuai
                pabrikan dan mengutamakan keunggulan dalam kualitas.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[11px] font-bold text-[#333]">
                03. Kejujuran
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-[#666]">
                Menjadikan kejujuran sebagai budaya perusahaan dalam
                memberikan jasa kepada pelanggan.
              </p>
            </div>

            <div className="border-l-2 border-[#d8f0f8] pl-3">
              <h3 className="text-[11px] font-bold text-[#333]">
                04. Kepuasan Pelanggan
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-[#666]">
                Memberikan pelayanan terbaik dengan menjaga kepercayaan dan
                kepuasan pelanggan sebagai komitmen perusahaan.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}