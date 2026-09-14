import {
  AirVent,
  ShoppingCart,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeInSection from "../FadeInSection";
import { getServices } from "@/lib/data/services";

// Nama layanan bebas diisi admin, jadi ikonnya dipilih dari kata kunci.
function pickIcon(name: string): LucideIcon {
  const value = name.toLowerCase();

  if (value.includes("listrik")) return Zap;
  if (value.includes("instalasi") || value.includes("pasang")) return Wrench;
  if (value.includes("service") || value.includes("servis")) return AirVent;
  if (value.includes("cuci") || value.includes("perawatan")) return AirVent;

  return ShoppingCart;
}

export default async function Services() {
  const services = await getServices();

  if (services.length === 0) return null;

  return (
    <FadeInSection id="services" className="bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[28px] font-bold leading-tight text-[#0F4C75] sm:text-[32px]">
            Layanan Kami
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-[15px]">
            Solusi lengkap untuk kebutuhan AC dan kelistrikan, mulai dari
            penjualan unit, instalasi, servis, hingga perawatan.
          </p>
        </div>

        {/* Services */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service) => {
            const Icon = pickIcon(service.name);

            return (
              <div
                key={service.id}
                className="flex h-full min-h-[250px] flex-col rounded-xl border border-[#DCEAF3] bg-white px-6 py-7 shadow-[0_6px_20px_rgba(15,76,117,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)] sm:px-7 sm:py-8"
              >
                {/* Icon */}
                <div className="flex h-13 w-13 items-center justify-center rounded-lg bg-[#EAF6FC] sm:h-14 sm:w-14">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className="text-[#0788D1]"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-[17px] font-bold leading-snug text-[#0F4C75]">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  {service.description ??
                    `Layanan ${service.name} oleh teknisi berpengalaman kami.`}
                </p>

                {/* Link */}
                <a
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="mt-auto pt-5 text-[13px] font-semibold text-[#D91E05] transition hover:text-[#B91803] hover:underline"
                >
                  Konsultasi &rarr;
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </FadeInSection>
  );
}
