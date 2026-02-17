"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Clock, MapPin } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import Link from "next/link";

export function Hero() {
  const words = [
    "Reparación de Laptops",
    "Soporte Técnico",
    "Desarrollo de Software",
    "Cámaras de Seguridad",
    "Reparación de Proyectores",
  ];
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [reverse, setReverse] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  React.useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout2 = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout2);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 30 : 80
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-[65vh] md:min-h-[75vh] flex items-center overflow-hidden bg-[#050505] pt-20"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            x: useTransform(springX, (v) => v * -0.015),
            y: useTransform(springY, (v) => v * -0.015),
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cometWhite" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="cometYellow" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.4" />
            </linearGradient>

            <filter id="cometGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <motion.path
            d="M -100 250 L 300 180 L 500 420 L 800 150 L 1100 250"
            stroke="url(#cometWhite)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#cometGlow)"
            initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
            animate={{
              pathOffset: [0, 1.15],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
          />

          <motion.path
            d="M 1100 100 L 700 200 L 400 50 L -100 150"
            stroke="url(#cometWhite)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            filter="url(#cometGlow)"
            initial={{ pathLength: 0.1, pathOffset: -0.1, opacity: 0 }}
            animate={{
              pathOffset: [0, 1.1],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 4,
              delay: 1,
              ease: "linear",
            }}
          />

          <motion.path
            d="M 1100 750 L 700 820 L 500 620 L 200 880 L -100 720"
            stroke="url(#cometYellow)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            filter="url(#cometGlow)"
            initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
            animate={{
              pathOffset: [0, 1.15],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 5,
              delay: 2,
              ease: "linear",
            }}
          />

          <motion.path
            d="M -100 600 L 200 500 L 600 700 L 1100 550"
            stroke="url(#cometYellow)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            filter="url(#cometGlow)"
            initial={{ pathLength: 0.1, pathOffset: -0.1, opacity: 0 }}
            animate={{
              pathOffset: [0, 1.1],
              opacity: [0, 0.2, 0.2, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatDelay: 6,
              delay: 4,
              ease: "linear",
            }}
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-primary/[0.015] blur-[120px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
      </div>

      <ContentWidth>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl max-w-5xl leading-[1.1]">
              Expertos en <br />
              <span className="text-primary inline-flex items-center">
                {words[index].substring(0, subIndex)}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block w-[4px] md:w-[8px] h-[0.9em] bg-primary ml-2"
                />
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl"
          >
            <span className="text-white font-semibold">
              Servitec Perú Group
            </span>{" "}
            es un centro especializado de soporte técnico{" "}
            <span className="text-white font-semibold">independiente</span>.
            Brindamos diagnóstico y reparación presencial multimarca con
            garantía en Lima.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="btn-primary" asChild>
              <a href="https://wa.me/51941801827" target="_blank">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>
                  Solicitar diagnóstico
                </span>
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-ghost-dark px-10"
              asChild
            >
              <Link href="/#specialties">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14 15h-4v-2H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8zm6-9h-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2m-4 0H8V4h8z"
                  />
                </svg>
                <span>Nuestras Especialidades</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 mb-10 flex flex-wrap justify-center gap-x-10 gap-y-5 text-[13px] uppercase tracking-wider text-white/50"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 text-white" />
              <span className="font-medium text-white/60">
                Chorrillos, Lima
              </span>
            </div>
            <div className="items-center gap-2 border-x border-white/10 px-10 hidden md:flex">
              <Clock className="w-4 text-white" />
              <span className="font-medium text-white/60">
                Lun – Vie de 9am – 7pm
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 text-white" />
              <span className="font-medium text-white/60">Garantía</span>
            </div>
          </motion.div>
        </div>
      </ContentWidth>
    </section>
  );
}
