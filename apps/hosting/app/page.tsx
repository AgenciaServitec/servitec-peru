import { BusinessBoostBanner } from "@/sections/BusinessBoostBanner";
import { BrandsAndContact } from "@/sections/BrandsAndContact";
import { ServicesSection } from "@/sections";

export default function Home() {
  return (
    <main>
      <h2>COTENIDO PRINCIPAL</h2>
      <ServicesSection />
      <BusinessBoostBanner />
      <BrandsAndContact />
    </main>
  );
}
