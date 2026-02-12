"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Specialties() {
  return (
    <section id="specialties" className="py-24 bg-[#050505]">
      <ContentWidth>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl text-white font-bold">
            Nuestras Especialidades
          </h2>
          <p className="text-white/40 mt-3 max-w-xl">
            Soporte técnico avanzado con diagnóstico profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-4 md:gap-6">
          {SPECIALTIES_DATA.map((s, index) => {
            const isFeatured = index === 0 || index === 6;

            return (
              <div
                key={s.type}
                className={`group flex flex-col overflow-hidden rounded-md border border-white/5 bg-[#0D0D0D] transition-all duration-500 hover:border-primary/20 
                  ${isFeatured ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1 lg:row-span-2"}
                `}
              >
                <div className="relative h-[55%] w-full overflow-hidden bg-[#111]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      className={`font-bold text-white tracking-tight mb-2 ${isFeatured ? "text-xl md:text-2xl" : "text-lg"}`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/40 line-clamp-2 leading-relaxed font-medium">
                      {s.description ||
                        "Servicio técnico especializado con garantía y repuestos originales."}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button asChild className="bg-foreground">
                      <Link href="/quote">Cotizar</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <Link href="/services">Ver servicios</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ContentWidth>
    </section>
  );
}
