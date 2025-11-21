import { moreServices } from "@/data-list";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function findSubtype(subtype: string) {
  for (const service of moreServices) {
    if (!service.subtype) continue;
    const found = service.subtype.find((s) => s.subtype === subtype);
    if (found) return found;
  }
  return null;
}

export default async function OtherService(props: {
  params: Promise<{ subtype: string }>;
}) {
  const { subtype } = await props.params;

  const selectedSub = findSubtype(subtype);
  if (!selectedSub) notFound();

  const similarServices = moreServices
    .flatMap((service) => service.subtype || [])
    .filter((s) => s.subtype !== subtype);

  return (
    <section className="relative w-full px-6 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-white border-2 border-dashed border-yellow-500 rounded-xl p-6">
        <div className="mb-6">
          <div className="bg-yellow-500 text-black font-semibold text-xl px-4 py-2 w-fit">
            Servicios similares
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {similarServices.map((item) => (
            <Link
              key={item.subtype}
              href={`/service/${item.subtype}`}
              className="flex gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
