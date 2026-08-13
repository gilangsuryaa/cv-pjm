import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#e5cfc8] bg-white"
    >
      <div className="mx-auto max-w-[1200px] px-8 py-10">

        {/* Footer Content */}
        <div className="grid grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-bold text-[#0788D1]">
              PJM
            </h3>

            <p className="mt-4 max-w-[220px] text-[10px] leading-5 text-[#666]">
              Solusi terpercaya untuk kebutuhan AC, Listrik, dan Elektronik.
              Melayani dengan profesionalisme dan integritas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-bold text-[#0788D1]">
              Layanan
            </h3>

            <div className="mt-4 flex flex-col gap-2 text-[10px] text-[#666]">
              <a
                href="#services"
                className="hover:text-[#D91E05]"
              >
                Service AC
              </a>

              <a
                href="#services"
                className="hover:text-[#D91E05]"
              >
                Instalasi Listrik
              </a>

              <a
                href="#services"
                className="hover:text-[#D91E05]"
              >
                Perbaikan Elektronik
              </a>

              <a
                href="#services"
                className="hover:text-[#D91E05]"
              >
                Kontrak Maintenance
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[11px] font-bold text-[#0788D1]">
              Perusahaan
            </h3>

            <div className="mt-4 flex flex-col gap-2 text-[10px] text-[#666]">
              <a
                href="#about"
                className="hover:text-[#D91E05]"
              >
                Tentang Kami
              </a>

              <a
                href="#portfolio"
                className="hover:text-[#D91E05]"
              >
                Portfolio
              </a>

              <a
                href="#"
                className="hover:text-[#D91E05]"
              >
                Karir
              </a>

              <a
                href="#contact"
                className="hover:text-[#D91E05]"
              >
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold text-[#0788D1]">
              Kontak
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[10px] leading-5 text-[#666]">

              {/* Address */}
              <div className="flex gap-2">
                <MapPin
                  size={13}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  Jl. Pakuwon Dusun Karangtangsi RT.08/RW.03, Losari Kidul, Kec.Losari Kab.Cirebon
                  <br />
                  Provinsi Jawa Barat Kode Pos   45192
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone size={13} />

                <p>
                  (0231) 831597
                </p>
              </div>
              {/* WhatsApp */}
              <div className="flex items-center gap-2">
                <Phone size={13} />

                <p>
                  +62 819-4953-2643
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail size={13} />

                <p>
                  info@pjm-teknik.com
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[#eeeeee] pt-5 text-[9px] text-[#777]">

          <p>
            © 2024 CV. Prima Jaya Mandiri. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-[#D91E05]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-[#D91E05]"
            >
              Terms of Service
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}