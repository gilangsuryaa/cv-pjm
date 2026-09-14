import type { MetadataRoute } from "next";

// Menghasilkan /robots.txt. Panel admin dan route API dikecualikan supaya
// tidak ikut terindeks mesin pencari.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
  };
}
