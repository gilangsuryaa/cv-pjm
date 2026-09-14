import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsClient, { type ProductCard } from "./ProductsClient";
import {
  formatRupiah,
  getProducts,
  getProductSpecs,
} from "@/lib/data/products";
import { buildWhatsappUrl, getSiteSettings } from "@/lib/data/site-settings";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const [{ category }, products, settings] = await Promise.all([
    searchParams,
    getProducts(),
    getSiteSettings(),
  ]);

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";

  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter((value): value is string => Boolean(value))
    ),
  ].sort((a, b) => a.localeCompare(b, "id"));

  // Kategori dari URL dicocokkan tanpa memperhatikan huruf besar/kecil.
  const activeCategory =
    categories.find(
      (item) => item.toLowerCase() === category?.trim().toLowerCase()
    ) ?? null;

  const visibleProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  const cards: ProductCard[] = visibleProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: formatRupiah(product.price),
    priceValue: product.price,
    inStock: product.stock_status !== false,
    imageUrl: product.images[0] ?? null,
    specs: getProductSpecs(product),
    whatsappUrl: buildWhatsappUrl(
      settings.whatsapp,
      `Halo ${companyName}, Saya mau konsultasi mengenai produk ${product.name}.`
    ),
    createdAt: product.created_at,
  }));

  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#292525]">
      <Navbar />

      <ProductsClient
        products={cards}
        categories={categories}
        activeCategory={activeCategory}
        heading={activeCategory ?? "Semua Produk"}
      />

      <Footer />
    </main>
  );
}
