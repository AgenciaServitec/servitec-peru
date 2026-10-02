"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const carruselItems = [
  {
    imageDesktop: "/assets/images/hero/projector-repair.jpeg",
    imageMobile: "/assets/images/hero/projector-repair.jpeg",
    title: "Reparación de Proyectores",
  },
  {
    imageDesktop: "/assets/images/hero/laptop-repair.jpeg",
    imageMobile: "/assets/images/hero/laptop-repair.jpeg",
    title: "Reparación de Laptops",
  },
  {
    imageDesktop: "/assets/images/hero/phone-repair.jpeg",
    imageMobile: "/assets/images/hero/phone-repair.jpeg",
    title: "Reparación de Celulares",
  },
  {
    imageDesktop: "/assets/images/hero/tablet-repair.jpeg",
    imageMobile: "/assets/images/hero/tablet-repair.jpeg",
    title: "Reparación de Tablets",
  },
];

const AUTOPLAY_INTERVAL = 4500;

export function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carruselItems.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-screen bg-[#050505] overflow-hidden -mt-25 select-none">
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full transform-gpu will-change-[opacity,transform]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: "easeInOut" },
              scale: { duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" },
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={carruselItems[currentIndex].imageDesktop}
                alt={carruselItems[currentIndex].title}
                fill
                priority={currentIndex === 0}
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 pt-25">
        <div className="max-w-6xl mx-auto w-full text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl italic uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {carruselItems[currentIndex].title}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto translate-y-0.5 z-40"
        >
          <path
            d="M0 40H1440V20C1440 20 1080 0 720 0C360 0 0 20 0 20V40Z"
            fill="black"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1.5 bg-black/30 backdrop-blur-md z-50"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 bg-primary rounded-full z-50"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
