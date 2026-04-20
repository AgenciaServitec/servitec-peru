"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export function Specialties() {
  return (
    <section
      id="specialties"
      className="pb-24 bg-black border-b border-white/5"
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
                            : "text-white hover:underline text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]"
                        }`}
                      >
                        {s.title}
                      </h3>
                    </Link>
                    <p
                      className={`text-sm leading-relaxed font-normal line-clamp-2 mb-8 ${
                        isCustom
                          ? "text-white/80"
                          : "text-white text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]"
                      }`}
                    >
                      {s.description ||
                        `Técnicos especialistas en reparación y soporte avanzado de ${s.title.toLowerCase()}.`}
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
        </div>
      </ContentWidth>
    </section>
  );
}
