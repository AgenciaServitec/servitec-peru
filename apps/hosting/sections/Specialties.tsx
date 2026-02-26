"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Specialties() {
  return (
    <section
      id="specialties"
      className="py-24 bg-black border-t border-white/5"
    >
      <ContentWidth>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-primary font-bold">Soluciones</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">
              Nuestras Especialidades
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm md:text-right leading-relaxed font-normal">
            Soporte técnico avanzado aplicado a la reparación y mantenimiento de
            infraestructura tecnológica.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
          {SPECIALTIES_DATA.map((s) => {
            const specialtyUrl = `/especialidades/${s.slug}`;
            const isCustom = s.isCustom;

            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden flex flex-col min-h-85 transition-all duration-500 ${
                  isCustom ? "bg-[#111111]" : "bg-black"
                }`}
              >
                {isCustom && (
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,179,8,0.15),transparent_70%)]" />
                )}

                {!isCustom && (
                  <div className="absolute inset-0 z-0 transition-all duration-700">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  </div>
                )}

                {isCustom && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-px bg-primary shadow-[0_0_20px_rgba(234,179,8,0.8)] z-20" />
                    <div className="absolute top-0 left-0 w-px h-full bg-primary shadow-[0_0_20px_rgba(234,179,8,0.8)] z-20" />
                    <div className="absolute top-0 right-0 w-px h-full bg-primary shadow-[0_0_20px_rgba(234,179,8,0.8)] z-20" />
                  </>
                )}

                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight
                      className={`h-4 w-4 transition-colors ${
                        isCustom
                          ? "text-primary animate-pulse"
                          : "text-white/20 group-hover:text-primary"
                      }`}
                    />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={isCustom ? "/contacto" : specialtyUrl}
                      className="inline-block group/link"
                    >
                      <h3
                        className={`text-xl font-bold mb-3 transition-colors ${
                          isCustom
                            ? "text-primary"
                            : "text-white hover:underline"
                        }`}
                      >
                        {s.title}
                      </h3>
                    </Link>
                    <p
                      className={`text-sm leading-relaxed font-normal line-clamp-2 mb-8 ${
                        isCustom ? "text-white/80" : "text-white/40"
                      }`}
                    >
                      {s.description ||
                        `Técnicos especialistas en reparación y soporte avanzado de ${s.title.toLowerCase()}.`}
                    </p>

                    <div className="flex items-center">
                      <Button
                        size="lg"
                        variant={isCustom ? "default" : "outline"}
                        className={`${
                          isCustom ? "btn-primary" : "btn-ghost-dark"
                        } text-[10px]`}
                        asChild
                      >
                        <Link href={isCustom ? "/contacto" : specialtyUrl}>
                          {isCustom ? (
                            <>
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
                              <span>Consultar Ahora</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3" />
                              <span>Ver Detalles</span>
                            </>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-px transition-all duration-500 ${
                    isCustom
                      ? "w-full bg-primary"
                      : "w-0 bg-primary group-hover:w-full"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </ContentWidth>
    </section>
  );
}
