"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Cpu, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Data sources
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { SERVICES_DATA } from "@/data-list/services";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Paginación incremental
  const ITEMS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset de paginación al filtrar o buscar
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, activeFilter]);

  // Función para obtener el nombre de la especialidad desde su ID/Type
  const getSpecialtyLabel = (type: string) => {
    const spec = SPECIALTIES_DATA.find((s) => s.type === type);
    return spec ? spec.title : type;
  };

  // Lógica de filtrado
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || service.typeSpeciality === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const displayedServices = filteredServices.slice(0, visibleCount);

  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <ContentWidth>
        {/* CABECERA */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
            Service Workshop
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Catálogo de <span className="text-white/40">Soluciones</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            Base de conocimientos y servicios técnicos. Encuentra la solución
            específica para cada falla de hardware y software en nuestro
            laboratorio.
          </p>
        </div>

        {/* BARRA DE HERRAMIENTAS: Búsqueda y Filtro de Especialidad */}
        <div className="sticky top-24 z-30 bg-black/80 backdrop-blur-md py-6 border-y border-white/5 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input
                placeholder="¿Qué falla presenta tu equipo? (ej: No enciende...)"
                className="bg-white/[0.03] border-white/10 pl-12 h-12 text-sm focus:ring-primary rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filtro por Categoría (Especialidad) */}
            <div className="w-full md:w-72">
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger className="bg-white/[0.03] border-white/10 h-12 text-[10px] uppercase tracking-widest font-bold">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                  <SelectItem value="all">TODAS LAS CATEGORÍAS</SelectItem>
                  {SPECIALTIES_DATA.map((spec) => (
                    <SelectItem
                      key={spec.type}
                      value={spec.type}
                      className="uppercase text-[10px] tracking-tight"
                    >
                      {spec.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* GRILLA DE SERVICIOS */}
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
              {displayedServices.map((service) => (
                <motion.div
                  layout
                  key={service.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative bg-black min-h-[340px] flex flex-col transition-all"
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10 p-8 flex flex-col h-full flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded border border-primary/20">
                        {getSpecialtyLabel(service.typeSpeciality)}
                      </span>
                      <Cpu className="h-4 w-4 text-white/10 group-hover:text-primary transition-colors" />
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/40 text-[13px] leading-relaxed mb-8 line-clamp-2">
                        {service.description}
                      </p>

                      <Link
                        href={`/servicios/${service.slug}`}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all"
                      >
                        Ver Detalles{" "}
                        <ArrowRight className="h-3 w-3 text-primary" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* BOTÓN CARGAR MÁS */}
        {!isLoading && filteredServices.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-black transition-all px-12 h-14 rounded-md uppercase text-[10px] font-black tracking-[0.2em]"
            >
              <Plus className="mr-2 h-4 w-4" /> Cargar más servicios
            </Button>
          </div>
        )}

        {/* ESTADO VACÍO */}
        {!isLoading && filteredServices.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/5 rounded-md">
            <Search className="h-10 w-10 text-white/10 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Prueba ajustando los filtros o la búsqueda.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="text-primary uppercase text-[10px] font-bold tracking-widest"
            >
              Restablecer catálogo
            </Button>
          </div>
        )}
      </ContentWidth>
    </div>
  );
}
