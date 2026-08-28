"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const [hash, setHash] = useState("");

useEffect(() => {
  const updateHash = () => {
    setHash(window.location.hash);
  };

  updateHash();

  window.addEventListener("hashchange", updateHash);

  return () => {
    window.removeEventListener("hashchange", updateHash);
  };
}, []);

const isPortfolio = pathname === "/" && hash === "#portfolio";

const isHome = pathname === "/" && !isPortfolio;
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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e5cfc8] bg-white">
      <div className="mx-auto flex min-h-[57px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo + Nama Perusahaan */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Logo CV. Prima Jaya Mandiri"
            width={56}
            height={56}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          <div className="leading-tight">
            <p className="text-[14px] font-bold text-[#0788D1] sm:text-[16px]">
              CV. Prima Jaya Mandiri
            </p>

            <p className="text-[10px] text-[#777] sm:text-[11px]">
              Layanan Teknik & Pemeliharaan
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-[13px] font-medium md:flex lg:gap-7">

          <a href="/" className={navClass(isHome)}>
            Beranda
          </a>

          <a href="/about" className={navClass(isAbout)}>
            Tentang Kami
          </a>

          <a href="/services" className={navClass(isServices)}>
            Layanan
          </a>

          <a href="/products" className={navClass(isProducts)}>
            Produk
          </a>

          <a
            href="/#portfolio"
            className={navClass(isPortfolio)}
          >
            Portofolio
          </a>

          <a href="/contact" className={navClass(isContact)}>
            Kontak
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
          Konsultasi via WhatsApp
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center p-2 text-[#222] md:hidden"
          aria-label="Buka menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#e5cfc8] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1 text-[14px] font-medium">

            <a
              href="/"
              onClick={closeMenu}
              className={`py-3 ${
                isHome ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Beranda
            </a>

            <a
              href="/about"
              onClick={closeMenu}
              className={`py-3 ${
                isAbout ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Tentang Kami
            </a>

            <a
              href="/services"
              onClick={closeMenu}
              className={`py-3 ${
                isServices ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Layanan
            </a>

            <a
              href="/products"
              onClick={closeMenu}
              className={`py-3 ${
                isProducts ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Produk
            </a>

            <a
              href="/#portfolio"
              onClick={closeMenu}
              className={`py-3 ${
                isPortfolio ? "text-[#d91e05] border-b border-[#d91e05]" : "text-[#222]"
              }`}
            >
              Portofolio
            </a>

            <a
              href="/contact"
              onClick={closeMenu}
              className={`py-3 ${
                isContact ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Kontak
            </a>

            {/* WhatsApp Mobile */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#d91e05] py-3 text-white"
            >
              <FaWhatsapp size={17} />
              Konsultasi via WhatsApp
            </a>

          </div>
        </div>
      )}
    </nav>
  );
}