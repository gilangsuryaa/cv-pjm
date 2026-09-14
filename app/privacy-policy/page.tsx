import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl">

        {/* Tombol Kembali */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#777] transition hover:text-[#D91E05]"
        >
          ← Kembali
        </Link>

        <h1 className="mb-3 text-3xl font-bold text-[#222]">
          Kebijakan Privasi
        </h1>

        <p className="mb-8 text-sm text-[#777]">
          Terakhir diperbarui: 26 Agustus 2026
        </p>

        <div className="space-y-6 text-sm leading-7 text-[#555]">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Kami dapat memperoleh informasi yang diberikan secara langsung
              oleh pengguna ketika menggunakan layanan atau menghubungi kami
              melalui website, seperti nama, nomor telepon atau WhatsApp,
              alamat atau lokasi pemasangan, serta informasi mengenai
              kebutuhan layanan.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              2. Penggunaan Informasi
            </h2>
            <p>
              Informasi yang diberikan dapat digunakan untuk merespons
              pertanyaan, menghubungi pelanggan, memberikan informasi layanan,
              menjadwalkan kunjungan teknisi, dan meningkatkan kualitas
              layanan.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              3. Perlindungan Informasi
            </h2>
            <p>
              CV. Prima Jaya Mandiri berupaya menjaga informasi pengguna agar
              tidak digunakan, diakses, atau disebarluaskan secara tidak
              semestinya.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              4. Pembagian Informasi
            </h2>
            <p>
              Kami tidak menjual atau menyewakan informasi pribadi pengguna
              kepada pihak lain. Informasi hanya dapat dibagikan apabila
              diperlukan untuk memberikan layanan atau diwajibkan oleh hukum.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              5. Perubahan Kebijakan Privasi
            </h2>
            <p>
              Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu untuk
              menyesuaikan dengan perubahan layanan atau fitur website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              6. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
              silakan hubungi CV. Prima Jaya Mandiri melalui kontak yang
              tersedia pada website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}