import { MessageSquare } from "lucide-react";
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
        href="#contact"
        className="mt-7 inline-flex min-w-[240px] items-center justify-center gap-2 bg-[#D91E05] px-8 py-3 text-[11px] font-semibold text-white transition hover:bg-[#b91803]"
        >
        <MessageSquare size={14} />
        Konsultasikan Sekarang
        </a>
      </div>
    </section>
  );
}