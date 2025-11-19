import { BusinessBoostBanner } from "@/sections/BusinessBoostBanner";
import { NewsLetterSection } from "@/sections/NewsLetterSection";
import { ServicesSection } from "@/sections";
import { CarouselSection } from "@/sections/CarouselSection";
import { BrandsSection } from "@/sections/BrandsSection";

export default function Home() {
  return (
    <main>
      <CarouselSection />
      <ServicesSection />
      <BusinessBoostBanner />
      <NewsLetterSection />
      <BrandsSection />
    </main>
  );
}
