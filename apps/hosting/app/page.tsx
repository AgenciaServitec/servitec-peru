import { Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { FeaturesBar } from "@/sections/FeaturesBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialties />
      <FeaturesBar />
      <HowWeWork />
    </main>
  );
}
