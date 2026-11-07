import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

// Menghasilkan /robots.txt. Panel admin dan route API dikecualikan supaya
// tidak ikut terindeks mesin pencari. `host` + Sitemap membantu Google
// menemukan peta situs tanpa perlu submit ulang di Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
