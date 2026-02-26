"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContentWidth } from "@/components/ContentWidth";
import { ArrowUpRight, Home, Plus, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import { SPECIALTIES_DATA } from "@/data-list/specialties";

export default function NotFound() {
  const recommendedSpecialties = SPECIALTIES_DATA.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center pt-32 pb-20">
      <ContentWidth>
        <div className="text-center space-y-8 mb-20">
          <div className="relative inline-block">
            <h1 className="text-[120px] md:text-[180px] font-bold opacity-5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Wrench className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sistema fuera de <span className="text-primary">alcance</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              La página que buscas ha sido movida o no existe en nuestro
              servidor. ¿En qué podemos ayudarte hoy?
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              variant="outline"
              className="btn-ghost-dark min-w-50"
              asChild
            >
              <Link href="/">
                <Home size={16} className="mr-2" />
                <span>Volver al inicio</span>
              </Link>
            </Button>

            <Button
              size="lg"
              className="btn-primary text-white bg-green-600 hover:bg-green-500 min-w-50"
              asChild
            >
              <a href="https://wa.me/51941801827" target="_blank">
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
                </svg>
                Soporte Directo
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex flex-col items-center mb-12">
            <span className="text-primary font-bold mb-2">Recomendaciones</span>
            <h3 className="text-5xl md:text-6xl font-bold text-white text-center">
              Nuestras especialidades
            </h3>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
            {recommendedSpecialties.map((s) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden flex flex-col min-h-80 bg-black transition-all duration-500"
              >
                <div className="absolute inset-0 z-0 transition-all duration-700">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/especialidades/${s.slug}`}
                      className="inline-block group/link"
                    >
                      <h3 className="text-xl font-bold mb-3 text-white hover:underline">
                        {s.title}
                      </h3>
                    </Link>
                    <p className="text-sm leading-relaxed text-white/40 mb-8 line-clamp-2">
                      {s.description ||
                        `Expertos en soporte técnico y reparación avanzada de ${s.title.toLowerCase()}.`}
                    </p>

                    <div className="flex items-center">
                      <Button
                        size="lg"
                        variant="outline"
                        className="btn-ghost-dark text-[10px]"
                        asChild
                      >
                        <Link href={`/especialidades/${s.slug}`}>
                          <Plus className="h-3 w-3 mr-2" />
                          <span>Ver Detalles</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </ContentWidth>
    </main>
  );
}
