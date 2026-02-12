"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ClipboardList, Timer, Wrench } from "lucide-react";
import Link from "next/link";

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
    desc: "Nuestros especialistas ejecutan la reparación siguiendo estándares de calidad y pruebas de funcionamiento.",
    icon: Wrench,
  },
  {
    title: "Entrega con garantía",
    desc: "Recibes tu equipo operativo con un certificado de garantía real por el servicio realizado.",
    icon: BadgeCheck,
  },
];

const stats = [
  { label: "Respuesta", value: "En el día" },
  { label: "Garantía", value: "Por servicio" },
  { label: "Atención", value: "Empresas y Hogares" },
];

export function HowWeWork() {
  return (
    <section
      id="proceso"
      className="py-24 bg-[#050505] border-y border-white/[0.03]"
    >
      <ContentWidth>
        <div className="grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              ¿Cómo <span className="text-[#FFD200]">trabajamos?</span>{" "}
            </h2>
            <p className="mt-4 text-white/40 max-w-xl">
              Un proceso simple y transparente diseñado para brindarte seguridad
              en cada etapa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:border-[#FFD200]/30"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                  {s.label}
                </p>
                <p className="mt-1 text-xs md:text-sm font-semibold text-white/90">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0D0D0D] p-8 transition-all duration-500 hover:border-[#FFD200]/20 hover:bg-[#111111]"
              >
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.01] select-none transition-all duration-700 group-hover:text-[#FFD200]/[0.03] group-hover:scale-110">
                  {idx + 1}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD200] text-black transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" strokeWidth={2.5} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#FFD200] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-[#FFD200]/60">
                      Fase 0{idx + 1}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button asChild size="lg">
            <Link href="https://wa.me/51941801827" target="_blank">
              Iniciar diagnóstico por WhatsApp
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Solicitar presupuesto</Link>
          </Button>
        </div>
      </ContentWidth>
    </section>
  );
}
