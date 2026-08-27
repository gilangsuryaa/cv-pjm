"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isServices = pathname === "/services";
  const isProducts = pathname === "/products";
  const isContact = pathname === "/contact";

  const whatsappMessage =
    "Halo CV Prima Jaya Mandiri, Saya Mau Konsultasi";

  const whatsappUrl = `https://wa.me/6281949532643?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const navClass = (active: boolean) =>
    active
      ? "border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
      : "text-[#222] transition hover:text-[#d91e05]";

  return (
    <nav className="border-b border-[#e5cfc8] bg-white">
      <div className="mx-auto flex min-h-[57px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="PJM Logo"
            width={45}
            height={45}
            className="h-[45px] w-[45px] object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-[13px] font-medium md:flex lg:gap-7">

          <a href="/" className={navClass(isHome)}>
            Home
          </a>

          <a href="/about" className={navClass(isAbout)}>
            About Us
          </a>

          <a href="/services" className={navClass(isServices)}>
            Services
          </a>

          <a href="/products" className={navClass(isProducts)}>
            Products
          </a>

          <a
            href="/#portfolio"
            className="text-[#222] transition hover:text-[#d91e05]"
          >
            Portfolio
          </a>

          <a href="/contact" className={navClass(isContact)}>
            Contact
          </a>
        </div>

        {/* Desktop WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 bg-[#d91e05] px-[14px] py-[6px] text-[9px] font-semibold text-white transition hover:bg-[#b91803] md:flex"
        >
          <FaWhatsapp size={13} />
          WhatsApp CTA
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2 text-[#222] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#e5cfc8] bg-white px-4 py-4 md:hidden">

          <div className="flex flex-col gap-1 text-[14px] font-medium">

            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              Home
            </a>

            <a
              href="/about"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              About Us
            </a>

            <a
              href="/services"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              Services
            </a>

            <a
              href="/products"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              Products
            </a>

            <a
              href="/#portfolio"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              Portfolio
            </a>

            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-3"
            >
              Contact
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#d91e05] py-3 text-white"
            >
              <FaWhatsapp size={17} />
              WhatsApp CTA
            </a>

          </div>
        </div>
      )}
    </nav>
  );
}