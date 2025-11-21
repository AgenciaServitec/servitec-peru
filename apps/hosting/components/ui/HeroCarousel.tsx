"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContentWidth } from "@/components/ContentWidth";

interface HeroCarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export const HeroCarousel = ({
  items,
  autoPlay = true,
  interval = 8000,
}: HeroCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const total = items.length;

  const next = () => api?.scrollNext();
  const prev = () => api?.scrollPrev();

  useEffect(() => {
    if (!autoPlay || !api) return;

    const id = setInterval(() => {
      api.scrollNext();
    }, interval);

    return () => clearInterval(id);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full h-[90vh] sm:h-[85vh] lg:h-[80vh] xl:h-[75vh] overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="h-full">
        <CarouselContent className="h-full">
          {items.map((slide, i) => (
            <CarouselItem
              key={i}
              className="relative p-0 h-[90vh] sm:h-[85vh] lg:h-[80vh] xl:h-[75vh]"
            >
              <AnimatePresence mode="wait">
                {current === i && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 w-full h-full will-change-transform"
                  >
                    {slide}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="
          absolute left-3 sm:left-5 top-1/2 -translate-y-1/2
          bg-black/40 hover:bg-black/60 backdrop-blur-sm
          border-0 text-white
        "
        />

        <CarouselNext
          className="
          absolute right-3 sm:right-5 top-1/2 -translate-y-1/2
          bg-black/40 hover:bg-black/60 backdrop-blur-sm
          border-0 text-white
        "
        />
      </Carousel>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`transition-all w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              i === current
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
