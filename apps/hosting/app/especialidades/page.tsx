"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { ButtonLink } from "@/components/ui/button-link";
import FilterBar from "@/components/ui/FilterBar";

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
      return (
        spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spec.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
        <FilterBar
          searchPlaceholder="Busca por especialidad..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 rounded-sm overflow-hidden mb-20">
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
                          className="object-cover opacity-70 group-hover:scale-105 transition-all duration-700"
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
                          <ButtonLink
                            href={isCustom ? "/contacto" : specialtyUrl}
                            icon={isCustom ? IconBrandWhatsapp : Plus}
                            variant={isCustom ? "default" : "outline"}
                          >
                            {isCustom ? (
                              <span>Consultar Ahora</span>
                            ) : (
                              <span>Ver Detalles</span>
                            )}
                          </ButtonLink>
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
              icon={Plus}
            >
              Cargar más categorías
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
