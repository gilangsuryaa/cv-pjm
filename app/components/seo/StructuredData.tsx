import JsonLd from "@/app/components/JsonLd";
import {
  BRAND,
  SERVICE_AREAS,
  SERVICE_TYPES,
  SITE_URL,
  absoluteUrl,
  type ServiceArea,
} from "@/lib/seo/site";
import { formatPhoneHref, getSiteAssetUrl } from "@/lib/data/site-settings";
import type { SiteSettings } from "@/lib/data/site-settings";

// Rangkaian structured data. Dipisah per komponen supaya halaman bisa memilih
// skema yang relevan, bukan satu blok raksasa yang selalu ikut ke semua route.

type OfficeInput = Pick<
  SiteSettings,
  "address" | "branch" | "maps_url" | "updated_at"
>;

function offices(settings: OfficeInput) {
  const nodes: Record<string, unknown>[] = [];

  if (settings.address) {
    nodes.push({
      "@type": "Place",
      name: `${BRAND} - Kantor Pusat`,
      address: settings.address,
      ...(settings.maps_url ? { hasMap: settings.maps_url } : {}),
    });
  }

  if (settings.branch) {
    nodes.push({
      "@type": "Place",
      name: `${BRAND} - Kantor Cabang`,
      address: settings.branch,
    });
  }

  return nodes;
}

export function LocalBusinessJsonLd({ settings }: { settings: SiteSettings }) {
  const logoUrl = getSiteAssetUrl(settings.logo, settings.updated_at);
  const phoneHref = formatPhoneHref(settings.phone);

  const data = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: settings.company_name ?? BRAND,
    url: SITE_URL,
    description:
      settings.description?.split("\n").find((line) => line.trim()) ??
      "Jasa service AC, instalasi AC, penjualan AC, dan instalasi listrik.",
    ...(logoUrl ? { image: logoUrl } : {}),
    ...(phoneHref ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.instagram_url || settings.facebook_url
      ? {
          sameAs: [settings.instagram_url, settings.facebook_url].filter(
            Boolean
          ),
        }
      : {}),
    address: [settings.address, settings.branch]
      .filter(Boolean)
      .map((line) => ({ "@type": "PostalAddress", streetAddress: line })),
    location: offices(settings),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "AdministrativeArea", name: area.region },
    })),
    knowsAbout: SERVICE_TYPES.map((service) => service.name),
    makesOffer: SERVICE_TYPES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function ServicesJsonLd({
  services,
  settings,
  area,
}: {
  services: { name: string; description: string | null }[];
  settings: SiteSettings;
  area?: ServiceArea;
}) {
  if (services.length === 0) return null;

  const provider = {
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: settings.company_name ?? BRAND,
    ...(settings.address ? { address: settings.address } : {}),
  };

  const data = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: area ? `${service.name} ${area.city}` : service.name,
    serviceType: service.name,
    description: service.description ?? undefined,
    provider,
    url: area ? absoluteUrl(`/layanan/${area.slug}`) : absoluteUrl("/services"),
    areaServed: area
      ? {
          "@type": "City",
          name: area.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: area.region,
          },
        }
      : SERVICE_AREAS.map((item) => ({ "@type": "City", name: item.city })),
  }));

  return <JsonLd data={data} />;
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function ProductJsonLd({
  product,
  settings,
}: {
  product: {
    name: string;
    description: string | null;
    brand: string | null;
    price: number | null;
    image: string | null;
    inStock: boolean;
  };
  settings: SiteSettings;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.description ? { description: product.description } : {}),
    ...(product.brand
      ? { brand: { "@type": "Brand", name: product.brand } }
      : {}),
    ...(product.image ? { image: product.image } : {}),
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/products"),
      priceCurrency: "IDR",
      ...(product.price !== null ? { price: product.price } : {}),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "HVACBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: settings.company_name ?? BRAND,
      },
    },
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
