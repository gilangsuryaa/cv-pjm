"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer
      className={`border-t border-[#e5cfc8] bg-white transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-12">

        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.35fr_0.85fr_0.85fr] lg:gap-16">

          {/* Company */}
          <div className="lg:order-1">
            <div className="flex items-start gap-4">
              <a href="/" className="shrink-0" aria-label="CV.Prima Jaya Mandiri">
                <Image
                  src="/images/Logo.png"
                  alt="Logo CV. Prima Jaya Mandiri"
                  width={84}
                  height={84}
                  className="h-[68px] w-[68px] object-contain sm:h-[76px] sm:w-[76px]"
                />
              </a>

              <div className="pt-1">
                <a
                  href="/"
                  className="text-[15px] font-bold text-[#0788D1] hover:text-[#D91E05]"
                >
                  CV.Prima Jaya Mandiri
                </a>

                <p className="mt-3 max-w-[260px] text-[13px] leading-5.5 text-[#666]">
                  Solusi terpercaya untuk kebutuhan AC, mulai dari pembelian unit,
                  instalasi, perawatan, hingga perbaikan. Kami juga melayani
                  kebutuhan instalasi dan perawatan kelistrikan.
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:order-3">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Layanan
            </h3>

            <div className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#666]">

              <a
                href="/services"
                className="hover:text-[#D91E05]"
              >
                Pembelian Unit AC
              </a>

              <a
                href="/services"
                className="hover:text-[#D91E05]"
              >
                Instalasi AC
              </a>

              <a
                href="/services"
                className="hover:text-[#D91E05]"
              >
                Service & Perawatan AC
              </a>

              <a
                href="/services"
                className="hover:text-[#D91E05]"
              >
                Instalasi & Perawatan Listrik
              </a>

            </div>
          </div>

          {/* Company Links */}
          <div className="lg:order-4">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Perusahaan
            </h3>

            <div className="mt-3.5 flex flex-col gap-2 text-[13px] text-[#666]">

              <a
                href="/about"
                className="hover:text-[#D91E05]"
              >
                Tentang Kami
              </a>

              <a
                href="/#portfolio"
                className="hover:text-[#D91E05]"
              >
                Portofolio
              </a>

              <a
                href="/contact"
                className="hover:text-[#D91E05]"
              >
                Hubungi Kami
              </a>

            </div>
          </div>

          {/* Contact */}
          <div className="lg:order-2">
            <h3 className="text-[15px] font-bold text-[#0788D1]">
              Kontak
            </h3>

            <div className="mt-3.5 flex flex-col gap-2.5 text-[13px] leading-5.5 text-[#666]">

              {/* Address */}
              <a
                href="https://www.google.com/maps/place/6%C2%B050'46.7%22S+108%C2%B048'35.2%22E/@-6.8457873,108.8089594,19z/data=!4m4!3m3!8m2!3d-6.8463066!4d108.8097641?hl=id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:text-[#D91E05]"
              >
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  Jl. Pakuwon No. 50, Dusun Karangtangsi RT. 08/RW. 03,
                  Desa Losari Kidul, Kecamatan Losari,
                  <br />
                  Kabupaten Cirebon, Jawa Barat, 45192
                </p>
              </a>

              {/* Phone */}
              <a
                href="tel:0231831597"
                className="flex items-center gap-2 hover:text-[#D91E05]"
              >
                <Phone size={15} />
                <p>(0231) 831597</p>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281949532643?text=Halo%20CV%20Prima%20Jaya%20Mandiri%2C%20Saya%20Mau%20Konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D91E05]"
              >
                <FaWhatsapp size={16} />
                <p>+62 819-4953-2643</p>
              </a>

              {/* Email */}
              <a
                href="mailto:primajayamandiricv123@gmail.com"
                className="flex items-center gap-2 hover:text-[#D91E05]"
              >
                <Mail size={15} />
                <p>primajayamandiricv123@gmail.com</p>
              </a>

            </div>
          </div>
        </div>

      </div>

      <div className="bg-[#123b58]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 text-[11px] text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">

          <p>
            © {new Date().getFullYear()} CV. Prima Jaya Mandiri. Hak cipta dilindungi.
          </p>

          <div className="flex gap-5">

            <a
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Kebijakan Privasi
            </a>

            <a
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Syarat & Ketentuan
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
}