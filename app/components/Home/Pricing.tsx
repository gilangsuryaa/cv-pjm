export default function Pricing() {
  const packages = [
    {
      title: "AC Service",
      description: "Perawatan dan pengecekan AC.",
      features: [
        "Cleaning AC",
        "Pengecekan kondisi AC",
        "Pengecekan tekanan freon",
      ],
    },
    {
      title: "AC Installation",
      description: "Instalasi AC profesional.",
      features: [
        "Instalasi unit AC",
        "Pemasangan pipa",
        "Testing & commissioning",
      ],
    },
    {
      title: "Electrical",
      description: "Solusi kebutuhan kelistrikan.",
      features: [
        "Instalasi listrik",
        "Maintenance",
        "Pengecekan sistem",
      ],
    },
  ];

  return (
    <section id="products" className="bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-8">

        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0788D1]">
            Paket Layanan
          </h2>

          <p className="mt-2 text-[11px] text-[#666]">
            Pilih layanan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className="border border-[#dddddd] bg-white p-7"
            >
              <h3 className="text-[16px] font-bold text-[#222]">
                {pkg.title}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-[#666]">
                {pkg.description}
              </p>

              <div className="my-5 border-t border-[#eeeeee]" />

              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[11px] text-[#555]"
                  >
                    <span className="text-[#0788D1]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

             <a
              href="/contact"
              className="mt-7 block border border-[#D91E05] px-4 py-3 text-center text-[10px] font-semibold text-[#D91E05] transition hover:bg-[#D91E05] hover:text-white"
            >
              Konsultasi
            </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}