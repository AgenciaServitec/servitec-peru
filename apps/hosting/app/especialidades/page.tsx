"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Input } from "@/components/ui/input";
import { ArrowRight, Cpu, LayoutGrid, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Importamos únicamente la data de Especialidades
import { SPECIALTIES_DATA } from "@/data-list/specialties";

export default function SpecialtiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Paginación (opcional si tienes muchas especialidades)
  const ITEMS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filtrar especialidades por nombre o descripción
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
    <div className="bg-black min-h-screen pt-32 pb-20">
      <ContentWidth>
        {/* CABECERA */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
            Divisiones de Ingeniería
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestras <span className="text-white/40">Especialidades</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            Selecciona una categoría para ver nuestras soluciones específicas,
            tiempos de respuesta y protocolos de reparación técnica.
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA (Sin select de filtros, ya que estas son las categorías) */}
        <div className="sticky top-24 z-30 bg-black/80 backdrop-blur-md py-6 border-y border-white/5 mb-12">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
            <Input
              placeholder="Buscar especialidad (ej: Laptop, Apple, Servidores...)"
              className="bg-white/[0.03] border-white/10 pl-12 h-12 text-sm focus:ring-primary rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* GRILLA DE ESPECIALIDADES */}
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-black p-8 min-h-[300px] space-y-4">
                <Skeleton className="h-4 w-24 bg-white/5" />
                <div className="pt-20 space-y-3">
                  <Skeleton className="h-8 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                </div>
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
                  className="group relative bg-black min-h-[320px] flex flex-col"
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={spec.image || "/images/placeholder-spec.jpg"}
                      alt={spec.title}
                      fill
                      className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 flex flex-col h-full flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                        <Cpu className="h-5 w-5 text-white/20 group-hover:text-primary transition-colors" />
                      </div>
                      <LayoutGrid className="h-4 w-4 text-white/5" />
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {spec.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-2">
                        {spec.description}
                      </p>

                      <Link
                        href={`/especialidades/${spec.slug}`}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors"
                      >
                        Explorar Servicios{" "}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* BOTÓN VER MÁS */}
        {!isLoading && filteredSpecialties.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              variant="outline"
              className="border-white/10 bg-white/[0.02] text-white hover:bg-primary hover:text-black transition-all px-10 h-12 rounded-md uppercase text-[10px] font-black tracking-widest"
            >
              <Plus className="mr-2 h-4 w-4" /> Ver más categorías
            </Button>
          </div>
        )}

        {/* Estado vacío */}
        {!isLoading && filteredSpecialties.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-md">
            <Cpu className="h-12 w-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-sm">
              No encontramos esa especialidad.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-primary text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Ver todas las especialidades
            </button>
          </div>
        )}
      </ContentWidth>
    </div>
  );
}
