import ServiceCoverageClient, {
  type CoverageBranch,
} from "./ServiceCoverageClient";
import { getSiteSettings } from "@/lib/data/site-settings";

// Alamat cabang di site_settings hanya berupa teks, jadi peta dibuat
// dari pencarian Google Maps berdasarkan alamat tersebut.
function buildFromAddress(address: string) {
  const query = address.replace(/\s+/g, " ").trim();

  return {
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      query
    )}&z=16&output=embed`,
  };
}

function buildFromMapsUrl(mapsUrl: string) {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get("q");

    if (!query) return null;

    return {
      mapUrl: mapsUrl,
      embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&z=18&output=embed`,
    };
  } catch {
    return null;
  }
}

export default async function ServiceCoverage() {
  const settings = await getSiteSettings();

  const companyName = settings.company_name ?? "CV. Prima Jaya Mandiri";
  const branches: CoverageBranch[] = [];

  if (settings.address) {
    const maps =
      (settings.maps_url ? buildFromMapsUrl(settings.maps_url) : null) ??
      buildFromAddress(settings.address);

    branches.push({
      id: "pusat",
      name: "Kantor Pusat",
      label: "Lokasi Utama",
      address: settings.address,
      ...maps,
    });
  }

  if (settings.branch) {
    branches.push({
      id: "cabang",
      name: "Kantor Cabang",
      label: "Cabang",
      address: settings.branch,
      ...buildFromAddress(settings.branch),
    });
  }

  if (branches.length === 0) return null;

  return (
    <ServiceCoverageClient companyName={companyName} branches={branches} />
  );
}
