import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";
import { getAlbums } from "@/lib/data/albums";
import { getProducts } from "@/lib/data/products";

// Menghasilkan /sitemap.xml. Produk dan album diambil dari database supaya
// halaman detail ikut terdaftar tanpa perlu didaftarkan manual di Search
// Console setiap kali ada konten baru.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, albums] = await Promise.all([
    getProducts(),
    getAlbums(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { path: "/", changeFrequency: "weekly", priority: 1 },
      { path: "/layanan/cirebon", changeFrequency: "weekly", priority: 0.95 },
      { path: "/layanan/jogja", changeFrequency: "weekly", priority: 0.95 },
      { path: "/services", changeFrequency: "monthly", priority: 0.9 },
      { path: "/products", changeFrequency: "weekly", priority: 0.8 },
      { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
      { path: "/about", changeFrequency: "monthly", priority: 0.7 },
      { path: "/album", changeFrequency: "weekly", priority: 0.6 },
      { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
      { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    ] as const
  ).map(({ path, ...rest }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    ...rest,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.id}`),
    lastModified: product.created_at ?? now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const albumPages: MetadataRoute.Sitemap = albums.map((album) => ({
    url: absoluteUrl(`/album/${album.id}`),
    lastModified: album.project_date ?? now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Halaman wilayah sudah tercantum di staticPages.
  return [...staticPages, ...productPages, ...albumPages];
}
