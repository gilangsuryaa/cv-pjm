export default function Testimonials() {
  const testimonials = [
    {
      name: "Bpk. Budi Santoso",
      role: "Manager Operasional, PT. Maju Jaya",
      text: "Layanan sangat memuaskan! Teknisi datang tepat waktu dan berhasil memperbaiki AC sentral kantor kami yang rusak parah. Sangat direkomendasikan.",
    },
    {
      name: "Ibu Rina Wati",
      role: "Pemilik Pabrik Tekstil",
      text: "Instalasi listrik untuk pabrik baru kami dikerjakan dengan sangat rapi dan sesuai standar keamanan. Tim PJM benar-benar profesional.",
    },
  ];

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-8">

        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0788D1]">
            Apa Kata Klien Kami
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="border border-[#dddddd] bg-[#FAFAFA] p-6"
            >
              {/* Stars */}
              <div className="text-[16px] tracking-[2px] text-[#F5B400]">
                ★★★★★
              </div>

              {/* Testimonial */}
              <p className="mt-4 text-[11px] italic leading-5 text-[#555]">
                "{testimonial.text}"
              </p>

              {/* Client */}
              <div className="mt-5">
                <p className="text-[11px] font-bold text-[#222]">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-[9px] text-[#777]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}