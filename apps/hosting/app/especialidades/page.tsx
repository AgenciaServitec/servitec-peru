"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

import { SPECIALTIES_DATA } from "@/data-list/specialties";

export default function SpecialtiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  const filteredSpecialties = useMemo(() => {
    return SPECIALTIES_DATA.filter((spec) => {
      const matchesSearch =
        spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spec.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  const displayedSpecialties = filteredSpecialties.slice(0, visibleCount);

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-20 font-sans selection:bg-primary/30">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/70 drop-shadow-2xl"
            >
              Nuestras Especialidades
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-lg"
            >
              Selecciona una categoría para ver nuestras soluciones específicas,
              tiempos de respuesta y protocolos de reparación técnica.
            </motion.p>
          </div>
        </ContentWidth>
      </section>

      <ContentWidth>
        <div className="sticky top-20 z-30 bg-[#050505]/80 backdrop-blur-md py-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input
                placeholder="Buscar especialidad (ej: laptop, apple, servidores...)"
                className="bg-white/3 border-white/5 pl-12 h-12 text-sm focus:ring-primary rounded-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden mb-20">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-black p-8 min-h-85 flex flex-col justify-end"
              >
                <Skeleton className="h-8 w-3/4 bg-white/10 mb-4" />
                <Skeleton className="h-4 w-full bg-white/5 mb-8" />
                <Skeleton className="h-10 w-32 bg-white/5" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {displayedSpecialties.map((spec) => {
                const specialtyUrl = `/especialidades/${spec.slug}`;
                const isCustom = spec.isCustom;

                return (
                  <motion.div
                    layout
                    key={spec.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                          src={spec.image || "/images/placeholder-spec.jpg"}
                          alt={spec.title}
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

                    <div className="relative z-10 p-8 flex flex-col h-full grow">
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
                            {spec.title}
                          </h3>
                        </Link>
                        <p
                          className={`text-sm leading-relaxed font-normal line-clamp-2 mb-8 ${
                            isCustom ? "text-white/80" : "text-white/40"
                          }`}
                        >
                          {spec.description ||
                            `Técnicos especialistas en reparación y soporte avanzado de ${spec.title.toLowerCase()}.`}
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
            </AnimatePresence>
          )}
        </div>

        {!isLoading && filteredSpecialties.length > visibleCount && (
          <div className="pb-24 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="btn-ghost-dark"
            >
              <Plus className="h-4 w-4" /> cargar más categorías
            </Button>
          </div>
        )}

        {!isLoading && filteredSpecialties.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/5 rounded-sm">
            <Search className="h-10 w-10 text-white/10 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">
              no se encontraron resultados
            </h3>
            <p className="text-white/30 text-sm mb-6">
              prueba con otros términos de búsqueda.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
              }}
              className="text-primary text-[10px] cursor-pointer"
            >
              Restablecer catálogo
            </Button>
          </div>
        )}
      </ContentWidth>
    </div>
  );
}
