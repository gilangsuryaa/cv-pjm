import Link from "next/link";
import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/seo/site";

// Blok tautan internal di beranda. Tujuannya dua: pengunjung cepat menemukan
// halaman wilayah, dan Google punya jalur crawl dari beranda ke halaman
// "service ac cirebon" / "service ac jogja".
export default function ServiceAreaLinks() {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-tight text-[#0F4C75] sm:text-[30px]">
            Service AC di Cirebon &amp; Jogja
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-[15px]">
            Dua kantor, satu standar layanan. Pilih wilayah Anda untuk melihat
            area jangkauan dan layanan yang tersedia.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/layanan/${area.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-[#DCEAF3] bg-[#F8FCFE] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B9DDF0] hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC]">
                <MapPin size={24} strokeWidth={1.8} className="text-[#0788D1]" />
              </div>

              <div>
                <h3 className="text-[18px] font-bold text-[#0F4C75] group-hover:text-[#D91E05]">
                  Service AC {area.city}
                </h3>

                <p className="mt-1.5 text-[13px] leading-6 text-[#64748B]">
                  {area.office} &middot; {area.region}
                  <br />
                  {area.areas.slice(0, 3).join(", ")} dan sekitarnya
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
