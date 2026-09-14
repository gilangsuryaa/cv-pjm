"use client";

import { Send, UserRoundCog } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type ContactFormProps = {
  companyName: string;
  whatsappNumber: string | null;
  serviceOptions: string[];
};

export default function ContactForm({
  companyName,
  whatsappNumber,
  serviceOptions,
}: ContactFormProps) {
  const searchParams = useSearchParams();

  // Layanan bisa dipilih lebih dulu dari tombol "Konsultasi" di halaman lain.
  const serviceFromUrl = searchParams.get("service") || "";

  // Pilihan dari URL jadi nilai awal, tapi tetap bisa diganti manual.
  // Kalau parameter URL berubah, pilihan mengikuti nilai baru itu lagi.
  const [service, setService] = useState({
    fromUrl: serviceFromUrl,
    value: serviceFromUrl,
  });

  const selectedService =
    service.fromUrl === serviceFromUrl ? service.value : serviceFromUrl;

  const setSelectedService = (value: string) =>
    setService({ fromUrl: serviceFromUrl, value });

  // Kalau layanan dari URL tidak ada di daftar, tetap tampilkan sebagai opsi.
  const options = serviceOptions.includes(selectedService)
    ? serviceOptions
    : selectedService
      ? [selectedService, ...serviceOptions]
      : serviceOptions;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!whatsappNumber) return;

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const whatsapp = (form.elements.namedItem("whatsapp") as HTMLInputElement)
      .value;

    const service = (form.elements.namedItem("service") as HTMLSelectElement)
      .value;

    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;

    const message = `Halo ${companyName},

Saya ingin mengajukan konsultasi.

Nama / Perusahaan: ${name}
Nomor WhatsApp: ${whatsapp}
Layanan yang Dibutuhkan: ${service}

Detail kebutuhan / masalah:
${description}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-[#bfe8f8] bg-white p-5 sm:p-8">
      <div className="flex items-start gap-3">
        <UserRoundCog size={22} className="mt-1 shrink-0 text-[#d91e05]" />

        <h2 className="text-[21px] font-semibold leading-7 text-[#0788D1] sm:text-[25px]">
          Ajukan Konsultasi
        </h2>
      </div>

      <p className="mt-3 text-[13px] leading-6 text-[#654f4a] sm:text-[16px]">
        Berikan informasi mengenai kebutuhan atau masalah Anda agar kami dapat
        memberikan solusi yang sesuai.
      </p>

      <div className="mt-4 border-t border-[#bfe8f8]" />

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-7">
        {/* NAMA + WHATSAPP */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] font-semibold sm:text-[14px]"
            >
              Nama Lengkap / Perusahaan
            </label>

            <input
              id="name"
              name="name"
              required
              type="text"
              placeholder="Masukkan nama / perusahaan"
              className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[13px] outline-none transition focus:border-[#0788D1] sm:text-[14px]"
            />
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="mb-2 block text-[13px] font-semibold sm:text-[14px]"
            >
              Nomor WhatsApp
            </label>

            <input
              id="whatsapp"
              name="whatsapp"
              required
              type="tel"
              placeholder="08xxxxxxxxxx"
              className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[13px] outline-none transition focus:border-[#0788D1] sm:text-[14px]"
            />
          </div>
        </div>

        {/* LAYANAN */}
        <div className="mt-4">
          <label
            htmlFor="service"
            className="mb-2 block text-[13px] font-semibold sm:text-[14px]"
          >
            Layanan yang Dibutuhkan
          </label>

          <select
            id="service"
            name="service"
            required
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="h-[42px] w-full border border-[#d4d4d4] bg-white px-3 text-[13px] outline-none transition focus:border-[#0788D1] sm:text-[14px]"
          >
            <option value="" disabled>
              Pilih jenis layanan...
            </option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}

            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* DETAIL */}
        <div className="mt-4">
          <label
            htmlFor="description"
            className="mb-2 block text-[13px] font-semibold sm:text-[14px]"
          >
            Detail Kebutuhan / Masalah
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={6}
            placeholder={
              selectedService
                ? `Saya ingin berkonsultasi mengenai ${selectedService}...`
                : "Jelaskan kebutuhan atau masalah Anda..."
            }
            className="w-full resize-none border border-[#d4d4d4] px-3 py-3 text-[13px] outline-none transition focus:border-[#0788D1] sm:text-[14px]"
          />
        </div>

        {/* SUBMIT */}
        <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-end">
          <button
            type="submit"
            disabled={!whatsappNumber}
            className="flex w-full items-center justify-center gap-2 bg-[#d91e05] px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-[#b91803] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-[14px]"
          >
            KIRIM PERMINTAAN
            <Send size={16} />
          </button>

          {!whatsappNumber && (
            <p className="text-[12px] text-[#8b7772]">
              Nomor WhatsApp belum diatur di pengaturan situs.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
