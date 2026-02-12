import { DigitalSolutions, Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { TrustBar } from "@/sections/TrustBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <HowWeWork />
      <Specialties />
      <DigitalSolutions />
    </main>
  );
}
