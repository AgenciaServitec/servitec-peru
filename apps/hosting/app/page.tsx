import { Hero, Specialties } from "@/sections";
import { HowWeWork } from "@/sections/HowWeWork";
import { Location } from "@/sections/Location";
import { CTA } from "@/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialties />
      <HowWeWork />
      <Location />
      <CTA />
      {/*<WhatDoWeDo />*/}
      {/*<ServicesSection />*/}
      {/*<BusinessBoostBanner />*/}
      {/*<NewsLetterSection />*/}
      {/*<BrandsSection />*/}
    </main>
  );
}
