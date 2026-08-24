import { FaWhatsapp } from "react-icons/fa";
export default function CTA() {
  return (
    <section className="bg-[#E9E9E9] py-14">
      <div className="mx-auto max-w-[800px] px-8 text-center">
        <h2 className="text-[30px] font-bold text-[#0788D1]">
          Butuh Solusi Teknis?
        </h2>

        <p className="mx-auto mt-3 max-w-[600px] text-[11px] leading-5 text-[#555]">
          Jangan biarkan masalah teknis menghambat produktivitas Anda.
          Tim ahli kami siap membantu memberikan solusi terbaik.
        </p>

        <a
          href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-w-[240px] items-center justify-center gap-2 bg-[#D91E05] px-8 py-3 text-[11px] font-semibold text-white transition hover:bg-[#b91803]"
        >
          <FaWhatsapp size={14} />
          Konsultasikan Sekarang
        </a>
              </div>
    </section>
  );
}