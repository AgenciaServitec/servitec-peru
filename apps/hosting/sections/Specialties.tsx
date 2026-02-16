"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Specialties() {
  return (
    <section
      id="specialties"
      className="py-24 bg-black border-t border-white/5"
    >
      <ContentWidth>
        {/* Cabecera: Título normal y limpio */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Soluciones
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-2">
              Nuestras Especialidades
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm md:text-right leading-relaxed font-normal">
            Ingeniería de precisión aplicada a la recuperación de
            infraestructura tecnológica crítica.
          </p>
        </div>

        {/* Grilla técnica */}
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
          {SPECIALTIES_DATA.map((s) => {
            const specialtyUrl = `/especialidades/${s.slug}`;

            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative bg-black overflow-hidden flex flex-col min-h-[340px]"
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 z-0 transition-all duration-700">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={specialtyUrl}
                      className="inline-block group/link"
                    >
                      <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover/link:text-primary transition-colors">
                        {s.title}
                      </h3>
                    </Link>
                    <p className="text-sm leading-relaxed text-white/40 font-normal line-clamp-2 mb-8">
                      {s.description ||
                        `Soporte especializado y reparación avanzada de sistemas de ${s.title.toLowerCase()}.`}
                    </p>

                    <div className="flex items-center gap-6">
                      <Button
                        asChild
                        className="h-10 px-6 bg-primary text-black font-bold text-xs hover:bg-white transition-colors rounded-md"
                      >
                        <Link href={specialtyUrl}>Cotizar</Link>
                      </Button>
                      <Link
                        href={specialtyUrl}
                        className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors"
                      >
                        Detalles
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Línea inferior animada */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </ContentWidth>
    </section>
  );
}
