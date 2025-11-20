"use client";

import { Brands } from "@/data-list";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const BrandsSection = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const duplicatedBrands = [...Brands, ...Brands, ...Brands];

  return (
    <div className="pb-10">
      <ContentWidth>
        <div className="bg-white rounded-2xl py-8 px-8 shadow-xl">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              {duplicatedBrands.map((brand, index) => (
                <CarouselItem
                  key={`${brand.name}-${index}`}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex items-center justify-center h-16">
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                      <Image
                        src={brand.imageSrc}
                        alt={brand.name}
                        width={140}
                        height={32}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </ContentWidth>
    </div>
  );
};
