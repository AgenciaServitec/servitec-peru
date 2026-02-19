import SpecialtyDetailLayout from "@/components/SpecialtyDetailLayout";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpecialtiesTypes({ params }: PageProps) {
  const { slug } = await params;

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
