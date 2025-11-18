import { BusinessBoostBanner } from "@/sections/BusinessBoostBanner";
import { BrandsAndContact } from "@/sections/BrandsAndContact";
import { ServicesSection } from "@/sections";
import { CarouselSection } from "@/sections/CarouselSection";

export default function Home() {
  return (
    <main>
      <h2>COTENIDO PRINCIPAL</h2>
      <CarouselSection />
      <ServicesSection />
      <BusinessBoostBanner />
      <BrandsAndContact />
    </main>
  );
}
