"use client";

import {
  MapPin,
  Phone,
  UserRoundCog,
  Send,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const whatsappNumber = "6281949532643";

export default function ContactPage() {
  const searchParams = useSearchParams();

  // Ambil layanan dari URL
  const serviceFromUrl = searchParams.get("service") || "";

  // State layanan agar dropdown bisa diubah manual
  const [selectedService, setSelectedService] = useState(serviceFromUrl);

  // Update layanan jika parameter URL berubah
  useEffect(() => {
    setSelectedService(serviceFromUrl);
  }, [serviceFromUrl]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value;

    const whatsapp = (
      form.elements.namedItem("whatsapp") as HTMLInputElement
    ).value;

    const service = (
      form.elements.namedItem("service") as HTMLSelectElement
    ).value;

    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;

    const message = `Halo CV Prima Jaya Mandiri,

Saya ingin mengajukan konsultasi.

Nama / Perusahaan: ${name}
Nomor WhatsApp: ${whatsapp}
Layanan yang Dibutuhkan: ${service}

Detail kebutuhan / masalah:
${description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#bfe8f8] bg-white px-5 py-10 text-center sm:px-8 sm:py-14">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0788D1] sm:text-[48px]">
          Konsultasi Teknis
        </h1>

        <p className="mx-auto mt-3 max-w-[650px] text-[14px] leading-6 text-[#654f4a] sm:text-[18px] sm:leading-7">
          Dapatkan dukungan teknis profesional untuk perawatan AC, sistem
          kelistrikan, dan elektronik industri. Hubungi tim kami untuk
          mendapatkan solusi sesuai kebutuhan Anda.
        </p>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[466px_1fr] lg:gap-12">
          {/* BAGIAN KIRI */}
          <div className="space-y-4">
            {/* ALAMAT */}
            <div className="border border-[#bfe8f8] bg-white p-4">
              <div className="flex gap-4">
                <div className="flex h-[42px] w-[34px] shrink-0 items-center justify-center bg-[#f1eeee]">
                  <MapPin
                    size={21}
                    fill="#d91e05"
                    className="text-[#d91e05]"
                  />
                </div>

                <div>
                  <h2 className="text-[18px] font-semibold text-[#0788D1] sm:text-[20px]">
                    Kantor Pusat
                  </h2>

                  <p className="mt-2 text-[14px] leading-6 text-[#654f4a] sm:text-[16px]">
                    Losari Kidul
                    <br />
                    Cirebon, Jawa Barat
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* TELEPON */}
            <div className="border border-[#bfe8f8] bg-white p-4">
              <div className="flex gap-4">
                <div className="flex h-[42px] w-[34px] shrink-0 items-center justify-center bg-[#f1eeee]">
                  <Phone
                    size={21}
                    fill="#d91e05"
                    className="text-[#d91e05]"
                  />
                </div>

                <div>
                  <h2 className="text-[18px] font-semibold text-[#0788D1] sm:text-[20px]">
                    Layanan Telepon
                  </h2>

                  <p className="mt-2 text-[14px] text-[#654f4a] sm:text-[16px]">
                    (0231) 831597
                  </p>

                  <p className="mt-1 text-[12px] text-[#806d68] sm:text-[14px]">
                    Senin–Jumat, 08.00–17.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* GOOGLE MAP */}
            <div className="h-[220px] overflow-hidden border border-[#bfe8f8] sm:h-[255px]">
              <iframe
                src="https://www.google.com/maps?q=-6.8463066,108.8097641&z=18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="border border-[#bfe8f8] bg-white p-5 sm:p-8">
            <div className="flex items-start gap-3">
              <UserRoundCog
                size={22}
                className="mt-1 shrink-0 text-[#d91e05]"
              />

              <h2 className="text-[21px] font-semibold leading-7 text-[#0788D1] sm:text-[25px]">
                Ajukan Konsultasi
              </h2>
            </div>

            <p className="mt-3 text-[13px] leading-6 text-[#654f4a] sm:text-[16px]">
              Berikan informasi mengenai kebutuhan atau masalah Anda agar kami
              dapat memberikan solusi yang sesuai.
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
                    className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[13px] outline-none focus:border-[#0788D1] sm:text-[14px]"
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
                    className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[13px] outline-none focus:border-[#0788D1] sm:text-[14px]"
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
                  className="h-[42px] w-full border border-[#d4d4d4] bg-white px-3 text-[13px] outline-none focus:border-[#0788D1] sm:text-[14px]"
                >
                  <option value="" disabled>
                    Pilih jenis layanan...
                  </option>

                  <option value="Perawatan AC">Perawatan AC</option>

                  <option value="Instalasi AC">Instalasi AC</option>

                  <option value="Instalasi Listrik">
                    Instalasi Listrik
                  </option>

                  <option value="Sistem Kelistrikan">
                    Sistem Kelistrikan
                  </option>

                  <option value="Elektronik Industri">
                    Elektronik Industri
                  </option>

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
                  className="w-full resize-none border border-[#d4d4d4] px-3 py-3 text-[13px] outline-none focus:border-[#0788D1] sm:text-[14px]"
                />
              </div>

              {/* SUBMIT */}
              <div className="mt-6 flex justify-stretch sm:justify-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-[#d91e05] px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-[#b91803] sm:w-auto sm:text-[14px]"
                >
                  KIRIM PERMINTAAN
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}