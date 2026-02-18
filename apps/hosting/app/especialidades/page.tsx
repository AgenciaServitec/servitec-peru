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

// Data sources
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
      {/* HERO SECTION - Estilo Nosotros */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 drop-shadow-2xl"
            >
              Especialidades
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
        {/* BARRA DE HERRAMIENTAS - Limpia */}
        <div className="sticky top-20 z-30 bg-[#050505]/80 backdrop-blur-md py-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input
                placeholder="Buscar especialidad (ej: laptop, apple, servidores...)"
                className="bg-white/[0.03] border-white/5 pl-12 h-12 text-sm focus:ring-primary rounded-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* GRILLA DE ESPECIALIDADES - Estilo Home Specialties */}
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden mb-20">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-black p-8 min-h-[340px] flex flex-col justify-end"
              >
                <Skeleton className="h-8 w-3/4 bg-white/10 mb-4" />
                <Skeleton className="h-4 w-full bg-white/5 mb-8" />
                <Skeleton className="h-10 w-32 bg-white/5" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {displayedSpecialties.map((spec) => (
                <motion.div
                  layout
                  key={spec.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative bg-black min-h-[340px] flex flex-col overflow-hidden transition-all duration-500"
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0 z-0 transition-all duration-700">
                    <Image
                      src={spec.image || "/images/placeholder-spec.jpg"}
                      alt={spec.title}
                      fill
                      className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10 p-8 flex flex-col h-full flex-grow">
                    <div className="flex justify-end items-start mb-8">
                      <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/especialidades/${spec.slug}`}
                        className="inline-block"
                      >
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                          {spec.title.toLowerCase()}
                        </h3>
                      </Link>
                      <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">
                        {spec.description.toLowerCase()}
                      </p>

                      <div className="flex items-center">
                        <Button
                          size="lg"
                          variant="outline"
                          className="btn-ghost-dark text-[10px] h-10 px-6"
                          asChild
                        >
                          <Link href={`/especialidades/${spec.slug}`}>
                            <Plus className="h-3 w-3" />
                            <span>ver detalles</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Borde inferior animado */}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* BOTÓN CARGAR MÁS */}
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

        {/* ESTADO VACÍO */}
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
              restablecer catálogo
            </Button>
          </div>
        )}
      </ContentWidth>
    </div>
  );
}