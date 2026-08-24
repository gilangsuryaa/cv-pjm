import { MapPin } from "lucide-react";

export default function ServiceCoverage() {
  return (
    <section className="border-t border-[#e5cfc8] bg-white">
      <div className="mx-auto max-w-[1200px] px-8 py-20">
        <div className="grid grid-cols-2 items-center gap-16">

          {/* LEFT */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#d91e05]">
              SERVICE COVERAGE
            </p>

            <h2 className="mt-2 text-[28px] font-bold text-[#222]">
              Service Coverage Area
            </h2>

            <p className="mt-5 max-w-[500px] text-[11px] leading-6 text-[#666]">
              Kami melayani kebutuhan service, perbaikan, dan instalasi AC
              untuk pelanggan di wilayah sekitar Cirebon dan area sekitarnya.
              Hubungi kami untuk mengetahui jangkauan layanan dan kebutuhan
              teknis Anda.
            </p>

            {/* Location */}
            <div className="mt-6 border border-[#e5cfc8] bg-[#fafafa] p-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#d91e05]"
                />

                <div>
                  <h3 className="text-[11px] font-bold text-[#0788D1]">
                    Lokasi Kami
                  </h3>

                  <p className="mt-1 text-[10px] leading-5 text-[#666]">
                    Cirebon, Jawa Barat, Indonesia
                  </p>

                  <a
                    href="https://www.google.com/maps/place/6%C2%B050'46.7%22S+108%C2%B048'35.2%22E/@-6.8457873,108.8089594,19z/data=!4m4!3m3!8m2!3d-6.8463066!4d108.8097641?hl=id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[10px] font-semibold text-[#d91e05] hover:underline"
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - GOOGLE MAP */}
          <div className="overflow-hidden border border-[#dceff7]">
            <iframe
              src="https://www.google.com/maps?q=-6.8463066,108.8097641&z=18&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi CV Prima Jaya Mandiri"
            />
          </div>

        </div>
      </div>
    </section>
  );
}