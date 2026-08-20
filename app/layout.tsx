import './globals.css';
import ChatWidget from '@/components/ChatWidget';

export const metadata = {
  title: 'Toko Elektronik & Layanan AC',
  description: 'Situs resmi penjualan elektronik dan layanan pemeliharaan AC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-gray-100">
        {/* Konten Halaman Utama */}
        {children}

        {/* Chatbot Popup Melayang di Kanan Bawah */}
        <ChatWidget />
      </body>
    </html>
  );
}