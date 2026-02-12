import { Hero, SocialProof, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { TrustBar } from "@/sections/TrustBar";
import { Location } from "@/sections/Location";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Specialties />
      <HowWeWork />
      <Location />
      <SocialProof />
    </main>
  );
}
