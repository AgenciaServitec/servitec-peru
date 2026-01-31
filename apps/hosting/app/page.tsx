import { Hero, SocialProof, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { CommonIssuesBridge } from "@/sections/CommonIssuesBridge";
import { Location } from "@/sections/Location";

export default function Home() {
  return (
    <main>
      <Hero />
      <CommonIssuesBridge />
      <Specialties />
      <HowWeWork />
      <Location />
      <SocialProof />
    </main>
  );
}
