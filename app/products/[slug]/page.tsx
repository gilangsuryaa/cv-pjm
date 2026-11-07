import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductDetailClient, {
  type ProductDetail,
} from "./ProductDetailClient";

import {
  formatRupiah,
  getProducts,
} from "@/lib/data/products";

import {
  buildWhatsappUrl,
  getSiteSettings,
} from "@/lib/data/site-settings";

import { getProduct, getProductIds } from "@/lib/data/seo-queries";

import { BRAND } from "@/lib/seo/site";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
} from "../../components/seo/StructuredData";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const productIds = await getProductIds();

  return productIds.map((id) => ({ slug: String(id) }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productId = Number(slug);

  if (!Number.isInteger(productId)) return {};

  const [product, settings] = await Promise.all([
    getProduct(productId),
    getSiteSettings(),
  ]);

  if (!product) return {};

  const companyName = settings.company_name ?? BRAND;
  const price = formatRupiah(product.price);

  const title = `${product.name} — Harga & Spesifikasi`;

  const description = [
    product.description?.split("\n").find((line) => line.trim()),
    `Jual ${product.name} di Cirebon dan Jogja.`,
    price ? `Harga ${price}.` : null,
    "Termasuk konsultasi pemilihan kapasitas dan layanan instalasi AC.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    description,
    keywords: [
      product.name,
      `jual ${product.name}`,
      `harga ${product.name}`,
      product.brand ? `ac ${product.brand}` : "jual ac",
      "jual ac cirebon",
      "jual ac jogja",
    ].filter((value): value is string => Boolean(value)),
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title,
      description,
      url: `/products/${product.id}`,
      images: product.image
        ? [{ url: product.image, alt: product.name }]
        : [{ url: "/images/Home/Hero3.jpg", alt: `Jual AC ${companyName}` }],
    },
  };
}

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
    BRAND;

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

      <ProductJsonLd
        settings={settings}
        product={{
          name: product.name,
          description: product.description,
          brand: product.brand,
          price: product.price,
          image: product.images[0] ?? null,
          inStock: product.stock_status !== false,
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Produk", path: "/products" },
          { name: product.name, path: `/products/${product.id}` },
        ]}
      />
    </main>
  );
}