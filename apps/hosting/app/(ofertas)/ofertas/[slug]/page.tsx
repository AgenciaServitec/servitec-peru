import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PackEpson980wLanding from "./PackEpson980wLanding";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const VALID_SLUG = "pack-3-proyectores-epson-powerlite-980w";
const SITE_URL = "https://www.servitecperu.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.toLowerCase() !== VALID_SLUG) {
    return { title: "Oferta no encontrada | Servitec Perú" };
  }

  const pageUrl = `${SITE_URL}/ofertas/${VALID_SLUG}`;
  const title =
    "Pack 3 Proyectores Epson PowerLite 980W (3800 Lúmenes) | S/ 4,000 IGV Inc.";
  const description =
    "Promoción por 7 días: lleva 3 proyectores Epson PowerLite 980W WXGA 3LCD (Cód. V11H866020) a S/ 4,000.00 incluido IGV. Lámpara hasta 12,000h. Emitimos Factura o Boleta.";

  return {
    title,
    description,
    keywords: [
      "pack 3 proyectores epson 980w",
      "proyector epson powerlite 980w precio peru",
      "epson 980w 3800 lumenes",
      "proyectores para aulas lima",
      "V11H866020",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title:
        "PACK ×3: Proyectores Epson PowerLite 980W — S/ 4,000.00 (IGV Inc.)",
      description,
      url: pageUrl,
      siteName: "Servitec Perú",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: "/epson-980w-projector-banner.jpg",
          width: 1200,
          height: 630,
          alt: "Pack de 3 Proyectores Epson PowerLite 980W - Servitec Perú",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "PACK ×3: Proyectores Epson PowerLite 980W — S/ 4,000.00",
      description,
      images: ["/epson-980w-projector-banner.jpg"],
    },
  };
}

export default async function OfferPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  if (slug !== normalizedSlug) {
    permanentRedirect(`/ofertas/${normalizedSlug}`);
  }

  if (normalizedSlug !== VALID_SLUG) {
    notFound();
  }

  return <PackEpson980wLanding />;
}
