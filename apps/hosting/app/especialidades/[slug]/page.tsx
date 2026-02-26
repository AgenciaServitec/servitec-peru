import { Metadata } from "next";
import { notFound, redirect } from "next/navigation"; // Importamos redirect
import SpecialtyDetailLayout from "@/components/SpecialtyDetailLayout";
import { SPECIALTIES_DATA } from "@/data-list/specialties";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | null> {
  const { slug } = await params;

  if (slug === "contacto") return null;

  const specialty = SPECIALTIES_DATA.find((s) => s.slug === slug);
  if (!specialty) return { title: "Servicio Técnico | Servitec Perú" };

  const title = `${specialty.title} en Lima | Soporte Técnico Servitec`;
  const description = `${specialty.description} Especialistas en ${specialty.includes.join(", ").toLowerCase()}. Brindamos soporte profesional y repuestos de calidad.`;

  return {
    title: specialty.title + " | Servitec Perú",
    description: specialty.metaDescription,
    alternates: {
      canonical: `https://www.servitecperu.com/especialidades/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: specialty.ogImage }],
    },
  };
}

export default async function SpecialtiesTypes({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "contacto") {
    redirect("/contacto");
  }

  const specialty = SPECIALTIES_DATA.find((s) => s.slug === slug);

  if (!specialty) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RepairService",
    name: specialty.title,
    description: specialty.description,
    image: `https://www.servitecperu.com${specialty.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    priceRange: "$$",
    areaServed: "PE",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios Incluidos",
      itemListElement: specialty.includes.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Servitec Perú",
      telephone: "+51941801827",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpecialtyDetailLayout
        specialtyName={specialty.title}
        specialtyType={specialty.type}
      />
    </>
  );
}

export async function generateStaticParams() {
  return SPECIALTIES_DATA.filter((s) => s.slug !== "contacto").map((s) => ({
    slug: s.slug,
  }));
}
