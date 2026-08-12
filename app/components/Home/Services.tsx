import {
  Snowflake,
  Zap,
  Wrench,
  Settings,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Snowflake,
      title: "AC & Refrigeration",
      description:
        "Instalasi, perawatan, dan perbaikan AC untuk kebutuhan residential maupun industri.",
    },
    {
      icon: Zap,
      title: "Electrical",
      description:
        "Instalasi dan maintenance sistem kelistrikan dengan standar keamanan yang terpercaya.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description:
        "Perawatan berkala untuk menjaga performa perangkat tetap optimal.",
    },
    {
      icon: Settings,
      title: "Service & Repair",
      description:
        "Perbaikan berbagai perangkat dengan teknisi berpengalaman dan profesional.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-[#FFF8E8] py-14"
    >
      <div className="mx-auto max-w-[1200px] px-8">

        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0788D1]">
            Layanan Kami
          </h2>

          <p className="mt-2 text-[11px] text-[#666]">
            Solusi profesional untuk kebutuhan AC, listrik, dan elektronik Anda.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="border border-[#dddddd] bg-white px-6 py-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF6FC]">
                  <Icon
                    size={25}
                    strokeWidth={1.8}
                    className="text-[#0788D1]"
                  />
                </div>

                <h3 className="mt-5 text-[14px] font-bold text-[#222]">
                  {service.title}
                </h3>

                <p className="mt-3 text-[11px] leading-5 text-[#666]">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-block text-[10px] font-semibold text-[#D91E05] hover:underline"
                >
                  Selengkapnya →
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}