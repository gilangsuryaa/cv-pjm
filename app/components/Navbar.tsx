"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  const whatsappMessage =
    "Halo CV Prima Jaya Mandiri, Saya Mau Konsultasi";

  const whatsappUrl = `https://wa.me/6281949532643?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <nav className="h-[57px] border-b border-[#e5cfc8] bg-white">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-8">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="PJM Logo"
            width={45}
            height={45}
            className="object-contain"
          />
        </a>

        {/* Navigation */}
          <div className="flex items-center gap-7 text-[13px] font-medium">

            {/* Home */}
            <a
              href="/"
              className={
                isHome
                  ? "border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
                  : "text-[#222] hover:text-[#d91e05]"
              }
            >
              Home
            </a>

            {/* About Us */}
            <a
              href="/about"
              className={
                isAbout
                  ? "border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
                  : "text-[#222] hover:text-[#d91e05]"
              }
            >
              About Us
            </a>

            {/* Services */}
            <a
              href="/services"
              className={
                pathname === "/services"
                  ? "border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
                  : "text-[#222] hover:text-[#d91e05]"
              }
            >
              Services
            </a>

            <a
              href="/products"
              className="text-[#222] hover:text-[#d91e05]"
            >
              Products
            </a>

            <a
              href="/#portfolio"
              className="text-[#222] hover:text-[#d91e05]"
            >
              Portfolio
            </a>

            <a
              href="/contact"
              className="text-[#222] hover:text-[#d91e05]"
            >
              Contact
            </a>
          </div>
       {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#d91e05] px-[14px] py-[6px] text-[9px] font-semibold text-white transition hover:bg-[#b91803]"
          >
            <FaWhatsapp size={13} />
            WhatsApp CTA
          </a>

      </div>
    </nav>
  );
}