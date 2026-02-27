"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const carruselItems = [
  {
    imageDesktop: "/carousel/laptop-repair.jpg",
    imageMobile: "/carousel/laptop-repair-mobile.jpg",
    title: "Reparación de Laptops",
  },
  {
    imageDesktop: "/carousel/phone-repair.jpg",
    imageMobile: "/carousel/phone-repair-mobile.jpg",
    title: "Reparación de Celulares",
  },
  {
    imageDesktop: "/carousel/tablet-repair.jpg",
    imageMobile: "/carousel/tablet-repair-mobile.jpg",
    title: "Reparación de Tablets",
  },
];

const AUTOPLAY_INTERVAL = 3000;

export function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carruselItems.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 origin-center"
            initial={{
              clipPath: "inset(50% 0 50% 0)",
              scale: 1.15,
              filter: "brightness(2) blur(15px)",
            }}
            animate={{
              clipPath: "inset(0% 0 0% 0)",
              scale: 1.05,
              filter: "brightness(1) blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "brightness(0.1) blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            transition={{
              clipPath: { duration: 0.7, ease: [0.85, 0, 0.15, 1] },
              filter: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 5, ease: "linear" },
            }}
          >
            <picture className="w-full h-full">
              <source
                media="(min-width: 768px)"
                srcSet={carruselItems[currentIndex].imageDesktop}
              />
              <img
                src={carruselItems[currentIndex].imageMobile}
                alt={carruselItems[currentIndex].title}
                className="w-full h-full object-cover brightness-[0.55]"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 pointer-events-none px-6 sm:px-12">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex flex-col items-center overflow-hidden pb-4"
            >
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold text-white tracking-tighter drop-shadow-2xl flex flex-wrap justify-center gap-x-3 sm:gap-x-5 overflow-hidden max-w-4xl leading-[1.05]">
                {carruselItems[currentIndex].title
                  .split(" ")
                  .map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={{
                        y: "-30%",
                        opacity: 0,
                        filter: "blur(5px)",
                        transition: { duration: 0.3 },
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + idx * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-30 flex px-6">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-2 sm:gap-3 w-full max-w-[280px]">
            {carruselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-[2px] flex-1 bg-white/20 overflow-hidden cursor-pointer group transition-colors pointer-events-auto"
                aria-label={`Ir a la diapositiva ${index + 1}`}
              >
                {currentIndex === index && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTOPLAY_INTERVAL / 1000,
                      ease: "linear",
                    }}
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute inset-y-0 left-0 w-full bg-white/40" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
