import {
  Shield,
  Factory,
  Gauge,
} from "lucide-react";

export default function WhyChooseServices() {
  const items = [
    {
      icon: Shield,
      title: "Terpercaya & Transparan",
      description:
        "Harga yang jelas, penjelasan pekerjaan yang mudah dipahami, serta pemeriksaan kebutuhan yang dilakukan secara jujur dan sesuai kondisi.",
    },
    {
      icon: Factory,
      title: "Teknisi Berpengalaman",
      description:
        "Didukung teknisi yang berpengalaman dalam pemasangan, perawatan, dan perbaikan AC serta berbagai kebutuhan kelistrikan.",
    },
    {
      icon: Gauge,
      title: "Respons Cepat",
      description:
        "Kami berusaha memberikan respons dan penanganan yang cepat agar kebutuhan pelanggan dapat segera ditangani dengan baik.",
    },
  ];

  return (
    <section className="border-t border-[#e5cfc8] bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12">

        {/* Heading */}
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#d91e05]">
            KEUNGGULAN KAMI
          </p>

          <h2 className="mt-2 text-[24px] font-bold text-[#171717] sm:text-[28px]">
            Mengapa Memilih Prima Jaya Mandiri?
          </h2>

          <p className="mx-auto mt-2 max-w-[600px] text-[11px] leading-5 text-[#604f4b] sm:text-[12px]">
            Kami mengutamakan kualitas pekerjaan, pelayanan yang baik, dan
            solusi yang sesuai dengan kebutuhan setiap pelanggan.
          </p>
        </div>

        {/* Items */}
        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-12">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="text-center"
              >
                {/* Icon */}
                <div className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-[#DCEAF3] bg-[#EAF6FC] sm:h-[52px] sm:w-[52px]">
                  <Icon
                    size={22}
                    strokeWidth={1.7}
                    className="text-[#0788D1]"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-[18px] font-medium text-[#222] sm:text-[19px]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-2 max-w-[300px] text-[11px] leading-5 text-[#604f4b] sm:text-[12px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}