import { Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { TrustBar } from "@/sections/TrustBar";
import { FeaturesBar } from "@/sections/FeaturesBar";
import { DigitalBanner } from "@/sections/DigitalBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesBar />
      <HowWeWork />
      <Specialties />
      <TrustBar />
      {/*<DigitalBanner />*/}
    </main>
  );
}
