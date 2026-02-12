"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { BadgeCheck, ClipboardList, Timer, Wrench } from "lucide-react";

const steps = [
  {
    title: "Diagnóstico claro",
    desc: "Revisamos el equipo minuciosamente para detectar la falla real y ofrecerte las mejores opciones.",
    icon: ClipboardList,
  },
  {
    title: "Propuesta y tiempos",
    desc: "Te enviamos un presupuesto detallado con costos y tiempos de entrega antes de proceder.",
    icon: Timer,
  },
  {
    title: "Servicio técnico",
    desc: "Nuestros especialistas ejecutan la reparación siguiendo estándares de calidad y pruebas.",
    icon: Wrench,
  },
  {
    title: "Entrega con garantía",
    desc: "Recibes tu equipo operativo con un certificado de garantía real por el servicio realizado.",
    icon: BadgeCheck,
  },
];

export function HowWeWork() {
  return (
    <section id="proceso" className="py-24 bg-[#050505]">
      <ContentWidth>
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            ¿Cómo trabajamos?
          </h2>
          <p className="mt-4 text-white/40 max-w-md">
            Un proceso simple y transparente diseñado para tu seguridad en cada
            etapa.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-white/5" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group relative flex flex-col">
                  <div className="relative z-10 mb-8 flex items-center justify-between lg:justify-start lg:gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#0D0D0D] border border-white/10 text-white transition-all duration-500 group-hover:border-[#FFD200]/50 group-hover:text-[#FFD200]">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="text-7xl font-black text-white/[0.02] leading-none transition-colors duration-500 group-hover:text-white/[0.05] select-none">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="relative flex flex-col flex-1 p-8 rounded-md border border-white/5 bg-[#0A0A0A] transition-all duration-500 group-hover:border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {s.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/70 transition-colors font-medium">
                      {s.desc}
                    </p>

                    {/* Barra de progreso inferior tecnológica */}
                    <div className="mt-10 h-[2px] w-full bg-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#FFD200] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
