import Image from "next/image";
import { AirVent, Wrench, Zap, type LucideIcon } from "lucide-react";
import FadeInSection from "../FadeInSection";
import { getServices } from "@/lib/data/services";

function pickIcon(name: string): LucideIcon {
  const value = name.toLowerCase();

  if (value.includes("listrik")) return Zap;
  if (value.includes("instalasi") || value.includes("pasang")) return Wrench;

  return AirVent;
}

export default async function Pricing() {
  const services = await getServices();

  if (services.length === 0) return null;

  return (
    <FadeInSection id="products" className="bg-[#F8FCFE] py-10 sm:py-14">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        <div className="text-center">
          <h2 className="text-[28px] font-bold leading-tight text-[#0F4C75] sm:text-[32px]">
            Paket Layanan Kami
          </h2>

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0788D1]" />

          <p className="mx-auto mt-3 text-sm leading-6 text-[#64748B] sm:text-[15px]">
            Pilih layanan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service) => {
            const Icon = pickIcon(service.name);

            return (
              <div
                key={service.id}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-[#DCEAF3] bg-white shadow-[0_6px_20px_rgba(15,76,117,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_12px_28px_rgba(15,76,117,0.12)]"
              >
                {service.imageUrl && (
                  <div className="relative h-[180px] w-full bg-[#EAF4FA]">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF6FC] text-[#0788D1]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-[18px] font-bold leading-snug text-[#0F4C75]">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#64748B]">
                    {service.description ??
                      `Layanan ${service.name} oleh teknisi berpengalaman kami.`}
                  </p>

                  <div className="my-5 border-t border-[#E6F0F5]" />

                  <a
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="mt-auto block rounded-lg bg-[#0788D1] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#056A9F]"
                  >
                    Konsultasi &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeInSection>
  );
}
