// app/especialidades/[slug]/page.tsx
import SpecialtyDetailLayout from "@/components/SpecialtyDetailLayout";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { notFound } from "next/navigation";

// Definimos la interfaz para que Next.js sepa que params es una Promesa
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpecialtiesTypes({ params }: PageProps) {
  // 1. Esperamos a que la promesa de params se resuelva
  const { slug } = await params;

  // 2. Buscamos la especialidad usando el slug ya extraído
  const specialty = SPECIALTIES_DATA.find((s) => s.slug === slug);

  if (!specialty) {
    notFound();
  }

  return (
    <SpecialtyDetailLayout
      specialtyName={specialty.title}
      specialtyType={specialty.type}
    />
  );
}

export async function generateStaticParams() {
  return SPECIALTIES_DATA.map((s) => ({
    slug: s.slug,
  }));
}
