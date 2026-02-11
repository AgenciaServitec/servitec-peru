"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ContentWidth } from "@/components/ContentWidth";
import { SPECIALTIES_DATA } from "@/data-list/specialties";

export function Specialties() {
  return (
    <section id="servicios" className="py-24 bg-[#050505]">
      <ContentWidth>
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Nuestras <span className="text-primary">Especialidades</span>
          </h2>
        </div>

        {/* Grid uniforme de cuadrados limpios */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPECIALTIES_DATA.map((s) => (
            <Card
              key={s.type}
              className="group relative overflow-hidden rounded-xl border-white/10 bg-[#0A0A0A] transition-all duration-500 hover:border-primary/50"
            >
              {/* Contenedor con relación de aspecto 1:1 (Cuadrado) */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </Card>
          ))}
        </div>
      </ContentWidth>
    </section>
  );
}
