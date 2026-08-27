import Link from "next/link";
export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <p className="mb-8 text-sm text-[#777]">
          Terakhir diperbarui: 26 Agustus 2026
        </p>

        <div className="space-y-6 text-sm leading-7 text-[#555]">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              1. Penggunaan Website
            </h2>
            <p>
              Website ini disediakan sebagai media informasi mengenai layanan
              CV. Prima Jaya Mandiri, termasuk layanan service AC dan instalasi
              listrik.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              2. Informasi Layanan
            </h2>
            <p>
              Kami berusaha memberikan informasi layanan secara akurat dan
              terbaru. Namun, harga, ketersediaan layanan, jadwal, dan detail
              pekerjaan dapat berubah sesuai kondisi di lapangan.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              3. Permintaan Layanan
            </h2>
            <p>
              Pengiriman permintaan layanan melalui website atau media
              komunikasi lainnya tidak otomatis dianggap sebagai konfirmasi
              pemesanan. Pemesanan dianggap disetujui setelah mendapatkan
              konfirmasi dari CV. Prima Jaya Mandiri.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              4. Harga dan Pembayaran
            </h2>
            <p>
              Harga layanan dapat berbeda tergantung jenis pekerjaan, kondisi
              perangkat, lokasi, material yang digunakan, dan kebutuhan
              pekerjaan lainnya.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              5. Hak Kekayaan Intelektual
            </h2>
            <p>
              Seluruh konten yang terdapat pada website, termasuk logo, gambar,
              desain, teks, dan elemen lainnya merupakan milik CV. Prima Jaya
              Mandiri atau digunakan dengan izin yang sesuai.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              6. Perubahan Ketentuan
            </h2>
            <p>
              CV. Prima Jaya Mandiri dapat mengubah atau memperbarui Terms of
              Service ini dari waktu ke waktu.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-[#222]">
              7. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Terms of Service, silakan
              hubungi CV. Prima Jaya Mandiri melalui informasi kontak yang
              tersedia pada website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}