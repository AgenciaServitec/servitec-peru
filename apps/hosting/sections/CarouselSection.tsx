"use client";

import React from "react";
import Image from "next/image";
import { CarouselItems } from "@/data-list";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { motion } from "framer-motion";

export const CarouselSection = () => {
  const slides = CarouselItems.map((item) => (
    <div
      key={item.name}
      className="relative w-full h-full bg-[#121212] isolate"
    >
      <div className="relative w-full h-full">
        <Image
          src={item.url}
          alt={item.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-28 lg:pb-32 px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold drop-shadow-2xl"
        >
          {item.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mt-2 max-w-xl md:max-w-2xl drop-shadow"
        >
          Soluciones rápidas, seguras y profesionales para tus dispositivos.
        </motion.p>
      </div>
    </div>
  ));

  return <HeroCarousel items={slides} autoPlay interval={7000} />;
};
