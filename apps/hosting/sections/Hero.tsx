"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Clock, MapPin } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import Link from "next/link";

export function Hero() {
  const words = [
    "Reparación de Proyectores",
    "Soporte Técnico",
    "Reparación de Laptops",
    "Desarrollo de Software",
    "Cámaras de Seguridad",
  ];
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [reverse, setReverse] = React.useState(false);

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
    <section className="relative isolate overflow-hidden bg-[#050505] mb-10">
      <ContentWidth>
        <div className="relative overflow-hidden md:rounded-3xl md:border border-white/10">
          <video
            className="h-[90vh] xl:h-[75vh] w-full object-cover"
            src="/video-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          <div className="absolute w-full h-full inset-0 bg-black/90" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center text-center px-4 sm:px-8">
          <div className="min-h-27.5 sm:min-h-35 md:min-h-40 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-white sm:text-5xl max-w-5xl leading-[1.1]">
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
                  className="inline-block w-1 md:w-2 h-[0.9em] bg-primary ml-2"
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
            className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-5 text-[13px] uppercase text-white/50"
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
