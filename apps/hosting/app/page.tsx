import { Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { FeaturesBar } from "@/sections/FeaturesBar";
import { ContentWidth } from "@/components/ContentWidth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-black py-10">
        <Link href="/solicitud-de-servicio-app-movil">
          <ContentWidth>
            <div className="relative w-full overflow-hidden rounded-lg shadow shadow-primary/50">
              <Image
                src="/banner-service-request.png"
                alt="Banner de servicio técnico"
                width={1200}
                height={400}
                priority
                className="hidden md:block w-full h-auto object-cover"
              />

              <Image
                src="/banner-service-request-movil.png"
                alt="Banner de servicio técnico móvil"
                width={600}
                height={800}
                priority
                className="block md:hidden w-full h-auto object-cover"
              />
            </div>
          </ContentWidth>
        </Link>
      </div>
      <Specialties />
      <FeaturesBar />
      <HowWeWork />
    </main>
  );
}
