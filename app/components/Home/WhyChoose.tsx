import {
  UserRoundCheck,
  BadgeCheck,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: UserRoundCheck,
      title: "Teknisi Berpengalaman",
      description:
        "Tim ahli bersertifikat dengan jam terbang tinggi di industri.",
    },
    {
      icon: BadgeCheck,
      title: "Pengerjaan Profesional",
      description:
        "Standar operasional sesuai prosedur untuk hasil maksimal.",
    },
    {
      icon: Zap,
      title: "Respon Cepat",
      description:
        "Layanan on-call siap tanggap untuk masalah darurat.",
    },
    {
      icon: ShieldCheck,
      title: "Garansi Pekerjaan",
      description:
        "Jaminan kualitas dengan garansi untuk setiap layanan.",
    },
  ];

  return (
    <section id="about" className="bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-8">

        <h2 className="text-center text-[24px] font-bold text-[#0788D1]">
          Mengapa Memilih PJM?
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="border border-[#dddddd] bg-white px-6 py-7 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#F4F4F4]">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-[#0788D1]"
                  />
                </div>

                <h3 className="mt-4 text-[14px] font-bold text-[#222]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-[11px] leading-5 text-[#666]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}