import { notFound } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductDetailClient, {
  type ProductDetail,
} from "./ProductDetailClient";

import {
  getProducts,
} from "@/lib/data/products";

import {
  buildWhatsappUrl,
  getSiteSettings,
} from "@/lib/data/site-settings";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  const product = products.find(
    (item) => String(item.id) === slug
  );

  if (!product) {
    notFound();
  }

  const recommendations = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const companyName =
    settings.company_name ??
    "CV. Prima Jaya Mandiri";

  const whatsappUrl = buildWhatsappUrl(
    settings.whatsapp,
    `Halo ${companyName}, Saya mau konsultasi mengenai produk ${product.name}.`
  );

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      <ProductDetailClient
        product={product as ProductDetail}
        recommendations={
          recommendations as ProductDetail[]
        }
        whatsappUrl={whatsappUrl}
      />

      <Footer />
    </main>
  );
}