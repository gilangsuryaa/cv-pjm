// Komponen tipis untuk menyisipkan structured data. PEMANGGIL yang merangkai
// objeknya, karena tiap halaman punya skema berbeda (LocalBusiness,
// Service, Product, FAQPage, BreadcrumbList).
//
// `<` di-escape supaya isi teks dari database tidak bisa menutup tag script.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
