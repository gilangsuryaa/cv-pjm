import Image from "next/image";

export default function Navbar() {
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
        <div className="flex items-center gap-[22px] text-[10px] font-medium">
          <a
            href="/"
            className="border-b border-[#d91e05] pb-[6px] text-[#d91e05]"
          >
            Home
          </a>

          <a href="about" className="text-[#222] hover:text-[#d91e05]">
            About Us
          </a>

          <a href="#services" className="text-[#222] hover:text-[#d91e05]">
            Services
          </a>

          <a href="#products" className="text-[#222] hover:text-[#d91e05]">
            Products
          </a>

          <a href="#portfolio" className="text-[#222] hover:text-[#d91e05]">
            Portfolio
          </a>

          <a href="#contact" className="text-[#222] hover:text-[#d91e05]">
            Contact
          </a>
        </div>

        {/* WhatsApp */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#d91e05] px-[14px] py-[6px] text-[9px] font-semibold text-white"
        >
          💬 WhatsApp CTA
        </a>

      </div>
    </nav>
  );
}