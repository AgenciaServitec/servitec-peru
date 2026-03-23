"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const AUTOPLAY_INTERVAL = 4000;

export function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carruselItems.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-screen bg-[#050505] overflow-hidden -mt-25">
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 origin-center"
            initial={{
              clipPath: "inset(10% 0 10% 0)",
              scale: 1.1,
              filter: "brightness(1.5) blur(10px)",
            }}
            animate={{
              clipPath: "inset(0% 0 0% 0)",
              scale: 1.02,
              filter: "brightness(1) blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              transition: { duration: 0.8 },
            }}
            transition={{
              clipPath: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" },
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
                className="w-full h-full object-cover brightness-[0.7]"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 pt-25">
        <div className="max-w-6xl mx-auto w-full text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl leading-[1.1] max-w-5xl">
                {carruselItems[currentIndex].title
                  .split(" ")
                  .map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block mr-[0.2em] last:mr-0 italic"
                      initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.08,
                        ease: [0.215, 0.61, 0.355, 1],
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
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5 bg-[#050505]/50 backdrop-blur-sm z-50"
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
