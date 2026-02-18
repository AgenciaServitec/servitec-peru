import { Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { TrustBar } from "@/sections/TrustBar";
import { FeaturesBar } from "@/sections/FeaturesBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesBar />
      <HowWeWork />
      <Specialties />
      <TrustBar />
    </main>
  );
}
