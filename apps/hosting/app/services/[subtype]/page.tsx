import { ServicesList } from "@/data-list";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function findSubtype(subtype: string) {
  for (const service of ServicesList) {
    if (!service.subtype) continue;

    const found = service.subtype.find((s) => s.subtype === subtype);
    if (found) return found;
  }
  return null;
}

export default async function ServiceDetailPage(props: {
  params: Promise<{ subtype: string }>;
}) {
  const { subtype } = await props.params;

  const selectedSub = findSubtype(subtype);
  if (!selectedSub) notFound();

  return (
    <section
      className="relative w-full min-h-screen px-6 py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-12 text-center drop-shadow-lg tracking-wide">
          {selectedSub.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full flex justify-center">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src={selectedSub.image}
                alt={selectedSub.name}
                fill
                className="object-contain transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-200 text-lg leading-relaxed">
              {selectedSub.description ||
                "Próximamente más información sobre este servicio."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all text-center"
              >
                ← Volver a servicios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
