"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarClientProps = {
  companyName: string;
  tagline: string;
  logoUrl: string;
  whatsappUrl: string | null;
};

export default function NavbarClient({
  companyName,
  tagline,
  logoUrl,
  whatsappUrl,
}: NavbarClientProps) {
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

  const navClass = (active: boolean) =>
    active
      ? "border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
      : "text-[#222] transition hover:text-[#d91e05]";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e5cfc8] bg-white">
      <div className="mx-auto flex min-h-[57px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo + Nama Perusahaan */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={logoUrl}
            alt={`Logo ${companyName}`}
            unoptimized={logoUrl.startsWith("http")}
            width={56}
            height={56}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          <div className="leading-tight">
            <p className="text-[14px] font-bold text-[#0788D1] sm:text-[16px]">
              {companyName}
            </p>

            <p className="text-[10px] text-[#777] sm:text-[11px]">
              {tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-[13px] font-medium md:flex lg:gap-7">

          <Link href="/" className={navClass(isHome)}>
            Beranda
          </Link>

          <Link href="/about" className={navClass(isAbout)}>
            Tentang Kami
          </Link>

          <Link href="/services" className={navClass(isServices)}>
            Layanan
          </Link>

          <Link href="/products" className={navClass(isProducts)}>
            Produk
          </Link>

          <Link href="/#portfolio"
            className={navClass(isPortfolio)}
          >
            Portofolio
          </Link>

          <Link href="/contact" className={navClass(isContact)}>
            Kontak
          </Link>
        </div>

        {/* Desktop WhatsApp */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 bg-[#d91e05] px-[14px] py-[6px] text-[9px] font-semibold text-white transition hover:bg-[#b91803] md:flex"
          >
            <FaWhatsapp size={13} />
            Konsultasi via WhatsApp
          </a>
        )}

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

            <Link href="/"
              onClick={closeMenu}
              className={`py-3 ${
                isHome ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Beranda
            </Link>

            <Link href="/about"
              onClick={closeMenu}
              className={`py-3 ${
                isAbout ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Tentang Kami
            </Link>

            <Link href="/services"
              onClick={closeMenu}
              className={`py-3 ${
                isServices ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Layanan
            </Link>

            <Link href="/products"
              onClick={closeMenu}
              className={`py-3 ${
                isProducts ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Produk
            </Link>

            <Link href="/#portfolio"
              onClick={closeMenu}
              className={`py-3 ${
                isPortfolio ? "text-[#d91e05] border-b border-[#d91e05]" : "text-[#222]"
              }`}
            >
              Portofolio
            </Link>

            <Link href="/contact"
              onClick={closeMenu}
              className={`py-3 ${
                isContact ? "text-[#d91e05]" : "text-[#222]"
              }`}
            >
              Kontak
            </Link>

            {/* WhatsApp Mobile */}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-[#d91e05] py-3 text-white"
              >
                <FaWhatsapp size={17} />
                Konsultasi via WhatsApp
              </a>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}