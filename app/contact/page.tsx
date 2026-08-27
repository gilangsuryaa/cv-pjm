"use client";

import {
  MapPin,
  Phone,
  UserRoundCog,
  Send,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const whatsappNumber = "6281949532643";

export default function ContactPage() {
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

Saya ingin mengajukan konsultasi teknis.

Nama / Perusahaan: ${name}
WhatsApp: ${whatsapp}
Layanan: ${service}

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
      <section className="border-b border-[#bfe8f8] bg-white px-4 py-10 text-center sm:px-6 sm:py-12">
        <h1 className="text-[48px] font-bold tracking-tight text-[#0788D1]">
          Technical Consultation
        </h1>

        <p className="mx-auto mt-2 max-w-[650px] text-[18px] leading-7 text-[#654f4a]">
          Expert engineering support for AC maintenance, electrical systems,
          and industrial electronics. Connect with our specialists in Cirebon.
        </p>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1200px] px-8 py-12">
        <div className="grid grid-cols-[466px_1fr] gap-12">

          {/* LEFT */}
          <div className="space-y-4">

            {/* HEADQUARTERS */}
            <div className="border border-[#bfe8f8] bg-white p-4">
              <div className="flex gap-4">
                <div className="flex h-[42px] w-[34px] items-center justify-center bg-[#f1eeee]">
                  <MapPin
                    size={21}
                    fill="#d91e05"
                    className="text-[#d91e05]"
                  />
                </div>

                <div>
                  <h2 className="text-[20px] font-semibold text-[#0788D1]">
                    Headquarters
                  </h2>

                  <p className="mt-2 text-[16px] leading-6 text-[#654f4a]">
                    Losari Kidul
                    <br />
                    Cirebon, West Java
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="border border-[#bfe8f8] bg-white p-4">
              <div className="flex gap-4">
                <div className="flex h-[42px] w-[34px] items-center justify-center bg-[#f1eeee]">
                  <Phone
                    size={21}
                    fill="#d91e05"
                    className="text-[#d91e05]"
                  />
                </div>

                <div>
                  <h2 className="text-[20px] font-semibold text-[#0788D1]">
                    Phone Support
                  </h2>

                  <p className="mt-2 text-[16px] text-[#654f4a]">
                    (0231) 831597
                  </p>

                  <p className="mt-1 text-[14px] text-[#806d68]">
                    Mon-Fri, 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>
            </div>

                    {/* GOOGLE MAP */}
        <div className="mt-8 h-[255px] overflow-hidden border border-[#bfe8f8]">
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

          {/* RIGHT - FORM */}
          <div className="border border-[#bfe8f8] bg-white p-8">

            <div className="flex items-center gap-3">
              <UserRoundCog
                size={22}
                className="text-[#d91e05]"
              />

              <h2 className="text-[25px] font-semibold text-[#0788D1]">
                Request Technical Support
              </h2>
            </div>

            <p className="mt-3 text-[16px] leading-6 text-[#654f4a]">
              Provide details about your infrastructure needs for an accurate
              initial assessment.
            </p>

            <div className="mt-4 border-t border-[#bfe8f8]" />

            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              {/* NAME + WHATSAPP */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[14px] font-semibold"
                  >
                    Full Name / Company
                  </label>

                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[14px] outline-none focus:border-[#0788D1]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-2 block text-[14px] font-semibold"
                  >
                    WhatsApp Number
                  </label>

                  <input
                    id="whatsapp"
                    name="whatsapp"
                    required
                    type="tel"
                    className="h-[42px] w-full border border-[#d4d4d4] px-3 text-[14px] outline-none focus:border-[#0788D1]"
                  />
                </div>

              </div>

              {/* SERVICE */}
              <div className="mt-4">
                <label
                  htmlFor="service"
                  className="mb-2 block text-[14px] font-semibold"
                >
                  Primary Service Required
                </label>

                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="h-[42px] w-full border border-[#d4d4d4] bg-white px-3 text-[14px] outline-none focus:border-[#0788D1]"
                >
                  <option value="" disabled>
                    Select technical domain...
                  </option>

                  <option value="AC Maintenance">
                    AC Maintenance
                  </option>

                  <option value="Electrical Systems">
                    Electrical Systems
                  </option>

                  <option value="Industrial Electronics">
                    Industrial Electronics
                  </option>

                  <option value="AC Installation">
                    AC Installation
                  </option>

                  <option value="Electrical Installation">
                    Electrical Installation
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="mb-2 block text-[14px] font-semibold"
                >
                  Technical Specifications / Issue Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  className="w-full resize-none border border-[#d4d4d4] px-3 py-3 text-[14px] outline-none focus:border-[#0788D1]"
                />
              </div>

              {/* SUBMIT */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#d91e05] px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-[#b91803]"
                >
                  SUBMIT REQUEST
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