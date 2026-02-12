"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Specialties() {
  return (
    <section id="servicios" className="py-24 bg-[#050505]">
      <ContentWidth>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl text-white font-bold tracking-tighter">
            Nuestras <span className="text-primary">Especialidades</span>
          </h2>
          <p className="text-white/40 mt-2 max-w-xl">
            Soluciones técnicas avanzadas con especialistas en cada área.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] gap-4">
          {SPECIALTIES_DATA.map((s, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;

            return (
              <div
                key={s.type}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] transition-all duration-500 hover:border-primary/40 
      ${isFirst ? "md:col-span-2 md:row-span-2" : ""}
      ${isSecond ? "md:col-span-2 md:row-span-1" : ""}
    `}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent via-15%" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <h3
                      className={`font-bold text-white transition-all duration-500 ease-out tracking-tight
        ${isFirst ? "text-2xl md:text-3xl" : "text-lg"}
        group-hover:mb-4
      `}
                    >
                      {s.title}
                    </h3>

                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-[13px] text-white/60 mb-6 line-clamp-2 leading-relaxed font-medium">
                          {s.description ||
                            "Diagnóstico avanzado y reparación técnica con repuestos originales certificados."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            asChild
                            className="flex-1 h-9 text-[10px] font-bold uppercase tracking-wider bg-primary hover:bg-yellow-500 text-black border-none"
                          >
                            <Link href="/quote">Cotizar</Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 h-9 text-[10px] font-bold uppercase tracking-wider border-white/10 bg-white/5 hover:bg-white/20 text-white backdrop-blur-sm"
                          >
                            <Link href="/services">Ver servicios</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
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
